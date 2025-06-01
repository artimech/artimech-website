// GA4 Configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || ''

// Custom Event Types for Technical Content
export interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
  custom_parameters?: Record<string, any>
}

// Technical Content Events
export const ANALYTICS_EVENTS = {
  // Code interaction events
  CODE_SNIPPET_COPY: {
    action: 'code_snippet_copy',
    category: 'technical_engagement',
  },
  CODE_SNIPPET_VIEW: {
    action: 'code_snippet_view', 
    category: 'technical_engagement',
  },
  
  // Blog engagement events
  BLOG_POST_READ: {
    action: 'blog_post_read',
    category: 'content_engagement',
  },
  BLOG_POST_COMPLETE: {
    action: 'blog_post_complete',
    category: 'content_engagement',
  },
  
  // Technical diagram interactions
  DIAGRAM_INTERACTION: {
    action: 'diagram_interaction',
    category: 'technical_engagement',
  },
  
  // Contact and conversion events
  CONTACT_FORM_VIEW: {
    action: 'contact_form_view',
    category: 'conversion',
  },
  CONTACT_FORM_SUBMIT: {
    action: 'contact_form_submit',
    category: 'conversion',
  },
  CONTACT_FORM_SUCCESS: {
    action: 'contact_form_success',
    category: 'conversion',
  },
  
  // Navigation and UX events
  EXTERNAL_LINK_CLICK: {
    action: 'external_link_click',
    category: 'navigation',
  },
  SEARCH_PERFORM: {
    action: 'search_perform',
    category: 'search',
  },
  
  // Technical content specific
  TECHNICAL_DEMO_VIEW: {
    action: 'technical_demo_view',
    category: 'technical_engagement',
  },
  API_DOCUMENTATION_VIEW: {
    action: 'api_docs_view',
    category: 'technical_engagement',
  },
} as const

// Track custom events
export const trackEvent = (event: AnalyticsEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      custom_map: event.custom_parameters,
    })
  }
}

// Track page views with custom parameters
export const trackPageView = (url: string, title?: string, customParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_title: title,
      page_location: url,
      custom_map: customParams,
    })
  }
}

// Enhanced ecommerce tracking for service inquiries
export const trackServiceInquiry = (serviceType: string, inquiryValue?: number) => {
  trackEvent({
    action: 'service_inquiry',
    category: 'conversion',
    label: serviceType,
    value: inquiryValue,
    custom_parameters: {
      service_type: serviceType,
      inquiry_source: 'website',
    },
  })
}

// Track technical background inference
export const trackUserTechnicalBackground = (background: 'beginner' | 'intermediate' | 'advanced' | 'expert') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      custom_map: {
        technical_background: background,
      },
    })
  }
}

// Geographic market tracking
export const trackGeographicMarket = (market: string, region: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      custom_map: {
        target_market: market,
        geographic_region: region,
      },
    })
  }
}

// Reading time tracking for blog posts
export const trackReadingProgress = (postSlug: string, progressPercentage: number, timeSpent: number) => {
  trackEvent({
    action: 'reading_progress',
    category: 'content_engagement',
    label: postSlug,
    value: progressPercentage,
    custom_parameters: {
      time_spent_seconds: timeSpent,
      progress_percentage: progressPercentage,
    },
  })
}

// Conversion funnel tracking
export const trackConversionFunnel = (stage: 'awareness' | 'interest' | 'consideration' | 'conversion', source: string) => {
  trackEvent({
    action: 'funnel_progression',
    category: 'conversion',
    label: `${stage}_${source}`,
    custom_parameters: {
      funnel_stage: stage,
      traffic_source: source,
    },
  })
}

// Performance monitoring
export const trackPerformanceMetric = (metric: string, value: number, url: string) => {
  trackEvent({
    action: 'performance_metric',
    category: 'site_performance',
    label: metric,
    value: Math.round(value),
    custom_parameters: {
      metric_name: metric,
      page_url: url,
    },
  })
}

// Type declarations for gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void
  }
} 