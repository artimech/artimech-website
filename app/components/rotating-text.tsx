'use client'

import { useState, useEffect } from 'react'

const rotatingTexts = [
  "intelligent engineering",
  "machine learning that scales", 
  "AI systems that work",
  "production-ready ML",
  "reliable AI infrastructure"
]

export function RotatingText() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % rotatingTexts.length)
        setIsVisible(true)
      }, 300) // Half of transition duration
      
    }, 3000) // Change text every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <span 
      className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {rotatingTexts[currentIndex]}
    </span>
  )
} 