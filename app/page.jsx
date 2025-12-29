'use client'

import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger, TextPlugin, ScrollToPlugin } from 'gsap/all'
import HeroSection from '@/components/HeroSection'
import MovementSection from '@/components/MovementSection'
import LocatorSection from '@/components/LocatorSection'

import GermFightSection from '@/components/GermFightSection'
import RatingEngineBattle from '@/components/RatingEngineBattle'
import StakeholderSection from '@/components/StakeholderSection'
import FacilityManagementSection from '@/components/FacilityManagementSection'

gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin)

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())

    const ctx = gsap.context(() => {
      gsap.to('.loader', {
        yPercent: -100,
        duration: 1,
        ease: 'expo.inOut',
        onComplete: () => {
          setLoading(false)
          setTimeout(() => {
            ScrollTrigger.refresh()
          }, 200)
        }
      })
    })

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <>
      {loading && (
        <div className="loader fixed inset-0 z-[9999] flex items-center justify-center bg-white">
          <h1 className="font-extrabold text-5xl gradient-text">
            saafAI
          </h1>
        </div>
      )}
      <main className="bg-gradient-to-b from-white via-emerald-50/20 to-white">
        <HeroSection />
        <GermFightSection />
        <MovementSection />
        <StakeholderSection/>
        <FacilityManagementSection/>
        <LocatorSection />
        {/* <RatingEngineBattle /> */}
      </main>
    </>
  )
}
