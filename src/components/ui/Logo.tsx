import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Logo({ size = 'md', showText = true }: { size?: 'sm' | 'md' | 'lg'; showText?: boolean }) {
  const sizes = {
    sm: { box: 'w-8 h-8', text: 'text-lg', sub: 'text-[9px]' },
    md: { box: 'w-10 h-10', text: 'text-xl', sub: 'text-[10px]' },
    lg: { box: 'w-14 h-14', text: 'text-2xl', sub: 'text-xs' },
  }
  const s = sizes[size]

  return (
    <Link to="/" className="flex items-center gap-2 group" aria-label="SDX Software Development home">
      <motion.div
        whileHover={{ scale: 1.05, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className={`${s.box} rounded-xl bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500 flex items-center justify-center shadow-lg shadow-brand-500/30 relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="text-white font-heading font-extrabold tracking-tight leading-none">S</span>
      </motion.div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`${s.text} font-heading font-extrabold tracking-tight bg-gradient-to-r from-brand-600 to-accent-500 dark:from-brand-400 dark:to-accent-400 bg-clip-text text-transparent`}>
            SDX
          </span>
          <span className={`${s.sub} font-medium text-slate-500 dark:text-slate-400 tracking-wide`}>
            Software Development
          </span>
        </div>
      )}
    </Link>
  )
}
