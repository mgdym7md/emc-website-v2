'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'
import type { ContactInfo } from '@/lib/strapi'

interface ContactProps {
  data: ContactInfo
}

export default function Contact({ data }: ContactProps) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        return
      }

      setSubmitted(true)
      setFormData({ name: '', email: '', interest: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section-padding bg-dark-primary relative">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent-gold/80 text-sm tracking-[0.3em] uppercase mb-4 block">
            {t('contact.subtitle')}
          </span>
          <h2 className="heading-primary text-accent-cream">
            {t('contact.title')}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-8">
              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center border border-accent-gold/30 text-accent-gold">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-heading text-lg text-accent-gold mb-1">
                    {t('contact.info.location')}
                  </h4>
                  <p className="text-accent-cream/70">{data.location}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center border border-accent-gold/30 text-accent-gold">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-heading text-lg text-accent-gold mb-1">
                    {t('contact.info.phone')}
                  </h4>
                  <p className="text-accent-cream/70">{data.phone}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center border border-accent-gold/30 text-accent-gold">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-heading text-lg text-accent-gold mb-1">
                    {t('contact.info.email')}
                  </h4>
                  <p className="text-accent-cream/70">{data.email}</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-12 aspect-video bg-dark-secondary border border-accent-gold/10 flex items-center justify-center">
              <span className="text-accent-cream/40 text-sm">Map Integration</span>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-accent-cream/70 text-sm mb-2">
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-dark-secondary border border-accent-gold/20 text-accent-cream placeholder:text-accent-cream/30 focus:outline-none focus:border-accent-gold/50 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-accent-cream/70 text-sm mb-2">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-dark-secondary border border-accent-gold/20 text-accent-cream placeholder:text-accent-cream/30 focus:outline-none focus:border-accent-gold/50 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              {/* Interest */}
              <div>
                <label className="block text-accent-cream/70 text-sm mb-2">
                  {t('contact.form.interest')}
                </label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-dark-secondary border border-accent-gold/20 text-accent-cream focus:outline-none focus:border-accent-gold/50 transition-colors"
                >
                  <option value="">Select an option</option>
                  <option value="marble">Marble</option>
                  <option value="granite">Granite</option>
                  <option value="sandstone">Sandstone</option>
                  <option value="consultation">Project Consultation</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-accent-cream/70 text-sm mb-2">
                  {t('contact.form.message')}
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-dark-secondary border border-accent-gold/20 text-accent-cream placeholder:text-accent-cream/30 focus:outline-none focus:border-accent-gold/50 transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : t('contact.form.submit')}
              </button>

              {/* Success Message */}
              {submitted && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-accent-gold"
                >
                  Thank you! We&apos;ll be in touch soon.
                </motion.p>
              )}

              {/* Error Message */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-red-400"
                >
                  {error}
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
