import { supabase } from '../supabase';
import type { Task, Application, Submission } from '../supabase';

export class TasksAPI {
  static async createTask(taskData: Omit<Task, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert(taskData)
        .select()
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }

  static async getTasks(filters?: { project_id?: string; status?: string; intern_id?: string }) {
    try {
      let query = supabase.from('tasks').select(`
        *,
        project:projects(title, client_id),
        assigned_intern:profiles!tasks_assigned_intern_id_fkey(full_name, email),
        applications(
          *,
          intern:profiles!applications_intern_id_fkey(full_name, email, skills)
        )
      `);

      if (filters?.project_id) {
        query = query.eq('project_id', filters.project_id);
      }
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.intern_id) {
        query = query.eq('assigned_intern_id', filters.intern_id);
      }

      const { data, error } = await query;
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }

  static async getTask(taskId: string) {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          project:projects(
            *,
            client:profiles!projects_client_id_fkey(full_name, email, company)
          ),
          assigned_intern:profiles!tasks_assigned_intern_id_fkey(full_name, email, skills),
          applications(
            *,
            intern:profiles!applications_intern_id_fkey(full_name, email, skills, portfolio_url)
          ),
          submissions(
            *,
            reviews(*)
          )
        `)
        .eq('id', taskId)
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }

  static async updateTask(taskId: string, updates: Partial<Task>) {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', taskId)
        .select()
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }

  static async assignIntern(taskId: string, internId: string) {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({ 
          assigned_intern_id: internId,
          status: 'assigned'
        })
        .eq('id', taskId)
        .select()
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }

  static async applyForTask(applicationData: Omit<Application, 'id' | 'applied_at'>) {
    try {
      const { data, error } = await supabase
        .from('applications')
        .insert(applicationData)
        .select()
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }

  static async updateApplication(applicationId: string, updates: Partial<Application>) {
    try {
      const { data, error } = await supabase
        .from('applications')
        .update(updates)
        .eq('id', applicationId)
        .select()
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }

  static async submitWork(submissionData: Omit<Submission, 'id' | 'submitted_at'>) {
    try {
      const { data, error } = await supabase
        .from('submissions')
        .insert(submissionData)
        .select()
        .single();

      // Update task status
      if (data) {
        await supabase
          .from('tasks')
          .update({ status: 'submitted' })
          .eq('id', submissionData.task_id);
      }

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }
}