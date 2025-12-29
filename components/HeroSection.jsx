"use client"

import { useEffect, useState, useRef } from "react"
import gsap from "gsap"
import NinjaMascot from "./NinjaMascot"
import Link from "next/link"
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
    citizen: {
      subtitle:
        "Find nearby public toilets with verified AI hygiene scores before you use them.",
      engineTitle: "AI Hygiene Scores You Can Trust",
      engineDesc:
        `SaafAI is built to make using a public toilet feel less uncertain and more comfortable.
         We bring together real-time feedback from people like you, smart hygiene checks, and verified cleaning updates so you know what to expect before you walk in.
         Nosurprises, no second-guessing — just cleaner toilet you can trust, wherever you are.`,
    },
    facilityManager: {
      subtitle:
        "An AI hygiene rating engine to measure, monitor, and prove sanitation quality for your facilities.",
      engineTitle: "Sanitation as a Measurable Rating",
      engineDesc:
        "saafAI converts real-world washroom conditions into a standardized AI hygiene score using computer vision and verification logic.",
    },
  }

  const currentContent =
    viewMode === "citizen" ? content.citizen : content.facilityManager

  return (
    <>
      <section
        className="hero min-h-[80vh] md:min-h-screen flex flex-col justify-center items-center
                   text-center px-4 md:px-5 pt-24 md:pt-28 pb-14 md:pb-16
                   relative overflow-hidden
                   bg-gradient-to-b from-emerald-50 via-sky-50 to-white"
      >
        {/* floating background blobs */}
        <div
          className="bg-bubble absolute -left-24 -top-24 w-56 h-56 md:w-72 md:h-72 rounded-full
                     bg-emerald-300/20 blur-3xl pointer-events-none"
        />
        <div
          className="bg-bubble absolute -right-20 bottom-[-40px] w-64 h-64 md:w-80 md:h-80 rounded-full
                     bg-sky-300/25 blur-3xl pointer-events-none"
        />

        <div ref={ninjaContainerRef} className="mb-6 md:mb-8 z-10">
          <NinjaMascot />
        </div>

        <h1
          id="main-title"
          className="text-[clamp(1.8rem,5.5vw,3.4rem)] md:text-[clamp(2.4rem,5vw,3.8rem)]
                     font-extrabold leading-tight
                     mb-4 md:mb-6 max-w-[1000px] text-[#2D3436]"
        >
          looking for clean washroom?
        </h1>

        <p
          className="hero-subtitle text-base md:text-xl text-[#57606f] 
                     mb-4 md:mb-2 max-w-[730px] leading-relaxed min-h-[3.5em]"
        >
          {currentContent.subtitle}
        </p>


        <button
          onClick={(e) => {
            const element = document.getElementById('locator')
            if (element) {
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              })
            }
          }}
          className="bg-gradient-to-r from-[#6C5CE7] to-[#00D2D3] text-white 
             px-6 py-3 mb-8 rounded-full font-bold text-center mt-4
             shadow-[0_8px_16px_rgba(108,92,231,0.2)]
             hover:shadow-[0_12px_24px_rgba(108,92,231,0.3)]
             transition-all duration-300 cursor-pointer"
        >
          Find a Toilet Near Me
        </button>
        {/* <div className="flex gap-3 md:gap-4 mb-8 md:mb-10 flex-wrap justify-center">
          <button
            onClick={() => handleToggle("citizen")}
            className={`relative px-6 md:px-8 py-2.5 md:py-3.5 rounded-full border-2 
                font-bold text-xs md:text-sm 
                transition-all duration-500 ease-out isolate
                transform hover:scale-105 active:scale-95
                ${viewMode === "citizen"
                ? "text-white border-transparent shadow-[0_8px_24px_rgba(16,185,129,0.4)] md:scale-105 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-[#10b981] before:to-[#06b6d4] before:-z-10"
                : "bg-white text-[#10b981] border-[#10b981] hover:bg-gradient-to-r hover:from-[#10b981]/10 hover:to-[#06b6d4]/10 hover:border-[#06b6d4] shadow-[0_4px_12px_rgba(16,185,129,0.15)]"
              }`}
          >
            <span className="relative z-10">For Citizens</span>
          </button>

          <button
            onClick={() => handleToggle("facilityManager")}
            className={`relative px-6 md:px-8 py-2.5 md:py-3.5 rounded-full border-2 
                font-bold text-xs md:text-sm 
                transition-all duration-500 ease-out isolate
                transform hover:scale-105 active:scale-95
                ${viewMode === "facilityManager"
                ? "text-white border-transparent shadow-[0_8px_24px_rgba(16,185,129,0.4)] md:scale-105 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-[#10b981] before:to-[#06b6d4] before:-z-10"
                : "bg-white text-[#10b981] border-[#10b981] hover:bg-gradient-to-r hover:from-[#10b981]/10 hover:to-[#06b6d4]/10 hover:border-[#06b6d4] shadow-[0_4px_12px_rgba(16,185,129,0.15)]"
              }`}
          >
            <span className="relative z-10">For Facility Managers</span>
          </button>
        </div> */}

      </section>

      <section
        className="py-10 px-4 md:px-5 text-center bg-gradient-to-b from-emerald-50 via-sky-50 to-white"
        id="engine"
      >
        <span
          className="inline-block bg-[#6C5CE7]/10 text-[#6C5CE7] px-4 py-2.5 
                     rounded-full font-bold text-[0.7rem] md:text-xs uppercase tracking-wide mb-4"
        >
          AI Rating Engine
        </span>
        <h2
          ref={engineTitleRef}
          className="text-[1.8rem] md:text-[2.5rem] font-bold mb-4 md:mb-5 text-[#2D3436]"
        >
          {currentContent.engineTitle}
        </h2>
        <p
          ref={engineDescRef}
          className="text-[#636e72] max-w-[720px] mx-auto text-base md:text-lg leading-relaxed"
        >
          {currentContent.engineDesc}
        </p>
      </section>
    </>
  )
}
