'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MapPin, Star, BadgeCheck } from 'lucide-react'

export default function HowSaafAIHelpsSection() {
  const sectionRef = useRef(null)

  const features = [
    {
      Icon: MapPin,
      title: 'Find toilets with confidence',
      description: 'Search nearby public toilets, check their hygiene scores, and choose the cleanest option — no uncertainty, no stress.',
      position: 'left'
    },
    {
      Icon: Star,
      title: 'You rate what you see',
      description: 'After using a toilet, give a quick hygiene rating — no long forms, just one simple tap.',
      position: 'center'
    },
    {
      Icon: BadgeCheck,
      title: 'Hygiene scores you can trust',
      description: 'Your rating, along with other citizen inputs and smart verification, helps create a hygiene score that reflects the real condition on the ground.',
      position: 'right'
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="howItHelps"
      className="relative overflow-hidden py-24 px-5 text-center"
      style={{ perspective: '1000px' }}
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

      <h2 className="text-[2.5rem] py-15 font-bold mb-3 text-white ">
        How SaafAI Helps You
      </h2>

      {/* <p className="text-[#9ca3af] text-lg mb-12 max-w-2xl mx-auto">
        Your feedback doesn't disappear — it helps make toilets better for everyone.
      </p> */}

      {/* Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {features.map((feature, index) => (
          <Card key={index} feature={feature} index={index} />
        ))}
      </div>

      <p className="text-gray-900 mt-10 mx-auto text-2xl bg-white rounded-2xl px-6 py-8 max-w-[980px]">
        Your feedback doesn't disappear — it helps make toilets better for everyone.
      </p>

    </section>
  )
}

function Card({ feature, index }) {
  const cardRef = useRef(null)
  const IconComponent = feature.Icon

  // Track scroll progress of this specific card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  // Calculate movement based on position
  const getInitialX = () => {
    if (feature.position === 'left') return -200
    if (feature.position === 'right') return 200
    return 0
  }

  // Transform values based on scroll progress
  const x = useTransform(scrollYProgress, [0, 0.5], [getInitialX(), 0])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 1, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.7, 1])

  return (
    <motion.div
      ref={cardRef}
      style={{ x, opacity, scale }}
      className="group relative backdrop-blur-sm rounded-3xl p-8 
             border border-gray-700/50
             shadow-[0_4px_20px_rgba(0,0,0,0.3)]
             hover:shadow-[0_12px_40px_rgba(6,182,212,0.4)]
             hover:-translate-y-2 hover:scale-[1.02]
             transition-all duration-500 ease-out
             overflow-hidden cursor-pointer
             before:absolute before:inset-0 
             before:bg-gradient-to-br before:from-cyan-400/10 before:via-blue-500/10 before:to-transparent
             before:opacity-0 hover:before:opacity-100
             before:transition-opacity before:duration-500
             bg-gray-800/90
             hover:bg-gradient-to-br hover:from-gray-700/95 hover:via-gray-800/95 hover:to-cyan-900/40"
    >
      {/* Animated gradient overlay on hover */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-40
                 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-cyan-400/20
                 transition-opacity duration-500"></div>

      {/* Animated border glow on hover */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100
                 bg-cyan-500/50
                 blur-xl -z-10 transition-opacity duration-500"></div>

      {/* Icon with hover animation */}
      <div className="relative mb-6 mt-6
           group-hover:scale-110 group-hover:-rotate-6
           transition-all duration-500 ease-out
           filter drop-shadow-lg z-10 flex justify-center">
        <IconComponent
          size={64}
          strokeWidth={1.5}
          className="text-cyan-400 group-hover:text-cyan-300 
                 transition-colors duration-500"
        />
      </div>

      {/* Title */}
      <h3 className="relative text-xl font-bold text-gray-100 mb-4
                group-hover:text-white
                transition-all duration-300 z-10">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="relative text-gray-300 text-base leading-relaxed
               group-hover:text-gray-100
               transition-colors duration-300 z-10">
        {feature.description}
      </p>

      {/* Bottom accent line with gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 
                 bg-gradient-to-r from-cyan-400 to-blue-500
                 transform scale-x-0 group-hover:scale-x-100
                 transition-transform duration-500 ease-out
                 rounded-b-3xl z-10"></div>
    </motion.div>

  )
}


// function Card({ feature, index }) {
//   const cardRef = useRef(null)
//   const IconComponent = feature.Icon

//   // Track scroll progress of this specific card
//   const { scrollYProgress } = useScroll({
//     target: cardRef,
//     offset: ["start end", "end start"]
//   })

//   // Calculate movement based on position
//   const getInitialX = () => {
//     if (feature.position === 'left') return -200
//     if (feature.position === 'right') return 200
//     return 0
//   }

//   // Transform values based on scroll progress
//   const x = useTransform(scrollYProgress, [0, 0.5], [getInitialX(), 0])
//   const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 1, 1])
//   const scale = useTransform(scrollYProgress, [0, 0.5], [0.7, 1])

//   return (
//     <motion.div
//       ref={cardRef}
//       style={{ x, opacity, scale }}
//       className="group relative backdrop-blur-sm rounded-3xl p-8
//              border border-blue-200/30
//              shadow-[0_4px_20px_rgba(59,130,246,0.08)]
//              hover:shadow-[0_12px_40px_rgba(6,182,212,0.25)]
//              hover:-translate-y-2 hover:scale-[1.02]
//              transition-all duration-500 ease-out
//              overflow-hidden cursor-pointer
//              before:absolute before:inset-0
//              before:bg-gradient-to-br before:from-blue-500/5 before:via-cyan-400/5 before:to-transparent
//              before:opacity-0 hover:before:opacity-100
//              before:transition-opacity before:duration-500
//              bg-white/80
//              hover:bg-gradient-to-br hover:from-cyan-50/80 hover:via-blue-50/80 hover:to-white/90"
//     >
//       {/* Animated water waves background on hover */}
//       <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30
//                  bg-gradient-to-br from-cyan-200/30 via-blue-200/30 to-cyan-300/30
//                  transition-opacity duration-500"></div>

//       {/* Animated border glow on hover */}
//       <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100
//                  bg-cyan-200
//                  blur-xl -z-10 transition-opacity duration-500"></div>

//       {/* Icon with hover animation */}
//       <div className="relative mb-6 mt-6
//            group-hover:scale-110 group-hover:-rotate-6
//            transition-all duration-500 ease-out
//            filter drop-shadow-lg z-10 flex justify-center">
//         <IconComponent
//           size={64}
//           strokeWidth={1.5}
//           className="text-blue-600 group-hover:text-cyan-500 transition-colors duration-500"
//         />
//       </div>

//       {/* Title */}
//       <h3 className="relative text-xl font-bold text-[#2D3436] mb-4
//                 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-500
//                 group-hover:text-transparent group-hover:bg-clip-text
//                 transition-all duration-300 z-10">
//         {feature.title}
//       </h3>

//       {/* Description */}
//       <p className="relative text-[#636e72] text-base leading-relaxed
//                group-hover:text-[#2D3436]
//                transition-colors duration-300 z-10">
//         {feature.description}
//       </p>

//       {/* Bottom accent line with gradient */}
//       <div className="absolute bottom-0 left-0 right-0 h-1
//                  bg-gradient-to-r from-blue-600 via-cyan-400 to-cyan-500
//                  transform scale-x-0 group-hover:scale-x-100
//                  transition-transform duration-500 ease-out
//                  rounded-b-3xl z-10"></div>
//     </motion.div>
//   )
// }


