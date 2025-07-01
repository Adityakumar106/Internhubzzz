import { supabase } from '../supabase';
import type { Project, Task } from '../supabase';

export class ProjectsAPI {
  static async createProject(projectData: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert(projectData)
        .select()
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }

  static async getProjects(userId: string, role: string) {
    try {
      let query = supabase.from('projects').select(`
        *,
        client:profiles!projects_client_id_fkey(full_name, email),
        team_lead:profiles!projects_team_lead_id_fkey(full_name, email),
        tasks(id, title, status)
      `);

      if (role === 'client') {
        query = query.eq('client_id', userId);
      } else if (role === 'team_lead') {
        query = query.eq('team_lead_id', userId);
      }

      const { data, error } = await query;
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }

  static async getProject(projectId: string) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          client:profiles!projects_client_id_fkey(full_name, email, company),
          team_lead:profiles!projects_team_lead_id_fkey(full_name, email),
          tasks(
            *,
            assigned_intern:profiles!tasks_assigned_intern_id_fkey(full_name, email),
            applications(
              *,
              intern:profiles!applications_intern_id_fkey(full_name, email, skills)
            ),
            submissions(
              *,
              intern:profiles!submissions_intern_id_fkey(full_name, email)
            )
          )
        `)
        .eq('id', projectId)
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }

  static async updateProject(projectId: string, updates: Partial<Project>) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', projectId)
        .select()
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }

  static async deleteProject(projectId: string) {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      return { error };
    } catch (error) {
      return { error };
    }
  }

  static async assignTeamLead(projectId: string, teamLeadId: string) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update({ team_lead_id: teamLeadId })
        .eq('id', projectId)
        .select()
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }
}