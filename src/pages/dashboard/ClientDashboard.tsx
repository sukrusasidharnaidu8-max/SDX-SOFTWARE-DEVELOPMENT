import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LayoutDashboard, FolderKanban, FileText, CreditCard, Bell, Upload, LogOut, Menu, X } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import Logo from '@/components/ui/Logo'
import { supabase } from '@/lib/supabase'
import type { Project, Invoice, Payment, ClientFile, AppNotification, Agreement } from '@/lib/types'
import { EmptyState } from '@/components/ui/States'

export default function ClientDashboard() {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Overview', end: true },
    { to: '/dashboard/projects', icon: FolderKanban, label: 'Projects' },
    { to: '/dashboard/invoices', icon: FileText, label: 'Invoices' },
    { to: '/dashboard/payments', icon: CreditCard, label: 'Payments' },
    { to: '/dashboard/files', icon: Upload, label: 'Files' },
    { to: '/dashboard/agreements', icon: FileText, label: 'Agreements' },
    { to: '/dashboard/notifications', icon: Bell, label: 'Notifications' },
  ]

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 glass z-40 transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-5 border-b border-slate-200 dark:border-slate-800">
          <Logo size="sm" />
        </div>
        <div className="p-4">
          <p className="text-xs text-slate-500 mb-1">Welcome,</p>
          <p className="font-heading font-semibold text-sm truncate">{profile?.full_name || user?.email}</p>
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

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <header className="glass sticky top-0 z-20 px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden w-8 h-8 flex items-center justify-center" aria-label="Toggle sidebar">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <h1 className="text-lg font-heading font-bold">Client Dashboard</h1>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold">
            {(profile?.full_name || 'C').charAt(0).toUpperCase()}
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="projects" element={<Projects />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="payments" element={<Payments />} />
            <Route path="files" element={<Files />} />
            <Route path="agreements" element={<Agreements />} />
            <Route path="notifications" element={<Notifications />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

function Overview() {
  const { profile } = useAuth()
  const [stats, setStats] = useState({ projects: 0, invoices: 0, pending: 0, notifications: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!profile) return
    ;(async () => {
      const [{ count: projects }, { count: invoices }, { count: notifications }] = await Promise.all([
        supabase.from('projects').select('*', { count: 'exact', head: true }).eq('client_id', profile.id),
        supabase.from('invoices').select('*', { count: 'exact', head: true }).eq('client_id', profile.id),
        supabase.from('notifications').select('*', { count: 'exact', head: true }).eq('client_id', profile.id).eq('read', false),
      ])
      const { count: pending } = await supabase.from('invoices').select('*', { count: 'exact', head: true }).eq('client_id', profile.id).eq('status', 'pending')
      setStats({ projects: projects || 0, invoices: invoices || 0, pending: pending || 0, notifications: notifications || 0 })
      setLoading(false)
    })()
  }, [profile])

  if (loading) return <div className="skeleton h-64 w-full" />

  const cards = [
    { label: 'Active Projects', value: stats.projects, icon: FolderKanban, color: 'from-brand-500/20 to-accent-500/20' },
    { label: 'Total Invoices', value: stats.invoices, icon: FileText, color: 'from-purple-500/20 to-brand-500/20' },
    { label: 'Pending Payments', value: stats.pending, icon: CreditCard, color: 'from-orange-500/20 to-red-500/20' },
    { label: 'Notifications', value: stats.notifications, icon: Bell, color: 'from-green-500/20 to-emerald-500/20' },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h2 className="text-2xl font-heading font-bold">Welcome back!</h2>
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
    </motion.div>
  )
}

function Projects() {
  const { profile } = useAuth()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!profile) return
    supabase.from('projects').select('*').eq('client_id', profile.id).order('created_at', { ascending: false })
      .then(({ data }) => {
        setProjects((data as Project[]) || [])
        setLoading(false)
      })
  }, [profile])

  if (loading) return <div className="skeleton h-64 w-full" />
  if (projects.length === 0) return <EmptyState title="No Projects Yet" message="Your projects will appear here once they are created." />

  const statusColors: Record<string, string> = {
    planning: 'bg-blue-500/10 text-blue-500',
    'in-progress': 'bg-yellow-500/10 text-yellow-600',
    testing: 'bg-purple-500/10 text-purple-500',
    completed: 'bg-green-500/10 text-green-500',
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <h2 className="text-2xl font-heading font-bold">Your Projects</h2>
      {projects.map((p) => (
        <div key={p.id} className="glass-card p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-heading font-bold">{p.title}</h3>
              {p.description && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{p.description}</p>}
            </div>
            <span className={`badge ${statusColors[p.status] || statusColors.planning}`}>{p.status}</span>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${p.progress}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-brand-500 to-accent-500"
              />
            </div>
            <span className="text-sm font-medium">{p.progress}%</span>
          </div>
          {p.deadline && <p className="text-xs text-slate-400 mt-2">Deadline: {new Date(p.deadline).toLocaleDateString('en-IN')}</p>}
        </div>
      ))}
    </motion.div>
  )
}

function Invoices() {
  const { profile } = useAuth()
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!profile) return
    supabase.from('invoices').select('*').eq('client_id', profile.id).order('created_at', { ascending: false })
      .then(({ data }) => {
        setInvoices((data as Invoice[]) || [])
        setLoading(false)
      })
  }, [profile])

  if (loading) return <div className="skeleton h-64 w-full" />
  if (invoices.length === 0) return <EmptyState title="No Invoices" message="Your invoices will appear here." />

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <h2 className="text-2xl font-heading font-bold">Invoices</h2>
      <div className="glass-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="text-left p-4 font-heading">Invoice #</th>
              <th className="text-left p-4 font-heading">Amount</th>
              <th className="text-left p-4 font-heading">Status</th>
              <th className="text-left p-4 font-heading">Date</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-b border-slate-100 dark:border-slate-800">
                <td className="p-4 font-medium">{inv.invoice_number}</td>
                <td className="p-4">&#8377;{inv.amount.toLocaleString('en-IN')}</td>
                <td className="p-4">
                  <span className={`badge ${inv.status === 'paid' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}`}>
                    {inv.status}
                  </span>
                </td>
                <td className="p-4 text-slate-500">{new Date(inv.created_at).toLocaleDateString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

function Payments() {
  const { profile } = useAuth()
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!profile) return
    supabase.from('payments').select('*').eq('client_id', profile.id).order('created_at', { ascending: false })
      .then(({ data }) => {
        setPayments((data as Payment[]) || [])
        setLoading(false)
      })
  }, [profile])

  if (loading) return <div className="skeleton h-64 w-full" />
  if (payments.length === 0) return <EmptyState title="No Payment History" message="Your payment records will appear here." />

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <h2 className="text-2xl font-heading font-bold">Payment History</h2>
      <div className="glass-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="text-left p-4 font-heading">Amount</th>
              <th className="text-left p-4 font-heading">Status</th>
              <th className="text-left p-4 font-heading">Method</th>
              <th className="text-left p-4 font-heading">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((pay) => (
              <tr key={pay.id} className="border-b border-slate-100 dark:border-slate-800">
                <td className="p-4 font-medium">&#8377;{pay.amount.toLocaleString('en-IN')}</td>
                <td className="p-4">
                  <span className={`badge ${pay.status === 'paid' || pay.status === 'captured' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}`}>
                    {pay.status}
                  </span>
                </td>
                <td className="p-4 text-slate-500">{pay.method || '-'}</td>
                <td className="p-4 text-slate-500">{new Date(pay.created_at).toLocaleDateString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

function Files() {
  const { profile } = useAuth()
  const [files, setFiles] = useState<ClientFile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!profile) return
    supabase.from('client_files').select('*').eq('client_id', profile.id).order('created_at', { ascending: false })
      .then(({ data }) => {
        setFiles((data as ClientFile[]) || [])
        setLoading(false)
      })
  }, [profile])

  if (loading) return <div className="skeleton h-64 w-full" />
  if (files.length === 0) return <EmptyState title="No Files" message="Files shared with you will appear here." />

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <h2 className="text-2xl font-heading font-bold">Your Files</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((f) => (
          <div key={f.id} className="glass-card p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-brand-500" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{f.file_name}</p>
                <p className="text-xs text-slate-400">{f.uploaded_by} | {new Date(f.created_at).toLocaleDateString('en-IN')}</p>
              </div>
            </div>
            <a href={f.file_url} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-600 dark:text-brand-400 hover:underline">
              Download
            </a>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function Agreements() {
  const { profile } = useAuth()
  const [agreements, setAgreements] = useState<Agreement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!profile) return
    supabase.from('agreements').select('*').eq('client_id', profile.id).order('created_at', { ascending: false })
      .then(({ data }) => {
        setAgreements((data as Agreement[]) || [])
        setLoading(false)
      })
  }, [profile])

  if (loading) return <div className="skeleton h-64 w-full" />
  if (agreements.length === 0) return <EmptyState title="No Agreements" message="Your agreements will appear here." />

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <h2 className="text-2xl font-heading font-bold">Agreements</h2>
      {agreements.map((a) => (
        <div key={a.id} className="glass-card p-5 flex items-center justify-between">
          <div>
            <p className="font-medium">{a.title}</p>
            <p className="text-xs text-slate-400 mt-1">{new Date(a.created_at).toLocaleDateString('en-IN')}</p>
          </div>
          <a href={a.file_url} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm">
            Download
          </a>
        </div>
      ))}
    </motion.div>
  )
}

function Notifications() {
  const { profile } = useAuth()
  const [notifications, setNotifications] = useState<AppNotification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!profile) return
    supabase.from('notifications').select('*').eq('client_id', profile.id).order('created_at', { ascending: false })
      .then(({ data }) => {
        setNotifications((data as AppNotification[]) || [])
        setLoading(false)
      })
  }, [profile])

  const markRead = async (id: string) => {
    await supabase.from('notifications').update({ read: true }).eq('id', id)
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  if (loading) return <div className="skeleton h-64 w-full" />
  if (notifications.length === 0) return <EmptyState title="No Notifications" message="You're all caught up!" />

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
      <h2 className="text-2xl font-heading font-bold">Notifications</h2>
      {notifications.map((n) => (
        <div key={n.id} className={`glass-card p-4 ${!n.read ? 'border-brand-500/30' : ''}`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-medium text-sm">{n.title}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{n.message}</p>
              <p className="text-xs text-slate-400 mt-2">{new Date(n.created_at).toLocaleString('en-IN')}</p>
            </div>
            {!n.read && (
              <button onClick={() => markRead(n.id)} className="text-xs text-brand-600 dark:text-brand-400 font-medium">
                Mark read
              </button>
            )}
          </div>
        </div>
      ))}
    </motion.div>
  )
}
