export const COMPANY = {
  name: 'SDX Software Development',
  shortName: 'SDX',
  subtitle: 'Software Development',
  owner: 'SASIDHAR',
  phone: '+91 7207820204',
  phoneRaw: '917207820204',
  email: 'sdxsoftwaredevelopment@gmail.com',
  location: 'Bhavani Nagar, Tirupati, Andhra Pradesh, India',
  whatsappUrl: 'https://wa.me/917207820204',
  callUrl: 'tel:+917207820204',
  workingHours: 'Mon - Sat: 9:00 AM - 7:00 PM',
}

export const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/share/1HtSmbpGKX/',
    icon: 'Facebook',
    color: 'hover:bg-blue-600',
    ariaLabel: 'Visit SDX Software Development on Facebook',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/sdxsoftwaredevelopment?igsh=eTZiZWpvNHVtYXRm',
    icon: 'Instagram',
    color: 'hover:bg-pink-600',
    ariaLabel: 'Visit SDX Software Development on Instagram',
  },
  {
    name: 'Telegram',
    url: 'https://t.me/SDXSoftwareDevelopment',
    icon: 'Send',
    color: 'hover:bg-sky-500',
    ariaLabel: 'Visit SDX Software Development on Telegram',
  },
  {
    name: 'Twitter',
    url: 'https://x.com/SDXSoftwaram5s',
    icon: 'Twitter',
    color: 'hover:bg-slate-800',
    ariaLabel: 'Visit SDX Software Development on Twitter / X',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/sasidhar-s-093855402',
    icon: 'Linkedin',
    color: 'hover:bg-blue-700',
    ariaLabel: 'Visit SDX Software Development on LinkedIn',
  },
] as const

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
] as const

export const SERVICE_ICONS: Record<string, string> = {
  'Landing Pages': 'Rocket',
  'Business Websites': 'Building2',
  'Portfolio Websites': 'FolderOpen',
  'E-Commerce Websites': 'ShoppingCart',
  'Web Applications': 'Code2',
  'Website Redesign': 'RefreshCw',
  'Website Maintenance': 'Wrench',
  'SEO Optimization': 'Search',
}

export const DEVELOPMENT_PROCESS = [
  { step: '01', title: 'Idea', description: 'We start by understanding your business goals, target audience, and project requirements to create a clear roadmap.', icon: 'Lightbulb' },
  { step: '02', title: 'UI/UX Design', description: 'Our designers craft beautiful, intuitive interfaces that align with your brand and provide an exceptional user experience.', icon: 'Palette' },
  { step: '03', title: 'Development', description: 'We build your project using modern technologies with clean, scalable code and best development practices.', icon: 'Code2' },
  { step: '04', title: 'Testing', description: 'Every project goes through rigorous testing across devices, browsers, and performance metrics before launch.', icon: 'CheckCircle' },
  { step: '05', title: 'Launch', description: 'We deploy your website with SSL, SEO optimization, and performance monitoring to ensure a smooth go-live.', icon: 'Rocket' },
]

export const CORE_VALUES = [
  { title: 'Quality First', description: 'We never compromise on code quality, design standards, or performance. Every project meets our rigorous benchmarks.', icon: 'Award' },
  { title: 'Client Centric', description: 'Your success is our success. We listen, understand, and deliver solutions that solve real business problems.', icon: 'Users' },
  { title: 'Innovation', description: 'We stay ahead of technology trends and use modern tools to build future-ready solutions.', icon: 'Lightbulb' },
  { title: 'Transparency', description: 'Clear communication, honest timelines, and regular progress updates throughout the project lifecycle.', icon: 'Eye' },
  { title: 'Reliability', description: 'Count on us for ongoing support, maintenance, and updates long after your website goes live.', icon: 'ShieldCheck' },
  { title: 'Affordable', description: 'Premium quality at competitive prices. We offer flexible pricing to suit businesses of all sizes.', icon: 'BadgeIndianRupee' },
]

export const TECHNOLOGIES = [
  { name: 'React', icon: 'Atom' },
  { name: 'Next.js', icon: 'Globe' },
  { name: 'TypeScript', icon: 'FileCode' },
  { name: 'Tailwind CSS', icon: 'Wind' },
  { name: 'Node.js', icon: 'Server' },
  { name: 'PostgreSQL', icon: 'Database' },
  { name: 'Supabase', icon: 'Zap' },
  { name: 'Framer Motion', icon: 'Sparkles' },
  { name: 'Razorpay', icon: 'CreditCard' },
  { name: 'Vite', icon: 'Zap' },
]

export const REVENUE_DATA = {
  landingPages: { count: 10, price: 999 },
  businessWebsites: { count: 10, price: 2999 },
  portfolioWebsites: { count: 5, price: 2499 },
  ecommerceWebsites: { count: 2, price: 9999 },
  monthlyGoal: 100000,
}
