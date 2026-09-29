import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Calendar, ArrowRight, Tag } from 'lucide-react'
import { useBlogPosts, useCategories } from '@/lib/queries'
import { SkeletonCard } from '@/components/ui/Skeletons'
import { EmptyState } from '@/components/ui/States'
import type { BlogPost } from '@/lib/types'

export default function Blog() {
  const { posts, loading } = useBlogPosts()
  const { categories } = useCategories()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        !search ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        (post.excerpt || '').toLowerCase().includes(search.toLowerCase())
      const matchesCategory =
        activeCategory === 'All' ||
        (post.category && post.category.slug === activeCategory)
      return matchesSearch && matchesCategory
    })
  }, [posts, search, activeCategory])

  return (
    <div className="pt-20">
      <section className="section-padding pb-8">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="badge bg-brand-500/10 text-brand-600 dark:text-brand-400 mb-4">Blog</span>
            <h1 className="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight text-balance">
              <span className="gradient-text">Insights & Articles</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
              SEO strategies, tech news, and development tips from the SDX team.
            </p>
          </motion.div>

          {/* Search */}
          <div className="max-w-md mx-auto mt-8 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="search"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-12"
              aria-label="Search blog posts"
            />
          </div>
        </div>
      </section>

      <section className="section-padding pt-8">
        <div className="container-narrow">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === 'All'
                  ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-lg shadow-brand-500/30'
                  : 'glass hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat.slug
                    ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-lg shadow-brand-500/30'
                    : 'glass hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState title="No Articles Found" message="Try adjusting your search or category filter." />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const date = post.published_at ? new Date(post.published_at).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric',
  }) : ''

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="glass-card overflow-hidden group flex flex-col"
    >
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="h-44 overflow-hidden bg-gradient-to-br from-brand-500/20 to-accent-500/20 relative">
          {post.featured_image ? (
            <img
              src={post.featured_image}
              alt={post.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-heading font-extrabold gradient-text mb-1">SDX</div>
                <p className="text-xs text-slate-500">Software Development</p>
              </div>
            </div>
          )}
          {post.category && (
            <span className="absolute top-3 right-3 badge bg-brand-500/90 text-white">
              {post.category.name}
            </span>
          )}
        </div>
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
          <Calendar className="w-3.5 h-3.5" />
          {date}
        </div>
        <Link to={`/blog/${post.slug}`}>
          <h3 className="font-heading font-bold text-lg mb-2 hover:text-brand-600 dark:hover:text-brand-400 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 flex-1">
          {post.excerpt}
        </p>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {post.tags.slice(0, 3).map((tag, j) => (
              <span key={j} className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        )}
        <Link
          to={`/blog/${post.slug}`}
          className="text-sm font-medium text-brand-600 dark:text-brand-400 inline-flex items-center gap-1 group/link"
        >
          Read More
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.article>
  )
}
