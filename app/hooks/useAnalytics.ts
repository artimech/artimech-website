'use client'

import { useEffect, useCallback, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { 
  trackEvent, 
  trackReadingProgress, 
  trackConversionFunnel, 
  trackServiceInquiry,
  trackUserTechnicalBackground,
  ANALYTICS_EVENTS 
} from '../lib/analytics'

// Blog reading progress hook
export function useReadingProgress(postSlug: string) {
  const startTimeRef = useRef<number>(Date.now())
  const progressRef = useRef<number>(0)

  useEffect(() => {
    startTimeRef.current = Date.now()
    
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )
      
      // Track reading milestones
      if (scrollPercent > progressRef.current && scrollPercent % 10 === 0) {
        progressRef.current = scrollPercent
        const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000)
        trackReadingProgress(postSlug, scrollPercent, timeSpent)
      }

      // Track blog post completion
      if (scrollPercent >= 90 && progressRef.current < 90) {
        const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000)
        trackEvent({
          ...ANALYTICS_EVENTS.BLOG_POST_COMPLETE,
          label: postSlug,
          value: timeSpent,
          custom_parameters: {
            reading_time_seconds: timeSpent,
            completion_percentage: scrollPercent,
          },
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [postSlug])

  return {
    trackManualProgress: (percentage: number) => {
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000)
      trackReadingProgress(postSlug, percentage, timeSpent)
    },
  }
}

// Code snippet interaction hook
export function useCodeSnippetTracking() {
  const trackCodeCopy = useCallback((codeContent: string, language?: string) => {
    trackEvent({
      ...ANALYTICS_EVENTS.CODE_SNIPPET_COPY,
      label: `${language || 'unknown'}_${codeContent.substring(0, 30)}`,
      custom_parameters: {
        language: language || 'unknown',
        code_length: codeContent.length,
        snippet_preview: codeContent.substring(0, 100),
      },
    })
  }, [])

  const trackCodeView = useCallback((codeContent: string, language?: string) => {
    trackEvent({
      ...ANALYTICS_EVENTS.CODE_SNIPPET_VIEW,
      label: `${language || 'unknown'}_${codeContent.substring(0, 30)}`,
      custom_parameters: {
        language: language || 'unknown',
        code_length: codeContent.length,
      },
    })
  }, [])

  return { trackCodeCopy, trackCodeView }
}

// Technical background inference hook
export function useTechnicalBackgroundInference() {
  const timeOnTechnicalContent = useRef<number>(0)
  const technicalInteractions = useRef<number>(0)

  const trackTechnicalInteraction = useCallback(() => {
    technicalInteractions.current += 1
    
    // Infer technical background based on interactions
    let background: 'beginner' | 'intermediate' | 'advanced' | 'expert' = 'beginner'
    
    if (technicalInteractions.current > 20) {
      background = 'expert'
    } else if (technicalInteractions.current > 10) {
      background = 'advanced'
    } else if (technicalInteractions.current > 5) {
      background = 'intermediate'
    }

    trackUserTechnicalBackground(background)
  }, [])

  const updateTimeOnTechnicalContent = useCallback((additionalTime: number) => {
    timeOnTechnicalContent.current += additionalTime
  }, [])

  return { trackTechnicalInteraction, updateTimeOnTechnicalContent }
}

// Conversion funnel hook
export function useConversionTracking() {
  const pathname = usePathname()

  const trackFunnelStage = useCallback((stage: 'awareness' | 'interest' | 'consideration' | 'conversion') => {
    const source = document.referrer ? new URL(document.referrer).hostname : 'direct'
    trackConversionFunnel(stage, source)
  }, [])

  const trackServiceInquiryEvent = useCallback((serviceType: string, inquiryValue?: number) => {
    trackServiceInquiry(serviceType, inquiryValue)
    trackFunnelStage('conversion')
  }, [trackFunnelStage])

  // Auto-track funnel stages based on page visits
  useEffect(() => {
    if (pathname === '/') {
      trackFunnelStage('awareness')
    } else if (pathname.startsWith('/blog')) {
      trackFunnelStage('interest')
    } else if (pathname.includes('contact') || pathname.includes('services')) {
      trackFunnelStage('consideration')
    }
  }, [pathname, trackFunnelStage])

  return { trackFunnelStage, trackServiceInquiryEvent }
}

// Form interaction hook
export function useFormTracking(formName: string) {
  const trackFormView = useCallback(() => {
    trackEvent({
      ...ANALYTICS_EVENTS.CONTACT_FORM_VIEW,
      label: formName,
    })
  }, [formName])

  const trackFormSubmit = useCallback((formData?: Record<string, any>) => {
    trackEvent({
      ...ANALYTICS_EVENTS.CONTACT_FORM_SUBMIT,
      label: formName,
      custom_parameters: {
        form_name: formName,
        fields_filled: formData ? Object.keys(formData).length : 0,
        submission_timestamp: Date.now(),
      },
    })
  }, [formName])

  const trackFormSuccess = useCallback((responseTime?: number) => {
    trackEvent({
      ...ANALYTICS_EVENTS.CONTACT_FORM_SUCCESS,
      label: formName,
      value: responseTime,
      custom_parameters: {
        form_name: formName,
        response_time_ms: responseTime,
      },
    })
  }, [formName])

  return { trackFormView, trackFormSubmit, trackFormSuccess }
}

// Performance monitoring hook
export function usePerformanceTracking() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Track page load performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        
        if (navigation) {
          // Track key performance metrics
          const metrics = {
            dns_time: navigation.domainLookupEnd - navigation.domainLookupStart,
            connection_time: navigation.connectEnd - navigation.connectStart,
            request_time: navigation.responseEnd - navigation.requestStart,
            dom_processing: navigation.domContentLoadedEventEnd - navigation.responseEnd,
            total_time: navigation.loadEventEnd - navigation.fetchStart,
          }

          Object.entries(metrics).forEach(([metric, value]) => {
            if (value > 0) {
              trackEvent({
                action: 'performance_metric',
                category: 'site_performance',
                label: metric,
                value: Math.round(value),
                custom_parameters: {
                  metric_name: metric,
                  page_url: window.location.pathname,
                },
              })
            }
          })
        }
      }, 1000)
    })
  }, [])
}

// External link tracking hook
export function useExternalLinkTracking() {
  useEffect(() => {
    const handleClick = (event: Event) => {
      const target = event.target as HTMLAnchorElement
      if (target.tagName === 'A' && target.href) {
        const isExternal = !target.href.includes(window.location.hostname)
        const isDownload = target.download || target.href.match(/\.(pdf|doc|docx|zip|mp4|mp3)$/i)
        
        if (isExternal) {
          trackEvent({
            ...ANALYTICS_EVENTS.EXTERNAL_LINK_CLICK,
            label: target.href,
            custom_parameters: {
              link_text: target.textContent?.substring(0, 50) || '',
              destination_domain: new URL(target.href).hostname,
              is_download: !!isDownload,
            },
          })
        }
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])
}

// Search tracking hook
export function useSearchTracking() {
  const trackSearch = useCallback((query: string, resultsCount?: number) => {
    trackEvent({
      ...ANALYTICS_EVENTS.SEARCH_PERFORM,
      label: query,
      value: resultsCount,
      custom_parameters: {
        search_query: query,
        results_count: resultsCount,
        search_timestamp: Date.now(),
      },
    })
  }, [])

  return { trackSearch }
}

// A/B testing hook for geographic variants
export function useGeographicVariant() {
  const [variant, setVariant] = useState<string>('default')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    let selectedVariant = 'default'

    // Select variant based on geographic location
    if (timezone.includes('Europe/')) {
      selectedVariant = 'europe'
    } else if (timezone.includes('Asia/')) {
      selectedVariant = 'asia'
    } else if (timezone.includes('America/')) {
      selectedVariant = 'americas'
    }

    setVariant(selectedVariant)

    // Track variant assignment
    trackEvent({
      action: 'variant_assignment',
      category: 'geographic_testing',
      label: selectedVariant,
      custom_parameters: {
        timezone,
        variant: selectedVariant,
      },
    })
  }, [])

  return variant
} 