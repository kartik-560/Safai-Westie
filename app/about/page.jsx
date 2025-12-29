'use client'

import { useEffect, useRef } from 'react'
import { Target, Eye, Users, Award, Zap, Shield, TrendingUp, Heart } from 'lucide-react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
export default function AboutPage() {
  const sectionRef = useRef(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const sectionsRef = useRef([])

  useEffect(() => {
    // Animate all sections with fade-in-element class
    const elements = document.querySelectorAll('.fade-in-element')

    elements.forEach((element, index) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 50,
        },
        {
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: index * 0.1,
        }
      )
    })

    const valueCards = document.querySelectorAll('.value-card')
    gsap.fromTo(
      valueCards,
      { opacity: 0, y: 30, scale: 0.9 },
      {
        scrollTrigger: {
          trigger: '.values-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.2)',
      }
    )

    // Hero section special animation
    const heroSection = document.querySelector('.hero-content')
    if (heroSection) {
      gsap.fromTo(
        heroSection,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.2,
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('.fade-in-element')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Transparency',
      description: 'Making sanitation standards visible and verifiable through AI-powered scoring'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Accessibility',
      description: 'Ensuring every citizen can find and trust public washroom facilities'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Innovation',
      description: 'Leveraging cutting-edge AI and computer vision for real-time hygiene monitoring'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Public Health',
      description: 'Contributing to India\'s sanitation goals and Swachh Bharat Mission'
    }
  ]

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      description: 'IIT graduate with 15 years in tech and social impact'
    },
    {
      name: 'Priya Sharma',
      role: 'CTO',
      description: 'AI/ML expert, formerly at Google and Microsoft'
    },
    {
      name: 'Amit Patel',
      role: 'Head of Operations',
      description: 'Scale specialist with experience in government partnerships'
    },
    {
      name: 'Sneha Reddy',
      role: 'Head of Product',
      description: 'UX leader focused on accessibility and social good'
    }
  ]

  const milestones = [
    {
      year: '2023',
      title: 'Foundation',
      description: 'saafAI founded with mission to transform public sanitation'
    },
    {
      year: '2024',
      title: 'AI Model Launch',
      description: 'Launched proprietary hygiene rating engine with 95% accuracy'
    },
    {
      year: '2024',
      title: 'Partnership',
      description: 'Official Swachh Bharat Mission partner recognized by Government of India'
    },
    {
      year: '2025',
      title: 'Expansion',
      description: '10,000+ toilets rated across 50+ cities in India'
    }
  ]

  const handleFindToiletClick = (e) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)

    if (pathname === '/') {
      // Already on home page, just scroll
      const element = document.getElementById('locator')
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
        window.history.pushState(null, '', '/#locator')
      }
    } else {
      // On different page, navigate to home then scroll
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
    <main className="bg-gradient-to-b from-white via-emerald-50/20 to-white">

      {/* Hero Section */}
      <section className="px-[5%] py-24 md:py-32 text-center relative overflow-hidden">
        <div className="absolute -left-24 -top-24 w-72 h-72 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute -right-20 bottom-0 w-80 h-80 rounded-full bg-sky-300/25 blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto hero-content opacity-0">
          <span className="inline-block bg-[#6C5CE7]/10 text-[#6C5CE7] px-4 py-2 
                   rounded-full font-bold text-xs uppercase tracking-wide mb-6">
            About saafAI
          </span>

          <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-extrabold mb-6 leading-tight text-[#2D3436]">
            Redefining How India Experiences Public Toilets
          </h1>

          <p className="text-xl text-[#636e72] leading-relaxed max-w-3xl mx-auto">
            We are on a mission to make every public washroom in India predictably clean,
            transparent, and trustworthy through AI-powered hygiene monitoring.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="px-[5%] py-16 md:py-24">
        <div className="max-w-4xl mx-auto fade-in-element">
          <h2 className="text-[2.5rem] font-bold mb-8 text-[#2D3436] text-center">
            Our Story
          </h2>

          <div className="space-y-6">
            <p className="text-[#636e72] leading-relaxed text-lg">
              saafAI was born from a simple question: Why should finding a clean public toilet
              be a matter of luck?
            </p>

            <p className="text-[#636e72] leading-relaxed text-lg">
              In 2023, our founders - a group of technologists and social entrepreneurs - recognized that
              India&apos;s Swachh Bharat Mission had successfully built millions of public toilets. But
              availability was not enough. Citizens still hesitated to use them due to
              uncertainty about cleanliness and maintenance.
            </p>

            <p className="text-[#636e72] leading-relaxed text-lg">
              We realized that what was missing was accountability and transparency.
              Using AI and computer vision, we created India&apos;s first standardized toilet hygiene rating
              system - making sanitation quality measurable, visible, and improvable.
            </p>

            <p className="text-[#636e72] leading-relaxed text-lg">
              Today, saafAI empowers citizens to make informed decisions, helps facility managers
              maintain standards, and supports government initiatives with real-time data - all working
              toward a future where no one thinks twice before using a public washroom.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="px-[5%] py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

          <div className="group p-8 rounded-3xl bg-gradient-to-br from-emerald-50 to-sky-50 
                         hover:shadow-2xl transition-all duration-300 fade-in-element">
            <Target className="w-12 h-12 text-[#6C5CE7] mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-[#2D3436]">Our Mission</h3>
            <p className="text-[#636e72] leading-relaxed">
              To ensure every public toilet in India meets a minimum hygiene standard by making
              cleanliness transparent, verifiable, and continuously monitored using AI - empowering
              citizens and facility managers alike.
            </p>
          </div>

          <div className="group p-8 rounded-3xl bg-gradient-to-br from-sky-50 to-purple-50 
                         hover:shadow-2xl transition-all duration-300 fade-in-element">
            <Eye className="w-12 h-12 text-[#00D2D3] mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-[#2D3436]">Our Vision</h3>
            <p className="text-[#636e72] leading-relaxed">
              A future where citizens can trust public washrooms as much as any private facility - without
              uncertainty, discomfort, or compromise - making India a global leader in sanitation technology.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="px-[5%] py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 fade-in-element">
            <h2 className="text-[2.5rem] font-bold mb-4 text-[#2D3436]">
              Our Core Values
            </h2>
            <p className="text-lg text-[#636e72] max-w-2xl mx-auto">
              The principles that guide everything we do at saafAI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 values-grid">
            {values.map((value, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-white border border-gray-200
               hover:border-[#00D2D3] hover:shadow-lg transition-all duration-300 
               value-card opacity-0"
                style={{ '--delay': `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#6C5CE7]/10 to-[#00D2D3]/10 
                             flex items-center justify-center mb-4 text-[#6C5CE7]
                             group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h4 className="text-lg font-bold mb-2 text-[#2D3436]">{value.title}</h4>
                <p className="text-sm text-[#636e72] leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-[5%] py-16 md:py-24 bg-gradient-to-b from-white to-emerald-50/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 fade-in-element opacity-0">
            <h2 className="text-[2.5rem] font-bold mb-4 text-[#2D3436]">
              Our Journey
            </h2>
            <p className="text-lg text-[#636e72]">
              Key milestones in our mission to transform public sanitation
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#6C5CE7] to-[#00D2D3]" />

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative pl-20 fade-in-element opacity-0">
                  <div className="absolute left-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#6C5CE7] to-[#00D2D3] 
                         flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {milestone.year}
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
                    <h4 className="text-xl font-bold mb-2 text-[#2D3436]">{milestone.title}</h4>
                    <p className="text-[#636e72]">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Team Section */}
      <section className="px-[5%] py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 fade-in-element">
            <h2 className="text-[2.5rem] font-bold mb-4 text-[#2D3436]">
              Meet Our Team
            </h2>
            <p className="text-lg text-[#636e72] max-w-2xl mx-auto">
              Passionate innovators combining technology and social impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="text-center fade-in-element group"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#6C5CE7] to-[#00D2D3] 
                             flex items-center justify-center text-white text-3xl font-bold
                             group-hover:scale-110 transition-transform">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h4 className="text-lg font-bold mb-1 text-[#2D3436]">{member.name}</h4>
                <p className="text-sm text-[#6C5CE7] font-semibold mb-2">{member.role}</p>
                <p className="text-sm text-[#636e72]">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-[5%] py-16 md:py-24 bg-gradient-to-br from-[#6C5CE7] to-[#00D2D3] text-white text-center">
        <div className="max-w-3xl mx-auto fade-in-element">
          <Award className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-[2.5rem] font-bold mb-6">
            Join Us in Our Mission
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Whether you are a citizen, facility manager, government partner, or investor -
            there is a place for you in the saafAI movement.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-[#6C5CE7] px-8 py-4 rounded-full font-bold
                       hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Get in Touch
            </Link>
            <button
              onClick={handleFindToiletClick}
              className="bg-gradient-to-r from-[#6C5CE7] to-[#00D2D3] text-white 
                         px-6 py-3 rounded-full font-bold text-center mt-4
                         shadow-[0_8px_16px_rgba(108,92,231,0.2)]"
            >
              Find a Toilet Near Me
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
