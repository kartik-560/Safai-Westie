'use client'

import { Sparkles, Menu, X } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navLinks = [
    {
      name: 'Solutions',
      id: 'solutions',
      hasDropdown: true,
      dropdownItems: [
        { name: 'For Government', href: '/gov' },
        { name: 'For Facility Management', href: '/facility' }
      ]
    },
    { name: 'About Us', href: '/about', id: 'about' },
    { name: 'Contact', href: '/contact', id: 'contact' },
  ]

  const isActive = (href) => pathname === href

  // Handle Find Toilet button click - KEEP THIS AS IS
  const handleFindToiletClick = (e) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)

    if (pathname === '/') {
      // Already on homepage - just scroll to locator
      const element = document.getElementById('locator')
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
        window.history.pushState(null, '', '/#locator')
      }
    } else {
      // On different page - navigate to home then scroll to locator
      router.push('/#locator')
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

  // Handle Home/Logo click
  const handleHomeClick = (e) => {
    setIsMobileMenuOpen(false)

    if (pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Handle navigation link click - scroll to top
  const handleNavClick = () => {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 0)
  }

  return (
    <nav className="fixed top-0 w-full px-[5%] py-5 flex justify-between items-center 
                z-[1000] 
                 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950
                 transition-colors backdrop-blur-md">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          onClick={handleHomeClick}
          className="hover:opacity-80 transition-opacity duration-200"
        >
          <img
            src="/logo.png"
            alt="SaafAI"
            className="h-7 sm:h-8 md:h-7 lg:h-8 w-auto"
          />
        </Link>

        <Link
          href="/"
          onClick={handleHomeClick}
          className="hover:opacity-80 transition-opacity duration-200"
        >
          <img
            src="/Swatcha_bharat1.png"
            alt="Swachh Bharat"
            className="h-12 sm:h-14 md:h-16 lg:h-18 w-auto"
          />
        </Link>

      </div>



      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          link.hasDropdown ? (
            <div key={link.id} className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onMouseEnter={() => setIsDropdownOpen(true)}
                className="font-semibold transition-all duration-200 relative 
                       text-slate-200 hover:text-white flex items-center gap-1"
              >
                {link.name}
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-56 
                         bg-[#1e293b]/95 backdrop-blur-lg
                         border border-slate-700/50 
                         rounded-lg shadow-2xl shadow-black/50 z-50 py-2"
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  {link.dropdownItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      scroll={false}
                      className="block px-4 py-3 text-slate-300 
                             hover:bg-white/5 hover:text-white
                             transition-all duration-200"
                      onClick={() => {
                        setIsDropdownOpen(false)
                        handleNavClick()
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={link.id || link.href}
              href={link.href}
              scroll={false}
              onClick={(e) => {
                if (link.href === '/') {
                  handleHomeClick(e)
                } else {
                  handleNavClick()
                }
              }}
              className={`font-semibold transition-all duration-200 relative
            ${isActive(link.href)
                  ? 'text-white'
                  : 'text-slate-200 hover:text-white'
                }
          `}
            >
              {link.name}
              {isActive(link.href) && (
                <span className="absolute bottom-[-4px] left-0 w-full h-[2px] 
                           bg-gradient-to-r from-[#6C5CE7] to-[#00D2D3]"></span>
              )}
            </Link>
          )
        ))}

        {/* Find Toilet Button - Navigation to Locator Section */}
        <button
          onClick={handleFindToiletClick}
          className="bg-gradient-to-r from-[#6C5CE7] to-[#00D2D3] text-white 
                 border-none px-6 py-2.5 rounded-full font-bold cursor-pointer
                 transition-all duration-300 inline-block no-underline
                 shadow-[0_8px_16px_rgba(108,92,231,0.3)] text-sm
                 hover:translate-y-[-2px] hover:scale-[1.02]
                 hover:shadow-[0_12px_24px_rgba(108,92,231,0.5)]"
        >
          Find a Toilet Near Me
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden text-white hover:text-slate-300 transition-colors duration-200"
      >
        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full 
              bg-[#1e293b] backdrop-blur-lg shadow-2xl 
              md:hidden border-t border-white/10">
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              link.hasDropdown ? (
                <div key={link.id}>
                  <button
                    onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                    className="w-full text-left py-2 font-semibold transition-colors duration-200
                    text-slate-200 hover:text-white flex items-center justify-between"
                  >
                    {link.name}
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${isMobileDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isMobileDropdownOpen && (
                    <div className="pl-4 mt-2 space-y-2 border-l-2 border-slate-700 
                          bg-slate-800/80 rounded-lg p-3 ml-2">
                      {link.dropdownItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          scroll={false}
                          onClick={() => {
                            setIsMobileMenuOpen(false)
                            setIsMobileDropdownOpen(false)
                            handleNavClick()
                          }}
                          className="block py-2 px-3 text-slate-400 hover:text-white 
                           hover:bg-slate-700/50 rounded-md
                           transition-colors duration-200"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.id || link.href}
                  href={link.href}
                  scroll={false}
                  onClick={(e) => {
                    if (link.href === '/') {
                      handleHomeClick(e)
                    } else {
                      setIsMobileMenuOpen(false)
                      handleNavClick()
                    }
                  }}
                  className={`text-left py-2 font-semibold transition-colors duration-200
              ${isActive(link.href)
                      ? 'text-white border-l-4 border-[#6C5CE7] pl-4'
                      : 'text-slate-200 hover:text-white'
                    }
            `}
                >
                  {link.name}
                </Link>
              )
            ))}

            {/* Mobile Find Toilet Button - Navigation to Locator Section */}
            <button
              onClick={handleFindToiletClick}
              className="bg-gradient-to-r from-[#6C5CE7] to-[#00D2D3] text-white 
                 px-6 py-3 rounded-full font-bold text-center mt-4
                 shadow-[0_8px_16px_rgba(108,92,231,0.4)]
                 hover:shadow-[0_12px_24px_rgba(108,92,231,0.6)]
                 transition-all duration-300"
            >
              Find a Toilet Near Me
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
