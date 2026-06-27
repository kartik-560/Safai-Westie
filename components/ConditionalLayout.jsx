'use client'

import { usePathname } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function ConditionalLayout({ children }) {
  const pathname = usePathname()
  
  // Check if the current route is exactly '/demo'
  // You can also use pathname.startsWith('/demo') if you have sub-routes like /demo/dashboard
  const isDemoRoute = pathname === '/demo'

  return (
    <>
      {!isDemoRoute && <Navigation />}
      {children}
      {!isDemoRoute && <Footer />}
    </>
  )
}