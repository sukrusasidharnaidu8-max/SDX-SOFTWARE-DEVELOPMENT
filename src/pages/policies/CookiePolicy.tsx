import { motion } from 'framer-motion'
import { Cookie, Settings } from 'lucide-react'

export default function CookiePolicy() {
  const sections = [
    { title: 'What Are Cookies', body: 'Cookies are small text files stored on your device when you visit a website. They help the website remember your actions and preferences over a period of time, so you do not have to re-enter them every time you visit the site or browse from one page to another.' },
    { title: 'Types of Cookies We Use', body: 'Essential cookies: Required for the website to function correctly. Performance cookies: Collect information about how visitors use our website. Functionality cookies: Remember your preferences such as theme (dark/light mode). Analytics cookies: Help us understand how visitors interact with our website using Google Analytics.' },
    { title: 'How We Use Cookies', body: 'We use cookies to remember your theme preference (dark/light mode), analyze website traffic and user behavior, improve website performance, and provide a personalized browsing experience. We do not use cookies to identify you personally.' },
    { title: 'Managing Cookies', body: 'You can control and manage cookies through your browser settings. Most browsers allow you to refuse cookies or alert you when cookies are being sent. You can also delete cookies that have already been set. Note that disabling cookies may affect the functionality of our website.' },
    { title: 'Cookie Consent', body: 'When you first visit our website, we display a cookie consent banner. You can choose to accept or decline cookies. Your choice is stored in your browser and remembered for future visits. You can change your preference at any time by clearing your browser data.' },
    { title: 'Third-Party Cookies', body: 'We use Google Analytics which sets cookies to help us analyze website traffic. These third-party cookies are governed by their respective privacy policies. We do not have control over how third-party services use their cookies.' },
    { title: 'Updates to This Policy', body: 'We may update this Cookie Policy from time to time to reflect changes in technology or legislation. We recommend reviewing this page periodically to stay informed about our use of cookies.' },
  ]

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container-narrow max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center mx-auto mb-4">
              <Cookie className="w-8 h-8 text-brand-500" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold">Cookie Policy</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-3">Last updated: September 2026</p>
          </motion.div>

          <div className="glass-card p-6 sm:p-8 space-y-6">
            <p className="text-slate-600 dark:text-slate-400">
              This Cookie Policy explains how SDX Software Development uses cookies and similar technologies on our website.
            </p>
            {sections.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <h2 className="text-xl font-heading font-bold mb-2 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-brand-500" />
                  {s.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
