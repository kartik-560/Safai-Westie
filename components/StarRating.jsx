/* eslint-disable react-hooks/purity */
'use client'

import { useState } from 'react'
import gsap from 'gsap'

export default function StarRating() {
  const [rating, setRating] = useState(0)

  const handleStarClick = (value, e) => {
    setRating(value)

    const ninja = document.getElementById('ninja')
    if (ninja) {
      gsap.timeline()
        .to(ninja, { scale: 1.4, rotation: '+=360', duration: 0.6, ease: 'back.out' })
        .to(ninja, { scale: 1, duration: 0.2 })
    }

    for (let i = 0; i < 4; i++) {
      createProjectile(e.clientX, e.clientY)
    }
  }

  const createProjectile = (x, y) => {
    const s = document.createElement('div')
    s.className = 'projectile-star'
    s.innerHTML = '★'
    s.style.left = window.innerWidth / 2 + 'px'
    s.style.top = window.innerHeight / 2.5 + 'px'
    document.body.appendChild(s)

    gsap.to(s, {
      x: (Math.random() - 0.5) * 1200,
      y: (Math.random() - 0.5) * 800 + 400,
      rotation: 1080,
      opacity: 0,
      duration: 1.5,
      ease: 'power2.out',
      onComplete: () => s.remove()
    })
  }

  return (
    <div className="flex justify-center gap-5 my-10">
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          onClick={(e) => handleStarClick(value, e)}
          className={`text-6xl cursor-pointer transition-all duration-300 
                     ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
                     ${value <= rating ? 'text-accent scale-120' : 'text-gray-300'}`}
        >
          ★
        </span>
      ))}
    </div>
  )
}
