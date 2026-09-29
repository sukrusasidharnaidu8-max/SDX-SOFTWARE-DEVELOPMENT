import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check, Star, ArrowRight, HelpCircle } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { usePricingPlans, useFAQs } from '@/lib/queries'
import { FAQItem } from '@/components/ui/FAQItem'
import { COMPANY } from '@/lib/constants'

export default function Pricing() {
  const { plans, loading } = usePricingPlans()
  const { faqs } = useFAQs()

  const comparisonFeatures = [
    { name: 'Responsive Design', landing: true, business: true, portfolio: true, ecommerce: true },
    { name: 'SEO Optimized', landing: true, business: true, portfolio: true, ecommerce: true },
    { name: 'Lead Capture Form', landing: true, business: true, portfolio: true, ecommerce: true },
    { name: 'Custom Design', landing: true, business: true, portfolio: true, ecommerce: true },
    { name: 'Content Management', landing: false, business: true, portfolio: false, ecommerce: true },
    { name: 'Google Maps', landing: false, business: true, portfolio: false, ecommerce: true },
    { name: 'Shopping Cart', landing: false, business: false, portfolio: false, ecommerce: true },
    { name: 'Payment Gateway', landing: false, business: false, portfolio: false, ecommerce: true },
    { name: 'User Accounts', landing: false, business: false, portfolio: false, ecommerce: true },
    { name: 'Order Management', landing: false, business: false, portfolio: false, ecommerce: true },
  ]

  return (
    <div className="pt-20">
      <section className="section-padding pb-8">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="badge bg-brand-500/10 text-brand-600 dark:text-brand-400 mb-4">Pricing</span>
            <h1 className="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight text-balance">
              <span className="gradient-text">Transparent, Affordable Pricing</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
              Choose the plan that fits your business. All plans include responsive design, SEO basics, and free consultation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-padding pt-8">
        <div className="container-narrow">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="glass-card p-6 space-y-4">
                  <div className="skeleton h-6 w-1/2" />
                  <div className="skeleton h-12 w-3/4" />
                  <div className="skeleton h-4 w-full" />
                  <div className="skeleton h-4 w-2/3" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className={`relative glass-card p-6 flex flex-col ${
                    plan.popular ? 'border-brand-500/50 ring-2 ring-brand-500/20' : ''
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 badge bg-gradient-to-r from-brand-600 to-accent-500 text-white">
                      <Star className="w-3 h-3" />
                      Popular
                    </span>
                  )}
                  <h3 className="text-xl font-heading font-bold mb-1">{plan.name}</h3>
                  {plan.description && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{plan.description}</p>
                  )}
                  <div className="mb-6">
                    <span className="text-3xl font-heading font-extrabold gradient-text">
                      &#8377;{plan.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400 ml-1">{plan.period}</span>
                  </div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Check className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className={plan.popular ? 'btn-primary text-sm w-full' : 'btn-secondary text-sm w-full'}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="section-padding pt-8 bg-slate-100/50 dark:bg-slate-900/30">
        <div className="container-narrow">
          <SectionHeading center badge="Compare" title="Feature Comparison" subtitle="See what's included in each plan." />
          <div className="glass-card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left p-4 font-heading font-semibold">Feature</th>
                  <th className="p-4 font-heading font-semibold">Landing</th>
                  <th className="p-4 font-heading font-semibold">Business</th>
                  <th className="p-4 font-heading font-semibold">Portfolio</th>
                  <th className="p-4 font-heading font-semibold">E-Commerce</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30"
                  >
                    <td className="p-4 text-slate-700 dark:text-slate-300">{row.name}</td>
                    {[row.landing, row.business, row.portfolio, row.ecommerce].map((has, j) => (
                      <td key={j} className="p-4 text-center">
                        {has ? (
                          <Check className="w-5 h-5 text-brand-500 mx-auto" />
                        ) : (
                          <span className="text-slate-300 dark:text-slate-700">&times;</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing FAQ */}
      {faqs.length > 0 && (
        <section className="section-padding pt-8">
          <div className="container-narrow">
            <SectionHeading center badge="FAQ" title="Pricing Questions" subtitle="Common questions about our pricing and payment process." />
            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.slice(0, 5).map((faq, i) => (
                <FAQItem key={faq.id} question={faq.question} answer={faq.answer} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding pt-8">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-8 sm:p-12 text-center"
          >
            <HelpCircle className="w-12 h-12 text-brand-500 mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-extrabold mb-3">Still Have Questions?</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-xl mx-auto">
              Contact us for a free consultation. We'll help you choose the right plan for your business.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact" className="btn-primary">
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href={COMPANY.callUrl} className="btn-secondary">
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
