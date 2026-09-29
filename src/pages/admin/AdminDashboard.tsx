import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, FolderKanban, FileText, Wrench, Image, Newspaper,
  Mail, CreditCard, BarChart3, LogOut, Menu, X, Users, Settings
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import Logo from '@/components/ui/Logo'
import { supabase } from '@/lib/supabase'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

const COLORS = ['#2563eb', '#06b6d4', '#8b5cf6', '#f59e0b', '#ef4444', '#10b981']

export default function AdminDashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/admin/clients', icon: Users, label: 'Clients' },
    { to: '/admin/projects', icon: FolderKanban, label: 'Projects' },
    { to: '/admin/services', icon: Wrench, label: 'Services' },
    { to: '/admin/portfolio', icon: Image, label: 'Portfolio' },
    { to: '/admin/blog', icon: Newspaper, label: 'Blog' },
    { to: '/admin/messages', icon: Mail, label: 'Messages' },
    { to: '/admin/payments', icon: CreditCard, label: 'Payments' },
    { to: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
    { to: '/admin/settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 glass z-40 transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-5 border-b border-slate-200 dark:border-slate-800">
          <Logo size="sm" />
        </div>
        <div className="p-4">
          <p className="text-xs text-slate-500 mb-1">Admin</p>
          <p className="font-heading font-semibold text-sm truncate">{user?.email}</p>
        </div>
        <nav className="px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors mt-4"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </nav>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 min-w-0">
        <header className="glass sticky top-0 z-20 px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden w-8 h-8 flex items-center justify-center" aria-label="Toggle sidebar">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <h1 className="text-lg font-heading font-bold">Admin Panel</h1>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-600 to-accent-500 flex items-center justify-center text-white text-xs font-bold">A</div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route index element={<AdminOverview />} />
            <Route path="clients" element={<AdminClients />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="portfolio" element={<AdminPortfolio />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="settings" element={<AdminSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

function AdminOverview() {
  const [stats, setStats] = useState({ clients: 0, projects: 0, messages: 0, revenue: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const [{ count: clients }, { count: projects }, { count: messages }] = await Promise.all([
        supabase.from('client_profiles').select('*', { count: 'exact', head: true }),
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
      ])
      const { data: payments } = await supabase.from('payments').select('amount').eq('status', 'captured')
      const revenue = (payments || []).reduce((sum: number, p: { amount: number }) => sum + p.amount, 0)
      setStats({ clients: clients || 0, projects: projects || 0, messages: messages || 0, revenue })
      setLoading(false)
    })()
  }, [])

  if (loading) return <div className="skeleton h-64 w-full" />

  const cards = [
    { label: 'Total Clients', value: stats.clients, icon: Users, color: 'from-brand-500/20 to-accent-500/20' },
    { label: 'Active Projects', value: stats.projects, icon: FolderKanban, color: 'from-purple-500/20 to-brand-500/20' },
    { label: 'Messages', value: stats.messages, icon: Mail, color: 'from-orange-500/20 to-red-500/20' },
    { label: 'Revenue', value: `₹${stats.revenue.toLocaleString('en-IN')}`, icon: CreditCard, color: 'from-green-500/20 to-emerald-500/20' },
  ]

  const revenueData = [
    { name: 'Landing', value: 10 * 999 },
    { name: 'Business', value: 10 * 2999 },
    { name: 'Portfolio', value: 5 * 2499 },
    { name: 'E-Commerce', value: 2 * 9999 },
  ]

  const visitorsData = [
    { name: 'Mon', visitors: 120 },
    { name: 'Tue', visitors: 200 },
    { name: 'Wed', visitors: 150 },
    { name: 'Thu', visitors: 280 },
    { name: 'Fri', visitors: 320 },
    { name: 'Sat', visitors: 250 },
    { name: 'Sun', visitors: 180 },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h2 className="text-2xl font-heading font-bold">Dashboard Overview</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="glass-card p-5">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center mb-3`}>
              <card.icon className="w-5 h-5 text-brand-500" />
            </div>
            <div className="text-2xl font-heading font-extrabold">{card.value}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card p-5">
          <h3 className="font-heading font-bold mb-4">Revenue by Service</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.3} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card p-5">
          <h3 className="font-heading font-bold mb-4">Weekly Visitors</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={visitorsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.3} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="visitors" stroke="#06b6d4" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  )
}

function AdminClients() {
  const [clients, setClients] = useState<import('@/lib/types').ClientProfile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('client_profiles').select('*').order('created_at', { ascending: false })
      .then(({ data }) => {
        setClients((data as import('@/lib/types').ClientProfile[]) || [])
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="skeleton h-64 w-full" />

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <h2 className="text-2xl font-heading font-bold">Clients</h2>
      {clients.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400">No clients yet.</p>
      ) : (
        <div className="glass-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left p-4 font-heading">Name</th>
                <th className="text-left p-4 font-heading">Company</th>
                <th className="text-left p-4 font-heading">Phone</th>
                <th className="text-left p-4 font-heading">Joined</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id} className="border-b border-slate-100 dark:border-slate-800">
                  <td className="p-4 font-medium">{c.full_name}</td>
                  <td className="p-4 text-slate-500">{c.company || '-'}</td>
                  <td className="p-4 text-slate-500">{c.phone || '-'}</td>
                  <td className="p-4 text-slate-500">{new Date(c.created_at).toLocaleDateString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  )
}

function AdminProjects() {
  const [projects, setProjects] = useState<import('@/lib/types').Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('projects').select('*').order('created_at', { ascending: false })
      .then(({ data }) => {
        setProjects((data as import('@/lib/types').Project[]) || [])
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="skeleton h-64 w-full" />

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <h2 className="text-2xl font-heading font-bold">Projects</h2>
      {projects.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400">No projects yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {projects.map((p) => (
            <div key={p.id} className="glass-card p-5">
              <h3 className="font-heading font-bold">{p.title}</h3>
              <p className="text-sm text-slate-500 mt-1">Status: {p.status} | Progress: {p.progress}%</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

function AdminServices() {
  const [services, setServices] = useState<import('@/lib/types').Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('services').select('*').order('sort_order')
      .then(({ data }) => {
        setServices((data as import('@/lib/types').Service[]) || [])
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="skeleton h-64 w-full" />

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <h2 className="text-2xl font-heading font-bold">Services</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s) => (
          <div key={s.id} className="glass-card p-5">
            <h3 className="font-heading font-bold">{s.title}</h3>
            <p className="text-sm text-slate-500 mt-1">{s.price_label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function AdminPortfolio() {
  const [projects, setProjects] = useState<import('@/lib/types').PortfolioProject[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('portfolio_projects').select('*').order('sort_order')
      .then(({ data }) => {
        setProjects((data as import('@/lib/types').PortfolioProject[]) || [])
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="skeleton h-64 w-full" />

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <h2 className="text-2xl font-heading font-bold">Portfolio</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => (
          <div key={p.id} className="glass-card p-5">
            <h3 className="font-heading font-bold">{p.title}</h3>
            <p className="text-sm text-slate-500 mt-1">{p.category}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function AdminBlog() {
  const [posts, setPosts] = useState<import('@/lib/types').BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('blog_posts').select('*, category:categories(*)').order('created_at', { ascending: false })
      .then(({ data }) => {
        setPosts((data as unknown as import('@/lib/types').BlogPost[]) || [])
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="skeleton h-64 w-full" />

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <h2 className="text-2xl font-heading font-bold">Blog Posts</h2>
      {posts.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400">No posts yet.</p>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => (
            <div key={p.id} className="glass-card p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">{p.title}</p>
                <p className="text-xs text-slate-400 mt-1">Status: {p.status} | {p.category?.name || 'Uncategorized'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

function AdminMessages() {
  const [messages, setMessages] = useState<import('@/lib/types').ContactMessage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('contact_messages').select('*').order('created_at', { ascending: false })
      .then(({ data }) => {
        setMessages((data as import('@/lib/types').ContactMessage[]) || [])
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="skeleton h-64 w-full" />

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <h2 className="text-2xl font-heading font-bold">Contact Messages</h2>
      {messages.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400">No messages yet.</p>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div key={m.id} className="glass-card p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{m.name} | {m.subject}</p>
                  <p className="text-sm text-slate-500 mt-1">{m.message}</p>
                  <p className="text-xs text-slate-400 mt-2">{m.email} | {m.phone} | {new Date(m.created_at).toLocaleString('en-IN')}</p>
                </div>
                <span className={`badge ${m.status === 'new' ? 'bg-brand-500/10 text-brand-500' : 'bg-slate-500/10 text-slate-500'}`}>{m.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

function AdminPayments() {
  const [payments, setPayments] = useState<import('@/lib/types').Payment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('payments').select('*').order('created_at', { ascending: false })
      .then(({ data }) => {
        setPayments((data as import('@/lib/types').Payment[]) || [])
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="skeleton h-64 w-full" />

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <h2 className="text-2xl font-heading font-bold">Payments</h2>
      {payments.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400">No payments recorded yet.</p>
      ) : (
        <div className="glass-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left p-4">Amount</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Method</th>
                <th className="text-left p-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b border-slate-100 dark:border-slate-800">
                  <td className="p-4">₹{p.amount.toLocaleString('en-IN')}</td>
                  <td className="p-4">{p.status}</td>
                  <td className="p-4 text-slate-500">{p.method || '-'}</td>
                  <td className="p-4 text-slate-500">{new Date(p.created_at).toLocaleDateString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  )
}

function AdminAnalytics() {
  const revenueData = [
    { name: 'Landing', value: 10 * 999 },
    { name: 'Business', value: 10 * 2999 },
    { name: 'Portfolio', value: 5 * 2499 },
    { name: 'E-Commerce', value: 2 * 9999 },
  ]
  const projectData = [
    { name: 'Completed', value: 35 },
    { name: 'Active', value: 12 },
    { name: 'Planning', value: 5 },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h2 className="text-2xl font-heading font-bold">Analytics</h2>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card p-5">
          <h3 className="font-heading font-bold mb-4">Revenue Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={revenueData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {revenueData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card p-5">
          <h3 className="font-heading font-bold mb-4">Project Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={projectData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {projectData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  )
}

function AdminSettings() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <h2 className="text-2xl font-heading font-bold">Settings</h2>
      <div className="glass-card p-6">
        <p className="text-slate-600 dark:text-slate-400">Website content settings can be managed here. Use the site_settings table to dynamically update hero text, about content, and other configurable values.</p>
      </div>
    </motion.div>
  )
}
