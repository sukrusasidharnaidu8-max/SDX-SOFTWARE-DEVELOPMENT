import { motion } from 'framer-motion'
import { RotateCcw, CreditCard } from 'lucide-react'

export default function RefundPolicy() {
  const sections = [
    { title: 'Advance Payment', body: 'An advance payment of 50% is typically required to commence any project. This advance covers initial design, planning, and development work. Once work has begun, the advance payment is non-refundable.' },
    { title: 'Project Cancellation', body: 'If a project is cancelled before work has commenced, the advance payment will be refunded within 7-10 business days, minus a processing fee of 5% of the advance amount. If cancelled after work has begun, the advance is non-refundable as it covers the work already completed.' },
    { title: 'Milestone-Based Projects', body: 'For larger projects with milestone-based payments, payments made for completed milestones are non-refundable. Future milestone payments can be cancelled if the milestone has not yet been started.' },
    { title: 'Maintenance Plans', body: 'Monthly maintenance plans can be cancelled at any time. If cancelled mid-cycle, no prorated refund is provided for the remaining period. The plan remains active until the end of the paid billing cycle.' },
    { title: 'Defective Work', body: 'If you believe the delivered work does not meet the agreed-upon specifications, please contact us within 7 days of delivery. We will review the issue and provide corrections at no additional cost. If the issue cannot be resolved, a partial refund may be considered at our discretion.' },
    { title: 'Payment Gateway', body: 'All payments are processed through Razorpay. Refunds, when approved, will be credited back to the original payment method within 7-10 business days, depending on your bank processing times.' },
    { title: 'How to Request a Refund', body: 'To request a refund, contact us at sdxsoftwaredevelopment@gmail.com or call +91 7207820204. Please include your project details, payment receipt, and reason for the refund request. All refund requests are reviewed within 3-5 business days.' },
    { title: 'Non-Refundable Items', body: 'Domain registration fees, SSL certificate fees, third-party software licenses, and any costs incurred for external services on behalf of the client are non-refundable once purchased.' },
  ]

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container-narrow max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center mx-auto mb-4">
              <RotateCcw className="w-8 h-8 text-brand-500" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold">Refund Policy</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-3">Last updated: September 2026</p>
          </motion.div>

          <div className="glass-card p-6 sm:p-8 space-y-6">
            <p className="text-slate-600 dark:text-slate-400">
              SDX Software Development strives to ensure client satisfaction with all our services. This Refund Policy outlines the terms and conditions for refunds on payments made for our web development services.
            </p>
            {sections.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <h2 className="text-xl font-heading font-bold mb-2 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-brand-500" />
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
