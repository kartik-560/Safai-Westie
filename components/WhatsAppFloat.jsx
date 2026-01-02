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


// 'use client'

// import { useEffect } from 'react'
// import gsap from 'gsap'
// import { MessageCircle } from 'lucide-react'

// export default function WhatsAppFloat() {
//   useEffect(() => {
//     gsap.to('#wa-btn', {
//       scale: 1.05,
//       repeat: -1,
//       yoyo: true,
//       duration: 1,
//       ease: 'sine.inOut'
//     })
//   }, [])

//   const message = encodeURIComponent(
//     "Hi! I'm interested in saafAI and would like to know more about your AI-driven hygiene rating system."
//   )

//   return (
//     <a
//       href={`https://wa.me/919356851845?text=${message}`}
//       target='_blank'
//       id="wa-btn"
//       className="fixed 
//                  bottom-32 right-4
//                  sm:bottom-36 sm:right-6
//                  lg:bottom-24 lg:right-10
//                  bg-white
//                  pl-4 lg:pl-5 pr-2 py-2
//                  rounded-full
//                  flex items-center gap-2 lg:gap-3
//                  shadow-xl
//                  z-[2000] 
//                  hover:scale-105 active:scale-100 transition-all duration-300"
//       aria-label="Contact on WhatsApp"
//     >
//       {/* Text - visible only on desktop */}
//       <span className="hidden lg:block text-slate-700 font-semibold text-sm whitespace-nowrap">
//         Chat with us
//       </span>

//       {/* WhatsApp Button */}
//       <div className="bg-[#25D366] w-[50px] h-[50px]
//                       rounded-full flex justify-center items-center text-white 
//                       flex-shrink-0">
//         <MessageCircle className="w-7 h-7" />
//       </div>
//     </a>
//   )
// }
