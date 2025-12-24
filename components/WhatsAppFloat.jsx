'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppFloat() {
  useEffect(() => {
    gsap.to('#wa-btn', {
      scale: 1.15,
      repeat: -1,
      yoyo: true,
      duration: 1,
      ease: 'sine.inOut'
    })
  }, [])

   const message = encodeURIComponent(
    "Hi! I'm interested in saafAI and would like to know more about your AI-driven hygiene rating system."
  )

  return (
    <a
      href={`https://wa.me/919356851845?text=${message}`}
      target='_blank'
      id="wa-btn"
      className="fixed bottom-10 right-10 bg-[#25D366] w-[55px] h-[55px] 
                 rounded-full flex justify-center items-center text-white 
                 shadow-whatsapp z-[2000] hover:scale-110 transition-transform"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="w-10 h-10" />
    </a>
  )
}
