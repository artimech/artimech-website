'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { GA_TRACKING_ID, trackPageView } from '../lib/analytics'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

interface AnalyticsProviderProps {
  children: React.ReactNode
}

// Separate component for search params tracking
function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!GA_TRACKING_ID) return

    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '')
    trackPageView(url, document.title)
  }, [pathname, searchParams])

  return null
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  if (!GA_TRACKING_ID) {
    return <>{children}</>
  }

  return (
    <>
      {/* Google Analytics 4 */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', '${GA_TRACKING_ID}', {
              page_title: document.title,
              page_location: window.location.href,
              // Enhanced ecommerce
              enhanced_ecommerce: true,
              // Custom dimensions for technical content
              custom_map: {
                'dimension1': 'technical_background',
                'dimension2': 'content_category',
                'dimension3': 'geographic_market',
                'dimension4': 'traffic_source',
                'dimension5': 'user_journey_stage'
              },
              // Conversion tracking
              send_page_view: true,
              // Performance monitoring
              site_speed_sample_rate: 10,
              // Privacy settings
              anonymize_ip: true,
              respect_dnt: true
            });

            // Track Core Web Vitals
            gtag('config', '${GA_TRACKING_ID}', {
              custom_map: {
                'metric_1': 'cumulative_layout_shift',
                'metric_2': 'first_contentful_paint',
                'metric_3': 'first_input_delay',
                'metric_4': 'largest_contentful_paint'
              }
            });
          `,
        }}
      />
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
      {children}
    </>
  )
}

// Performance monitoring component
export function PerformanceMonitor() {
  useEffect(() => {
    if (!GA_TRACKING_ID || typeof window === 'undefined') return

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (window.gtag) {
          window.gtag('event', 'web_vital', {
            event_category: 'Web Vitals',
            event_label: entry.name,
            value: Math.round(entry.startTime),
            non_interaction: true,
          })
        }
      }
    })

    // Observe paint timings
    observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] })

    return () => observer.disconnect()
  }, [])

  return null
}

// Geographic detection component
export function GeographicTracker() {
  useEffect(() => {
    if (!GA_TRACKING_ID || typeof window === 'undefined') return

    // Detect timezone and approximate location
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const language = navigator.language

    // Infer geographic market from timezone
    let market = 'unknown'
    let region = 'unknown'

    if (timezone.includes('America/New_York') || timezone.includes('America/Chicago')) {
      market = 'north_america_east'
      region = 'US'
    } else if (timezone.includes('America/Los_Angeles') || timezone.includes('America/Denver')) {
      market = 'north_america_west'
      region = 'US'
    } else if (timezone.includes('Europe/London')) {
      market = 'europe_uk'
      region = 'UK'
    } else if (timezone.includes('Europe/')) {
      market = 'europe_continental'
      region = 'EU'
    } else if (timezone.includes('Asia/')) {
      market = 'asia_pacific'
      region = 'APAC'
    }

    if (window.gtag) {
      window.gtag('config', GA_TRACKING_ID, {
        custom_map: {
          timezone: timezone,
          language: language,
          inferred_market: market,
          inferred_region: region,
        },
      })
    }
  }, [])

  return null
}

// Technical engagement tracker
export function TechnicalEngagementTracker() {
  useEffect(() => {
    if (!GA_TRACKING_ID || typeof window === 'undefined') return

    // Track code snippet interactions
    const handleCodeClick = (event: Event) => {
      const target = event.target as HTMLElement
      if (target.tagName === 'CODE' || target.closest('pre')) {
        if (window.gtag) {
          window.gtag('event', 'code_interaction', {
            event_category: 'Technical Engagement',
            event_label: target.textContent?.substring(0, 50) || 'code_snippet',
          })
        }
      }
    }

    // Track external link clicks
    const handleExternalLinkClick = (event: Event) => {
      const target = event.target as HTMLAnchorElement
      if (target.tagName === 'A' && target.href && !target.href.includes(window.location.hostname)) {
        if (window.gtag) {
          window.gtag('event', 'external_link_click', {
            event_category: 'Navigation',
            event_label: target.href,
          })
        }
      }
    }

    // Track scroll depth
    let maxScroll = 0
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )
      
      if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
        maxScroll = scrollPercent
        if (window.gtag) {
          window.gtag('event', 'scroll_depth', {
            event_category: 'Engagement',
            event_label: `${scrollPercent}%`,
            value: scrollPercent,
          })
        }
      }
    }

    document.addEventListener('click', handleCodeClick)
    document.addEventListener('click', handleExternalLinkClick)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      document.removeEventListener('click', handleCodeClick)
      document.removeEventListener('click', handleExternalLinkClick)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return null
} 