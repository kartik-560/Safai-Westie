'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MissionCard from './MissionCard'
import { Target, Eye, Zap, Award } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function MovementSection() {
  const cardsRef = useRef([])

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          y: 50,
          duration: 0.8,
          delay: index * 0.2,
          ease: 'power2.out'
        })
      }
    })
  }, [])

  const missionData = [
    {
      icon: <Target className="w-12 h-12" style={{ color: '#6C5CE7' }} />,
      title: 'Our Mission',
      description: 'To ensure every public toilet meets a minimum hygiene standard by making cleanliness transparent, verifiable, and continuously monitored using AI.'
    },
    {
      icon: <Eye className="w-12 h-12" style={{ color: '#00D2D3' }} />,
      title: 'Our Vision',
      description: 'A future where citizens can trust public washrooms as much as any private facility — without uncertainty, discomfort, or compromise.'
    },
    {
      icon: <Zap className="w-12 h-12" style={{ color: '#ff9800' }} />,
      title: 'AI Hygiene Score',
      description: 'Our AI model analyzes images and structured inputs to generate a standardized toilet hygiene score — reducing subjectivity and enabling real-time sanitation insights.'
    }
  ]

  return (
    <section id="mission" 
             className="px-[5%] py-24 ">
      {/* Header */}
      <div className="text-center max-w-[800px] mx-auto">
        <span className="inline-block bg-[#6C5CE7]/10 text-[#6C5CE7] px-4 py-2 
                         rounded-[20px] font-extrabold text-[0.8rem] uppercase 
                         tracking-wider mb-5">
          The Movement
        </span>
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold mb-5 leading-tight">
          Making Public Toilets Predictably Clean
        </h2>
        <p className="text-[#636e72] text-lg leading-relaxed">
          saafAI bridges the gap between availability and usability of public washrooms.
          By combining AI hygiene scoring with citizen feedback, we make sanitation visible,
          measurable, and accountable.
        </p>
      </div>

      {/* Mission Cards Grid */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 mt-16">
        {missionData.map((item, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="mission-card"
          >
            <MissionCard
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          </div>
        ))}
      </div>

      {/* Swachh Bharat Affiliation */}
      <div className="mt-16 p-8 bg-white  rounded-[20px] 
                      flex items-center justify-center gap-5 flex-wrap">
        <div className="flex items-center gap-4 bg">
          <Award className="text-[#6C5CE7] w-10 h-10" />
          <h4 className="text-xl font-normal">
            Aligned with the <strong className="font-bold">Swachh Bharat Mission</strong>
          </h4>
        </div>
        <p className="text-[#636e72] font-semibold">
          | Supporting India&apos;s sanitation and public health goals
        </p>
      </div>
    </section>
  )
}
