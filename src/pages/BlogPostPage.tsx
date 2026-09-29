import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Tag, ArrowLeft, ArrowRight, Share2 } from 'lucide-react'
import { useBlogPost } from '@/lib/queries'
import { SkeletonText } from '@/components/ui/Skeletons'
import { ErrorState } from '@/components/ui/States'
import { COMPANY } from '@/lib/constants'

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const { post, loading } = useBlogPost(slug)

  if (loading) {
    return (
      <div className="pt-20 section-padding container-narrow max-w-3xl">
        <div className="skeleton h-64 w-full mb-6 rounded-2xl" />
        <div className="skeleton h-8 w-3/4 mb-4" />
        <SkeletonText lines={6} />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="pt-20 section-padding container-narrow max-w-3xl">
        <ErrorState
          message="This article could not be found. It may have been removed or is not yet published."
        />
        <div className="text-center mt-6">
          <Link to="/blog" className="btn-primary">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  const date = post.published_at ? new Date(post.published_at).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'long', day: 'numeric',
  }) : ''

  const renderContent = (content: string) => {
    const lines = content.split('\n')
    const elements: React.ReactNode[] = []
    let listItems: string[] = []

    const flushList = (key: string) => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={key} className="space-y-2 my-4 ml-4">
            {listItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2.5 flex-shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
              </li>
            ))}
          </ul>
        )
        listItems = []
      }
    }

    lines.forEach((line, i) => {
      if (line.startsWith('## ')) {
        flushList(`list-${i}`)
        elements.push(
          <h2 key={i} className="text-2xl font-heading font-bold mt-8 mb-3">
            {line.slice(3)}
          </h2>
        )
      } else if (line.startsWith('# ')) {
        flushList(`list-${i}`)
        elements.push(
          <h1 key={i} className="text-3xl font-heading font-extrabold mt-8 mb-4">
            {line.slice(2)}
          </h1>
        )
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        listItems.push(line.slice(2))
      } else if (line.trim() === '') {
        flushList(`list-${i}`)
      } else {
        flushList(`list-${i}`)
        elements.push(
          <p key={i} className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4"
             dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
        )
      }
    })
    flushList('list-final')
    return elements
  }

  const shareUrl = `${window.location.origin}/blog/${post.slug}`
  const shareText = encodeURIComponent(post.title)

  return (
    <div className="pt-20">
      <article className="section-padding container-narrow max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-brand-600 dark:text-brand-400 mb-6 hover:gap-2 transition-all">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {post.featured_image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-56 sm:h-72 rounded-2xl overflow-hidden mb-8"
          >
            <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {post.category && (
            <span className="badge bg-brand-500/10 text-brand-600 dark:text-brand-400 mb-3">
              {post.category.name}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold mb-4 text-balance">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-8">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {date}
            </span>
            {post.tags && post.tags.length > 0 && (
              <span className="flex items-center gap-1.5">
                <Tag className="w-4 h-4" />
                {post.tags.join(', ')}
              </span>
            )}
          </div>

          {post.excerpt && (
            <p className="text-lg text-slate-600 dark:text-slate-400 italic mb-6 border-l-4 border-brand-500 pl-4">
              {post.excerpt}
            </p>
          )}

          <div className="prose-content">
            {renderContent(post.content)}
          </div>

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <span className="text-sm text-slate-500 dark:text-slate-400">Share this article:</span>
            <div className="flex gap-2">
              <a
                href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors"
                aria-label="Share on WhatsApp"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:bg-slate-800 hover:text-white transition-colors"
                aria-label="Share on Twitter"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 mt-12 text-center"
        >
          <h3 className="text-xl font-heading font-bold mb-2">Need a Website for Your Business?</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
            Contact {COMPANY.name} for a free consultation.
          </p>
          <Link to="/contact" className="btn-primary text-sm">
            Get in Touch
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </article>
    </div>
  )
}
