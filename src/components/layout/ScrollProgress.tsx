import { motion } from 'framer-motion'

export default function ScrollProgress() {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-600 via-accent-500 to-brand-400 z-[9998] origin-left"
      style={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
    />
  )
}
