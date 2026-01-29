'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TrendingUp, Zap, ThumbsUp } from 'lucide-react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Eye, Search, CheckCircle, BarChart3 } from 'lucide-react'
import { useRouter } from "next/navigation";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

export default function ULBPage() {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const router = useRouter();

  useEffect(() => {
    // Force ScrollTrigger to use window scroll, not create its own
    ScrollTrigger.config({
      limitCallbacks: true,
      syncInterval: 0
    })

    // Ensure no element creates its own scroll context
    document.body.style.overflow = 'visible'

    return () => {
      document.body.style.overflow = ''
    }
  }, [])
  const sectionRefs = useRef([])
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const solutionRef = useRef(null)
  const sanitationRef = useRef(null)
  const sanitationInView = useInView(sanitationRef, { once: true, amount: 0.1 })
  const card1Ref = useRef(null)
  const card2Ref = useRef(null)
  const card3Ref = useRef(null)
  const card4Ref = useRef(null)


  // Card 1 scroll tracking
  const { scrollYProgress: progress1 } = useScroll({
    target: card1Ref,
    offset: ["start end", "end center"]
  })
  const x1 = useTransform(progress1, [0, 1], isDesktop ? [-300, 0] : [0, 0])
  const opacity1 = useTransform(progress1, [0, 0.5, 1], [0, 0.5, 1])

  // Card 2 scroll tracking
  const { scrollYProgress: progress2 } = useScroll({
    target: card2Ref,
    offset: ["start end", "end center"]
  })
  const x2 = useTransform(progress2, [0, 1], isDesktop ? [300, 0] : [0, 0])
  const opacity2 = useTransform(progress2, [0, 0.5, 1], [0, 0.5, 1])

  // Card 3 scroll tracking
  const { scrollYProgress: progress3 } = useScroll({
    target: card3Ref,
    offset: ["start end", "end center"]
  })
  const x3 = useTransform(progress3, [0, 1], isDesktop ? [-300, 0] : [0, 0])
  const opacity3 = useTransform(progress3, [0, 0.5, 1], [0, 0.5, 1])

  // Card 4 scroll tracking
  const { scrollYProgress: progress4 } = useScroll({
    target: card4Ref,
    offset: ["start end", "end center"]
  })
  const x4 = useTransform(progress4, [0, 1], isDesktop ? [300, 0] : [0, 0])
  const opacity4 = useTransform(progress4, [0, 0.5, 1], [0, 0.5, 1])

  useEffect(() => {
    sectionRefs.current.forEach((section) => {
      if (section) {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          }
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const addSectionRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el)
    }
  }


  return (
    <main className="w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">

      {/* Hero Section */}
      <section className="relative w-full 
                    flex items-center justify-center 
                    px-5 sm:px-6 md:px-8 lg:px-12
                    pt-28 sm:pt-32 md:pt-36 lg:pt-32
                    pb-8 sm:pb-12 md:pb-16 lg:pb-20
                    overflow-hidden">
        <div className="max-w-6xl mx-auto text-center w-full" ref={addSectionRef}>

          <h1 className="text-[1.75rem] leading-[2.2rem] 
                   sm:text-4xl sm:leading-[2.8rem]
                   md:text-5xl md:leading-[3.5rem]
                   lg:text-6xl lg:leading-tight
                   font-bold 
                   mb-4 sm:mb-5 md:mb-6 lg:mb-7
                   text-white
                   px-2">
            Public toilet hygiene requires{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
              continuous visibility
            </span>{' '}
            — not occasional checks.
          </h1>

          <p className="text-sm leading-relaxed
                  sm:text-base sm:leading-relaxed
                  md:text-lg md:leading-relaxed
                  lg:text-xl lg:leading-relaxed
                  text-[#9ca3af] 
                  max-w-[95%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl
                  mx-auto 
                  mb-5 sm:mb-6 md:mb-7 lg:mb-8
                  px-2">
            SaafAI helps urban local bodies understand how public toilets are actually being
            maintained on the ground, using verified hygiene scores instead of fragmented
            reports.
          </p>

          <button
            onClick={() => router.push("/contact")}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white 
                 font-bold 
                 py-3 px-5 
                 sm:py-3.5 sm:px-6 
                 md:py-4 md:px-8
                 text-sm sm:text-base md:text-lg
                 rounded-full 
                 hover:shadow-xl transition-all duration-300 
                 hover:scale-105 active:scale-95
                 inline-flex items-center justify-center">
            Request a walkthrough for your city →
          </button>

        </div>
      </section>

      {/* Sanitation Reality Section */}
      <section className="w-full py-10 md:py-24 px-4 md:px-5 overflow-hidden" ref={sanitationRef}>
        <div className="max-w-6xl mx-auto">
          {/* Header with fade-in animation */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={sanitationInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            We understand the reality of city sanitation.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={sanitationInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-300 mb-12 max-w-3xl"
          >
            Managing hygiene across a growing city isn't just about cleaning—it's about monitoring
            hundreds of moving parts simultaneously.
          </motion.p>

          {/* Obstacles - Dark themed */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={sanitationInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-gradient-to-br from-amber-900/30 to-orange-900/20 
                 border border-amber-700/40 rounded-3xl p-8 mb-12 
                 shadow-[0_8px_32px_rgba(217,119,6,0.15)]
                 backdrop-blur-sm"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 
                        rounded-full flex items-center justify-center mr-4 
                        shadow-lg shadow-amber-500/30">
                <span className="text-white text-2xl">⚠</span>
              </div>
              <h3 className="font-bold text-amber-200 text-xl tracking-wide">
                KEY OBSTACLES FOR ULBS
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={sanitationInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 
                     shadow-lg border border-slate-700/50
                     hover:bg-slate-800/80 hover:border-amber-600/50
                     hover:shadow-xl hover:shadow-amber-500/10
                     hover:-translate-y-1
                     transition-all duration-300 group"
              >
                <h4 className="font-bold text-white mb-2 text-lg 
                         group-hover:text-amber-200 transition-colors duration-300">
                  Geographic Spread
                </h4>
                <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  Hundreds of facilities spread across diverse wards.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={sanitationInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 
                     shadow-lg border border-slate-700/50
                     hover:bg-slate-800/80 hover:border-amber-600/50
                     hover:shadow-xl hover:shadow-amber-500/10
                     hover:-translate-y-1
                     transition-all duration-300 group"
              >
                <h4 className="font-bold text-white mb-2 text-lg 
                         group-hover:text-amber-200 transition-colors duration-300">
                  Vendor Accountability
                </h4>
                <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  Heavy dependence on 3rd-party maintenance operators.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={sanitationInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 
                     shadow-lg border border-slate-700/50
                     hover:bg-slate-800/80 hover:border-amber-600/50
                     hover:shadow-xl hover:shadow-amber-500/10
                     hover:-translate-y-1
                     transition-all duration-300 group"
              >
                <h4 className="font-bold text-white mb-2 text-lg 
                         group-hover:text-amber-200 transition-colors duration-300">
                  Delayed Data
                </h4>
                <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  Manual reporting is often slow, fragmented, or inaccurate.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={sanitationInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 
                     shadow-lg border border-slate-700/50
                     hover:bg-slate-800/80 hover:border-amber-600/50
                     hover:shadow-xl hover:shadow-amber-500/10
                     hover:-translate-y-1
                     transition-all duration-300 group"
              >
                <h4 className="font-bold text-white mb-2 text-lg 
                         group-hover:text-amber-200 transition-colors duration-300">
                  Reactive Posture
                </h4>
                <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  Relying on citizen complaints rather than prevention.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Dashboard Preview - Dark themed */}
          {/* <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={sanitationInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-slate-800/70 backdrop-blur-md rounded-3xl shadow-2xl 
                 shadow-black/50 p-8 border border-slate-700/50
                 hover:border-cyan-500/30 transition-all duration-500"
          >
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-700">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <span className="text-sm font-bold text-transparent bg-gradient-to-r 
                       from-[#6C5CE7] to-[#00D2D3] bg-clip-text">
                CITY HYGIENE DASHBOARD SAMPLE
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={sanitationInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="bg-gradient-to-br from-slate-900/70 to-slate-800/50 
                     rounded-2xl p-6 border border-slate-700/60
                     hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10
                     transition-all duration-300"
              >
                <p className="text-sm font-semibold text-[#00D2D3] mb-2">CITY SCORE</p>
                <p className="text-5xl font-bold bg-gradient-to-r from-[#6C5CE7] to-[#00D2D3] 
                        text-transparent bg-clip-text">
                  7.8
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={sanitationInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="bg-gradient-to-br from-slate-900/70 to-slate-800/50 
                     rounded-2xl p-6 border border-slate-700/60
                     hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10
                     transition-all duration-300"
              >
                <p className="text-sm font-semibold text-[#00D2D3] mb-2">FACILITIES</p>
                <p className="text-5xl font-bold text-white">412</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={sanitationInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="bg-gradient-to-br from-slate-900/70 to-slate-800/50 
                     rounded-2xl p-6 border border-slate-700/60
                     hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10
                     transition-all duration-300"
              >
                <p className="text-sm font-semibold text-[#00D2D3] mb-2">LAST UPDATED</p>
                <p className="text-5xl font-bold text-white">04</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={sanitationInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="bg-gradient-to-r from-[#6C5CE7] to-[#00D2D3] h-4 rounded-full mb-6 
                   shadow-lg shadow-purple-500/30 origin-left"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={sanitationInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 
                   rounded-2xl p-5 flex justify-between items-center 
                   border border-slate-700/50"
            >
              <p className="text-slate-400 italic">"Send fixed manual logs to this address"</p>
              <button className="text-[#00D2D3] hover:text-[#6C5CE7] transition-colors duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div> */}
        </div>
      </section>

      {/* Solution Section with Overflow Fix */}
      <section className="w-full py-16 md:py-24 px-4 md:px-5 overflow-hidden" ref={solutionRef}>
        <motion.div
          className="max-w-6xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-gradient-to-r from-[#6C5CE7]/20 to-[#00D2D3]/20 
   text-transparent bg-clip-text font-bold text-xl uppercase tracking-wide mb-5
   border border-[#6C5CE7]/30 px-4 py-1.5 rounded-full">
            <span className="bg-gradient-to-r from-[#6C5CE7] to-[#00D2D3] text-transparent bg-clip-text">
              Our Solution
            </span>
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            How SaafAI Helps ULBs
          </h2>

          <p className="text-xl text-slate-300">
            Transforming your city's sanitation from uncertainty to data-backed excellence.
          </p>
        </motion.div>

        {/* CRITICAL FIX: Overflow wrapper to prevent horizontal scroll */}
        <div className="w-full overflow-hidden">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Feature 1 - From Left */}
            <motion.div
              ref={card1Ref}
              style={{ x: x1, opacity: opacity1 }}
              className="group relative bg-slate-800/70 backdrop-blur-sm rounded-3xl p-8 
             border border-slate-700/50 shadow-lg
             hover:bg-slate-800/90 hover:border-[#6C5CE7]/50
             hover:shadow-2xl hover:shadow-purple-500/20
             hover:-translate-y-2 transition-all duration-300
             overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#6C5CE7]/10 to-[#00D2D3]/10 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#6C5CE7] to-[#00D2D3] 
                    rounded-2xl flex items-center justify-center mb-6 
                    shadow-lg shadow-purple-500/30
                    group-hover:scale-110 group-hover:rotate-3
                    transition-all duration-300">
                  <Eye className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white 
                   group-hover:text-transparent group-hover:bg-gradient-to-r 
                   group-hover:from-[#6C5CE7] group-hover:to-[#00D2D3] 
                   group-hover:bg-clip-text transition-all duration-300">
                  1. Area-Level Hygiene Visibility
                </h3>
                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 
                  transition-colors duration-300">
                  View hygiene scores across wards, zones, or clusters. Detect systemic issues in specific neighborhoods before they become widespread.
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 
                  bg-gradient-to-r from-[#6C5CE7] to-[#00D2D3]
                  transform scale-x-0 group-hover:scale-x-100
                  transition-transform duration-500 ease-out"></div>
            </motion.div>

            {/* Feature 2 - From Right */}
            <motion.div
              ref={card2Ref}
              style={{ x: x2, opacity: opacity2 }}
              className="group relative bg-slate-800/70 backdrop-blur-sm rounded-3xl p-8 
             border border-slate-700/50 shadow-lg
             hover:bg-slate-800/90 hover:border-[#00D2D3]/50
             hover:shadow-2xl hover:shadow-cyan-500/20
             hover:-translate-y-2 transition-all duration-300
             overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00D2D3]/10 to-[#6C5CE7]/10 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00D2D3] to-[#6C5CE7] 
                    rounded-2xl flex items-center justify-center mb-6 
                    shadow-lg shadow-cyan-500/30
                    group-hover:scale-110 group-hover:rotate-3
                    transition-all duration-300">
                  <Search className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white 
                   group-hover:text-transparent group-hover:bg-gradient-to-r 
                   group-hover:from-[#00D2D3] group-hover:to-[#6C5CE7] 
                   group-hover:bg-clip-text transition-all duration-300">
                  2. Early Identification
                </h3>
                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 
                  transition-colors duration-300">
                  Low or declining scores highlight locations that need immediate attention. Intervene before citizen complaints escalate to social media.
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 
                  bg-gradient-to-r from-[#00D2D3] to-[#6C5CE7]
                  transform scale-x-0 group-hover:scale-x-100
                  transition-transform duration-500 ease-out"></div>
            </motion.div>

            {/* Feature 3 - From Left */}
            <motion.div
              ref={card3Ref}
              style={{ x: x3, opacity: opacity3 }}
              className="group relative bg-slate-800/70 backdrop-blur-sm rounded-3xl p-8 
             border border-slate-700/50 shadow-lg
             hover:bg-slate-800/90 hover:border-[#6C5CE7]/50
             hover:shadow-2xl hover:shadow-purple-500/20
             hover:-translate-y-2 transition-all duration-300
             overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#6C5CE7]/10 to-[#00D2D3]/10 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#6C5CE7] to-[#00D2D3] 
                    rounded-2xl flex items-center justify-center mb-6 
                    shadow-lg shadow-purple-500/30
                    group-hover:scale-110 group-hover:rotate-3
                    transition-all duration-300">
                  <CheckCircle className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white 
                   group-hover:text-transparent group-hover:bg-gradient-to-r 
                   group-hover:from-[#6C5CE7] group-hover:to-[#00D2D3] 
                   group-hover:bg-clip-text transition-all duration-300">
                  3. Accountability Without Micromanagement
                </h3>
                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 
                  transition-colors duration-300">
                  Verification-backed scores create a single, objective "source of truth" for both city officials and private maintenance operators.
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 
                  bg-gradient-to-r from-[#6C5CE7] to-[#00D2D3]
                  transform scale-x-0 group-hover:scale-x-100
                  transition-transform duration-500 ease-out"></div>
            </motion.div>

            {/* Feature 4 - From Right */}
            <motion.div
              ref={card4Ref}
              style={{ x: x4, opacity: opacity4 }}
              className="group relative bg-slate-800/70 backdrop-blur-sm rounded-3xl p-8 
             border border-slate-700/50 shadow-lg
             hover:bg-slate-800/90 hover:border-[#00D2D3]/50
             hover:shadow-2xl hover:shadow-cyan-500/20
             hover:-translate-y-2 transition-all duration-300
             overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00D2D3]/10 to-[#6C5CE7]/10 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00D2D3] to-[#6C5CE7] 
                    rounded-2xl flex items-center justify-center mb-6 
                    shadow-lg shadow-cyan-500/30
                    group-hover:scale-110 group-hover:rotate-3
                    transition-all duration-300">
                  <BarChart3 className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white 
                   group-hover:text-transparent group-hover:bg-gradient-to-r 
                   group-hover:from-[#00D2D3] group-hover:to-[#6C5CE7] 
                   group-hover:bg-clip-text transition-all duration-300">
                  4. Evidence for Reviews and Audits
                </h3>
                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 
                  transition-colors duration-300">
                  Time-stamped, historical hygiene data supports internal reviews and helps prepare for external Swachh Bharat Survekshan or ISO audits.
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 
                  bg-gradient-to-r from-[#00D2D3] to-[#6C5CE7]
                  transform scale-x-0 group-hover:scale-x-100
                  transition-transform duration-500 ease-out"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-16 md:py-24 px-4 md:px-5 overflow-hidden" ref={sectionRef}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Benefit 1 */}
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.5 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -100, scale: 0.5 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              type: "spring",
              stiffness: 200,
              damping: 10
            }}
            className="group relative text-center bg-slate-800/70 backdrop-blur-sm rounded-3xl p-10 
                shadow-[0_4px_20px_rgba(108,92,231,0.2)] 
                border border-slate-700/50
                hover:shadow-[0_24px_48px_rgba(108,92,231,0.6)]
                hover:border-[#6C5CE7]
                hover:-translate-y-3 hover:scale-[1.05]
                transition-all duration-500 ease-out
                overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#6C5CE7] to-[#00D2D3] 
                    opacity-0 group-hover:opacity-20 
                    transition-opacity duration-500"></div>

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#6C5CE7] rounded-full 
                       animate-ping"></div>
              <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-[#00D2D3] rounded-full 
                       animate-ping animation-delay-300"></div>
            </div>

            <div className="relative z-10">
              <div className="w-24 h-24 bg-gradient-to-br from-[#6C5CE7]/20 to-[#00D2D3]/20 
                      rounded-full flex items-center justify-center mx-auto mb-6 
                      shadow-lg shadow-purple-500/30
                      group-hover:shadow-[0_0_30px_rgba(108,92,231,0.8)]
                      group-hover:scale-110 group-hover:rotate-12
                      border-2 border-[#6C5CE7]/30 group-hover:border-[#6C5CE7]
                      transition-all duration-500">
                <TrendingUp
                  size={40}
                  strokeWidth={2.5}
                  className="text-[#6C5CE7] group-hover:text-white 
                       drop-shadow-[0_0_10px_rgba(108,92,231,0.8)]
                       transition-all duration-300"
                />
              </div>
              <p className="text-xs font-bold text-[#00D2D3] uppercase tracking-wider mb-2
                    group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(0,210,211,0.8)]
                    transition-all duration-300">
                PRIORITIZATION
              </p>
              <h3 className="text-3xl font-bold text-white mb-4
                     group-hover:bg-gradient-to-r group-hover:from-[#6C5CE7] group-hover:to-[#00D2D3]
                     group-hover:text-transparent group-hover:bg-clip-text
                     group-hover:drop-shadow-[0_0_20px_rgba(108,92,231,0.8)]
                     transition-all duration-300">
                Better
              </h3>
              <p className="text-slate-400 leading-relaxed 
                     group-hover:text-white 
                     transition-colors duration-300">
                Focus resources where they are needed most.
              </p>

              <div className="mt-6 h-1 w-0 bg-gradient-to-r from-[#6C5CE7] to-[#00D2D3] rounded-full 
                      group-hover:w-full 
                      group-hover:shadow-[0_0_15px_rgba(108,92,231,0.8)]
                      transition-all duration-500 mx-auto"></div>
            </div>

            <div className="absolute -inset-1 bg-gradient-to-br from-[#6C5CE7] to-[#00D2D3] 
                    rounded-3xl opacity-0 group-hover:opacity-40 blur-2xl -z-10
                    transition-opacity duration-500"></div>
          </motion.div>

          {/* Benefit 2 */}
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.5 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -100, scale: 0.5 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              type: "spring",
              stiffness: 200,
              damping: 10
            }}
            className="group relative text-center bg-slate-800/70 backdrop-blur-sm rounded-3xl p-10 
                shadow-[0_4px_20px_rgba(0,210,211,0.2)] 
                border border-slate-700/50
                hover:shadow-[0_24px_48px_rgba(0,210,211,0.6)]
                hover:border-[#00D2D3]
                hover:-translate-y-3 hover:scale-[1.05]
                transition-all duration-500 ease-out
                overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D2D3] to-[#6C5CE7] 
                    opacity-0 group-hover:opacity-20 
                    transition-opacity duration-500"></div>

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-[#00D2D3] rounded-full 
                       animate-ping"></div>
              <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-[#6C5CE7] rounded-full 
                       animate-ping animation-delay-300"></div>
            </div>

            <div className="relative z-10">
              <div className="w-24 h-24 bg-gradient-to-br from-[#00D2D3]/20 to-[#6C5CE7]/20 
                      rounded-full flex items-center justify-center mx-auto mb-6 
                      shadow-lg shadow-cyan-500/30
                      group-hover:shadow-[0_0_30px_rgba(0,210,211,0.8)]
                      group-hover:scale-110 group-hover:rotate-12
                      border-2 border-[#00D2D3]/30 group-hover:border-[#00D2D3]
                      transition-all duration-500">
                <Zap
                  size={40}
                  strokeWidth={2.5}
                  className="text-[#00D2D3] group-hover:text-white 
                       drop-shadow-[0_0_10px_rgba(0,210,211,0.8)]
                       transition-all duration-300"
                />
              </div>
              <p className="text-xs font-bold text-[#6C5CE7] uppercase tracking-wider mb-2
                    group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(108,92,231,0.8)]
                    transition-all duration-300">
                RESPONSE
              </p>
              <h3 className="text-3xl font-bold text-white mb-4
                     group-hover:bg-gradient-to-r group-hover:from-[#00D2D3] group-hover:to-[#6C5CE7]
                     group-hover:text-transparent group-hover:bg-clip-text
                     group-hover:drop-shadow-[0_0_20px_rgba(0,210,211,0.8)]
                     transition-all duration-300">
                Faster
              </h3>
              <p className="text-slate-400 leading-relaxed 
                     group-hover:text-white 
                     transition-colors duration-300">
                Actionable alerts for maintenance teams.
              </p>

              <div className="mt-6 h-1 w-0 bg-gradient-to-r from-[#00D2D3] to-[#6C5CE7] rounded-full 
                      group-hover:w-full 
                      group-hover:shadow-[0_0_15px_rgba(0,210,211,0.8)]
                      transition-all duration-500 mx-auto"></div>
            </div>

            <div className="absolute -inset-1 bg-gradient-to-br from-[#00D2D3] to-[#6C5CE7] 
                    rounded-3xl opacity-0 group-hover:opacity-40 blur-2xl -z-10
                    transition-opacity duration-500"></div>
          </motion.div>

          {/* Benefit 3 */}
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.5 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -100, scale: 0.5 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              type: "spring",
              stiffness: 200,
              damping: 10
            }}
            className="group relative text-center bg-slate-800/70 backdrop-blur-sm rounded-3xl p-10 
                shadow-[0_4px_20px_rgba(108,92,231,0.2)] 
                border border-slate-700/50
                hover:shadow-[0_24px_48px_rgba(108,92,231,0.6)]
                hover:border-[#6C5CE7]
                hover:-translate-y-3 hover:scale-[1.05]
                transition-all duration-500 ease-out
                overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#6C5CE7] to-[#00D2D3] 
                    opacity-0 group-hover:opacity-20 
                    transition-opacity duration-500"></div>

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#6C5CE7] rounded-full 
                       animate-ping"></div>
              <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-[#00D2D3] rounded-full 
                       animate-ping animation-delay-300"></div>
            </div>

            <div className="relative z-10">
              <div className="w-24 h-24 bg-gradient-to-br from-[#6C5CE7]/20 to-[#00D2D3]/20 
                      rounded-full flex items-center justify-center mx-auto mb-6 
                      shadow-lg shadow-purple-500/30
                      group-hover:shadow-[0_0_30px_rgba(108,92,231,0.8)]
                      group-hover:scale-110 group-hover:rotate-12
                      border-2 border-[#6C5CE7]/30 group-hover:border-[#6C5CE7]
                      transition-all duration-500">
                <ThumbsUp
                  size={40}
                  strokeWidth={2.5}
                  className="text-[#6C5CE7] group-hover:text-white 
                       drop-shadow-[0_0_10px_rgba(108,92,231,0.8)]
                       transition-all duration-300"
                />
              </div>
              <p className="text-xs font-bold text-[#00D2D3] uppercase tracking-wider mb-2
                    group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(0,210,211,0.8)]
                    transition-all duration-300">
                PUBLIC CONFIDENCE
              </p>
              <h3 className="text-3xl font-bold text-white mb-4
                     group-hover:bg-gradient-to-r group-hover:from-[#6C5CE7] group-hover:to-[#00D2D3]
                     group-hover:text-transparent group-hover:bg-clip-text
                     group-hover:drop-shadow-[0_0_20px_rgba(108,92,231,0.8)]
                     transition-all duration-300">
                Improved
              </h3>
              <p className="text-slate-400 leading-relaxed 
                     group-hover:text-white 
                     transition-colors duration-300">
                A cleaner city leads to happier citizens.
              </p>

              <div className="mt-6 h-1 w-0 bg-gradient-to-r from-[#6C5CE7] to-[#00D2D3] rounded-full 
                      group-hover:w-full 
                      group-hover:shadow-[0_0_15px_rgba(108,92,231,0.8)]
                      transition-all duration-500 mx-auto"></div>
            </div>

            <div className="absolute -inset-1 bg-gradient-to-br from-[#6C5CE7] to-[#00D2D3] 
                    rounded-3xl opacity-0 group-hover:opacity-40 blur-2xl -z-10
                    transition-opacity duration-500"></div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 px-4 md:px-5 overflow-hidden" ref={addSectionRef}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to modernize your city's hygiene oversight?
          </h2>
          <p className="text-xl text-[#9ca3af] mb-10 max-w-2xl mx-auto">
            Join forward-thinking Urban Local Bodies who are using data to restore dignity to public
            sanitation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/contact")}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-5 px-10 rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105">
              Request a City Walkthrough
            </button>
            {/* <button className="bg-white text-[#2D3436] border-2 border-blue-300 font-bold py-5 px-10 rounded-full hover:border-cyan-500 hover:text-cyan-600 hover:shadow-lg transition-all duration-300 hover:scale-105">
              Download Framework
            </button> */}
          </div>

          <p className="text-2xl text-white mt-8 font-bold">
            We facilitate evaluation required for public audit projects.
          </p>
        </div>
      </section>
    </main>
  )
}
