'use client'

import { useEffect } from 'react'
import { useReadingProgress, useConversionTracking, useTechnicalBackgroundInference } from '../hooks/useAnalytics'

interface BlogPostReaderProps {
  children: React.ReactNode
  postSlug: string
  estimatedReadTime?: number
}

export function BlogPostReader({ children, postSlug, estimatedReadTime }: BlogPostReaderProps) {
  const { trackManualProgress } = useReadingProgress(postSlug)
  const { trackFunnelStage } = useConversionTracking()
  const { trackTechnicalInteraction } = useTechnicalBackgroundInference()

  useEffect(() => {
    // Track blog post entry
    trackFunnelStage('interest')
    
    // Track technical interaction for reading technical content
    trackTechnicalInteraction()
  }, [trackFunnelStage, trackTechnicalInteraction])

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      {estimatedReadTime && (
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-6 border-l-4 border-blue-500 pl-4">
          <span className="font-medium">Estimated read time:</span> {estimatedReadTime} minutes
        </div>
      )}
      
      {children}
      
      {/* Reading completion tracking */}
      <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border">
        <h3 className="text-lg font-semibold mb-2">Enjoyed this technical deep-dive?</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          We help companies build production-ready AI/ML systems. Let's discuss your next project.
        </p>
        <button
          onClick={() => {
            trackFunnelStage('consideration')
            // Navigate to contact
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Get in Touch
        </button>
      </div>
    </article>
  )
}

// Reading time estimator utility
export function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
} 