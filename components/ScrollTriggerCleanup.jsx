'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollTriggerCleanup() {
  const pathname = usePathname()

  useEffect(() => {
    // Kill all ScrollTriggers on route change
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    
    // Refresh after a delay to recalculate positions
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    return () => clearTimeout(timer)
  }, [pathname])

  return null // This component doesn't render anything
}
