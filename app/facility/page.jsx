'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

export default function FacilityManagementPage() {
    const sectionRefs = useRef([])
    const sectionRef = useRef([])

    useEffect(() => {
        sectionRefs.current.forEach((section, i) => {
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
        <main className="bg-gradient-to-b from-emerald-50 via-sky-50 to-white mt-10">
            {/* Hero Section */}
            <section
                ref={sectionRef}
                className="relative py-20 md:py-32 px-5 overflow-hidden bg-gradient-to-br from-[#E8F8F5] via-[#F0FDFA] to-[#E0F2FE]"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                        {/* Left Content */}
                        <div className="space-y-8">
                            {/* Heading */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#2D3436]">
                                Standardized hygiene intelligence,{' '}
                                <span className="gradient-text">
                                    integrated your way.
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="text-lg md:text-xl text-[#636e72] leading-relaxed">
                                SaafAI provides facility managers with a powerful rating engine delivered via{' '}
                                <span className="font-bold text-[#2D3436]">Seamless API</span> or our{' '}
                                <span className="font-bold text-[#2D3436]">Standalone App</span>.
                                Track cleanliness, verify SLAs, and demonstrate quality effortlessly.
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="bg-gradient-to-r from-[#6366F1] to-[#06B6D4] hover:from-[#4F46E5] hover:to-[#0891B2] 
                           text-white font-bold py-4 px-8 rounded-full 
                           transition-all duration-300 hover:shadow-xl hover:scale-105">
                                    Get API Access
                                </button>
                                <button className="bg-white hover:bg-gray-50 text-[#2D3436] font-bold 
                           py-4 px-8 rounded-full border-2 border-gray-200 
                           transition-all duration-300 hover:border-[#6366F1] 
                           hover:shadow-lg">
                                    Get Product Demo
                                </button>
                            </div>
                        </div>

                        {/* Right Side - Accuracy Badge with Animation Line */}
                        <div className="relative flex justify-center lg:justify-end">
                            <div className="relative">
                                {/* Animated Progress Line */}
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[6px] 
                        bg-gradient-to-r from-transparent via-gray-300 to-gray-300 
                        rounded-full -z-10">
                                    <div className="h-full w-[45%] bg-gradient-to-r from-[#6366F1] to-[#06B6D4] 
                          rounded-full relative">
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 
                            w-4 h-4 bg-[#06B6D4] rounded-full 
                            shadow-[0_0_20px_rgba(6,182,212,0.6)]
                            animate-pulse">
                                        </div>
                                    </div>
                                </div>

                                {/* Accuracy Badge */}
                                <div className="relative bg-gradient-to-br from-[#6366F1] to-[#06B6D4] 
                        text-white rounded-[28px] px-8 py-6 
                        shadow-[0_20px_60px_rgba(99,102,241,0.3)]
                        min-w-[240px] md:min-w-[280px]">
                                    <div className="text-xs font-bold uppercase tracking-wider mb-2 opacity-90">
                                        LIVE ENGINE
                                    </div>
                                    <div className="text-4xl md:text-5xl font-bold mb-1">
                                        98.4%
                                    </div>
                                    <div className="text-xl md:text-2xl font-semibold">
                                        Accuracy
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


            {/* Product Image Section */}
            <section className="py-16 px-5" ref={addSectionRef}>
                <div className="max-w-6xl mx-auto">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 to-cyan-100 p-8 md:p-16">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center min-h-[400px] flex items-center justify-center">
                            <p className="text-2xl font-bold text-[#636e72]">Product Dashboard Preview</p>
                            {/* Replace with actual image */}
                            {/* <Image src="/path-to-product-image.png" alt="SaafAI Dashboard" fill className="object-contain" /> */}
                        </div>
                    </div>
                </div>
            </section>

            {/* Integration Options */}
            <section className="py-24 px-5" ref={addSectionRef}>
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* API Integration Card */}
                        <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-10 border border-blue-200/30 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-600 to-cyan-500 rounded-l-3xl"></div>

                            <div className="mb-6">
                                <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
                                    DEVELOPER FRIENDLY
                                </span>
                                <h3 className="text-3xl font-bold text-[#2D3436] mb-4">API Integration</h3>
                                <p className="text-[#636e72] text-lg leading-relaxed">
                                    Already have an app for daily operations, attendance, or tasks? Plug SaafAI's
                                    rating engine directly into your existing workflow.
                                </p>
                            </div>

                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="text-2xl mr-3">✓</span>
                                    <div>
                                        <p className="font-semibold text-[#2D3436]">No new app for staff to learn</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-2xl mr-3">✓</span>
                                    <div>
                                        <p className="font-semibold text-[#2D3436]">Sync with your existing workflows</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-2xl mr-3">✓</span>
                                    <div>
                                        <p className="font-semibold text-[#2D3436]">AI generated rating for toilets</p>
                                    </div>
                                </li>
                            </ul>

                            <div className="mt-8">
                                <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-4 px-8 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105">
                                    Get API Access →
                                </button>
                            </div>
                        </div>

                        {/* Standalone App Card */}
                        <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-10 border border-cyan-200/30 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-cyan-500 to-blue-600 rounded-l-3xl"></div>

                            <div className="mb-6">
                                <span className="inline-block bg-cyan-100 text-cyan-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
                                    TURNKEY SOLUTION
                                </span>
                                <h3 className="text-3xl font-bold text-[#2D3436] mb-4">Standalone App</h3>
                                <p className="text-[#636e72] text-lg leading-relaxed">
                                    Starting from scratch? We provide a ready-to-use application for all operational
                                    activities, from staff tracking to hygiene auditing.
                                </p>
                            </div>

                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="text-2xl mr-3">✓</span>
                                    <div>
                                        <p className="font-semibold text-[#2D3436]">Full staff management suite</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-2xl mr-3">✓</span>
                                    <div>
                                        <p className="font-semibold text-[#2D3436]">Built-in rating interface</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-2xl mr-3">✓</span>
                                    <div>
                                        <p className="font-semibold text-[#2D3436]">Instant cloud deployment</p>
                                    </div>
                                </li>
                            </ul>

                            <div className="mt-8">
                                <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 px-8 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105">
                                    Get Product Demo →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem Statement */}
            <section className="py-24 px-5 bg-gradient-to-r from-blue-50 to-cyan-50" ref={addSectionRef}>
                <div className="max-w-6xl mx-auto text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#2D3436] mb-6">
                        Operational challenges shouldn't limit your quality
                    </h2>
                    <p className="text-xl text-[#636e72] max-w-3xl mx-auto">
                        Whether you integrate or go standalone, we solve the core invisibility of manual
                        hygiene oversight.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: '🏢',
                            title: 'Multi-Site Variance',
                            description:
                                'Varying footfall and team capabilities across sites lead to inconsistent hygiene outcomes.',
                        },
                        {
                            icon: '👁️',
                            title: 'Manual Supervision',
                            description:
                                "It is impossible to be everywhere at once. Periodic checks don't capture the full picture.",
                        },
                        {
                            icon: '📊',
                            title: 'Client Expectations',
                            description:
                                'End-clients today demand measurable performance data and defensible compliance reports.',
                        },
                    ].map((challenge, idx) => (
                        <div
                            key={idx}
                            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50"
                        >
                            <div className="text-6xl mb-6">{challenge.icon}</div>
                            <h3 className="text-2xl font-bold text-[#2D3436] mb-4">{challenge.title}</h3>
                            <p className="text-[#636e72] leading-relaxed">{challenge.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Solution Features */}
            <section className="py-24 px-5" ref={addSectionRef}>
                <div className="max-w-6xl mx-auto text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#2D3436] mb-4">
                        Unlocking Multi-Site Quality
                    </h2>
                </div>

                <div className="max-w-5xl mx-auto space-y-12">
                    {[
                        {
                            num: '1',
                            title: 'Standardized Hygiene Vision',
                            description:
                                'Every facility is scanned via AI, ensuring that a "9/10" in one city is exactly the same as a "9/10" in another. No subjective human variation.',
                            color: 'from-blue-600 to-cyan-500',
                        },
                        {
                            num: '2',
                            title: 'Visual Compliance Dashboard',
                            description:
                                'Monitor your entire portfolio via a visual feed. Drill down into specific facilities to see the "before and after" of cleaning tasks instantly.',
                            color: 'from-cyan-500 to-blue-600',
                        },
                        {
                            num: '3',
                            title: 'Defensible SLA Proof',
                            description:
                                'Provide your clients with AI-certified hygiene reports. Use vision-backed data to prove that you are meeting and exceeding contract requirements.',
                            color: 'from-blue-600 to-cyan-500',
                        },
                        {
                            num: '4',
                            title: 'AI-Guided Improvement',
                            description:
                                "SaafAI doesn't just score—it highlights specific areas (e.g., floor stains, missing supplies) for staff to address immediately.",
                            color: 'from-cyan-500 to-blue-600',
                        },
                    ].map((feature, idx) => (
                        <div
                            key={idx}
                            className="flex gap-6 items-start bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-blue-200/30 hover:shadow-xl transition-all duration-300"
                        >
                            <div
                                className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white font-bold text-2xl shadow-lg`}
                            >
                                {feature.num}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-[#2D3436] mb-3">{feature.title}</h3>
                                <p className="text-[#636e72] text-lg leading-relaxed">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="py-24 px-5 bg-gradient-to-b from-cyan-50 to-white" ref={addSectionRef}>
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: '🎯',
                            title: 'Total Control',
                            subtitle: 'Control',
                            description: "See your facilities even when you aren't there. Manage by visual facts, not hearsay.",
                        },
                        {
                            icon: '✅',
                            title: 'Instant Proof',
                            subtitle: 'Verification',
                            description:
                                'Automated AI audits provide a clear trail of evidence for management and clients.',
                        },
                        {
                            icon: '🤝',
                            title: 'Retained Contracts',
                            subtitle: 'Trust',
                            description:
                                'High client confidence through transparency leads to longer, more profitable partnerships.',
                        },
                    ].map((benefit, idx) => (
                        <div
                            key={idx}
                            className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-lg border border-blue-200/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                        >
                            <div className="text-6xl mb-6">{benefit.icon}</div>
                            <p className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-2">
                                {benefit.subtitle}
                            </p>
                            <h3 className="text-2xl font-bold text-[#2D3436] mb-4">{benefit.title}</h3>
                            <p className="text-[#636e72] leading-relaxed">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-5" ref={addSectionRef}>
                <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl p-12 md:p-16 shadow-2xl">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to integrate intelligence?
                    </h2>
                    <p className="text-xl text-white/90 mb-10">
                        Get started with our API to enhance your existing app, or deploy our full operational
                        suite today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-blue-600 font-bold py-4 px-10 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105">
                            Get API Access
                        </button>
                        <button className="bg-white/10 backdrop-blur-sm border-2 border-white text-white font-bold py-4 px-10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105">
                            Get Product Demo
                        </button>
                    </div>
                </div>
            </section>
        </main>
    )
}
