'use client'

import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger, TextPlugin, ScrollToPlugin } from 'gsap/all'
import HeroSection from '@/components/HeroSection'
import MovementSection from '@/components/MovementSection'
import LocatorSection from '@/components/LocatorSection'
import HowItWorkSection from "../components/HowItWorkSection"
import BackgroundBlobs from '@/components/BackgroundBlobs'
import PageLoader from '@/components/PageLoader'

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
      <PageLoader/>
      <main className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 transition-colors duration-300">

        <HeroSection />
        <HowItWorkSection />
        <MovementSection />
        {/* <StakeholderSection/>
        <FacilityManagementSection/> */}
        <LocatorSection />
        {/* <RatingEngineBattle /> */}
      </main>
    </>
  )
}
