import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SectionHeadingProps {
  badge?: string
  title: string
  subtitle?: string
  center?: boolean
  children?: ReactNode
}

export default function SectionHeading({ badge, title, subtitle, center, children }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={`${center ? 'text-center mx-auto' : ''} max-w-3xl mb-12`}
    >
      {badge && (
        <span className="badge bg-brand-500/10 text-brand-600 dark:text-brand-400 mb-3">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg text-slate-600 dark:text-slate-400 ${center ? 'mx-auto' : ''} max-w-2xl`}>
          {subtitle}
        </p>
      )}
      {children}
    </motion.div>
  )
}
