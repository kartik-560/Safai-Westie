// 'use client'

// import { useEffect, useRef } from 'react'
// import MissionCard from './MissionCard'
// import { Target, Eye, Zap, Award } from 'lucide-react'

// export default function MovementSection() {
//   const cardsRef = useRef([])

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry, index) => {
//           if (entry.isIntersecting) {
//             setTimeout(() => {
//               entry.target.classList.add('visible')
//             }, index * 200)
//           }
//         })
//       },
//       { threshold: 0.1 }
//     )

//     cardsRef.current.forEach((card) => {
//       if (card) observer.observe(card)
//     })

//     return () => observer.disconnect()
//   }, [])

//   const missionData = [
//     {
//       icon: <Target className="w-12 h-12" style={{ color: '#6C5CE7' }} />,
//       title: 'Our Mission',
//       description: 'To ensure every public toilet meets a minimum hygiene standard by making cleanliness transparent, verifiable, and continuously monitored using AI.'
//     },
//     {
//       icon: <Eye className="w-12 h-12" style={{ color: '#00D2D3' }} />,
//       title: 'Our Vision',
//       description: 'A future where citizens can trust public washrooms as much as any private facility — without uncertainty, discomfort, or compromise.'
//     },
//     {
//       icon: <Zap className="w-12 h-12" style={{ color: '#ff9800' }} />,
//       title: 'AI Hygiene Score',
//       description: 'Our AI model analyzes images and structured inputs to generate a standardized toilet hygiene score — reducing subjectivity and enabling real-time sanitation insights.'
//     }
//   ]

//   return (
//     <section 
//       id="mission"
//       className="px-[5%] py-24 bg-gradient-to-b from-emerald-50 via-sky-50 to-white "
//     >
//       <div className="text-center max-w-[800px] mx-auto">
//         <span className="inline-block bg-[#6C5CE7]/10 text-[#6C5CE7] px-4 py-2 
//                          rounded-[20px] font-extrabold text-[0.8rem] uppercase 
//                          tracking-wider mb-5">
//           The Movement
//         </span>
//         <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold mb-5 leading-tight text-[#2D3436]">
//           Making Public Toilets Predictably Clean
//         </h2>
//         <p className="text-[#636e72] text-lg leading-relaxed">
//           saafAI bridges the gap between availability and usability of public washrooms.
//           By combining AI hygiene scoring with citizen feedback, we make sanitation visible,
//           measurable, and accountable.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
//         {missionData.map((item, index) => (
//           <div
//             key={index}
//             ref={(el) => (cardsRef.current[index] = el)}
//             className="card-fade-in"
//           >
//             <MissionCard
//               icon={item.icon}
//               title={item.title}
//               description={item.description}
//             />
//           </div>
//         ))}
//       </div>

//       <div className="mt-16 p-8 bg-white rounded-[20px] shadow-md
//                       flex items-center justify-center gap-5 flex-wrap">
//         <div className="flex items-center gap-4">
//           <Award className="text-[#6C5CE7] w-10 h-10" />
//           <h4 className="text-xl font-normal text-[#2D3436]">
//             Aligned with the <strong className="font-bold">Swachh Bharat Mission</strong>
//           </h4>
//         </div>
//         <p className="text-[#636e72] font-semibold">
//           | Supporting India&apos;s sanitation and public health goals
//         </p>
//       </div>
//     </section>
//   )
// }

'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function MissionSection() {
  const statsRef = useRef(null)
  const countRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the count-up for facilities
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.to(countRef.current, {
            innerText: 10000,
            duration: 2,
            snap: { innerText: 1 },
            ease: 'power1.out',
            onUpdate: function () {
              if (countRef.current) {
                const value = Math.round(this.targets()[0].innerText)
                countRef.current.innerText = value.toLocaleString()
              }
            }
          })
        },
        once: true
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="py-16 md:py-24 px-5 md:px-10 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <span className="inline-block bg-[#6C5CE7]/10 text-[#6C5CE7] px-4 py-1.5 
                           rounded-full font-bold text-xs uppercase tracking-wide">
              OUR MISSION
            </span>

            <h2 className="text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-bold 
                          text-[#2D3436] leading-tight">
              Built for Dignity, Trust,<br />and Everyday Use
            </h2>

            <p className="text-[#636e72] text-lg md:text-xl leading-relaxed max-w-xl">
              SaafAI was created with one simple belief — using a public toilet
              should never feel uncertain or uncomfortable. In a world of
              digital transparency, we focus on making cleanliness visible and
              trustworthy.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {/* Transparency */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 
                               flex items-center justify-center mt-0.5">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[#2D3436] text-base mb-1">
                    Transparency
                  </h3>
                  <p className="text-[#636e72] text-sm">
                    Data you can actually trust.
                  </p>
                </div>
              </div>

              {/* Dignity */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 
                               flex items-center justify-center mt-0.5">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[#2D3436] text-base mb-1">
                    Dignity
                  </h3>
                  <p className="text-[#636e72] text-sm">
                    Safe spaces for everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Stats Card - Square/Compact Design */}
          <div className="flex justify-center lg:justify-end">
            <div
              ref={statsRef}
              className="relative w-full max-w-[450px] aspect-square"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#6C5CE7] to-[#5B4CD3] 
                            rounded-[50px] shadow-[0_25px_70px_rgba(108,92,231,0.35)] 
                            flex flex-col items-center justify-center text-white 
                            overflow-hidden relative p-8">

                {/* Decorative Shield Icon */}
                <div className="absolute bottom-6 right-6 opacity-[0.15]">
                  <svg
                    width="160"
                    height="160"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                </div>

                {/* Stats Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[350px] md:min-h-[400px] lg:min-h-[450px]">
                  <div className="text-[4.5rem] md:text-[5.5rem] font-bold 
                 leading-none mb-5 tracking-tight">
                    <span ref={countRef}>0</span>+
                  </div>
                  <div className="text-lg md:text-xl font-semibold tracking-[0.2em] 
                 uppercase opacity-90">
                    FACILITIES MAPPED
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

