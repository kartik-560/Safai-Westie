'use client'

import { useEffect, useRef } from 'react'
import { Eye, Shield, Heart, Users, Cpu, Zap, Sparkles, Send } from 'lucide-react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function AboutPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()




  // useEffect(() => {
  //   console.log("Use effect ran ");
  //   // Force scroll to top on every render/route change
  //   window.scrollTo(0, 0)
  //   document.documentElement.scrollTop = 0
  //   document.body.scrollTop = 0
  // }, [pathname])


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Animate all sections with reveal class
    const elements = document.querySelectorAll('.reveal')

    elements.forEach((element, index) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 30,
        },
        {
          scrollTrigger: {
            trigger: element,
            start: 'top 90%',
            toggleActions: 'play none none none',
            once: true,
          },
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])


  const handleFindToiletClick = (e) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)

    if (pathname === '/') {
      const element = document.getElementById('locator')
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
        window.history.pushState(null, '', '/#locator')
      }
    } else {
      router.push('/')
      setTimeout(() => {
        const element = document.getElementById('locator')
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 300)
    }
  }

  return (
    <main className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">

      {/* HERO SECTION */}
      <section className="pt-28 sm:pt-36 md:pt-40 lg:pt-48 
                    pb-12 sm:pb-16 md:pb-20 lg:pb-24 
                    px-5 sm:px-6 md:px-8 lg:px-6 
                    text-center relative overflow-hidden">
        {/* Decorative Blobs */}
      

        <div className="max-w-4xl mx-auto z-10 relative">
          <span className="reveal inline-block px-3 py-1 sm:px-4 sm:py-1.5 mb-4 sm:mb-5 md:mb-6 
                     rounded-full 
                     bg-blue-600/10 text-cyan-400 
                     text-[10px] sm:text-xs 
                     font-bold uppercase tracking-wider 
                     border border-blue-500/20">
            The Story of SaafAI
          </span>

          <h1 className="reveal 
                   text-[1.75rem] leading-[2.2rem]
                   sm:text-4xl sm:leading-[2.8rem]
                   md:text-5xl md:leading-[3.5rem]
                   lg:text-xl lg:leading-tight
                   xl:text-7xl xl:leading-tight
                   font-extrabold 
                   text-white 
                   mb-5 sm:mb-6 md:mb-7 lg:mb-8
                   px-2 max-w-[980px] mx-auto">
            Redefining the{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
              Public Toilet Experience
            </span>
            <br/>{' '}
            in India.
          </h1>

          <p className="reveal 
                  text-sm leading-relaxed
                  sm:text-base sm:leading-relaxed
                  md:text-lg md:leading-relaxed
                  lg:text-xl lg:leading-relaxed
                  text-slate-300 
                  mb-6 sm:mb-8 md:mb-9 lg:mb-10 
                  max-w-[95%] sm:max-w-lg md:max-w-xl lg:max-w-2xl 
                  mx-auto 
                  font-medium
                  px-2">
            We are a deep-tech startup driven by one simple belief:{' '}
            <span className="text-cyan-400 font-semibold">
              no one should ever have to think twice before using a public toilet.
            </span>
          </p>
        </div>
      </section>


      {/* MISSION SECTION */}
      <section id="mission" className="py-15 px-6 md:px-12 ">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1 reveal">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Our Mission</h2>
            <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
              <p>
                Public sanitation is one of the most basic requirements for urban life, yet it remains one of the most uncertain experiences for millions. At SaafAI, we believe that{' '}
                <span className="text-cyan-400 font-bold">dignity should not be a luxury.</span>
              </p>
              <p>
                Our mission is to solve the "visibility gap" in sanitation. By bringing together advanced Computer Vision, real-time citizen feedback, and stakeholder accountability, we ensure that no one has to think twice before using a public toilet.
              </p>
            </div>
          </div>

          <div className="flex-1 w-full reveal">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square bg-blue-600/10 rounded-3xl flex flex-col items-center justify-center p-8 text-center group hover:bg-blue-600 transition-all duration-500 border border-slate-700/50">
                <Eye className="w-10 h-10 text-cyan-400 mb-4 group-hover:text-white transition-colors" />
                <h4 className="font-bold text-white group-hover:text-white transition-colors">Transparency</h4>
              </div>
              <div className="aspect-square bg-cyan-600/10 rounded-3xl flex flex-col items-center justify-center p-8 text-center group hover:bg-cyan-600 transition-all duration-500 border border-slate-700/50">
                <Shield className="w-10 h-10 text-cyan-400 mb-4 group-hover:text-white transition-colors" />
                <h4 className="font-bold text-white group-hover:text-white transition-colors">Accountability</h4>
              </div>
              <div className="aspect-square bg-teal-600/10 rounded-3xl flex flex-col items-center justify-center p-8 text-center group hover:bg-teal-600 transition-all duration-500 border border-slate-700/50">
                <Heart className="w-10 h-10 text-cyan-400 mb-4 group-hover:text-white transition-colors" />
                <h4 className="font-bold text-white group-hover:text-white transition-colors">Dignity</h4>
              </div>
              <div className="aspect-square bg-amber-600/10 rounded-3xl flex flex-col items-center justify-center p-8 text-center group hover:bg-amber-600 transition-all duration-500 border border-slate-700/50">
                <Users className="w-10 h-10 text-cyan-400 mb-4 group-hover:text-white transition-colors" />
                <h4 className="font-bold text-white group-hover:text-white transition-colors">Community</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT STATS SECTION */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-5xl font-bold text-white">Impact scale </h2>
            <p className="text-slate-400 mt-4">Quantifying our progress toward a cleaner India.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="reveal text-center bg-gradient-to-br from-slate-800/70 to-slate-900/70 
              backdrop-blur-sm p-10 rounded-3xl border border-slate-700/50
              hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2
              transition-all duration-300">
              <div className="text-5xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 
                text-transparent bg-clip-text mb-2">50,000+</div>
              <p className="text-white font-bold uppercase tracking-wider text-sm">Images Trained</p>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                Proprietary AI Vision dataset capturing real-world hygiene scenarios across diverse geographies.
              </p>
            </div>
            <div className="reveal text-center bg-gradient-to-br from-slate-800/70 to-slate-900/70 
              backdrop-blur-sm p-10 rounded-3xl border border-slate-700/50
              hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2
              transition-all duration-300">
              <div className="text-5xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 
                text-transparent bg-clip-text mb-2">25,000+</div>
              <p className="text-white font-bold uppercase tracking-wider text-sm">Platform Users</p>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                A growing community of citizens contributing to a real-time map of sanitation quality.
              </p>
            </div>
            <div className="reveal text-center bg-gradient-to-br from-slate-800/70 to-slate-900/70 
              backdrop-blur-sm p-10 rounded-3xl border border-slate-700/50
              hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2
              transition-all duration-300">
              <div className="text-5xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 
                text-transparent bg-clip-text mb-2">5,000+</div>
              <p className="text-white font-bold uppercase tracking-wider text-sm">Toilets Mapped</p>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                Public and private facilities already being monitored and rated through the SaafAI engine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY SECTION */}
      <section id="technology" className="py-24 px-6 md:px-12 ">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 w-full order-2 lg:order-1 reveal">
            <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 
              backdrop-blur-sm rounded-[50px] p-12 text-white overflow-hidden relative 
              shadow-2xl border border-slate-700/50">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -mr-20 -mt-20" />
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 relative z-10">
                <Cpu className="text-cyan-400" /> The SaafAI Engine
              </h3>
              <div className="space-y-6 relative z-10">
                <div className="p-5 bg-slate-800/50 rounded-2xl border border-slate-700/50 
                  hover:border-blue-500/50 transition-all duration-300">
                  <h4 className="font-bold text-cyan-400 text-sm mb-2">Visual Processing</h4>
                  <p className="text-sm text-slate-300">
                    Our engine identifies floor cleanliness, surface odors (proxied by visual cues), and supply levels instantly.
                  </p>
                </div>
                <div className="p-5 bg-slate-800/50 rounded-2xl border border-slate-700/50 
                  hover:border-cyan-500/50 transition-all duration-300">
                  <h4 className="font-bold text-cyan-400 text-sm mb-2">Bias Correction</h4>
                  <p className="text-sm text-slate-300">
                    Citizen feedback is weighted against AI vision scores to prevent malicious or accidental false reporting.
                  </p>
                </div>
                <div className="p-5 bg-slate-800/50 rounded-2xl border border-slate-700/50 
                  hover:border-purple-500/50 transition-all duration-300">
                  <h4 className="font-bold text-cyan-400 text-sm mb-2">Stakeholder API</h4>
                  <p className="text-sm text-slate-300">
                    Verified scores are pushed to city dashboards and management apps to trigger cleaning alerts.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 order-1 lg:order-2 reveal">
            <span className="inline-block px-4 py-1.5 mb-4 rounded-full 
              bg-blue-600/10 text-cyan-400 text-xs font-bold uppercase tracking-wider 
              border border-blue-500/20">
              Our Superpower
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Proprietary AI Vision
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              While others rely on manual inspections that happen once a week, SaafAI sees what is happening every day. Our proprietary AI Vision model has been trained on{' '}
              <strong className="text-cyan-400">50,000+ high-quality images</strong> of sanitation facilities to detect subtle hygiene markers that human inspectors might miss.
            </p>
            <div className="flex items-center gap-4 text-cyan-400 font-bold">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 
                flex items-center justify-center">
                <Zap className="text-white" />
              </div>
              <span>Instant Score Generation</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto reveal bg-gradient-to-br from-blue-600 to-cyan-500 
          rounded-[50px] p-12 md:p-20 text-white relative shadow-2xl shadow-blue-500/30">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-8">Help Us Redefine Sanitation</h2>
          <p className="text-lg text-blue-100 mb-12">
            Whether you are a citizen who cares, a city administrator, or an investor, there is a place for you in the SaafAI story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-xl 
                hover:bg-blue-50 transition-all hover:scale-105"
            >
              Contact Us
            </Link>
            <button
              onClick={handleFindToiletClick}
              className="bg-blue-700 text-white px-10 py-5 rounded-2xl font-bold text-xl 
                hover:bg-blue-800 transition-all border border-blue-400/30 hover:scale-105"
            >
              Find a Toilet
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
