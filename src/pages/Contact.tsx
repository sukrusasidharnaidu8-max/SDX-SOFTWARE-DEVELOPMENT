import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, MapPin, Phone, Mail, Clock, MessageCircle, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { COMPANY, SOCIAL_LINKS } from '@/lib/constants'

const socialIconMap: Record<string, typeof Facebook> = {
  Facebook, Instagram, Send: Send, Twitter, Linkedin,
}

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', subject: '', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email'
    if (!form.phone.trim()) e.phone = 'Phone is required'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (!form.message.trim()) e.message = 'Message is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return

    setStatus('submitting')
    const { error } = await supabase.from('contact_messages').insert({
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company || null,
      subject: form.subject,
      message: form.message,
    })

    if (error) {
      setStatus('error')
    } else {
      setStatus('success')
      setForm({ name: '', email: '', phone: '', company: '', subject: '', message: '' })
    }
  }

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  return (
    <div className="pt-20">
      <section className="section-padding pb-8">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="badge bg-brand-500/10 text-brand-600 dark:text-brand-400 mb-4">Contact</span>
            <h1 className="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight text-balance">
              <span className="gradient-text">Let's Build Something Together</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
              Have a project in mind? Send us a message and we'll get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding pt-8">
        <div className="container-narrow">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 glass-card p-6 sm:p-8"
            >
              <h2 className="text-2xl font-heading font-bold mb-6">Send Us a Message</h2>

              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6 rounded-xl bg-green-500/10 border border-green-500/30 flex items-start gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-heading font-semibold text-green-700 dark:text-green-400">Message Sent Successfully!</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Thank you for reaching out. We'll get back to you within 24 hours.
                      </p>
                      <button
                        onClick={() => setStatus('idle')}
                        className="mt-3 text-sm font-medium text-brand-600 dark:text-brand-400"
                      >
                        Send another message
                      </button>
                    </div>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 mb-4"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-sm text-red-700 dark:text-red-400">
                      Something went wrong. Please try again or call us at {COMPANY.phone}.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {status !== 'success' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1.5">Name *</label>
                      <input
                        id="name"
                        type="text"
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                        className="input-field"
                        placeholder="Your full name"
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email *</label>
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        className="input-field"
                        placeholder="you@example.com"
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1.5">Phone *</label>
                      <input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        className="input-field"
                        placeholder="+91 12345 67890"
                        aria-invalid={!!errors.phone}
                      />
                      {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-1.5">Company</label>
                      <input
                        id="company"
                        type="text"
                        value={form.company}
                        onChange={(e) => update('company', e.target.value)}
                        className="input-field"
                        placeholder="Your company (optional)"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1.5">Subject *</label>
                    <input
                      id="subject"
                      type="text"
                      value={form.subject}
                      onChange={(e) => update('subject', e.target.value)}
                      className="input-field"
                      placeholder="What's this about?"
                      aria-invalid={!!errors.subject}
                    />
                    {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1.5">Message *</label>
                    <textarea
                      id="message"
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      rows={5}
                      className="input-field resize-none"
                      placeholder="Tell us about your project..."
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="glass-card p-6 space-y-4">
                <h3 className="font-heading font-bold text-lg">Contact Information</h3>
                <div className="space-y-3">
                  <a href={COMPANY.callUrl} className="flex items-start gap-3 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                    <Phone className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Phone</p>
                      <p className="text-sm font-medium">{COMPANY.phone}</p>
                    </div>
                  </a>
                  <a href={`mailto:${COMPANY.email}`} className="flex items-start gap-3 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                    <Mail className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Email</p>
                      <p className="text-sm font-medium break-all">{COMPANY.email}</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Location</p>
                      <p className="text-sm font-medium">{COMPANY.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Working Hours</p>
                      <p className="text-sm font-medium">{COMPANY.workingHours}</p>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href={COMPANY.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-5 flex items-center gap-3 hover:border-green-500/40 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center group-hover:bg-green-500 transition-colors">
                  <MessageCircle className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-sm">Chat on WhatsApp</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Quick responses</p>
                </div>
              </a>

              <div className="glass-card p-6">
                <h4 className="font-heading font-semibold text-sm mb-3">Follow Us</h4>
                <div className="flex gap-2">
                  {SOCIAL_LINKS.map((social) => {
                    const Icon = socialIconMap[social.icon] || Facebook
                    return (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.ariaLabel}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className={`w-10 h-10 rounded-lg glass flex items-center justify-center text-slate-600 dark:text-slate-300 ${social.color} hover:text-white transition-colors`}
                      >
                        <Icon className="w-4 h-4" />
                      </motion.a>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card overflow-hidden mt-8 h-80"
          >
            <iframe
              title="SDX Software Development Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.296!2d79.4192!3d13.6288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDM3JzQzLjciTiA3OcKwMjUnMDkuMSJF!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>
    </div>
  )
}
