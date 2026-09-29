import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, X, Layers } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { usePortfolio } from '@/lib/queries'
import { SkeletonCard } from '@/components/ui/Skeletons'
import { EmptyState, ErrorState } from '@/components/ui/States'
import type { PortfolioProject } from '@/lib/types'

export default function Portfolio() {
  const { projects, loading } = usePortfolio()
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState<PortfolioProject | null>(null)

  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category))
    return ['All', ...Array.from(cats)]
  }, [projects])

  const filtered = useMemo(() => {
    if (filter === 'All') return projects
    return projects.filter((p) => p.category === filter)
  }, [projects, filter])

  return (
    <div className="pt-20">
      <section className="section-padding pb-8">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="badge bg-brand-500/10 text-brand-600 dark:text-brand-400 mb-4">Portfolio</span>
            <h1 className="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight text-balance">
              <span className="gradient-text">Our Recent Work</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
              Explore a selection of websites and applications we have built for our clients.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding pt-8">
        <div className="container-narrow">
          {/* Category Filter */}
          {!loading && projects.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filter === cat
                      ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-lg shadow-brand-500/30'
                      : 'glass hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState title="No Projects Found" message="No projects in this category yet. Check back soon!" />
          ) : (
            <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filtered.map((project, i) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -6 }}
                    onClick={() => setSelected(project)}
                    className="glass-card overflow-hidden cursor-pointer group"
                  >
                    <div className="relative h-48 overflow-hidden bg-slate-200 dark:bg-slate-800">
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Layers className="w-12 h-12 text-slate-400" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="absolute top-3 right-3 badge bg-brand-500/90 text-white">
                        {project.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading font-bold text-lg mb-2">{project.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{project.description}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative glass-card max-w-2xl w-full max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg glass flex items-center justify-center z-10"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
              {selected.image_url && (
                <div className="h-56 sm:h-64 overflow-hidden rounded-t-2xl">
                  <img src={selected.image_url} alt={selected.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-6">
                <span className="badge bg-brand-500/10 text-brand-600 dark:text-brand-400 mb-3">{selected.category}</span>
                <h2 className="text-2xl font-heading font-bold mb-3">{selected.title}</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4">{selected.description}</p>
                {selected.case_study && (
                  <div className="mt-4 p-4 rounded-xl bg-brand-500/5 border border-brand-500/20">
                    <h4 className="font-heading font-semibold text-sm mb-2 text-brand-600 dark:text-brand-400">Case Study</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{selected.case_study}</p>
                  </div>
                )}
                {selected.live_url && selected.live_url !== '#' && (
                  <a
                    href={selected.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary mt-6 text-sm"
                  >
                    View Live Demo
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
