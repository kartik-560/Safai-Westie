'use client'

import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger, TextPlugin, ScrollToPlugin } from 'gsap/all'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import MovementSection from '@/components/MovementSection'
import LocatorSection from '@/components/LocatorSection'
import ReviewSection from '@/components/ReviewSection'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import BackgroundBlobs from '@/components/BackgroundBlobs'
import GermFightSection from '@/components/GermFightSection'
import RatingEngineBattle from '@/components/RatingEngineBattle'
import ContactSection from '@/components/ContactSection'
gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin)

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    gsap.to('.loader', {
      yPercent: -100,
      duration: 1,
      ease: 'expo.inOut',
      onComplete: () => setLoading(false)
    })
  }, [])

  return (
    <>
      {loading && (
        <div className="loader">
          <h1 className="font-extrabold text-5xl gradient-text">
            saafAI
          </h1>
        </div>
      )}
      <main className="bg-gradient-to-b from-white via-emerald-50/20 to-white">
        <BackgroundBlobs />
        <Navigation />
        <HeroSection />
        <GermFightSection />
        <MovementSection />
        <RatingEngineBattle />
        <LocatorSection />
        {/* <ReviewSection /> */}
        <ContactSection />
        <Footer />
        <WhatsAppFloat />
      </main>
    </>
  )
}
