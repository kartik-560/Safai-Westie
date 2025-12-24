'use client'

import { Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="px-[5%] py-20 bg-secondary text-white text-center">
      <div className="flex items-center justify-center gap-2.5 mb-8">
        <Sparkles className="text-primary-purple" />
        <span className="font-extrabold text-2xl gradient-text">
          saafAI
        </span>
      </div>

      <p className="opacity-70 max-w-[600px] mx-auto mb-10 leading-relaxed">
        redefining how India experiences public toilets
      </p>

      <div className="border-t border-white/10 pt-8">
        <p>© 2025 saafAI | A Proud Swachh Bharat Partner</p>
      </div>
    </footer>
  )
}
