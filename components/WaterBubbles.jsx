'use client'
import { useEffect, useState } from 'react'

export default function WaterBubbles() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        const createBubble = () => {
            const section = document.querySelector('.bubble-container')
            if (!section) return

            const bubble = document.createElement('div')
            const size = Math.random() * 60 + 40

            bubble.className = 'absolute bottom-0 rounded-full pointer-events-none opacity-80 animate-float-up'
            bubble.style.width = `${size}px`
            bubble.style.height = `${size}px`
            bubble.style.left = `${Math.random() * 100}%`
            bubble.style.animationDuration = `${Math.random() * 3 + 4}s`
            bubble.style.animationDelay = `${Math.random() * 2}s`
            bubble.style.background = 'transparent'
            bubble.style.boxShadow = 'inset 0 0 15px rgba(6, 182, 212, 0.3), 0 0 20px rgba(59, 130, 246, 0.2)'

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
        <div className="bubble-container fixed inset-0 pointer-events-none overflow-hidden z-10" />
    )
}
