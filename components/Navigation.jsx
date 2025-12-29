'use client'

import { Sparkles, Menu, X } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (href) => pathname === href

  // Handle Find Toilet button click
  const handleFindToiletClick = (e) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)

    if (pathname === '/') {
      // Already on home page, just scroll
      const element = document.getElementById('locator')
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
        window.history.pushState(null, '', '/#locator')
      }
    } else {
      // On different page, navigate to home then scroll
      router.push('/')
      setTimeout(() => {
        const element = document.getElementById('locator')
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 300)
    }
  }

  // Handle Home/Logo click - scroll to top
  const handleHomeClick = (e) => {
    setIsMobileMenuOpen(false)

    if (pathname === '/') {
      // Already on home page, scroll to top
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    // If not on home page, let Next.js Link handle normal navigation
  }

  return (
    <nav className="fixed top-0 w-full px-[5%] py-5 flex justify-between items-center 
                    glass z-[1000] border-b border-white/30">
      <Link
        href="/"
        onClick={handleHomeClick}
        className="flex items-center gap-2.5 font-extrabold text-2xl gradient-text cursor-pointer"
      >
        <Sparkles className="text-primary-purple" />
        saafAI
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={link.href === '/' ? handleHomeClick : undefined}
            className={`font-semibold transition-all duration-200 relative
              ${isActive(link.href)
                ? 'text-primary-purple'
                : 'text-gray-700 hover:text-primary-purple'
              }
            `}
          >
            {link.name}
            {isActive(link.href) && (
              <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-primary-purple"></span>
            )}
          </Link>
        ))}

        <button
          onClick={handleFindToiletClick}
          className="bg-gradient-to-r from-[#6C5CE7] to-[#00D2D3] text-white 
                     border-none px-6 py-2.5 rounded-full font-bold cursor-pointer
                     transition-all duration-300 inline-block no-underline
                     shadow-[0_8px_16px_rgba(108,92,231,0.2)] text-sm
                     hover:translate-y-[-2px] hover:scale-[1.02]
                     hover:shadow-[0_12px_24px_rgba(108,92,231,0.3)]"
        >
          Find a Toilet Near Me
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden text-gray-700 hover:text-primary-purple"
      >
        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg shadow-lg 
                        md:hidden border-t border-gray-200">
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={link.href === '/' ? handleHomeClick : () => setIsMobileMenuOpen(false)}
                className={`text-left py-2 font-semibold transition-colors duration-200
                  ${isActive(link.href)
                    ? 'text-primary-purple border-l-4 border-primary-purple pl-4'
                    : 'text-gray-700 hover:text-primary-purple'
                  }
                `}
              >
                {link.name}
              </Link>
            ))}

            <button
              onClick={handleFindToiletClick}
              className="bg-gradient-to-r from-[#6C5CE7] to-[#00D2D3] text-white 
                         px-6 py-3 rounded-full font-bold text-center mt-4
                         shadow-[0_8px_16px_rgba(108,92,231,0.2)]"
            >
              Find a Toilet Near Me
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
