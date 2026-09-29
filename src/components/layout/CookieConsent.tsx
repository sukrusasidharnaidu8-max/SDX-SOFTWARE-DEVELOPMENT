import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Cookie } from 'lucide-react'

export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('sdx-cookie-consent')
    if (!consent) setShow(true)
  }, [])

  const accept = () => {
    localStorage.setItem('sdx-cookie-consent', 'accepted')
    setShow(false)
  }

  const decline = () => {
    localStorage.setItem('sdx-cookie-consent', 'declined')
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-4 left-4 right-4 sm:left-4 sm:right-auto sm:max-w-md z-50 glass-card p-5 shadow-2xl"
        >
          <div className="flex items-start gap-3">
            <Cookie className="w-6 h-6 text-brand-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-heading font-semibold text-sm mb-1">Cookie Consent</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                We use cookies to enhance your browsing experience, analyze site traffic, and serve relevant content. By clicking accept, you consent to our use of cookies.
              </p>
              <div className="flex gap-2">
                <button onClick={accept} className="px-4 py-2 text-xs font-semibold rounded-lg bg-brand-600 text-white hover:bg-brand-500 transition-colors">
                  Accept
                </button>
                <button onClick={decline} className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  Decline
                </button>
              </div>
            </div>
            <button onClick={decline} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" aria-label="Close cookie consent">
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
