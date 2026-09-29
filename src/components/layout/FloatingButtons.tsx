import { motion } from 'framer-motion'
import { Phone, MessageCircle } from 'lucide-react'
import { COMPANY } from '@/lib/constants'

export default function FloatingButtons() {
  return (
    <div className="fixed right-4 bottom-20 sm:bottom-6 z-50 flex flex-col gap-3">
      <motion.a
        href={COMPANY.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-14 h-14 rounded-full bg-green-500 text-white shadow-lg shadow-green-500/40 flex items-center justify-center"
      >
        <span className="absolute inset-0 rounded-full bg-green-500 animate-wave" />
        <span className="absolute inset-0 rounded-full bg-green-500 animate-wave" style={{ animationDelay: '0.5s' }} />
        <MessageCircle className="w-6 h-6 relative z-10" />
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg glass text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
          Chat on WhatsApp
        </span>
      </motion.a>

      <motion.a
        href={COMPANY.callUrl}
        aria-label="Call us"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.4 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-14 h-14 rounded-full bg-brand-600 text-white shadow-lg shadow-brand-500/40 flex items-center justify-center"
      >
        <span className="absolute inset-0 rounded-full bg-brand-600 animate-wave" />
        <span className="absolute inset-0 rounded-full bg-brand-600 animate-wave" style={{ animationDelay: '0.5s' }} />
        <Phone className="w-6 h-6 relative z-10" />
      </motion.a>
    </div>
  )
}
