'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function HowSaafAIHelpsSection() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Clear any existing animations
    cardsRef.current.forEach((card) => {
      if (card) {
        gsap.set(card, { clearProps: 'all' })
      }
    })

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 50,
              scale: 0.9,
            },
            {
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none none',
                once: true, // Only animate once
              },
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: 'power3.out',
              delay: i * 0.2,
            }
          )
        }
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [mounted])

  const addCardRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el)
    }
  }

  const features = [
    {
      icon: '🔍',
      title: 'Find toilets with confidence',
      description: 'Search nearby public toilets, check their hygiene scores, and choose the cleanest option — no uncertainty, no stress.',
    },
    {
      icon: '⭐',
      title: 'You rate what you see',
      description: 'After using a toilet, give a quick hygiene rating — no long forms, just one simple tap.',
    },
    {
      icon: '✓',
      title: 'Hygiene scores you can trust',
      description: 'Your rating, along with other citizen inputs and smart verification, helps create a hygiene score that reflects the real condition on the ground.',
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="howItHelps"
      className="relative overflow-hidden py-24 px-5 text-center bg-gradient-to-br from-[#E8F8F5] via-[#F0FDFA] to-[#E0F2FE]"
    >
      <span
        className="inline-block bg-gradient-to-r from-blue-600/10 to-cyan-500/10 
               text-transparent bg-clip-text font-bold text-xs uppercase tracking-wide mb-5
               border border-blue-500/20 px-4 py-1.5 rounded-full"
      >
        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
          How It Works
        </span>
      </span>

      <h2 className="text-[2.5rem] font-bold mb-3 text-[#2D3436]">
        How SaafAI Helps You
      </h2>

      <p className="text-[#636e72] text-lg mb-12 max-w-2xl mx-auto">
        Your feedback doesn't disappear — it helps make toilets better for everyone.
      </p>

      {/* Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {features.map((feature, index) => (
          <div
            key={index}
            ref={addCardRef}
            className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 
             border border-blue-200/30
             shadow-[0_4px_20px_rgba(59,130,246,0.08)]
             hover:shadow-[0_12px_40px_rgba(6,182,212,0.25)]
             hover:-translate-y-2 hover:scale-[1.02]
             transition-all duration-500 ease-out
             overflow-hidden cursor-pointer
             before:absolute before:inset-0 
             before:bg-gradient-to-br before:from-blue-500/5 before:via-cyan-400/5 before:to-transparent
             before:opacity-0 hover:before:opacity-100
             before:transition-opacity before:duration-500
             opacity-100"
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Animated water waves background on hover */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30
                 bg-gradient-to-br from-cyan-200/30 via-blue-200/30 to-cyan-300/30
                 transition-opacity duration-500 animate-wave"></div>

            {/* Animated border glow on hover */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100
                 bg-cyan-200
                 blur-xl -z-10 transition-opacity duration-500"></div>

            {/* Icon with hover animation */}
            <div className="relative text-7xl mb-6 mt-6
                 group-hover:scale-110 group-hover:-rotate-6
                 transition-all duration-500 ease-out
                 filter drop-shadow-lg z-10">
              {feature.icon}
            </div>

            {/* Title */}
            <h3 className="relative text-xl font-bold text-[#2D3436] mb-4
                group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-500
                group-hover:text-transparent group-hover:bg-clip-text
                transition-all duration-300 z-10">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="relative text-[#636e72] text-base leading-relaxed
               group-hover:text-[#2D3436]
               transition-colors duration-300 z-10">
              {feature.description}
            </p>

            {/* Bottom accent line with gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-1 
                 bg-gradient-to-r from-blue-600 via-cyan-400 to-cyan-500
                 transform scale-x-0 group-hover:scale-x-100
                 transition-transform duration-500 ease-out
                 rounded-b-3xl z-10"></div>
          </div>
        ))}
      </div>
    </section>
  )
}
