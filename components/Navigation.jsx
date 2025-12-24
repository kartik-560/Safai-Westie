'use client'

import { Sparkles } from 'lucide-react'

export default function Navigation() {
  const handleLocate = () => {
    // Scroll to locator section or implement your location logic
    const locatorSection = document.getElementById('locator')
    if (locatorSection) {
      locatorSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="fixed top-0 w-full px-[5%] py-5 flex justify-between items-center 
                    glass z-[1000] border-b border-white/30">
      <div className="flex items-center gap-2.5 font-extrabold text-2xl gradient-text">
        <Sparkles className="text-primary-purple" />
        saafAI
      </div>
      <div className="nav-links">
        <button
          onClick={handleLocate}
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
    </nav>
  )
}
