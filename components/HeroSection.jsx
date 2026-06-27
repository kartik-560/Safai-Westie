"use client"

import { useEffect, useState, useRef } from "react"
import gsap from "gsap"
import NinjaMascot from "./NinjaMascot"
import Link from "next/link"
import WaterBubbles from "./WaterBubbles"
import { MapPin, Monitor } from 'lucide-react'
export default function HeroSection() {
  const [viewMode, setViewMode] = useState("citizen")
  const engineTitleRef = useRef(null)
  const engineDescRef = useRef(null)
  const ninjaContainerRef = useRef(null)

  useEffect(() => {

    gsap.set(ninjaContainerRef.current, { scale: 0, rotation: -180 })
    gsap.set("#main-title", { opacity: 0, y: 50 })
    gsap.set(".hero-subtitle", { opacity: 0, y: 30 })
    gsap.set(".hero .btn", { opacity: 0, y: 20 })

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.to(ninjaContainerRef.current, {
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
      })
        .to("#main-title", { opacity: 1, y: 0, duration: 1 }, "-=0.6")
        .to(".hero-subtitle", { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to(
          ".hero .btn",
          { opacity: 1, y: 0, stagger: 0.2, duration: 0.8 },
          "-=0.4"
        )
      tl.to(ninjaContainerRef.current, {
        y: 16,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 2,
      }, "+=0.2")

      gsap.to(".bg-bubble", {
        y: 32,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 1.5,
      })
    })

    return () => ctx.revert()
  }, [])

  // const handleToggle = (mode) => {
  //   if (mode === viewMode) return

  //   gsap.to([".hero-subtitle", engineTitleRef.current, engineDescRef.current], {
  //     opacity: 0,
  //     y: 10,
  //     duration: 0.25,
  //     onComplete: () => {
  //       setViewMode(mode)
  //       gsap.to(
  //         [".hero-subtitle", engineTitleRef.current, engineDescRef.current],
  //         {
  //           opacity: 1,
  //           y: 0,
  //           duration: 0.35,
  //           stagger: 0.1,
  //         }
  //       )
  //     },
  //   })
  // }

  const content = {
    subtitle:
      "Rating cleanliness through computer vision and AI-driven intelligence,",
    engineTitle: "SaafAI Hygiene Scores You Can Trust",
    engineDesc:
      `SaafAI is built to make using a public toilet feel less uncertain and more comfortable.
         We bring together real-time feedback from people like you, smart hygiene checks, and verified cleaning updates so you know what to expect before you walk in.
         Nosurprises, no second-guessing — just cleaner toilet you can trust, wherever you are.`,
    engineDesc1: "So that you can use any Toilet without 2nd Thoughts !!",
  }

  return (
    <>

      <section
        className="hero min-h-[80vh] md:min-h-screen flex flex-col justify-center items-center
                   text-center px-4 md:px-5 pt-24 md:pt-28 pb-14 md:pb-16
                   relative overflow-hidden
                  "
      >

        {/* <WaterBubbles /> */}
        {/* floating background blobs */}

        <div ref={ninjaContainerRef} className="mb-6 md:mb-8 z-10">
          <NinjaMascot />
        </div>

        <h1 className="
  text-4xl
  sm:text-5xl
  md:text-6xl
  lg:text-7xl
  xl:text-8xl
  font-bold
  text-white mt-[-40px]
">
          Saaf
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C5CE7] to-[#00D2D3]">
            AI
          </span>
        </h1>

        <br />
        <h1
          id="main-title"
          className="   text-[clamp(1.6rem,4.2vw,2.8rem)]
    md:text-[clamp(2rem,3.6vw,3.2rem)]
                     font-extrabold leading-tight
                     mb-4 md:mb-6 max-w-[1100px] text-white mt-[-10px]"
        >
          The Intelligence Layer for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C5CE7] to-[#00D2D3]">Toilet Hygiene</span>
        </h1>


        <p
          ref={engineDescRef}
          className="hero-subtitle text-base md:text-xl text-[#C7D2E0]
]
                    max-w-[760px] leading-relaxed min-h-[3.5em] mt-[-10px]"
        >
          {content.subtitle}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C5CE7] to-[#00D2D3]">
          {content.engineDesc1}
          </span>
        </p>
        <div className="hero-btn-group flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 mb-4">
          <Link href="/demo" className="btn bg-gradient-to-r from-[#6C5CE7] to-[#00D2D3] text-white px-8 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity w-full sm:w-auto shadow-[0_8px_16px_rgba(108,92,231,0.2)]">
            Try the Live Demo <span>&rarr;</span>
          </Link>

        </div>

        <div className="hero-tagline flex items-center justify-center gap-2 text-[12px] md:text-[13px] text-slate-400 font-medium mt-2">
          <Monitor className="w-4 h-4" />
          See SaafAI in action — explore the dashboard and discover real hygiene insights.
        </div>
      </section>
      <section
        className="lg:py-10 px-4 md:px-5"
        id="engine"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Content */}
            <div className="text-center lg:text-left">
              <div className="flex justify-center lg:justify-start">
                <span
                  className="inline-block
         text-transparent bg-clip-text font-bold text-xs uppercase tracking-wide mb-5
         border border-blue-500/20 px-4 py-1.5 rounded-full"
                >
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
                    AI Rating Engine
                  </span>
                </span>
              </div>
              <h2
                ref={engineTitleRef}
                className="text-[1.8rem] md:text-[2.5rem] max-w-[30rem] font-bold mb-4 md:mb-5 text-white mx-auto lg:mx-0 text-center lg:text-left"
              >
                {content.engineTitle}
              </h2>
              <p
                ref={engineDescRef}
                className="text-[#9ca3af] max-w-[720px] mx-auto lg:mx-0 lg:max-w-none text-base md:text-lg leading-relaxed text-center lg:text-left"
              >
                {content.engineDesc}
              </p>
            </div>


            {/* Right Side - Phone Image */}
            <div className="flex justify-center lg:justify-end mx-auto lg:mt-10 lg:py-8 py-5">
              <div className="max-w-sm md:max-w-md lg:max-w-lg">
                <img
                  src="/phone1.png"
                  alt="SaafAI mobile app showing toilet locations"
                  className="lg:w-[200px] lg:h-[400px] w-[150px] h-[250px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
