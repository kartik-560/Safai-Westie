'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ULBPage() {
  const sectionRefs = useRef([])

  useEffect(() => {
    sectionRefs.current.forEach((section) => {
      if (section) {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          }
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const addSectionRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el)
    }
  }

  return (
    <main className="bg-gradient-to-b from-[#E8F8F5] via-[#F0FDFA] to-white">
      {/* Hero Section - Light Theme */}
      <section className="relative py-32 px-5 overflow-hidden bg-gradient-to-br from-[#E8F8F5] via-[#F0FDFA] to-[#E0F2FE]">
        <div className="max-w-6xl mx-auto" ref={addSectionRef}>
          <div className="flex gap-4 items-center mb-8 text-sm">
            <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-semibold">Urban Local Bodies (ULB)</span>

          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight text-[#2D3436] max-w-[800px]">
            Public toilet hygiene requires{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
              continuous visibility
            </span>{' '}
            — not occasional checks.
          </h1>

          <p className="text-xl text-[#636e72] max-w-3xl mb-10 leading-relaxed">
            SaafAI helps urban local bodies understand how public toilets are actually being
            maintained on the ground, using verified hygiene scores instead of fragmented
            reports.
          </p>

          <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-4 px-8 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105">
            Request a walkthrough for your city →
          </button>
        </div>
      </section>

      {/* Reality Section */}
      <section className="py-24 px-5" ref={addSectionRef}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2D3436] mb-6">
            We understand the reality of city sanitation.
          </h2>
          <p className="text-xl text-[#636e72] mb-12 max-w-3xl">
            Managing hygiene across a growing city isn't just about cleaning—it's about monitoring
            hundreds of moving parts simultaneously.
          </p>

          {/* Obstacles - Improved Design */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-8 mb-12 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-white text-2xl">⚠</span>
              </div>
              <h3 className="font-bold text-[#2D3436] text-xl">KEY OBSTACLES FOR ULBS</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-amber-100 hover:shadow-lg transition-all duration-300">
                <h4 className="font-bold text-[#2D3436] mb-2 text-lg">Geographic Spread</h4>
                <p className="text-[#636e72]">
                  Hundreds of facilities spread across diverse wards.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-amber-100 hover:shadow-lg transition-all duration-300">
                <h4 className="font-bold text-[#2D3436] mb-2 text-lg">Vendor Accountability</h4>
                <p className="text-[#636e72]">
                  Heavy dependence on 3rd-party maintenance operators.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-amber-100 hover:shadow-lg transition-all duration-300">
                <h4 className="font-bold text-[#2D3436] mb-2 text-lg">Delayed Data</h4>
                <p className="text-[#636e72]">
                  Manual reporting is often slow, fragmented, or inaccurate.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-amber-100 hover:shadow-lg transition-all duration-300">
                <h4 className="font-bold text-[#2D3436] mb-2 text-lg">Reactive Posture</h4>
                <p className="text-[#636e72]">
                  Relying on citizen complaints rather than prevention.
                </p>
              </div>
            </div>
          </div>

          {/* Dashboard Preview - Improved */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-blue-200/30">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <span className="text-sm font-bold text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text">
                CITY HYGIENE DASHBOARD SAMPLE
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200/50">
                <p className="text-sm font-semibold text-blue-600 mb-2">CITY SCORE</p>
                <p className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
                  7.8
                </p>
              </div>
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-200/50">
                <p className="text-sm font-semibold text-cyan-600 mb-2">FACILITIES</p>
                <p className="text-5xl font-bold text-[#2D3436]">412</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200/50">
                <p className="text-sm font-semibold text-blue-600 mb-2">LAST UPDATED</p>
                <p className="text-5xl font-bold text-[#2D3436]">04</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 h-4 rounded-full mb-6 shadow-lg"></div>

            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-5 flex justify-between items-center border border-gray-200">
              <p className="text-[#636e72] italic">"Send fixed manual logs to this address"</p>
              <button className="text-blue-600 hover:text-cyan-500 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How SaafAI Helps ULBs - Light Theme */}
      <section className="py-24 px-5 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50" ref={addSectionRef}>
        <div className="max-w-6xl mx-auto text-center mb-16">
          <span className="inline-block bg-gradient-to-r from-blue-600/10 to-cyan-500/10 text-blue-600 px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wide mb-6 border border-blue-500/20">
            Our Solution
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2D3436]">How SaafAI Helps ULBs</h2>
          <p className="text-xl text-[#636e72]">
            Transforming your city's sanitation from uncertainty to data-backed excellence.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Feature 1 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-blue-200/30 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <span className="text-4xl">👁️</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#2D3436]">1. Area-Level Hygiene Visibility</h3>
            <p className="text-[#636e72] leading-relaxed">
              Track real-time hygiene scores for every public toilet in your jurisdiction. Unified
              oversight means real accountability — proactive instead of reactive becomes
              attainable.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-cyan-200/30 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#2D3436]">2. Early Identification</h3>
            <p className="text-[#636e72] leading-relaxed">
              Early warnings trigger targeted actions before cleanliness nosedives. Residents
              report zero issues to municipal officers, before close-complaints escalate to
              political-level grievances.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-blue-200/30 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <span className="text-4xl">✓</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#2D3436]">3. Accountability Without Micromanagement</h3>
            <p className="text-[#636e72] leading-relaxed">
              Verify contractor SLAs through visual evidence—no need for hundreds of daily
              check-ins or subjective "looking at both" random officials' anecdotal maintenance
              opinions.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-cyan-200/30 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <span className="text-4xl">📊</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#2D3436]">4. Evidence for Reviews and Audits</h3>
            <p className="text-[#636e72] leading-relaxed">
              SaafAI automatically captures "before-and-after" photo documentation that supports
              internal reviews and third-party inspections, helping your team target Swachh audits.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-5" ref={addSectionRef}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Benefit 1 */}
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-lg border border-blue-200/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
              <span className="text-5xl">📈</span>
            </div>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              PRIORITIZATION
            </p>
            <h3 className="text-3xl font-bold text-[#2D3436] mb-4">Better</h3>
            <p className="text-[#636e72] leading-relaxed">
              Focus resources where they matter most.
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-lg border border-cyan-200/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
              <span className="text-5xl">⚡</span>
            </div>
            <p className="text-xs font-bold text-cyan-600 uppercase tracking-wider mb-2">
              RESPONSE
            </p>
            <h3 className="text-3xl font-bold text-[#2D3436] mb-4">Faster</h3>
            <p className="text-[#636e72] leading-relaxed">
              Immediate alerts for drop-off zones.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-lg border border-blue-200/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
              <span className="text-5xl">👍</span>
            </div>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              PUBLIC CONFIDENCE
            </p>
            <h3 className="text-3xl font-bold text-[#2D3436] mb-4">Improved</h3>
            <p className="text-[#636e72] leading-relaxed">
              A cleaner city leads to happier citizens.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-5 bg-gradient-to-br from-[#E8F8F5] to-[#E0F2FE]" ref={addSectionRef}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2D3436] mb-6">
            Ready to modernize your city's hygiene oversight?
          </h2>
          <p className="text-xl text-[#636e72] mb-10 max-w-2xl mx-auto">
            Join forward-thinking Urban Local Bodies who are using data to restore dignity to public
            sanitation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-5 px-10 rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105">
              Request a City Walkthrough
            </button>
            <button className="bg-white text-[#2D3436] border-2 border-blue-300 font-bold py-5 px-10 rounded-full hover:border-cyan-500 hover:text-cyan-600 hover:shadow-lg transition-all duration-300 hover:scale-105">
              Download Framework
            </button>
          </div>

          <p className="text-sm text-[#636e72] mt-8">
            We facilitate evaluation required for public audit projects.
          </p>
        </div>
      </section>
    </main>
  )
}
