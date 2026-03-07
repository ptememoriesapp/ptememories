'use client'
// src/components/PageProgress.jsx
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function PageProgress() {
  const pathname = usePathname()
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const timer = useRef(null)
  const prev = useRef(pathname)

  useEffect(() => {
    if (prev.current === pathname) return
    prev.current = pathname

    // Clear any existing timers
    clearTimeout(timer.current)

    // Start bar
    setProgress(0)
    setVisible(true)

    // Animate to near-complete quickly
    requestAnimationFrame(() => {
      setProgress(70)
    })

    // Finish after a short delay (page has loaded)
    timer.current = setTimeout(() => {
      setProgress(100)
      // Hide after fade-out
      setTimeout(() => {
        setVisible(false)
        setProgress(0)
      }, 400)
    }, 300)

    return () => clearTimeout(timer.current)
  }, [pathname])

  if (!visible && progress === 0) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        height: '3px',
        background: 'transparent',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #4F46E5, #818CF8)',
          borderRadius: '0 2px 2px 0',
          transition: progress === 100
            ? 'width 0.2s ease, opacity 0.3s ease 0.1s'
            : 'width 0.4s cubic-bezier(0.1, 0.8, 0.2, 1)',
          opacity: progress === 100 ? 0 : 1,
          boxShadow: '0 0 8px rgba(99, 102, 241, 0.6)',
        }}
      />
    </div>
  )
}
