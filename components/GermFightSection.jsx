'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function GermFightSection() {
  const sectionRef = useRef(null)
  const germsRef = useRef([])

  useEffect(() => {
    // Animate germs when section comes into view
    germsRef.current.forEach((germ, i) => {
      if (germ) {
        gsap.to(germ, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
          opacity: 1,
          scale: 1.3,
          x: i % 2 === 0 ? 20 : -20,
          y: i % 2 === 0 ? -20 : 20,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2,
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const addGermRef = (el) => {
    if (el && !germsRef.current.includes(el)) {
      germsRef.current.push(el)
    }
  }

  return (
    <section
      ref={sectionRef}
      id="germFight"
      className="relative min-h-[400px] overflow-hidden py-24 px-5 text-center"
    >
      <span
        className="inline-block bg-[#6C5CE7]/10 text-[#6C5CE7] px-4 py-1.5 
                   rounded-full font-bold text-xs uppercase tracking-wide mb-5"
      >
        How It Works
      </span>
      
      <h2 className="text-[2.5rem] font-bold mb-3 text-[#2D3436]">
        AI vs Germs
      </h2>
      
      <p className="text-[#636e72] text-lg mb-12">
        Cleanliness is verified — not assumed.
      </p>

      {/* Germ Emojis */}
      <div
        ref={addGermRef}
        className="absolute top-[40%] left-[25%] text-6xl opacity-0
                   filter drop-shadow-[0_5px_10px_rgba(0,0,0,0.1)]"
        style={{ fontSize: '2.5rem' }}
      >
        🦠
      </div>
      
      <div
        ref={addGermRef}
        className="absolute top-[60%] left-[50%] text-6xl opacity-0
                   filter drop-shadow-[0_5px_10px_rgba(0,0,0,0.1)]"
        style={{ fontSize: '2.5rem' }}
      >
        🦠
      </div>
      
      <div
        ref={addGermRef}
        className="absolute top-[45%] left-[75%] text-6xl opacity-0
                   filter drop-shadow-[0_5px_10px_rgba(0,0,0,0.1)]"
        style={{ fontSize: '2.5rem' }}
      >
        🦠
      </div>
      
      <div
        ref={addGermRef}
        className="absolute top-[70%] left-[35%] text-6xl opacity-0
                   filter drop-shadow-[0_5px_10px_rgba(0,0,0,0.1)]"
        style={{ fontSize: '2.5rem' }}
      >
        🦠
      </div>
    </section>
  )
}
