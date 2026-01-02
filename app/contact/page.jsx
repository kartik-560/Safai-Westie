'use client'

import { useState, useRef } from 'react'
import { Send } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [status, setStatus] = useState('')
  const formRef = useRef(null)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target

    let newValue = value

    // Phone: numbers only
    if (name === "phone") {
      newValue = value.replace(/\D/g, "")
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }))

    // Clear error for this field when user edits it
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validate = () => {
    const newErrors = {}

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (!/^[A-Za-z ]{2,}$/.test(formData.name)) {
      newErrors.name = "Enter a valid name (letters only)"
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address"
    }

    // Phone (optional)
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits"
    }

    // Message
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
 
    if (!validate()) return

    setStatus('Sending...')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setStatus('Message sent successfully! We\'ll get back to you soon.')
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        setStatus(`Error: ${data.error || 'Please try again.'}`)
      }
    } catch (error) {
      setStatus('Failed to send message. Please check your connection.')
    }

    setTimeout(() => setStatus(''), 5000)
  }

  return (
    <section className="min-h-screen py-24 px-4 md:px-8 lg:px-[5%] 
        bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 
        relative overflow-hidden flex items-center justify-center">
      
      {/* Decorative Blobs */}
      <div className="absolute -left-32 top-0 w-72 h-72 rounded-full 
          bg-blue-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -right-32 bottom-0 w-80 h-80 rounded-full 
          bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
          w-96 h-96 rounded-full bg-purple-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-3xl w-full mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block bg-gradient-to-r from-blue-600/10 to-cyan-500/10 
                text-transparent bg-clip-text font-bold text-xl uppercase 
                tracking-wide mb-5 border border-blue-500/20 px-4 py-1.5 rounded-full"
          >
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
              Get In Touch
            </span>
          </motion.span>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight text-white"
          >
            We'd Love to Hear From You
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-slate-300 text-lg leading-relaxed"
          >
            Have questions about saafAI? Want to partner with us? Reach out and let's make public sanitation better together.
          </motion.p>
        </div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 
                backdrop-blur-sm p-8 md:p-10 rounded-3xl 
                border border-slate-700/50 shadow-2xl
                hover:border-slate-600/50 transition-all duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-white mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 rounded-full 
                      bg-slate-900/50 border-2 border-slate-700
                      focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                      focus:outline-none transition-all duration-300
                      text-white placeholder-slate-500"
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                    <span className="text-red-400">⚠</span> {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-white mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 rounded-full 
                      bg-slate-900/50 border-2 border-slate-700
                      focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20
                      focus:outline-none transition-all duration-300
                      text-white placeholder-slate-500"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                    <span className="text-red-400">⚠</span> {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="phone" className="block text-sm font-bold text-white mb-2">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                maxLength={10}
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-5 py-3.5 rounded-full 
                    bg-slate-900/50 border-2 border-slate-700
                    focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20
                    focus:outline-none transition-all duration-300
                    text-white placeholder-slate-500"
                placeholder="+91 XXXXXXXXXX"
              />
              {errors.phone && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <span className="text-red-400">⚠</span> {errors.phone}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-bold text-white mb-2">
                Your Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-5 py-4 rounded-3xl 
                    bg-slate-900/50 border-2 border-slate-700
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                    focus:outline-none transition-all duration-300
                    text-white placeholder-slate-500 resize-none"
                placeholder="Tell us how we can help you..."
              />
              {errors.message && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <span className="text-red-400">⚠</span> {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white 
                  py-4 rounded-full font-bold text-lg
                  hover:shadow-xl hover:shadow-blue-500/50
                  hover:-translate-y-1 hover:scale-[1.02]
                  transition-all duration-300
                  flex items-center justify-center gap-2
                  disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={status === 'Sending...'}
            >
              <Send className="w-5 h-5" />
              {status === 'Sending...' ? 'Sending...' : 'Send Message'}
            </button>

            {status && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 p-4 rounded-2xl text-center font-semibold ${
                  status.includes('success')
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : status.includes('Error') || status.includes('Failed')
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                }`}
              >
                {status}
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  )
}
