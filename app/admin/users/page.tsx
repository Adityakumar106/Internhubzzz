'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  Search, 
  Filter, 
  UserCheck, 
  UserX, 
  Mail, 
  Phone,
  Building,
  Calendar,
  ArrowLeft,
  MoreHorizontal,
  Eye
} from 'lucide-react';
import { AuthService } from '@/lib/auth';
import { AdminAPI } from '@/lib/api/admin';
import type { Profile, UserRole } from '@/lib/supabase';

export default function AdminUsers() {
  const router = useRouter();
  const [users, setUsers] = useState<Profile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    checkAdminAccess();
    loadUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, roleFilter, statusFilter]);

  const checkAdminAccess = async () => {
    const { user, profile } = await AuthService.getCurrentUser();
    
    if (!user || !profile || profile.role !== 'admin') {
      router.push('/admin/login');
      return;
    }
  };

  const loadUsers = async () => {
    try {
      const { data, error } = await AdminAPI.getAllUsers();
      
      if (error) {
        console.error('Error loading users:', error);
      } else if (data) {
        setUsers(data);
      }
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.company && user.company.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      const isApproved = statusFilter === 'approved';
      filtered = filtered.filter(user => user.is_approved === isApproved);
    }

    setFilteredUsers(filtered);
  };

  const handleApproveUser = async (userId: string) => {
    try {
      const { error } = await AdminAPI.approveUser(userId);
      
      if (error) {
        console.error('Error approving user:', error);
      } else {
        // Update local state
        setUsers(users.map(user => 
          user.id === userId ? { ...user, is_approved: true } : user
        ));
      }
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  const handleRejectUser = async (userId: string) => {
    try {
      const { error } = await AdminAPI.rejectUser(userId);
      
      if (error) {
        console.error('Error rejecting user:', error);
      } else {
        // Update local state
        setUsers(users.map(user => 
          user.id === userId ? { ...user, is_approved: false } : user
        ));
      }
    } catch (error) {
      console.error('Error rejecting user:', error);
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'client': return 'bg-blue-100 text-blue-800';
      case 'intern': return 'bg-green-100 text-green-800';
      case 'team_lead': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
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
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => router.push('/admin/dashboard')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">User Management</h1>
                <p className="text-sm text-gray-500">{filteredUsers.length} users found</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="client">Clients</SelectItem>
                  <SelectItem value="intern">Interns</SelectItem>
                  <SelectItem value="team_lead">Team Leads</SelectItem>
                  <SelectItem value="admin">Admins</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending Approval</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-gray-600" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {user.full_name}
                        </h3>
                        <Badge className={getRoleBadgeColor(user.role)}>
                          {user.role.replace('_', ' ')}
                        </Badge>
                        <Badge variant={user.is_approved ? 'default' : 'secondary'}>
                          {user.is_approved ? 'Approved' : 'Pending'}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <span>{user.email}</span>
                        </div>
                        
                        {user.phone && (
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4" />
                            <span>{user.phone}</span>
                          </div>
                        )}
                        
                        {user.company && (
                          <div className="flex items-center space-x-2">
                            <Building className="h-4 w-4" />
                            <span>{user.company}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      {user.bio && (
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {user.bio}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    
                    {!user.is_approved && (
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleApproveUser(user.id)}
                      >
                        <UserCheck className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                    )}
                    
                    {user.is_approved && user.role !== 'admin' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRejectUser(user.id)}
                      >
                        <UserX className="h-4 w-4 mr-2" />
                        Revoke
                      </Button>
                    )}
                    
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-600">
                Try adjusting your search criteria or filters.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}