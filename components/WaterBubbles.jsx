// 'use client'
// import { useEffect, useState } from 'react'

// export default function WaterBubbles() {
//     const [mounted, setMounted] = useState(false)

//     useEffect(() => {
//         setMounted(true)

//         const createBubble = () => {
//             const section = document.querySelector('.bubble-container')
//             if (!section) return

//             const bubble = document.createElement('div')
//             const size = Math.random() * 60 + 40

//             bubble.className = 'absolute bottom-0 rounded-full pointer-events-none opacity-80 animate-float-up'
//             bubble.style.width = `${size}px`
//             bubble.style.height = `${size}px`
//             bubble.style.left = `${Math.random() * 100}%`
//             bubble.style.animationDuration = `${Math.random() * 3 + 4}s`
//             bubble.style.animationDelay = `${Math.random() * 2}s`
//             bubble.style.background = 'transparent'
//             bubble.style.boxShadow = 'inset 0 0 15px rgba(6, 182, 212, 0.3), 0 0 20px rgba(59, 130, 246, 0.2)'

//             section.appendChild(bubble)

//             setTimeout(() => {
//                 bubble.remove()
//             }, 8000)
//         }

//         const interval = setInterval(createBubble, 300)
//         return () => clearInterval(interval)
//     }, [])

//     if (!mounted) return null

//     return (
//         <div className="bubble-container absolute inset-0 pointer-events-none overflow-hidden z-10" />
//     )
// }

'use client'
import { useEffect, useState } from 'react'

export default function WaterBubbles() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        const createBubble = () => {
            const section = document.querySelector('.bubble-container')
            if (!section) return

            const size = Math.random() * 60 + 40
            const bubble = document.createElement('div')

            bubble.className = 'absolute bottom-0 pointer-events-none animate-float-up-rotate'
            bubble.style.width = `${size}px`
            bubble.style.height = `${size}px`
            bubble.style.left = `${Math.random() * 100}%`
            bubble.style.opacity = '5' // Increased from 0.05 to 0.12 (12%)
            bubble.style.animationDuration = `${Math.random() * 3 + 4}s`
            bubble.style.animationDelay = `${Math.random() * 2}s`

            // Increased visibility in SVG
            bubble.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" class="w-full h-full">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                  fill="rgba(6, 182, 212, 0.08)" 
                  stroke="rgba(6, 182, 212, 0.25)" 
                  stroke-width="1.5"
                  stroke-linecap="round" 
                  stroke-linejoin="round"
                  style="filter: drop-shadow(0 0 6px rgba(6, 182, 212, 0.2))"/>
        </svg>
    `

            section.appendChild(bubble)

            setTimeout(() => {
                bubble.remove()
            }, 8000)
        }


        const interval = setInterval(createBubble, 300)
        return () => clearInterval(interval)
    }, [])

    if (!mounted) return null

    return (
        <>
            <div className="bubble-container absolute inset-0 pointer-events-none overflow-hidden z-[1]" />
            <style jsx global>{`
                @keyframes float-up-rotate {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.8;
                    }
                    90% {
                        opacity: 0.8;
                    }
                    100% {
                        transform: translateY(-100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
                .animate-float-up-rotate {
                    animation: float-up-rotate 7s ease-in-out forwards;
                }
            `}</style>
        </>
    )
}


