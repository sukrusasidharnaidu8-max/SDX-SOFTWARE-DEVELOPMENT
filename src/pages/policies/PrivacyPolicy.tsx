import { motion } from 'framer-motion'
import { Shield, FileText } from 'lucide-react'

export default function PrivacyPolicy() {
  const sections = [
    { title: 'Information We Collect', body: 'We collect information you provide directly to us, such as your name, email address, phone number, company name, and project details when you fill out our contact form or create a client account. We also automatically collect certain technical data including IP address, browser type, and usage data through cookies and analytics tools.' },
    { title: 'How We Use Your Information', body: 'We use your information to respond to your inquiries, provide our services, send project updates, process payments, send invoices, improve our website and services, and comply with legal obligations. We do not sell or rent your personal information to third parties.' },
    { title: 'Data Storage and Security', body: 'Your data is stored securely using Supabase (PostgreSQL) with row-level security policies. Passwords are hashed using industry-standard algorithms. All data transmission is encrypted via SSL/TLS. We implement appropriate technical and organizational measures to protect your personal data.' },
    { title: 'Cookies', body: 'We use cookies to enhance your browsing experience, analyze site traffic, and remember your preferences. You can control cookies through your browser settings. See our Cookie Policy for more details.' },
    { title: 'Third-Party Services', body: 'We use third-party services including Supabase (database), Razorpay (payment processing), Google Analytics (traffic analysis), and email service providers. These providers have their own privacy policies governing how they handle your data.' },
    { title: 'Your Rights', body: 'You have the right to access, correct, or delete your personal data. You can also opt out of marketing communications at any time. To exercise these rights, contact us at sdxsoftwaredevelopment@gmail.com.' },
    { title: 'Data Retention', body: 'We retain your personal data for as long as necessary to provide our services and comply with legal obligations. Client project data is retained for the duration of the project and for a reasonable period thereafter for reference and support purposes.' },
    { title: 'Changes to This Policy', body: 'We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the updated policy on this page. The date of the last update will be indicated at the bottom.' },
  ]

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container-narrow max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-brand-500" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold">Privacy Policy</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-3">Last updated: September 2026</p>
          </motion.div>

          <div className="glass-card p-6 sm:p-8 space-y-6">
            <p className="text-slate-600 dark:text-slate-400">
              SDX Software Development ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
            </p>
            {sections.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <h2 className="text-xl font-heading font-bold mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-500" />
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
