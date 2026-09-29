import { motion } from 'framer-motion'
import { Target, Eye, Award, Users, Lightbulb, Eye as EyeIcon, ShieldCheck, BadgeIndianRupee, Atom, Globe, FileCode, Wind, Server, Database, Zap, Sparkles, CreditCard } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { useSiteSettings } from '@/lib/queries'
import { CORE_VALUES, TECHNOLOGIES, COMPANY, SOCIAL_LINKS } from '@/lib/constants'
import { Facebook, Instagram, Send, Twitter, Linkedin } from 'lucide-react'

const socialIconMap: Record<string, typeof Facebook> = {
  Facebook, Instagram, Send, Twitter, Linkedin,
}

const valueIconMap: Record<string, typeof Award> = {
  Award, Users, Lightbulb, EyeIcon, ShieldCheck, BadgeIndianRupee,
}

const techIconMap: Record<string, typeof Atom> = {
  Atom, Globe, FileCode, Wind, Server, Database, Zap, Sparkles, CreditCard,
}

export default function About() {
  const { settings } = useSiteSettings()

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding pb-8">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="badge bg-brand-500/10 text-brand-600 dark:text-brand-400 mb-4">About Us</span>
            <h1 className="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight text-balance">
              <span className="gradient-text">Building the Future of Software in Andhra Pradesh</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
              SDX Software Development is a premium software company dedicated to helping businesses establish and grow their online presence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-padding py-12">
        <div className="container-narrow">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeading badge="Our Story" title="From Tirupati to the Digital World" />
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {settings.about_story || `SDX Software Development was founded by SASIDHAR with a mission to make professional web development accessible to businesses of all sizes. Based in Bhavani Nagar, Tirupati, Andhra Pradesh, we have helped numerous businesses establish their online presence with modern, fast, and conversion-focused websites.`}
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
                Our team combines technical expertise with creative design to deliver solutions that not only look great but also drive real business results. From small landing pages to complex web applications, we treat every project with the same level of dedication and attention to detail.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Award, value: '50+', label: 'Projects Delivered' },
                { icon: Users, value: '40+', label: 'Happy Clients' },
                { icon: Globe, value: 'Pan-India', label: 'Service Area' },
                { icon: Zap, value: '95+', label: 'Lighthouse Score' },
              ].map((item, i) => (
                <div key={i} className="glass-card p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-6 h-6 text-brand-500" />
                  </div>
                  <div className="text-2xl font-heading font-extrabold gradient-text">{item.value}</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding py-12 bg-slate-100/50 dark:bg-slate-900/30">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-3">Our Mission</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {settings.about_mission || 'To empower businesses with cutting-edge web technology that drives growth, enhances user experience, and creates lasting digital impact in an increasingly online world.'}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="glass-card p-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-500 to-brand-500 flex items-center justify-center mb-4">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-3">Our Vision</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {settings.about_vision || 'To become the most trusted software development company in Andhra Pradesh, known for delivering premium quality, innovative solutions, and exceptional client service.'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding py-12">
        <div className="container-narrow">
          <SectionHeading center badge="Core Values" title="What We Stand For" subtitle="The principles that guide everything we do." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_VALUES.map((value, i) => {
              const Icon = valueIconMap[value.icon] || Award
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="glass-card p-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-brand-500" />
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="section-padding py-12 bg-slate-100/50 dark:bg-slate-900/30">
        <div className="container-narrow">
          <SectionHeading center badge="Tech Stack" title="Technologies We Use" subtitle="We use modern, proven technologies to build fast, secure, and scalable solutions." />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {TECHNOLOGIES.map((tech, i) => {
              const Icon = techIconMap[tech.icon] || Atom
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="glass-card p-5 text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-6 h-6 text-brand-500" />
                  </div>
                  <p className="text-sm font-medium">{tech.name}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Trust Us + Social */}
      <section className="section-padding py-12">
        <div className="container-narrow">
          <div className="glass-card p-8 sm:p-12 text-center">
            <SectionHeading center badge="Connect" title="Why Clients Trust Us" subtitle="Transparent communication, quality work, and ongoing support." />
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              {[
                { title: 'Transparent Process', desc: 'You see progress at every step through your dedicated dashboard.' },
                { title: 'Quality Guarantee', desc: 'Every project goes through rigorous testing before delivery.' },
                { title: 'Local & Accessible', desc: 'Based in Tirupati, we are always just a call or message away.' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <h4 className="font-heading font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-3">
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
                    className={`w-12 h-12 rounded-xl glass flex items-center justify-center text-slate-600 dark:text-slate-300 ${social.color} hover:text-white transition-colors`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
            <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
              {COMPANY.location} | {COMPANY.phone} | {COMPANY.email}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
