'use client'

import { useState, useRef } from 'react'
import { Send, Mail, MapPin, Phone } from 'lucide-react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [status, setStatus] = useState('')
  const formRef = useRef(null)
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    // Phone: numbers only
    if (name === "phone") {
      newValue = value.replace(/\D/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear error for this field when user edits it
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };


  const validate = () => {
    const newErrors = {};

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z ]{2,}$/.test(formData.name)) {
      newErrors.name = "Enter a valid name (letters only)";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    // Phone (optional)
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    // Message
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   setStatus('Sending...')

  //   // Simulate form submission
  //   setTimeout(() => {
  //     setStatus('Message sent successfully! We\'ll get back to you soon.')
  //     setFormData({ name: '', email: '', phone: '', message: '' })

  //     setTimeout(() => setStatus(''), 5000)
  //   }, 1500)
  // }


  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('Sending...')

    if (!validate()) return;

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
    <section className="py-24 px-[5%] bg-gradient-to-b from-white to-emerald-50/30 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute -left-32 top-0 w-72 h-72 rounded-full bg-[#6C5CE7]/10 blur-3xl pointer-events-none" />
      <div className="absolute -right-32 bottom-0 w-80 h-80 rounded-full bg-[#00D2D3]/10 blur-3xl pointer-events-none" />

      <div className="text-center max-w-[800px] mx-auto mb-16 relative z-10">
        <span className="inline-block bg-[#6C5CE7]/10 text-[#6C5CE7] px-4 py-2 
                         rounded-[20px] font-extrabold text-[0.8rem] uppercase 
                         tracking-wider mb-5">
          Get In Touch
        </span>

        <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold mb-5 leading-tight text-[#2D3436]">
          We'd Love to Hear From You
        </h2>

        <p className="text-[#636e72] text-lg leading-relaxed">
          Have questions about saafAI? Want to partner with us? Reach out and let's make public sanitation better together.
        </p>
      </div>

      <div className="max-w-[1100px] mx-auto flex justify-center relative z-10">
  
     
        {/* Contact Form */}
        <div className="lg:col-span-3">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white p-10 rounded-3xl border border-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-[#2D3436] mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 rounded-full border-2 border-[#E0E0E0] 
                             focus:border-[#6C5CE7] focus:outline-none transition-colors
                             text-[#2D3436] placeholder-[#636e72]"
                  placeholder="John Doe"
                />

                {
                  errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )
                }
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-[#2D3436] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 rounded-full border-2 border-[#E0E0E0] 
                             focus:border-[#6C5CE7] focus:outline-none transition-colors
                             text-[#2D3436] placeholder-[#636e72]"
                  placeholder="john@example.com"
                />
                {
                  errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )
                }
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="phone" className="block text-sm font-bold text-[#2D3436] mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                maxLength={10}
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-5 py-3.5 rounded-full border-2 border-[#E0E0E0] 
             focus:border-[#6C5CE7] focus:outline-none transition-colors
             text-[#2D3436] placeholder-[#636e72]"
                placeholder="+91 XXXXXXXXXX"
              />

            </div>{errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}


            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-bold text-[#2D3436] mb-2">
                Your Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-5 py-4 rounded-3xl border-2 border-[#E0E0E0] 
                           focus:border-[#6C5CE7] focus:outline-none transition-colors
                           text-[#2D3436] placeholder-[#636e72] resize-none"
                placeholder="Tell us how we can help you..."
              />
              {
                errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )
              }
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#6C5CE7] to-[#00D2D3] text-white 
                         py-4 rounded-full font-bold text-lg
                         hover:shadow-[0_10px_30px_rgba(108,92,231,0.4)]
                         hover:-translate-y-1 transition-all duration-300
                         flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Send Message
            </button>

            {status && (
              <div className={`mt-4 p-4 rounded-2xl text-center font-semibold ${status.includes('success')
                ? 'bg-green-50 text-green-700'
                : 'bg-blue-50 text-blue-700'
                }`}>
                {status}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
