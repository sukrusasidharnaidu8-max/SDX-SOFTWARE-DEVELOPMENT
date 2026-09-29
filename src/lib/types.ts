export interface Service {
  id: string
  title: string
  slug: string
  description: string
  features: string[]
  price: number | null
  price_label: string | null
  icon: string | null
  sort_order: number
}

export interface PortfolioProject {
  id: string
  title: string
  slug: string
  category: string
  description: string
  image_url: string | null
  live_url: string | null
  case_study: string | null
  before_image: string | null
  after_image: string | null
  sort_order: number
}

export interface Testimonial {
  id: string
  client_name: string
  client_role: string | null
  client_company: string | null
  message: string
  rating: number
  sort_order: number
}

export interface FAQ {
  id: string
  question: string
  answer: string
  sort_order: number
}

export interface PricingPlan {
  id: string
  name: string
  slug: string
  price: number
  period: string
  description: string | null
  features: string[]
  popular: boolean
  sort_order: number
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  featured_image: string | null
  category_id: string | null
  tags: string[]
  status: string
  seo_title: string | null
  seo_description: string | null
  published_at: string | null
  created_at: string
  category?: Category | null
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string
  company: string | null
  subject: string
  message: string
  status: string
  created_at: string
}

export interface SiteSetting {
  key: string
  value: string | null
}

export interface ClientProfile {
  id: string
  user_id: string
  full_name: string
  company: string | null
  phone: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  client_id: string
  title: string
  description: string | null
  status: string
  progress: number
  start_date: string | null
  deadline: string | null
  created_at: string
  milestones?: ProjectMilestone[]
}

export interface ProjectMilestone {
  id: string
  project_id: string
  title: string
  description: string | null
  status: string
  due_date: string | null
  completed_at: string | null
}

export interface Invoice {
  id: string
  client_id: string
  project_id: string | null
  invoice_number: string
  amount: number
  status: string
  due_date: string | null
  created_at: string
}

export interface Payment {
  id: string
  invoice_id: string | null
  client_id: string | null
  razorpay_order_id: string | null
  razorpay_payment_id: string | null
  amount: number
  status: string
  method: string | null
  created_at: string
}

export interface ClientFile {
  id: string
  project_id: string | null
  client_id: string | null
  file_name: string
  file_url: string
  file_type: string | null
  file_size: number | null
  uploaded_by: string
  created_at: string
}

export interface Agreement {
  id: string
  client_id: string
  project_id: string | null
  title: string
  file_url: string
  status: string
  created_at: string
}

export interface AppNotification {
  id: string
  client_id: string
  title: string
  message: string
  type: string
  read: boolean
  created_at: string
}
