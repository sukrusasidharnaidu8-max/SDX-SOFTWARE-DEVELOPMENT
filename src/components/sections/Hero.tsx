import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Rocket, CheckCircle, Zap, Code2 } from 'lucide-react'
import AnimatedBackground from '@/components/ui/AnimatedBackground'
import { useSiteSettings } from '@/lib/queries'

export default function Hero() {
  const { settings } = useSiteSettings()

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
      <AnimatedBackground />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50 dark:to-slate-950 pointer-events-none" />

      <div className="container-narrow px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="badge bg-brand-500/10 text-brand-600 dark:text-brand-400 mb-4"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {settings.hero_badge || 'Trusted Software Development Company'}
            </motion.span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-balance leading-[1.1]">
              <span className="gradient-text">{settings.hero_title || 'Building Digital Experiences That Matter'}</span>
            </h1>

            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 text-balance">
              {settings.hero_subtitle || 'SDX Software Development creates premium websites, web applications, and digital solutions for businesses in Tirupati and across India.'}
            </p>

            <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link to="/contact" className="btn-primary">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/portfolio" className="btn-secondary">
                View Our Work
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 justify-center lg:justify-start">
              {[
                { icon: CheckCircle, label: '50+ Projects' },
                { icon: Zap, label: 'Fast Delivery' },
                { icon: Rocket, label: 'Modern Tech' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                >
                  <item.icon className="w-4 h-4 text-brand-500" />
                  {item.label}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                className="absolute top-0 right-0 w-48 h-48 glass-card p-6 flex flex-col gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-500/20 flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-brand-500" />
                </div>
                <div>
                  <p className="font-heading font-bold text-lg">Clean Code</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Scalable architecture</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 0.5 }}
                className="absolute bottom-12 left-0 w-48 h-48 glass-card p-6 flex flex-col gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-500/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-accent-500" />
                </div>
                <div>
                  <p className="font-heading font-bold text-lg">Lightning Fast</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Lighthouse 95+</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-3xl bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500 p-1 glow-blue"
              >
                <div className="w-full h-full rounded-3xl bg-white dark:bg-slate-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-heading font-extrabold gradient-text mb-2">SDX</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Software Development</p>
                    <div className="mt-3 flex justify-center gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-brand-500"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
