'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useInView } from 'framer-motion'
import {
    Target,
    BarChart3,
    ShieldCheck,
    TrendingUp,
    Code,
    Smartphone,
    Building2,
    Eye,
    FileCheck,
    Crosshair,
    CheckCircle,
    Users
} from 'lucide-react'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

export default function FacilityManagementPage() {
    const sectionRefs = useRef([])
    const heroRef = useRef(null)
    const heroInView = useInView(heroRef, { once: true, amount: 0.2 })
    const integrationRef = useRef(null)
    const integrationInView = useInView(integrationRef, { once: true, amount: 0.1 })
    const problemRef = useRef(null)
    const problemInView = useInView(problemRef, { once: true, amount: 0.1 })
    const solutionRef = useRef(null)
    const solutionInView = useInView(solutionRef, { once: true, amount: 0.1 })
    const benefitsRef = useRef(null)
    const benefitsInView = useInView(benefitsRef, { once: true, amount: 0.1 })

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
        <main className="w-full min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] ">

            {/* Hero Section */}
            <section
                ref={heroRef}
                className="relative w-full flex items-center justify-center 
               px-5 sm:px-6 md:px-8 lg:px-12
               pt-28 sm:pt-32 md:pt-36 lg:pt-32
               pb-8 sm:pb-12 md:pb-16 lg:pb-20
               overflow-hidden"
            >
                <div className="max-w-6xl mx-auto text-center w-full">

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-[1.75rem] leading-[2.2rem] 
                       sm:text-4xl sm:leading-[2.8rem]
                       md:text-5xl md:leading-[3.5rem]
                       lg:text-6xl lg:leading-tight
                       font-bold 
                       mb-4 sm:mb-5 md:mb-6 lg:mb-8
                       text-white
                       px-2"
                    >
                        Standardized hygiene intelligence,{' '}
                        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
                            integrated your way.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-sm leading-relaxed
                      sm:text-base sm:leading-relaxed
                      md:text-lg md:leading-relaxed
                      lg:text-xl lg:leading-relaxed
                      text-slate-300 
                      max-w-[95%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl
                      mx-auto 
                      mb-6 sm:mb-7 md:mb-8 lg:mb-10
                      px-2"
                    >
                        SaafAI provides facility managers with a powerful rating engine delivered via{' '}
                        <span className="font-bold text-white">Seamless API</span> or our{' '}
                        <span className="font-bold text-white">Standalone App</span>.
                        Track cleanliness, verify SLAs, and demonstrate quality effortlessly.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-2"
                    >
                        <button className="w-full sm:w-auto
                bg-gradient-to-r from-blue-600 to-cyan-500 text-white 
                font-bold 
                py-3 px-6 
                sm:py-3.5 sm:px-7 
                md:py-4 md:px-8
                text-sm sm:text-base md:text-lg
                rounded-full 
                hover:shadow-xl hover:shadow-blue-500/50
                transition-all duration-300 hover:scale-105 active:scale-95
                inline-flex items-center justify-center">
                            Get API Access →
                        </button>
                        <button className="w-full sm:w-auto
                bg-slate-800 border-2 border-slate-700 text-white 
                font-bold 
                py-3 px-6 
                sm:py-3.5 sm:px-7 
                md:py-4 md:px-8
                text-sm sm:text-base md:text-lg
                rounded-full 
                hover:border-cyan-500 hover:bg-slate-700
                hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95
                inline-flex items-center justify-center">
                            Get Product Demo
                        </button>
                    </motion.div>
                </div>
            </section>


            {/* Product Image Section */}
            <section className="w-full py-16 md:py-24 px-4 md:px-5 overflow-hidden" ref={addSectionRef}>
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative rounded-3xl overflow-hidden shadow-2xl 
                            bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-8 md:p-16 
                            border border-blue-500/20 hover:border-blue-500/40
                            transition-all duration-500"
                    >
                        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 text-center 
                            min-h-[400px] flex items-center justify-center border border-slate-700/50">
                            <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 
                                text-transparent bg-clip-text">
                                Product Dashboard Preview
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Integration Options */}
            <section className="w-full py-16 md:py-24 px-4 md:px-5 overflow-hidden" ref={integrationRef}>
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={integrationInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Choose Your Integration Path
                        </h2>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                            Flexible deployment options to match your existing infrastructure
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* API Integration Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={integrationInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="group relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 
                                backdrop-blur-sm rounded-3xl p-10 
                                border border-blue-500/20 shadow-lg 
                                hover:shadow-2xl hover:shadow-blue-500/30
                                hover:-translate-y-2 hover:border-blue-500/50
                                transition-all duration-500 overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b 
                                from-blue-600 to-cyan-500 rounded-l-3xl 
                                group-hover:w-3 transition-all duration-300"></div>

                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-500/5 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 
                                    rounded-2xl flex items-center justify-center mb-6 
                                    shadow-lg shadow-blue-500/30
                                    group-hover:scale-110 group-hover:rotate-6
                                    group-hover:shadow-blue-500/50
                                    transition-all duration-300">
                                    <Code className="w-8 h-8 text-white" strokeWidth={2} />
                                </div>

                                {/* <span className="inline-block bg-blue-500/20 text-blue-400 
                                    px-4 py-2 rounded-full text-sm font-bold mb-4
                                    group-hover:bg-blue-500/30 group-hover:text-blue-300
                                    transition-all duration-300">
                                    DEVELOPER FRIENDLY
                                </span> */}

                                <h3 className="text-3xl font-bold text-white mb-4
                                    group-hover:text-transparent group-hover:bg-gradient-to-r 
                                    group-hover:from-blue-400 group-hover:to-cyan-400 
                                    group-hover:bg-clip-text transition-all duration-300">
                                    API Integration
                                </h3>

                                <p className="text-slate-400 text-lg leading-relaxed mb-6
                                    group-hover:text-slate-300 transition-colors duration-300">
                                    Already have an app for daily operations, attendance, or tasks?
                                    Plug SaafAI's rating engine directly into your existing workflow.
                                </p>

                                <ul className="space-y-4 mb-8">
                                    {[
                                        'No new app for staff to learn',
                                        'Sync with your existing workflows',
                                        'AI generated rating for toilets'
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start group/item">
                                            <span className="text-cyan-400 text-2xl mr-3 
                                                group-hover/item:scale-125 transition-transform duration-300">✓</span>
                                            <p className="font-semibold text-slate-300
                                                group-hover/item:text-white transition-colors duration-300">{item}</p>
                                        </li>
                                    ))}
                                </ul>

                                <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 
                                    text-white font-bold py-4 px-8 rounded-full 
                                    hover:shadow-lg hover:shadow-blue-500/50
                                    transition-all duration-300 hover:scale-105">
                                    Get API Access →
                                </button>

                                <div className="absolute bottom-0 left-0 right-0 h-1 
                                    bg-gradient-to-r from-blue-600 to-cyan-500
                                    transform scale-x-0 group-hover:scale-x-100
                                    transition-transform duration-500 ease-out"></div>
                            </div>
                        </motion.div>

                        {/* Standalone App Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={integrationInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="group relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 
                                backdrop-blur-sm rounded-3xl p-10 
                                border border-cyan-500/20 shadow-lg 
                                hover:shadow-2xl hover:shadow-cyan-500/30
                                hover:-translate-y-2 hover:border-cyan-500/50
                                transition-all duration-500 overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b 
                                from-cyan-500 to-blue-600 rounded-l-3xl
                                group-hover:w-3 transition-all duration-300"></div>

                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 
                                    rounded-2xl flex items-center justify-center mb-6 
                                    shadow-lg shadow-cyan-500/30
                                    group-hover:scale-110 group-hover:rotate-6
                                    group-hover:shadow-cyan-500/50
                                    transition-all duration-300">
                                    <Smartphone className="w-8 h-8 text-white" strokeWidth={2} />
                                </div>

                                {/* <span className="inline-block bg-cyan-500/20 text-cyan-400 
                                    px-4 py-2 rounded-full text-sm font-bold mb-4
                                    group-hover:bg-cyan-500/30 group-hover:text-cyan-300
                                    transition-all duration-300">
                                    TURNKEY SOLUTION
                                </span> */}

                                <h3 className="text-3xl font-bold text-white mb-4
                                    group-hover:text-transparent group-hover:bg-gradient-to-r 
                                    group-hover:from-cyan-400 group-hover:to-blue-400 
                                    group-hover:bg-clip-text transition-all duration-300">
                                    Standalone App
                                </h3>

                                <p className="text-slate-400 text-lg leading-relaxed mb-6
                                    group-hover:text-slate-300 transition-colors duration-300">
                                    Starting from scratch? We provide a ready-to-use application for all
                                    operational activities, from staff tracking to hygiene auditing.
                                </p>

                                <ul className="space-y-4 mb-8">
                                    {[
                                        'Full staff management suite',
                                        'Built-in rating interface',
                                        'Instant cloud deployment'
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start group/item">
                                            <span className="text-cyan-400 text-2xl mr-3
                                                group-hover/item:scale-125 transition-transform duration-300">✓</span>
                                            <p className="font-semibold text-slate-300
                                                group-hover/item:text-white transition-colors duration-300">{item}</p>
                                        </li>
                                    ))}
                                </ul>

                                <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 
                                    text-white font-bold py-4 px-8 rounded-full 
                                    hover:shadow-lg hover:shadow-cyan-500/50
                                    transition-all duration-300 hover:scale-105">
                                    Get Product Demo →
                                </button>

                                <div className="absolute bottom-0 left-0 right-0 h-1 
                                    bg-gradient-to-r from-cyan-500 to-blue-600
                                    transform scale-x-0 group-hover:scale-x-100
                                    transition-transform duration-500 ease-out"></div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Problem Statement */}
            <section className="w-full py-16 md:py-24 px-4 md:px-5 overflow-hidden" ref={problemRef}>
                <div className="max-w-6xl mx-auto text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={problemInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                    >
                        Operational challenges shouldn't <br className="hidden md:block" />
                        limit your quality
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={problemInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-slate-300 max-w-3xl mx-auto"
                    >
                        Whether you integrate or go standalone, we solve the core invisibility
                        of manual hygiene oversight.
                    </motion.p>
                </div>

                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    {[
                        {
                            Icon: Building2,
                            title: 'Multi-Site Variance',
                            description: 'Varying footfall and team capabilities across sites lead to inconsistent hygiene outcomes.',
                            delay: 0.3
                        },
                        {
                            Icon: Eye,
                            title: 'Manual Supervision',
                            description: "It is impossible to be everywhere at once. Periodic checks don't capture the full picture.",
                            delay: 0.5
                        },
                        {
                            Icon: FileCheck,
                            title: 'Client Expectations',
                            description: 'End-clients today demand measurable performance data and defensible compliance reports.',
                            delay: 0.7
                        },
                    ].map((challenge, idx) => {
                        const IconComponent = challenge.Icon
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 50 }}
                                animate={problemInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                                transition={{ duration: 0.6, delay: challenge.delay }}
                                className="group bg-gradient-to-br from-slate-800/70 to-slate-900/70 
                                    backdrop-blur-sm rounded-2xl p-8 
                                    shadow-lg border border-slate-700/50
                                    hover:shadow-2xl hover:shadow-blue-500/20
                                    hover:-translate-y-2 hover:border-blue-500/50
                                    hover:scale-105
                                    transition-all duration-300"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 
                                    rounded-xl flex items-center justify-center mb-6 
                                    shadow-lg shadow-blue-500/30
                                    group-hover:scale-110 group-hover:rotate-6
                                    transition-all duration-300">
                                    <IconComponent className="w-8 h-8 text-white" strokeWidth={2} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4
                                    group-hover:text-transparent group-hover:bg-gradient-to-r 
                                    group-hover:from-blue-400 group-hover:to-cyan-400 
                                    group-hover:bg-clip-text transition-all duration-300">
                                    {challenge.title}
                                </h3>
                                <p className="text-slate-400 leading-relaxed
                                    group-hover:text-slate-300 transition-colors duration-300">
                                    {challenge.description}
                                </p>
                            </motion.div>
                        )
                    })}
                </div>
            </section>

            {/* Solution Features */}
            <section className="w-full py-16 md:py-24 px-4 md:px-5 overflow-hidden" ref={solutionRef}>
                <div className="max-w-6xl mx-auto text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={solutionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-block mb-4">
                            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 
                                text-transparent bg-clip-text font-bold text-sm uppercase tracking-wider">
                                Enterprise-Grade Solution
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Unlocking Multi-Site Quality
                        </h2>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                            Transform how you manage hygiene across your entire portfolio with AI-powered insights
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        {
                            num: '01',
                            title: 'Standardized Hygiene Vision',
                            description: 'Every facility is scanned via AI, ensuring that a "9/10" in one city is exactly the same as a "9/10" in another. No subjective human variation.',
                            Icon: Target,
                            color: 'from-blue-600 to-cyan-500',
                            delay: 0.2
                        },
                        {
                            num: '02',
                            title: 'Visual Compliance Dashboard',
                            description: 'Monitor your entire portfolio via a visual feed. Drill down into specific facilities to see the "before and after" of cleaning tasks instantly.',
                            Icon: BarChart3,
                            color: 'from-cyan-500 to-blue-500',
                            delay: 0.4
                        },
                        {
                            num: '03',
                            title: 'Defensible SLA Proof',
                            description: 'Provide your clients with AI-certified hygiene reports. Use vision-backed data to prove that you are meeting and exceeding contract requirements.',
                            Icon: ShieldCheck,
                            color: 'from-blue-600 to-indigo-600',
                            delay: 0.6
                        },
                        {
                            num: '04',
                            title: 'AI-Guided Improvement',
                            description: "SaafAI doesn't just score—it highlights specific areas (e.g., floor stains, missing supplies) for staff to address immediately.",
                            Icon: TrendingUp,
                            color: 'from-cyan-500 to-blue-600',
                            delay: 0.8
                        },
                    ].map((feature, idx) => {
                        const IconComponent = feature.Icon
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={solutionInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.6, delay: feature.delay }}
                                className="group relative bg-gradient-to-br from-slate-800/70 to-slate-900/70 
                                    backdrop-blur-sm rounded-2xl p-8 
                                    shadow-lg border border-slate-700/50
                                    hover:shadow-2xl hover:border-transparent hover:-translate-y-1 
                                    transition-all duration-300 ease-out overflow-hidden"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 
                                    group-hover:opacity-10 transition-opacity duration-300`}></div>

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl 
                                            bg-gradient-to-br ${feature.color} text-white
                                            shadow-lg group-hover:scale-110 group-hover:rotate-6
                                            transition-transform duration-300`}>
                                            <IconComponent size={28} strokeWidth={2} />
                                        </div>
                                        <span className="text-5xl font-bold text-slate-800 
                                            group-hover:text-slate-700 transition-colors duration-300">
                                            {feature.num}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-4 
                                        group-hover:text-transparent group-hover:bg-gradient-to-r 
                                        group-hover:from-blue-400 group-hover:to-cyan-400
                                        group-hover:bg-clip-text transition-all duration-300">
                                        {feature.title}
                                    </h3>

                                    <p className="text-slate-400 text-base leading-relaxed
                                        group-hover:text-slate-300 transition-colors duration-300">
                                        {feature.description}
                                    </p>

                                    <div className={`mt-6 h-1 w-0 bg-gradient-to-r ${feature.color} rounded-full 
                                        group-hover:w-full transition-all duration-500`}></div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={solutionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    className="max-w-6xl mx-auto text-center mt-16"
                >
                    <p className="text-lg text-slate-300 mb-6">
                        Ready to standardize quality across your facilities?
                    </p>
                    <button className="bg-gradient-to-r from-blue-600 to-cyan-500 
                        hover:from-blue-700 hover:to-cyan-600 
                        text-white font-bold py-4 px-8 rounded-full 
                        transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/50 hover:scale-105">
                        Schedule a Demo
                    </button>
                </motion.div>
            </section>

            {/* Benefits Grid */}
            <section className="w-full py-16 md:py-24 px-4 md:px-5 overflow-hidden" ref={benefitsRef}>
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    {[
                        {
                            Icon: Crosshair,
                            title: 'Total Control',
                            subtitle: 'Control',
                            description: "See your facilities even when you aren't there. Manage by visual facts, not hearsay.",
                            delay: 0.2
                        },
                        {
                            Icon: CheckCircle,
                            title: 'Instant Proof',
                            subtitle: 'Verification',
                            description: 'Automated AI audits provide a clear trail of evidence for management and clients.',
                            delay: 0.4
                        },
                        {
                            Icon: Users,
                            title: 'Retained Contracts',
                            subtitle: 'Trust',
                            description: 'High client confidence through transparency leads to longer, more profitable partnerships.',
                            delay: 0.6
                        },
                    ].map((benefit, idx) => {
                        const IconComponent = benefit.Icon
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                animate={benefitsInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
                                transition={{ duration: 0.6, delay: benefit.delay }}
                                className="group text-center bg-gradient-to-br from-slate-800/70 to-slate-900/70 
                                    backdrop-blur-sm rounded-3xl p-10 
                                    shadow-lg border border-slate-700/50
                                    hover:shadow-2xl hover:shadow-blue-500/20
                                    hover:-translate-y-2 hover:border-blue-500/50
                                    transition-all duration-300"
                            >
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 
                                    rounded-full flex items-center justify-center mx-auto mb-6 
                                    shadow-lg shadow-blue-500/30
                                    group-hover:scale-110 group-hover:rotate-12
                                    transition-all duration-300">
                                    <IconComponent className="w-10 h-10 text-white" strokeWidth={2} />
                                </div>
                                <p className="text-sm font-bold text-cyan-400 uppercase tracking-wide mb-2
                                    group-hover:text-cyan-300 transition-colors duration-300">
                                    {benefit.subtitle}
                                </p>
                                <h3 className="text-2xl font-bold text-white mb-4
                                    group-hover:text-transparent group-hover:bg-gradient-to-r 
                                    group-hover:from-blue-400 group-hover:to-cyan-400 
                                    group-hover:bg-clip-text transition-all duration-300">
                                    {benefit.title}
                                </h3>
                                <p className="text-slate-400 leading-relaxed
                                    group-hover:text-slate-300 transition-colors duration-300">
                                    {benefit.description}
                                </p>
                            </motion.div>
                        )
                    })}
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full py-16 md:py-24 px-4 md:px-5 overflow-hidden" ref={addSectionRef}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center bg-gradient-to-br from-blue-600 to-cyan-500 
                        rounded-3xl p-12 md:p-16 shadow-2xl hover:shadow-blue-500/50
                        transition-shadow duration-500"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to integrate intelligence?
                    </h2>
                    <p className="text-xl text-white/90 mb-10">
                        Get started with our API to enhance your existing app, or deploy our full
                        operational suite today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-blue-600 font-bold py-4 px-10 
                            rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105">
                            Get API Access
                        </button>
                        <button className="bg-white/10 backdrop-blur-sm border-2 border-white 
                            text-white font-bold py-4 px-10 rounded-full 
                            hover:bg-white/20 transition-all duration-300 hover:scale-105">
                            Get Product Demo
                        </button>
                    </div>
                </motion.div>
            </section>
        </main>
    )
}
