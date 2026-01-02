'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function PageLoader() {
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    // Hide loader when page is loaded
    const handleLoad = () => {
      setTimeout(() => {
        setLoading(false)
      }, 500) // Small delay for smooth transition
    }

    // Check if already loaded
    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  // Reset loader on route change
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [pathname])

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center 
                    bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950
                    transition-opacity duration-500"
         style={{ opacity: loading ? 1 : 0 }}>
      <div className="relative">
        <img
          src="/logo.png"
          alt="saafAI"
          className="h-20 sm:h-24 md:h-28 w-auto animate-bounce"
        />

        <div className="absolute inset-0 -m-10 rounded-full 
                        bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 
                        opacity-30 blur-3xl animate-spin"></div>
      </div>
    </div>
  )
}
