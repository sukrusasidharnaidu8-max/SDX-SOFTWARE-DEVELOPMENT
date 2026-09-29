import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Rocket, Building2, FolderOpen, ShoppingCart, Code2, RefreshCw, Wrench, Search } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { useServices } from '@/lib/queries'
import { SkeletonCard } from '@/components/ui/Skeletons'
import { ErrorState } from '@/components/ui/States'

const iconMap: Record<string, typeof Rocket> = {
  Rocket, Building2, FolderOpen, ShoppingCart, Code2, RefreshCw, Wrench, Search,
}

export default function Services() {
  const { services, loading } = useServices()

  return (
    <div className="pt-20">
      <section className="section-padding pb-8">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="badge bg-brand-500/10 text-brand-600 dark:text-brand-400 mb-4">Services</span>
            <h1 className="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight text-balance">
              <span className="gradient-text">Premium Web Development Services</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
              From simple landing pages to complex web applications, we offer everything you need to succeed online.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding pt-8">
        <div className="container-narrow">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : services.length === 0 ? (
            <ErrorState message="Unable to load services. Please try again later." />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => {
                const Icon = iconMap[service.icon || 'Rocket'] || Rocket
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -6 }}
                    className="glass-card p-6 flex flex-col group hover:border-brand-500/40 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 flex items-center justify-center group-hover:from-brand-500/30 group-hover:to-accent-500/30 transition-colors">
                        <Icon className="w-7 h-7 text-brand-500" />
                      </div>
                      <h3 className="text-xl font-heading font-bold">{service.title}</h3>
                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{service.description}</p>

                    <div className="space-y-2 mb-4 flex-1">
                      {service.features.map((f, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <CheckCircle className="w-4 h-4 text-brand-500 flex-shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                      {service.price_label && (
                        <div>
                          <span className="text-xs text-slate-500 dark:text-slate-400">Starting at</span>
                          <div className="text-2xl font-heading font-extrabold text-brand-600 dark:text-brand-400">
                            {service.price_label}
                          </div>
                        </div>
                      )}
                      <Link to="/contact" className="btn-primary text-sm">
                        Get Started
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding pt-8">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden p-8 sm:p-12 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500" />
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white mb-4">
                Need a Custom Solution?
              </h2>
              <p className="text-white/90 mb-6 max-w-xl mx-auto">
                We offer custom development packages tailored to your specific business needs. Let's discuss your project.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-brand-600 font-semibold hover:bg-slate-100 transition-colors">
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
