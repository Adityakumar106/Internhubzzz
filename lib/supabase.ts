import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export type UserRole = 'client' | 'intern' | 'team_lead' | 'admin';
export type ProjectStatus = 'draft' | 'active' | 'in_progress' | 'completed' | 'cancelled';
export type TaskStatus = 'open' | 'assigned' | 'in_progress' | 'submitted' | 'reviewed' | 'completed';
export type ApplicationStatus = 'pending' | 'accepted' | 'rejected';
export type SubmissionStatus = 'pending' | 'approved' | 'needs_revision' | 'rejected';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: UserRole;
  company?: string;
  experience_level?: string;
  skills?: string[];
  portfolio_url?: string;
  bio?: string;
  avatar_url?: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  client_id: string;
  team_lead_id?: string;
  title: string;
  description: string;
  requirements?: string;
  budget?: number;
  deadline?: string;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  project_id: string;
  assigned_intern_id?: string;
  title: string;
  description: string;
  requirements?: string;
  estimated_hours?: number;
  deadline?: string;
  status: TaskStatus;
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: string;
  task_id: string;
  intern_id: string;
  cover_letter?: string;
  status: ApplicationStatus;
  applied_at: string;
  reviewed_at?: string;
}

export interface Submission {
  id: string;
  task_id: string;
  intern_id: string;
  title: string;
  description?: string;
  file_urls?: string[];
  github_url?: string;
  demo_url?: string;
  status: SubmissionStatus;
  submitted_at: string;
  reviewed_at?: string;
}

export interface Review {
  id: string;
  submission_id: string;
  reviewer_id: string;
  rating?: number;
  feedback?: string;
  is_approved: boolean;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  project_id?: string;
  content: string;
  is_read: boolean;
  created_at: string;
}