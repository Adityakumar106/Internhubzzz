/*
  # Initial Database Schema for InternHub

  1. New Tables
    - `profiles` - User profile information for all user types
    - `projects` - Client projects and their details
    - `tasks` - Individual tasks within projects
    - `applications` - Intern applications for tasks
    - `submissions` - Work submissions from interns
    - `reviews` - Reviews and feedback on submissions
    - `notifications` - System notifications for users

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access control
    - Secure user data based on authentication

  3. User Types
    - client: Can create projects, view progress, communicate with team leads
    - intern: Can apply for tasks, submit work, receive feedback
    - team_lead: Can assign tasks, review submissions, manage projects
    - admin: Full system access
*/

-- Create enum types
CREATE TYPE user_role AS ENUM ('client', 'intern', 'team_lead', 'admin');
CREATE TYPE project_status AS ENUM ('draft', 'active', 'in_progress', 'completed', 'cancelled');
CREATE TYPE task_status AS ENUM ('open', 'assigned', 'in_progress', 'submitted', 'reviewed', 'completed');
CREATE TYPE application_status AS ENUM ('pending', 'accepted', 'rejected');
CREATE TYPE submission_status AS ENUM ('pending', 'approved', 'needs_revision', 'rejected');

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  phone text,
  role user_role NOT NULL DEFAULT 'intern',
  company text,
  experience_level text,
  skills text[],
  portfolio_url text,
  bio text,
  avatar_url text,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  team_lead_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text NOT NULL,
  requirements text,
  budget decimal(10,2),
  deadline date,
  status project_status DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  assigned_intern_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text NOT NULL,
  requirements text,
  estimated_hours integer,
  deadline date,
  status task_status DEFAULT 'open',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Applications table
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid REFERENCES tasks(id) ON DELETE CASCADE NOT NULL,
  intern_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  cover_letter text,
  status application_status DEFAULT 'pending',
  applied_at timestamptz DEFAULT now(),
  reviewed_at timestamptz,
  UNIQUE(task_id, intern_id)
);

-- Submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid REFERENCES tasks(id) ON DELETE CASCADE NOT NULL,
  intern_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  file_urls text[],
  github_url text,
  demo_url text,
  status submission_status DEFAULT 'pending',
  submitted_at timestamptz DEFAULT now(),
  reviewed_at timestamptz
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid REFERENCES submissions(id) ON DELETE CASCADE NOT NULL,
  reviewer_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  feedback text,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Messages table for chat functionality
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  recipient_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  content text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Team leads can view intern profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    role = 'intern' AND 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'team_lead'
    )
  );

-- Projects policies
CREATE POLICY "Clients can view their own projects"
  ON projects FOR SELECT
  TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "Clients can create projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "Team leads can view assigned projects"
  ON projects FOR SELECT
  TO authenticated
  USING (
    team_lead_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'team_lead'
    )
  );

-- Tasks policies
CREATE POLICY "Interns can view open tasks"
  ON tasks FOR SELECT
  TO authenticated
  USING (
    status = 'open' OR 
    assigned_intern_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('team_lead', 'admin')
    )
  );

-- Applications policies
CREATE POLICY "Interns can view their own applications"
  ON applications FOR SELECT
  TO authenticated
  USING (intern_id = auth.uid());

CREATE POLICY "Interns can create applications"
  ON applications FOR INSERT
  TO authenticated
  WITH CHECK (intern_id = auth.uid());

-- Submissions policies
CREATE POLICY "Interns can view their own submissions"
  ON submissions FOR SELECT
  TO authenticated
  USING (intern_id = auth.uid());

CREATE POLICY "Interns can create submissions"
  ON submissions FOR INSERT
  TO authenticated
  WITH CHECK (intern_id = auth.uid());

-- Reviews policies
CREATE POLICY "Users can view reviews for their submissions"
  ON reviews FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM submissions 
      WHERE id = submission_id AND intern_id = auth.uid()
    ) OR
    reviewer_id = auth.uid()
  );

-- Notifications policies
CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Messages policies
CREATE POLICY "Users can view their own messages"
  ON messages FOR SELECT
  TO authenticated
  USING (sender_id = auth.uid() OR recipient_id = auth.uid());

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (sender_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_projects_client_id ON projects(client_id);
CREATE INDEX idx_projects_team_lead_id ON projects(team_lead_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_tasks_assigned_intern_id ON tasks(assigned_intern_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_applications_task_id ON applications(task_id);
CREATE INDEX idx_applications_intern_id ON applications(intern_id);
CREATE INDEX idx_submissions_task_id ON submissions(task_id);
CREATE INDEX idx_submissions_intern_id ON submissions(intern_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_recipient_id ON messages(recipient_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();