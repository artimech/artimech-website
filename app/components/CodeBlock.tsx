'use client'

import { useState, useRef, useEffect } from 'react'
import { useCodeSnippetTracking } from '../hooks/useAnalytics'

interface CodeBlockProps {
  children: string
  language?: string
  title?: string
  showLineNumbers?: boolean
}

export function CodeBlock({ children, language = 'javascript', title, showLineNumbers = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const codeRef = useRef<HTMLElement>(null)
  const { trackCodeCopy, trackCodeView } = useCodeSnippetTracking()

  // Track code snippet view
  useEffect(() => {
    trackCodeView(children, language)
  }, [children, language, trackCodeView])

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    trackCodeCopy(children, language)
    
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden my-6">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          <span className="text-sm text-gray-300 font-medium">{title}</span>
          <span className="text-xs text-gray-500 uppercase">{language}</span>
        </div>
      )}
      
      <div className="relative">
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors duration-200 bg-gray-800 hover:bg-gray-700 rounded"
          title="Copy to clipboard"
        >
          {copied ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
        
        <pre className="p-4 overflow-x-auto text-sm">
          <code 
            ref={codeRef}
            className={`language-${language} text-gray-100`}
            style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
          >
            {showLineNumbers ? (
              children.split('\n').map((line, index) => (
                <div key={index} className="flex">
                  <span className="text-gray-500 text-xs mr-4 select-none min-w-[2rem] text-right">
                    {index + 1}
                  </span>
                  <span>{line}</span>
                </div>
              ))
            ) : (
              children
            )}
          </code>
        </pre>
      </div>
    </div>
  )
}

// Analytics-enhanced pre component for MDX
export function AnalyticsCodePre({ children, ...props }: any) {
  const codeContent = typeof children === 'string' ? children : children?.props?.children || ''
  const language = children?.props?.className?.replace('language-', '') || 'text'
  
  return (
    <CodeBlock language={language} {...props}>
      {codeContent}
    </CodeBlock>
  )
} 