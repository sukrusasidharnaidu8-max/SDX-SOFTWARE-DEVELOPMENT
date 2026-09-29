/*
# SDX Software Development — Core Schema

1. New Tables
- `categories` — blog post categories (name, slug, description)
- `blog_posts` — full CMS blog articles with SEO fields, scheduling, draft/publish states
- `services` — website service offerings (description, features, price, icon, order)
- `portfolio_projects` — portfolio showcase items with category, before/after, case study
- `testimonials` — client testimonials (editable from admin, clearly managed content)
- `faqs` — FAQ entries
- `pricing_plans` — pricing tier cards (name, price INR, features, popular flag)
- `contact_messages` — submissions from the contact form
- `site_settings` — key/value store for dynamic website content (hero text, about, etc.)
2. Security
- All tables have RLS enabled.
- Public read access (anon + authenticated) on content tables: blog_posts (published only), services, portfolio_projects, testimonials, faqs, pricing_plans, categories.
- Contact messages: anyone can insert (public form), only authenticated can read (admin).
- site_settings: public read, authenticated write.
3. Notes
- blog_posts supports draft/publish/schedule with `status` and `published_at` columns.
- All content is admin-managed and dynamically reflected on the public website.
*/

-- Blog categories
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "pub_read_categories" ON categories;
CREATE POLICY "pub_read_categories" ON categories FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_write_categories" ON categories;
CREATE POLICY "auth_write_categories" ON categories FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Blog posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text NOT NULL,
  featured_image text,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  tags text[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'draft',
  seo_title text,
  seo_description text,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "pub_read_published_posts" ON blog_posts;
CREATE POLICY "pub_read_published_posts" ON blog_posts FOR SELECT TO anon, authenticated
  USING (status = 'published' AND (published_at IS NULL OR published_at <= now()));
DROP POLICY IF EXISTS "auth_manage_posts" ON blog_posts;
CREATE POLICY "auth_manage_posts" ON blog_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category_id);

-- Services
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text NOT NULL,
  features text[] DEFAULT '{}',
  price integer,
  price_label text,
  icon text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "pub_read_services" ON services;
CREATE POLICY "pub_read_services" ON services FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_manage_services" ON services;
CREATE POLICY "auth_manage_services" ON services FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Portfolio projects
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  category text NOT NULL,
  description text NOT NULL,
  image_url text,
  live_url text,
  case_study text,
  before_image text,
  after_image text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "pub_read_portfolio" ON portfolio_projects;
CREATE POLICY "pub_read_portfolio" ON portfolio_projects FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_manage_portfolio" ON portfolio_projects;
CREATE POLICY "auth_manage_portfolio" ON portfolio_projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_role text,
  client_company text,
  message text NOT NULL,
  rating integer DEFAULT 5,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "pub_read_testimonials" ON testimonials;
CREATE POLICY "pub_read_testimonials" ON testimonials FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_manage_testimonials" ON testimonials;
CREATE POLICY "auth_manage_testimonials" ON testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- FAQs
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "pub_read_faqs" ON faqs;
CREATE POLICY "pub_read_faqs" ON faqs FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_manage_faqs" ON faqs;
CREATE POLICY "auth_manage_faqs" ON faqs FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Pricing plans
CREATE TABLE IF NOT EXISTS pricing_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  price integer NOT NULL,
  period text DEFAULT 'one-time',
  description text,
  features text[] DEFAULT '{}',
  popular boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "pub_read_pricing" ON pricing_plans;
CREATE POLICY "pub_read_pricing" ON pricing_plans FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_manage_pricing" ON pricing_plans;
CREATE POLICY "auth_manage_pricing" ON pricing_plans FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Contact messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  company text,
  subject text NOT NULL,
  message text NOT NULL,
  ip_address text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "pub_insert_contact" ON contact_messages;
CREATE POLICY "pub_insert_contact" ON contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_read_contact" ON contact_messages;
CREATE POLICY "auth_read_contact" ON contact_messages FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "auth_update_contact" ON contact_messages;
CREATE POLICY "auth_update_contact" ON contact_messages FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_contact" ON contact_messages;
CREATE POLICY "auth_delete_contact" ON contact_messages FOR DELETE TO authenticated USING (true);

-- Site settings (key-value store for dynamic content)
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  value text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "pub_read_settings" ON site_settings;
CREATE POLICY "pub_read_settings" ON site_settings FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_manage_settings" ON site_settings;
CREATE POLICY "auth_manage_settings" ON site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
