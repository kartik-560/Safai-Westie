'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Briefcase } from 'lucide-react'

export default function ContactPage() {
  const [investorData, setInvestorData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    investmentRange: '',
    message: ''
  })

  const [loading, setLoading] = useState(false)

  const handleInvestorSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    alert('Thank you for your investment interest! Our team will contact you within 24 hours.')
    setInvestorData({
      name: '',
      email: '',
      phone: '',
      company: '',
      investmentRange: '',
      message: ''
    })
    setLoading(false)
  }

  const handleInvestorChange = (e) => {
    setInvestorData({
      ...investorData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <main className="bg-gradient-to-b from-white via-emerald-50/20 to-white">
      
      {/* Hero Section */}
      <section className="px-[5%] py-24 md:py-32 text-center relative overflow-hidden">
        <div className="absolute -left-24 -top-24 w-72 h-72 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute -right-20 bottom-0 w-80 h-80 rounded-full bg-sky-300/25 blur-3xl" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block bg-[#6C5CE7]/10 text-[#6C5CE7] px-4 py-2 
                         rounded-full font-bold text-xs uppercase tracking-wide mb-6">
            Investor Relations
          </span>
          
          <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-extrabold mb-6 leading-tight text-[#2D3436]">
            Invest in the Future of Public Sanitation
          </h1>
          
          <p className="text-xl text-[#636e72] leading-relaxed max-w-3xl mx-auto">
            Join us in transforming how India experiences public toilets through AI-powered 
            hygiene monitoring and transparent sanitation standards.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      {/* <section className="px-[5%] py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-16">
          
          <div className="p-8 rounded-2xl bg-white border border-gray-200 hover:border-[#00D2D3] 
                         hover:shadow-lg transition-all duration-300 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#6C5CE7]/10 to-[#00D2D3]/10 
                         flex items-center justify-center">
              <Mail className="w-8 h-8 text-[#6C5CE7]" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-[#2D3436]">Email Us</h3>
            <a href="mailto:investors@saafai.in" className="text-[#636e72] hover:text-[#00D2D3] transition-colors">
              investors@saafai.in
            </a>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-gray-200 hover:border-[#00D2D3] 
                         hover:shadow-lg transition-all duration-300 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#6C5CE7]/10 to-[#00D2D3]/10 
                         flex items-center justify-center">
              <Phone className="w-8 h-8 text-[#6C5CE7]" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-[#2D3436]">Call Us</h3>
            <a href="tel:+919876543210" className="text-[#636e72] hover:text-[#00D2D3] transition-colors">
              +91 98765 43210
            </a>
            <p className="text-sm text-gray-500 mt-1">Mon-Fri, 9AM-6PM IST</p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-gray-200 hover:border-[#00D2D3] 
                         hover:shadow-lg transition-all duration-300 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#6C5CE7]/10 to-[#00D2D3]/10 
                         flex items-center justify-center">
              <MapPin className="w-8 h-8 text-[#6C5CE7]" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-[#2D3436]">Visit Us</h3>
            <p className="text-[#636e72] text-sm">
              Pune, Maharashtra<br />India - 411001
            </p>
          </div>
        </div>
      </section> */}

      {/* Investor Contact Form */}
      <section className="px-[5%] pb-16">
        <div className="max-w-4xl mx-auto">
          
          <div className="bg-gradient-to-br from-white to-purple-50 p-8 md:p-12 rounded-3xl shadow-xl border border-purple-100">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-8 h-8 text-[#6C5CE7]" />
              <div>
                <h2 className="text-2xl font-bold text-[#2D3436]">Investment Inquiry</h2>
                <p className="text-sm text-[#636e72]">Let&apos;s discuss investment opportunities</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#6C5CE7]/10 to-[#00D2D3]/10 p-6 rounded-2xl mb-8">
              <h3 className="font-bold text-[#2D3436] mb-3">Why Invest in saafAI?</h3>
              <ul className="space-y-2 text-sm text-[#636e72]">
                <li>✓ Addressing a $10B+ market opportunity in India</li>
                <li>✓ Government-backed Swachh Bharat Mission alignment</li>
                <li>✓ Proprietary AI technology with proven accuracy</li>
                <li>✓ Scalable B2B and B2C revenue model</li>
                <li>✓ Strong social impact with commercial viability</li>
              </ul>
            </div>
            
            <form onSubmit={handleInvestorSubmit} className="space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#2D3436] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={investorData.name}
                    onChange={handleInvestorChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 
                             focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 
                             outline-none transition-all"
                    placeholder="John Investor"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2D3436] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={investorData.email}
                    onChange={handleInvestorChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 
                             focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 
                             outline-none transition-all"
                    placeholder="investor@fund.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#2D3436] mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={investorData.phone}
                    onChange={handleInvestorChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 
                             focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 
                             outline-none transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2D3436] mb-2">
                    Company/Fund Name *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={investorData.company}
                    onChange={handleInvestorChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 
                             focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 
                             outline-none transition-all"
                    placeholder="XYZ Ventures"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2D3436] mb-2">
                  Investment Range *
                </label>
                <select
                  name="investmentRange"
                  value={investorData.investmentRange}
                  onChange={handleInvestorChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 
                           focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 
                           outline-none transition-all"
                >
                  <option value="">Select range</option>
                  <option value="under-50l">Under ₹50 Lakhs</option>
                  <option value="50l-1cr">₹50 Lakhs - ₹1 Crore</option>
                  <option value="1cr-5cr">₹1 Crore - ₹5 Crores</option>
                  <option value="5cr-10cr">₹5 Crores - ₹10 Crores</option>
                  <option value="above-10cr">Above ₹10 Crores</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2D3436] mb-2">
                  Additional Information *
                </label>
                <textarea
                  name="message"
                  value={investorData.message}
                  onChange={handleInvestorChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 
                           focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 
                           outline-none transition-all resize-none"
                  placeholder="Tell us about your investment interests, timeline, and any specific questions..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#6C5CE7] to-[#00D2D3] text-white 
                         px-8 py-4 rounded-full font-bold text-lg
                         hover:shadow-2xl hover:scale-[1.02] transition-all duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2"
              >
                {loading ? (
                  'Submitting...'
                ) : (
                  <>
                    <Briefcase className="w-5 h-5" />
                    Submit Investment Inquiry
                  </>
                )}
              </button>

              <p className="text-xs text-center text-[#636e72] mt-4">
                Our investment team will review your inquiry and respond within 24 hours with 
                our pitch deck and financial projections.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
