import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Facebook, Instagram, Send, Twitter, Linkedin, MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react'
import { COMPANY, SOCIAL_LINKS, NAV_LINKS } from '@/lib/constants'
import Logo from '@/components/ui/Logo'

const socialIconMap: Record<string, typeof Facebook> = {
  Facebook,
  Instagram,
  Send,
  Twitter,
  Linkedin,
}

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-brand-500/10 blur-3xl rounded-full" />

      <div className="relative container-narrow px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Logo size="md" />
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Premium software development company in Tirupati. We build websites, web applications, and digital solutions that drive business growth.
            </p>
            <div className="flex gap-2 mt-6">
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
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 rounded-lg glass flex items-center justify-center text-slate-600 dark:text-slate-300 ${social.color} hover:text-white transition-colors`}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors inline-flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/login" className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors inline-flex items-center gap-1 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1 transition-all" />
                  Client Login
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors inline-flex items-center gap-1 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1 transition-all" />
                  Admin Panel
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                <MapPin className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
                {COMPANY.location}
              </li>
              <li>
                <a href={COMPANY.callUrl} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  <Phone className="w-4 h-4 text-brand-500 flex-shrink-0" />
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors break-all">
                  <Mail className="w-4 h-4 text-brand-500 flex-shrink-0" />
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                <Clock className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
                {COMPANY.workingHours}
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              {[
                { name: 'Privacy Policy', path: '/privacy-policy' },
                { name: 'Terms & Conditions', path: '/terms' },
                { name: 'Refund Policy', path: '/refund-policy' },
                { name: 'Cookie Policy', path: '/cookie-policy' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Powered by <span className="font-semibold text-brand-600 dark:text-brand-400">{COMPANY.owner}</span> | Contact: {COMPANY.phone}
          </p>
        </div>
      </div>
    </footer>
  )
}
