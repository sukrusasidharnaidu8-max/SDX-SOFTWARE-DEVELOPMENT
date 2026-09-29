import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Rocket, Building2, FolderOpen, ShoppingCart, Code2, RefreshCw, Wrench, Search, Palette, CheckCircle, Lightbulb } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import Hero from '@/components/sections/Hero'
import { useServices } from '@/lib/queries'
import { DEVELOPMENT_PROCESS } from '@/lib/constants'
import { useCountUp, useInView } from '@/lib/hooks'
import { useTestimonials, useFAQs } from '@/lib/queries'
import { FAQItem } from '@/components/ui/FAQItem'

const iconMap: Record<string, typeof Rocket> = {
  Rocket, Building2, FolderOpen, ShoppingCart, Code2, RefreshCw, Wrench, Search,
  Lightbulb, Palette, CheckCircle,
}

function StatsCounter() {
  const { ref, inView } = useInView<HTMLDivElement>()
  const stats = [
    { value: 50, suffix: '+', label: 'Projects Completed' },
    { value: 40, suffix: '+', label: 'Happy Clients' },
    { value: 98, suffix: '%', label: 'Client Satisfaction' },
    { value: 5, suffix: '+', label: 'Years Experience' },
  ]

  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <StatCard key={stat.label} stat={stat} inView={inView} delay={i * 0.1} />
      ))}
    </div>
  )
}

function StatCard({ stat, inView, delay }: { stat: { value: number; suffix: string; label: string }; inView: boolean; delay: number }) {
  const count = useCountUp(stat.value, 2000, inView)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="glass-card p-6 text-center"
    >
      <div className="text-3xl sm:text-4xl font-heading font-extrabold gradient-text">
        {count}{stat.suffix}
      </div>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
    </motion.div>
  )
}

function ServiceCard({ service, index }: { service: import('@/lib/types').Service; index: number }) {
  const Icon = iconMap[service.icon || 'Rocket'] || Rocket
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="glass-card p-6 group hover:border-brand-500/40 transition-colors"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 flex items-center justify-center mb-4 group-hover:from-brand-500/30 group-hover:to-accent-500/30 transition-colors">
        <Icon className="w-6 h-6 text-brand-500" />
      </div>
      <h3 className="text-lg font-heading font-bold mb-2">{service.title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">{service.description}</p>
      {service.features && service.features.length > 0 && (
        <ul className="space-y-1 mb-4">
          {service.features.slice(0, 3).map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <CheckCircle className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      )}
      <div className="flex items-center justify-between">
        {service.price_label && (
          <span className="text-lg font-heading font-bold text-brand-600 dark:text-brand-400">{service.price_label}</span>
        )}
        <Link to="/services" className="text-sm font-medium text-brand-600 dark:text-brand-400 inline-flex items-center gap-1 group/link">
          Learn More
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  )
}

export default function Home() {
  const { services, loading: servicesLoading } = useServices()
  const { testimonials } = useTestimonials()
  const { faqs } = useFAQs()

  return (
    <div className="pt-16">
      <Hero />

      {/* Company Introduction */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SectionHeading
                badge="About SDX"
                title="Your Trusted Software Development Partner"
                subtitle="Founded by SASIDHAR, SDX Software Development is a premium software company based in Tirupati, Andhra Pradesh. We specialize in creating modern, fast, and conversion-focused websites and web applications for businesses of all sizes."
              />
              <div className="flex flex-wrap gap-3 mt-6">
                <Link to="/about" className="btn-primary text-sm">Learn More About Us</Link>
                <Link to="/contact" className="btn-secondary text-sm">Contact Us</Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Rocket, title: 'Fast Delivery', desc: 'Projects delivered on time, every time' },
                { icon: Code2, title: 'Modern Tech', desc: 'React, Next.js, TypeScript, Supabase' },
                { icon: CheckCircle, title: 'Quality Assured', desc: 'Rigorous testing on all projects' },
                { icon: Search, title: 'SEO Optimized', desc: 'Built to rank on search engines' },
              ].map((item, i) => (
                <div key={i} className="glass-card p-5">
                  <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center mb-3">
                    <item.icon className="w-5 h-5 text-brand-500" />
                  </div>
                  <h4 className="font-heading font-semibold text-sm">{item.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-slate-100/50 dark:bg-slate-900/30">
        <div className="container-narrow">
          <SectionHeading
            center
            badge="Our Services"
            title="What We Build For You"
            subtitle="From landing pages to complex web applications, we offer a full range of software development services tailored to your business needs."
          />
          {servicesLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="glass-card p-6 space-y-4">
                  <div className="skeleton h-12 w-12 rounded-xl" />
                  <div className="skeleton h-5 w-3/4" />
                  <div className="skeleton h-4 w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, i) => (
                <ServiceCard key={service.id} service={service} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-narrow">
          <SectionHeading
            center
            badge="Why Choose Us"
            title="Why Businesses Trust SDX"
            subtitle="We combine technical expertise with creative design to deliver solutions that drive real business results."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Rocket, title: 'Premium Quality', desc: 'Every project meets our rigorous quality benchmarks for design, performance, and code.' },
              { icon: CheckCircle, title: 'On-Time Delivery', desc: 'We respect deadlines and deliver projects within the agreed timeframe.' },
              { icon: Search, title: 'SEO First', desc: 'All websites are built with SEO best practices to help you rank on Google.' },
              { icon: Code2, title: 'Modern Technology', desc: 'We use the latest tools and frameworks for fast, secure, and scalable solutions.' },
              { icon: Building2, title: 'Local Expertise', desc: 'Based in Tirupati, we understand the local market and serve businesses across India.' },
              { icon: Wrench, title: 'Ongoing Support', desc: 'We provide maintenance and support long after your website goes live.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="glass-card p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-brand-500" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="section-padding bg-slate-100/50 dark:bg-slate-900/30">
        <div className="container-narrow">
          <SectionHeading
            center
            badge="Our Process"
            title="How We Build Your Project"
            subtitle="A proven 5-step process that ensures every project is delivered to the highest standard."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {DEVELOPMENT_PROCESS.map((step, i) => {
              const Icon = iconMap[step.icon] || Lightbulb
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative glass-card p-6 text-center"
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-brand-600 to-accent-500 text-white text-xs font-bold">
                    {step.step}
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-brand-500/10 flex items-center justify-center mx-auto mt-3 mb-3">
                    <Icon className="w-7 h-7 text-brand-500" />
                  </div>
                  <h3 className="font-heading font-bold text-base mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{step.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="section-padding">
        <div className="container-narrow">
          <SectionHeading center badge="Our Impact" title="Numbers That Speak" subtitle="Our track record of delivering quality software solutions." />
          <StatsCounter />
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="section-padding bg-slate-100/50 dark:bg-slate-900/30">
          <div className="container-narrow">
            <SectionHeading center badge="Testimonials" title="What Our Clients Say" subtitle="Real feedback from businesses we have helped grow online." />
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6"
                >
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <span key={j} className="text-yellow-400">&#9733;</span>
                    ))}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 italic mb-4">"{t.message}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm">
                      {t.client_name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-sm">{t.client_name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {t.client_role}{t.client_company ? ` at ${t.client_company}` : ''}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="section-padding">
          <div className="container-narrow">
            <SectionHeading center badge="FAQ" title="Frequently Asked Questions" subtitle="Got questions? We have answers." />
            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq, i) => (
                <FAQItem key={faq.id} question={faq.question} answer={faq.answer} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500" />
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white mb-4 text-balance">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
                Let's discuss your project and bring your vision to life. Get a free consultation today.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-brand-600 font-semibold hover:bg-slate-100 transition-colors">
                  Get Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/pricing" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-white/50 text-white font-semibold hover:bg-white/10 transition-colors">
                  View Pricing
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
