import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface AnimatedBackgroundProps {
  children?: ReactNode
}

export default function AnimatedBackground({ children }: AnimatedBackgroundProps) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 grid-pattern" />
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-500/20 blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 20, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-accent-500/20 blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, 50, 0] }}
        transition={{ repeat: Infinity, duration: 25, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-brand-600/10 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ repeat: Infinity, duration: 22, ease: 'easeInOut' }}
      />
      {children}
    </div>
  )
}
