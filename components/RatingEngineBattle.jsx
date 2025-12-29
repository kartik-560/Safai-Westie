'use client'

import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function RatingEngineBattle() {
  const sectionRef = useRef(null)
  const battleFloRef = useRef(null)
  const rayRef = useRef(null)
  const conveyorRef = useRef(null)
  const arenaRef = useRef(null)
  const scannerRef = useRef(null)
  const currentIndexRef = useRef(0)
  const toiletItemsRef = useRef([])
  const animationStartedRef = useRef(false)

  const toilets = [
    { status: 'clean', icon: '🚽', score: '9.8', badgeColor: 'bg-gradient-to-r from-[#6C5CE7] to-[#00D2D3]' },
    { status: 'soiled', icon: '💩', germs: true, score: '2.1', badgeColor: 'bg-[#e17055]' },
    { status: 'clean', icon: '🚽', score: '9.2', badgeColor: 'bg-gradient-to-r from-[#6C5CE7] to-[#00D2D3]' },
    { status: 'soiled', icon: '💩', germs: true, score: '1.5', badgeColor: 'bg-[#e17055]' },
  ]

  const shootStarsAtCenter = useCallback(() => {
    const arena = arenaRef.current
    if (!arena) return

    for (let i = 0; i < 3; i++) {
      const star = document.createElement('div')
      star.innerHTML = '⭐'
      star.style.position = 'absolute'
      star.style.fontSize = '2.5rem'
      star.style.zIndex = '30'
      star.style.pointerEvents = 'none'
      star.style.filter = 'drop-shadow(0 0 10px rgba(255, 217, 61, 0.8))'
      star.style.left = '50%'
      star.style.top = '110px'
      star.style.transform = 'translateX(-50%)'
      
      arena.appendChild(star)
      
      gsap.fromTo(star, 
        {
          opacity: 0,
          scale: 0.2,
          y: 0
        },
        {
          opacity: 1,
          y: 180,
          x: (i - 1) * 40,
          rotation: 1080,
          scale: 1.2,
          duration: 0.6,
          delay: i * 0.1,
          ease: 'back.out(1.2)',
          onComplete: () => {
            gsap.to(star, {
              opacity: 0,
              scale: 0,
              y: '+=20',
              delay: 0.5,
              onComplete: () => star.remove()
            })
          }
        }
      )
    }
  }, [])

  const rejectToilet = useCallback((targetElement) => {
    if (!targetElement) return
    
    gsap.to(targetElement, {
      x: '+=12',
      rotation: 6,
      duration: 0.07,
      repeat: 7,
      yoyo: true,
      onComplete: () => {
        gsap.to(targetElement, {
          opacity: 0.1,
          scale: 0.9,
          duration: 0.6
        })
      }
    })
  }, [])

  const processNext = useCallback(() => {
    if (!animationStartedRef.current) return
    
    const currentIndex = currentIndexRef.current
    const item = toiletItemsRef.current[currentIndex]
    const arena = arenaRef.current
    const conveyor = conveyorRef.current
    const ray = rayRef.current
    
    if (!item || !arena || !conveyor || !ray) {
      console.warn('Missing refs for animation')
      return
    }

    const arenaRect = arena.getBoundingClientRect()
    const targetX = (arenaRect.width / 2) - (currentIndex * 300) - 90

    gsap.to(conveyor, {
      x: targetX,
      duration: 1.2,
      ease: 'power2.inOut',
      onComplete: () => {
        // Make current item active
        toiletItemsRef.current.forEach((el, i) => {
          if (el) {
            gsap.to(el, { opacity: i === currentIndex ? 1 : 0.2, duration: 0.4 })
          }
        })

        // Scan animation
        gsap.timeline()
          .to(ray, {
            opacity: 0.6,
            height: '200px',
            duration: 0.4
          })
          .to(ray, {
            opacity: 0,
            height: 0,
            duration: 0.2,
            delay: 0.4,
            onComplete: () => {
              if (toilets[currentIndex].status === 'clean') {
                shootStarsAtCenter()
              } else {
                rejectToilet(item)
              }

              currentIndexRef.current = (currentIndexRef.current + 1) % toilets.length
              
              if (animationStartedRef.current) {
                setTimeout(processNext, 2500)
              }
            }
          })
      }
    })
  }, [toilets, shootStarsAtCenter, rejectToilet])

  useEffect(() => {
    // Reset state on mount
    currentIndexRef.current = 0
    animationStartedRef.current = false

    // Wait for DOM to be ready
    const initTimer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Floating animation for Flo
        if (battleFloRef.current) {
          gsap.to(battleFloRef.current, {
            y: -15,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
          })
        }

        // Start battle animation on scroll
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 60%',
          onEnter: () => {
            if (!animationStartedRef.current) {
              animationStartedRef.current = true
              setTimeout(() => {
                processNext()
              }, 500)
            }
          },
          once: true
        })
      }, sectionRef)

      return () => {
        animationStartedRef.current = false
        ctx.revert()
      }
    }, 100)

    return () => {
      clearTimeout(initTimer)
      animationStartedRef.current = false
    }
  }, [processNext])

  return (
    <section
      ref={sectionRef}
      id="battle"
      className="py-24 px-5 text-center"
    >
      <span
        className="inline-block bg-[#6C5CE7]/10 text-[#6C5CE7] px-4 py-1.5 
                   rounded-full font-bold text-xs uppercase tracking-wide mb-5"
      >
        AI in Action
      </span>

      <h2 className="text-[2.5rem] font-bold mb-5 text-[#2D3436]">
        The Rating Engine Battle
      </h2>

      <p className="text-[#636e72] text-lg mb-10">
        How Flo distinguishes "Public" from "Pristine".
      </p>

      {/* Battle Arena */}
      <div 
        ref={arenaRef}
        className="battle-arena relative h-[500px] bg-white rounded-[40px] mx-auto max-w-[1000px] 
                   overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.05)] flex flex-col 
                   items-center justify-between p-10"
      >
        {/* Battle Flo */}
        <div
          ref={battleFloRef}
          className="w-[100px] h-[100px] relative z-20 top-5"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="#2D3436" />
            <rect x="20" y="35" width="60" height="20" rx="10" fill="#fff" />
            <circle cx="40" cy="45" r="4" fill="#000" />
            <circle cx="60" cy="45" r="4" fill="#000" />
            <path d="M15 35 L85 35 L85 40 L15 40 Z" fill="#6C5CE7" />
          </svg>

          {/* Mobile Scanner Device */}
          <div 
            ref={scannerRef}
            className="absolute -bottom-[5px] -right-[10px] w-[30px] h-[50px] bg-[#2D3436] 
                       border-2 border-white rounded-[5px] flex items-center justify-center z-[21]"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="12" 
              height="12" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#00D2D3" 
              strokeWidth="2"
            >
              <path d="M3 7V5a2 2 0 0 1 2-2h2" />
              <path d="M17 3h2a2 2 0 0 1 2 2v2" />
              <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
              <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
            </svg>
          </div>
        </div>

        {/* Scanner Ray */}
        <div
          ref={rayRef}
          className="absolute w-[6px] bg-gradient-to-b from-[#00D2D3] to-transparent 
                     h-0 top-[140px] left-1/2 -translate-x-1/2 opacity-0 z-10 
                     shadow-[0_0_20px_#00D2D3] rounded-[3px]"
        />

        {/* Toilet Conveyor Belt */}
        <div className="absolute bottom-20 whitespace-nowrap">
          <div
            ref={conveyorRef}
            className="flex"
            style={{ gap: '120px' }}
          >
            {toilets.map((toilet, index) => (
              <div
                key={index}
                ref={(el) => (toiletItemsRef.current[index] = el)}
                className="flex flex-col items-center gap-[15px] w-[180px] opacity-20 
                           transition-opacity duration-400 relative"
              >
                {/* Germs for soiled toilets */}
                {toilet.germs && (
                  <>
                    <div className="absolute -top-2 -left-8 text-2xl animate-pulse">
                      🦠
                    </div>
                    <div className="absolute -top-4 -right-6 text-xl animate-pulse" style={{ animationDelay: '0.3s' }}>
                      🦠
                    </div>
                    <div className="absolute top-2 -right-10 text-xl animate-pulse" style={{ animationDelay: '0.6s' }}>
                      🦠
                    </div>
                  </>
                )}
                
                <div
                  className="text-[5rem] transition-all duration-500 z-[5]"
                  style={{
                    filter: toilet.status === 'soiled' 
                      ? 'grayscale(0) sepia(0.8) hue-rotate(-50deg)' 
                      : 'grayscale(0) drop-shadow(0 0 15px rgba(0, 210, 211, 0.3))'
                  }}
                >
                  {toilet.icon}
                </div>
                <span
                  className={`${toilet.badgeColor} text-white px-[14px] py-[5px] rounded-[10px] 
                             text-[0.8rem] font-bold inline-block`}
                >
                  {toilet.score} SCORE
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
