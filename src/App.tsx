import { Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingButtons from '@/components/layout/FloatingButtons'
import ScrollProgress from '@/components/layout/ScrollProgress'
import BackToTop from '@/components/layout/BackToTop'
import CookieConsent from '@/components/layout/CookieConsent'
import Loader from '@/components/ui/Loader'
import ScrollToTop from '@/components/utils/ScrollToTop'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const Services = lazy(() => import('@/pages/Services'))
const Portfolio = lazy(() => import('@/pages/Portfolio'))
const Pricing = lazy(() => import('@/pages/Pricing'))
const Blog = lazy(() => import('@/pages/Blog'))
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'))
const Contact = lazy(() => import('@/pages/Contact'))
const Login = lazy(() => import('@/pages/Login'))
const ClientDashboard = lazy(() => import('@/pages/dashboard/ClientDashboard'))
const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'))
const PrivacyPolicy = lazy(() => import('@/pages/policies/PrivacyPolicy'))
const TermsConditions = lazy(() => import('@/pages/policies/TermsConditions'))
const RefundPolicy = lazy(() => import('@/pages/policies/RefundPolicy'))
const CookiePolicy = lazy(() => import('@/pages/policies/CookiePolicy'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')
  const isDashboardRoute = location.pathname.startsWith('/dashboard')
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/admin/login'

  useEffect(() => {
    document.title = 'SDX Software Development — Premium Web & Software Services'
  }, [])

  const showChrome = !isAdminRoute && !isDashboardRoute && !isAuthRoute

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <ScrollToTop />
      {showChrome && <Navbar />}
      <main className={showChrome ? 'flex-1' : 'flex-1'}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard/*" element={<ProtectedRoute><ClientDashboard /></ProtectedRoute>} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {showChrome && <Footer />}
      {showChrome && <FloatingButtons />}
      {showChrome && <BackToTop />}
      {showChrome && <CookieConsent />}
    </div>
  )
}
