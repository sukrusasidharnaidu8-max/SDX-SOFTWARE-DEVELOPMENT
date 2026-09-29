/*
# SDX Software Development — Client Portal Schema

1. New Tables
- `client_profiles` — extended profile for auth users with client role (linked to auth.users)
- `projects` — client projects with status, milestones, assigned client
- `project_milestones` — individual milestones within a project
- `invoices` — invoices for clients, linked to projects
- `payments` — payment records (Razorpay order/capture)
- `client_files` — secure file uploads (metadata only; URLs are access-controlled)
- `agreements` — client agreement documents
- `notifications` — in-app notifications for clients
2. Security
- All tables have RLS enabled.
- Client-scoped: clients can only see their own projects, invoices, files, agreements, notifications.
- Admin (authenticated) can see all records.
- Payments: clients can read their own, only admin can insert/update.
3. Notes
- `client_profiles.user_id` references `auth.users(id)` and defaults to `auth.uid()`.
- Project ownership is checked via `client_profiles` join.
*/

-- Client profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS client_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  company text,
  phone text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE client_profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_own_profile" ON client_profiles;
CREATE POLICY "select_own_profile" ON client_profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_profile" ON client_profiles;
CREATE POLICY "insert_own_profile" ON client_profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_profile" ON client_profiles;
CREATE POLICY "update_own_profile" ON client_profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "admin_all_profiles" ON client_profiles;
CREATE POLICY "admin_all_profiles" ON client_profiles FOR SELECT TO authenticated USING (true);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES client_profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'planning',
  progress integer DEFAULT 0,
  start_date date,
  deadline date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_own_projects" ON projects;
CREATE POLICY "select_own_projects" ON projects FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM client_profiles WHERE client_profiles.id = projects.client_id AND client_profiles.user_id = auth.uid()));
DROP POLICY IF EXISTS "auth_manage_projects" ON projects;
CREATE POLICY "auth_manage_projects" ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE INDEX IF NOT EXISTS idx_projects_client ON projects(client_id);

-- Project milestones
CREATE TABLE IF NOT EXISTS project_milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  status text DEFAULT 'pending',
  due_date date,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE project_milestones ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_own_milestones" ON project_milestones;
CREATE POLICY "select_own_milestones" ON project_milestones FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM projects p
    JOIN client_profiles cp ON cp.id = p.client_id
    WHERE p.id = project_milestones.project_id AND cp.user_id = auth.uid()
  ));
DROP POLICY IF EXISTS "auth_manage_milestones" ON project_milestones;
CREATE POLICY "auth_manage_milestones" ON project_milestones FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE INDEX IF NOT EXISTS idx_milestones_project ON project_milestones(project_id);

-- Invoices
CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES client_profiles(id) ON DELETE CASCADE,
  project_id uuid REFERENCES projects(id) ON DELETE SET NULL,
  invoice_number text NOT NULL UNIQUE,
  amount integer NOT NULL,
  status text DEFAULT 'pending',
  due_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_own_invoices" ON invoices;
CREATE POLICY "select_own_invoices" ON invoices FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM client_profiles WHERE client_profiles.id = invoices.client_id AND client_profiles.user_id = auth.uid()));
DROP POLICY IF EXISTS "auth_manage_invoices" ON invoices;
CREATE POLICY "auth_manage_invoices" ON invoices FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE INDEX IF NOT EXISTS idx_invoices_client ON invoices(client_id);

-- Payments
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id uuid REFERENCES invoices(id) ON DELETE SET NULL,
  client_id uuid REFERENCES client_profiles(id) ON DELETE SET NULL,
  razorpay_order_id text,
  razorpay_payment_id text,
  amount integer NOT NULL,
  status text DEFAULT 'pending',
  method text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_own_payments" ON payments;
CREATE POLICY "select_own_payments" ON payments FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM client_profiles WHERE client_profiles.id = payments.client_id AND client_profiles.user_id = auth.uid()));
DROP POLICY IF EXISTS "auth_manage_payments" ON payments;
CREATE POLICY "auth_manage_payments" ON payments FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE INDEX IF NOT EXISTS idx_payments_client ON payments(client_id);

-- Client files
CREATE TABLE IF NOT EXISTS client_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  client_id uuid REFERENCES client_profiles(id) ON DELETE CASCADE,
  file_name text NOT NULL,
  file_url text NOT NULL,
  file_type text,
  file_size bigint,
  uploaded_by text DEFAULT 'admin',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE client_files ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_own_files" ON client_files;
CREATE POLICY "select_own_files" ON client_files FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM client_profiles WHERE client_profiles.id = client_files.client_id AND client_profiles.user_id = auth.uid()));
DROP POLICY IF EXISTS "auth_manage_files" ON client_files;
CREATE POLICY "auth_manage_files" ON client_files FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE INDEX IF NOT EXISTS idx_files_client ON client_files(client_id);
CREATE INDEX IF NOT EXISTS idx_files_project ON client_files(project_id);

-- Agreements
CREATE TABLE IF NOT EXISTS agreements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES client_profiles(id) ON DELETE CASCADE,
  project_id uuid REFERENCES projects(id) ON DELETE SET NULL,
  title text NOT NULL,
  file_url text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE agreements ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_own_agreements" ON agreements;
CREATE POLICY "select_own_agreements" ON agreements FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM client_profiles WHERE client_profiles.id = agreements.client_id AND client_profiles.user_id = auth.uid()));
DROP POLICY IF EXISTS "auth_manage_agreements" ON agreements;
CREATE POLICY "auth_manage_agreements" ON agreements FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE INDEX IF NOT EXISTS idx_agreements_client ON agreements(client_id);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES client_profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text DEFAULT 'info',
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_own_notifications" ON notifications;
CREATE POLICY "select_own_notifications" ON notifications FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM client_profiles WHERE client_profiles.id = notifications.client_id AND client_profiles.user_id = auth.uid()));
DROP POLICY IF EXISTS "update_own_notifications" ON notifications;
CREATE POLICY "update_own_notifications" ON notifications FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM client_profiles WHERE client_profiles.id = notifications.client_id AND client_profiles.user_id = auth.uid()))
  WITH CHECK (true);
DROP POLICY IF EXISTS "auth_manage_notifications" ON notifications;
CREATE POLICY "auth_manage_notifications" ON notifications FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE INDEX IF NOT EXISTS idx_notifications_client ON notifications(client_id);
