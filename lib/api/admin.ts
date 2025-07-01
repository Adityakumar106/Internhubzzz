import { supabase } from '../supabase';
import type { Profile, Project, Task } from '../supabase';

export class AdminAPI {
  // Dashboard Stats
  static async getDashboardStats() {
    try {
      // Get user counts by role
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('role, is_approved');

      if (profilesError) throw profilesError;

      // Get project counts by status
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select('status');

      if (projectsError) throw projectsError;

      // Calculate stats
      const totalUsers = profiles?.length || 0;
      const totalInterns = profiles?.filter(p => p.role === 'intern').length || 0;
      const totalClients = profiles?.filter(p => p.role === 'client').length || 0;
      const totalTeamLeads = profiles?.filter(p => p.role === 'team_lead').length || 0;
      const pendingApprovals = profiles?.filter(p => !p.is_approved).length || 0;

      const totalProjects = projects?.length || 0;
      const activeProjects = projects?.filter(p => p.status === 'active' || p.status === 'in_progress').length || 0;
      const completedProjects = projects?.filter(p => p.status === 'completed').length || 0;

      return {
        data: {
          totalUsers,
          totalProjects,
          activeProjects,
          completedProjects,
          pendingApprovals,
          totalInterns,
          totalClients,
          totalTeamLeads,
        },
        error: null
      };
    } catch (error) {
      return { data: null, error };
    }
  }

  // Recent Activity
  static async getRecentActivity() {
    try {
      // Get recent projects, tasks, and user registrations
      const { data: recentProjects, error: projectsError } = await supabase
        .from('projects')
        .select('id, title, created_at, client:profiles!projects_client_id_fkey(full_name)')
        .order('created_at', { ascending: false })
        .limit(5);

      if (projectsError) throw projectsError;

      const { data: recentUsers, error: usersError } = await supabase
        .from('profiles')
        .select('id, full_name, role, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      if (usersError) throw usersError;

      // Combine and format activity
      const activity = [
        ...(recentProjects?.map(project => ({
          title: 'New Project Created',
          description: `${project.title} by ${project.client?.full_name}`,
          created_at: project.created_at,
          type: 'project'
        })) || []),
        ...(recentUsers?.map(user => ({
          title: 'New User Registration',
          description: `${user.full_name} joined as ${user.role}`,
          created_at: user.created_at,
          type: 'user'
        })) || [])
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
       .slice(0, 10);

      return { data: activity, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  // User Management
  static async getAllUsers() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }

  static async approveUser(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ is_approved: true })
        .eq('id', userId)
        .select()
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }

  static async rejectUser(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ is_approved: false })
        .eq('id', userId)
        .select()
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }

  static async deleteUser(userId: string) {
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      return { error };
    } catch (error) {
      return { error };
    }
  }

  // Project Management
  static async getAllProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          client:profiles!projects_client_id_fkey(full_name, email),
          team_lead:profiles!projects_team_lead_id_fkey(full_name, email),
          tasks(id, title, status)
        `)
        .order('created_at', { ascending: false });

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }

  static async updateProjectStatus(projectId: string, status: string) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update({ status })
        .eq('id', projectId)
        .select()
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
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

  // Task Management
  static async getAllTasks() {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          project:projects(title, client_id),
          assigned_intern:profiles!tasks_assigned_intern_id_fkey(full_name, email)
        `)
        .order('created_at', { ascending: false });

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }

  // Analytics
  static async getAnalytics() {
    try {
      // Get user growth over time
      const { data: userGrowth, error: userError } = await supabase
        .from('profiles')
        .select('created_at, role')
        .order('created_at', { ascending: true });

      if (userError) throw userError;

      // Get project completion rates
      const { data: projectStats, error: projectError } = await supabase
        .from('projects')
        .select('status, created_at, deadline')
        .order('created_at', { ascending: true });

      if (projectError) throw projectError;

      // Process data for charts
      const monthlyUserGrowth = this.processMonthlyGrowth(userGrowth || []);
      const projectCompletionRates = this.processProjectStats(projectStats || []);

      return {
        data: {
          userGrowth: monthlyUserGrowth,
          projectStats: projectCompletionRates,
        },
        error: null
      };
    } catch (error) {
      return { data: null, error };
    }
  }

  private static processMonthlyGrowth(data: any[]) {
    const monthlyData: { [key: string]: { total: number; clients: number; interns: number; team_leads: number } } = {};
    
    data.forEach(item => {
      const month = new Date(item.created_at).toISOString().slice(0, 7); // YYYY-MM
      if (!monthlyData[month]) {
        monthlyData[month] = { total: 0, clients: 0, interns: 0, team_leads: 0 };
      }
      monthlyData[month].total++;
      if (item.role === 'client') monthlyData[month].clients++;
      if (item.role === 'intern') monthlyData[month].interns++;
      if (item.role === 'team_lead') monthlyData[month].team_leads++;
    });

    return Object.entries(monthlyData).map(([month, stats]) => ({
      month,
      ...stats
    }));
  }

  private static processProjectStats(data: any[]) {
    const statusCounts = data.reduce((acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count
    }));
  }
}