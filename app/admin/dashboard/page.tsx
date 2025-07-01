'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Briefcase, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Calendar,
  Shield,
  LogOut,
  Settings,
  BarChart3,
  UserCheck,
  Clock
} from 'lucide-react';
import { AuthService } from '@/lib/auth';
import { AdminAPI } from '@/lib/api/admin';
import type { Profile } from '@/lib/supabase';

interface DashboardStats {
  totalUsers: number;
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  pendingApprovals: number;
  totalInterns: number;
  totalClients: number;
  totalTeamLeads: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    pendingApprovals: 0,
    totalInterns: 0,
    totalClients: 0,
    totalTeamLeads: 0,
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAdminAccess();
    loadDashboardData();
  }, []);

  const checkAdminAccess = async () => {
    const { user, profile } = await AuthService.getCurrentUser();
    
    if (!user || !profile || profile.role !== 'admin') {
      router.push('/admin/login');
      return;
    }
    
    setCurrentUser(profile);
  };

  const loadDashboardData = async () => {
    try {
      const [statsData, activityData] = await Promise.all([
        AdminAPI.getDashboardStats(),
        AdminAPI.getRecentActivity()
      ]);

      if (statsData.data) {
        setStats(statsData.data);
      }
      
      if (activityData.data) {
        setRecentActivity(activityData.data);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await AuthService.signOut();
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">InternHub Management Portal</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {currentUser?.full_name}
              </span>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              className="justify-start h-auto p-4 bg-blue-600 hover:bg-blue-700"
              onClick={() => router.push('/admin/users')}
            >
              <Users className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Manage Users</div>
                <div className="text-xs opacity-90">View and approve users</div>
              </div>
            </Button>
            
            <Button 
              className="justify-start h-auto p-4 bg-green-600 hover:bg-green-700"
              onClick={() => router.push('/admin/projects')}
            >
              <Briefcase className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Manage Projects</div>
                <div className="text-xs opacity-90">Oversee all projects</div>
              </div>
            </Button>
            
            <Button 
              className="justify-start h-auto p-4 bg-purple-600 hover:bg-purple-700"
              onClick={() => router.push('/admin/analytics')}
            >
              <BarChart3 className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Analytics</div>
                <div className="text-xs opacity-90">View platform metrics</div>
              </div>
            </Button>
            
            <Button 
              className="justify-start h-auto p-4 bg-orange-600 hover:bg-orange-700"
              onClick={() => router.push('/admin/approvals')}
            >
              <UserCheck className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Approvals</div>
                <div className="text-xs opacity-90">{stats.pendingApprovals} pending</div>
              </div>
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Platform Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600">+12% from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Projects</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.activeProjects}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-gray-600">
                    {stats.totalProjects} total projects
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completed Projects</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.completedProjects}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-gray-600">
                    {Math.round((stats.completedProjects / stats.totalProjects) * 100)}% completion rate
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.pendingApprovals}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <AlertTriangle className="h-4 w-4 text-orange-500 mr-1" />
                  <span className="text-orange-600">Requires attention</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* User Breakdown */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">User Distribution</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Interns</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.totalInterns}</p>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {Math.round((stats.totalInterns / stats.totalUsers) * 100)}%
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Clients</p>
                    <p className="text-2xl font-bold text-green-600">{stats.totalClients}</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {Math.round((stats.totalClients / stats.totalUsers) * 100)}%
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Team Leads</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.totalTeamLeads}</p>
                  </div>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    {Math.round((stats.totalTeamLeads / stats.totalUsers) * 100)}%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <Card>
            <CardContent className="p-6">
              {recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(activity.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No recent activity to display</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}