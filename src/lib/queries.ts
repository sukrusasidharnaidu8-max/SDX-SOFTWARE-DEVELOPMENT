import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Service, PortfolioProject, Testimonial, FAQ, PricingPlan, BlogPost, Category, SiteSetting } from '@/lib/types'

export function useServices() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    supabase.from('services').select('*').order('sort_order')
      .then(({ data, error }) => {
        if (!error && data) setServices(data as Service[])
        setLoading(false)
      })
  }, [])
  return { services, loading }
}

export function usePortfolio() {
  const [projects, setProjects] = useState<PortfolioProject[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    supabase.from('portfolio_projects').select('*').order('sort_order')
      .then(({ data, error }) => {
        if (!error && data) setProjects(data as PortfolioProject[])
        setLoading(false)
      })
  }, [])
  return { projects, loading }
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    supabase.from('testimonials').select('*').order('sort_order')
      .then(({ data, error }) => {
        if (!error && data) setTestimonials(data as Testimonial[])
        setLoading(false)
      })
  }, [])
  return { testimonials, loading }
}

export function useFAQs() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    supabase.from('faqs').select('*').order('sort_order')
      .then(({ data, error }) => {
        if (!error && data) setFaqs(data as FAQ[])
        setLoading(false)
      })
  }, [])
  return { faqs, loading }
}

export function usePricingPlans() {
  const [plans, setPlans] = useState<PricingPlan[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    supabase.from('pricing_plans').select('*').order('sort_order')
      .then(({ data, error }) => {
        if (!error && data) setPlans(data as PricingPlan[])
        setLoading(false)
      })
  }, [])
  return { plans, loading }
}

export function useBlogPosts(categorySlug?: string) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (categorySlug) {
      supabase.from('categories').select('id').eq('slug', categorySlug).maybeSingle()
        .then(({ data: cat }) => {
          if (cat) {
            supabase.from('blog_posts').select('*, category:categories(*)')
              .eq('status', 'published').eq('category_id', (cat as Category).id)
              .order('published_at', { ascending: false })
              .then(({ data }) => {
                setPosts((data as unknown as BlogPost[]) || [])
                setLoading(false)
              })
          } else {
            setLoading(false)
          }
        })
    } else {
      supabase.from('blog_posts').select('*, category:categories(*)')
        .eq('status', 'published').order('published_at', { ascending: false })
        .then(({ data, error }) => {
          if (!error && data) setPosts(data as unknown as BlogPost[])
          setLoading(false)
        })
    }
  }, [categorySlug])
  return { posts, loading }
}

export function useBlogPost(slug?: string) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (!slug) { setLoading(false); return }
    supabase.from('blog_posts').select('*, category:categories(*)')
      .eq('slug', slug).eq('status', 'published').maybeSingle()
      .then(({ data, error }) => {
        if (!error && data) setPost(data as unknown as BlogPost)
        setLoading(false)
      })
  }, [slug])
  return { post, loading }
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    supabase.from('categories').select('*').order('name')
      .then(({ data, error }) => {
        if (!error && data) setCategories(data as Category[])
        setLoading(false)
      })
  }, [])
  return { categories, loading }
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    supabase.from('site_settings').select('*').then(({ data }) => {
      if (data) {
        const map: Record<string, string> = {}
        ;(data as SiteSetting[]).forEach((s) => {
          if (s.value) map[s.key] = s.value
        })
        setSettings(map)
      }
      setLoading(false)
    })
  }, [])
  return { settings, loading }
}
