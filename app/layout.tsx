import './global.css'
import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { Suspense } from 'react'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { AnalyticsProvider, PerformanceMonitor, GeographicTracker, TechnicalEngagementTracker } from './components/Analytics'
import Footer from './components/footer'
import { baseUrl } from './sitemap'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Artimech - AI/ML Engineering Studio',
    template: '%s | Artimech',
  },
  description: 'Intelligent engineering. We build AI/ML systems that work. Clean, efficient, and purpose-built for modern problems.',
  openGraph: {
    title: 'Artimech - AI/ML Engineering Studio',
    description: 'Intelligent engineering. We build AI/ML systems that work. Clean, efficient, and purpose-built for modern problems.',
    url: baseUrl,
    siteName: 'Artimech',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-black',
        jetbrainsMono.variable
      )}
    >
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto font-mono">
        <AnalyticsProvider>
          <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
            <Navbar />
            {children}
            <Footer />
            <Analytics />
            <SpeedInsights />
            
            {/* GA4 Analytics Components */}
            <Suspense fallback={null}>
              <PerformanceMonitor />
              <GeographicTracker />
              <TechnicalEngagementTracker />
            </Suspense>
          </main>
        </AnalyticsProvider>
      </body>
    </html>
  )
}
