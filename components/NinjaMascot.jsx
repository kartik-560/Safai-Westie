'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function NinjaMascot() {
  const [showSpeech, setShowSpeech] = useState(false)
  const [hasShownInitial, setHasShownInitial] = useState(false)
  const speechRef = useRef(null)
  const eyeRefs = useRef([])

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setShowSpeech(true)
      setHasShownInitial(true)

      if (speechRef.current) {
        gsap.fromTo(
          speechRef.current,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
        )
      }

      const hideTimer = setTimeout(() => {
        if (speechRef.current) {
          gsap.to(speechRef.current, {
            opacity: 0,
            x: -10,
            duration: 0.3,
            onComplete: () => setShowSpeech(false),
          })
        }
      }, 5000)

      return () => clearTimeout(hideTimer)
    }, 1500)

    return () => clearTimeout(initialTimer)
  }, [])

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      eyeRefs.current.forEach((eye) => {
        if (eye) {
          gsap.to(eye, {
            scaleY: 0.1,
            duration: 0.1,
            ease: 'power1.inOut',
            transformOrigin: 'center center',
            onComplete: () => {
              gsap.to(eye, {
                scaleY: 1,
                duration: 0.1,
                ease: 'power1.inOut',
                transformOrigin: 'center center',
              })
            },
          })
        }
      })
    }, 4000)

    return () => clearInterval(blinkInterval)
  }, [])

  useEffect(() => {
    if (showSpeech && hasShownInitial && speechRef.current) {
      gsap.fromTo(
        speechRef.current,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      )
    }
  }, [showSpeech, hasShownInitial])

  const handleNinjaClick = (e) => {
    e.stopPropagation()

    if (!showSpeech) {
      setShowSpeech(true)
    } else {
      gsap.to(speechRef.current, {
        opacity: 0,
        x: -10,
        duration: 0.3,
        onComplete: () => setShowSpeech(false),
      })
    }
  }

  return (
    <div className="relative inline-block mb-10 md:mb-12 z-10">
      <div
        onClick={handleNinjaClick}
        className="w-24 h-24 md:w-32 md:h-32 cursor-pointer relative 
                   drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)]
                   hover:scale-105 transition-transform duration-300"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full pointer-events-auto">
          <circle cx="50" cy="50" r="40" fill="#2D3436" />
          <rect x="20" y="35" width="60" height="20" rx="10" fill="#FFFFFF" />
          <circle
            ref={(el) => (eyeRefs.current[0] = el)}
            className="ninja-eye"
            cx="40"
            cy="45"
            r="4"
            fill="#000"
            style={{ transformOrigin: 'center' }}
          />
          <circle
            ref={(el) => (eyeRefs.current[1] = el)}
            className="ninja-eye"
            cx="60"
            cy="45"
            r="4"
            fill="#000"
            style={{ transformOrigin: 'center' }}
          />
          <path d="M15 35 L85 35 L85 40 L15 40 Z" fill="#6C5CE7" />
        </svg>
      </div>

      {showSpeech && (
        <div
          ref={speechRef}
          className="absolute left-[150px] top-[10px] bg-white p-5 px-6
                     rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]
                     w-[320px] text-[0.9rem] shadow-[0_15px_40px_rgba(0,0,0,0.12)]
                     border border-black/5 z-50 text-left
                     before:content-[''] before:absolute before:left-[-10px] 
                     before:top-[20px] before:border-t-[10px] before:border-t-transparent
                     before:border-b-[10px] before:border-b-transparent
                     before:border-r-[10px] before:border-r-white
                     lg:left-[150px] lg:top-[10px]
                     max-lg:left-1/2 max-lg:-translate-x-1/2 max-lg:top-[135px]
                     max-lg:rounded-[20px] max-lg:before:hidden max-lg:w-[280px]"
        >
          <strong className="text-[#2D3436] block mb-2">Hey, I&apos;m Flo!</strong>
          I use AI to scan public toilets. If you see me shooting ninja stars,
          it means the washroom is verified clean!
        </div>
      )}
    </div>
  )
}
