'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Shield, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { AuthService } from '@/lib/auth';

export default function AdminLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await AuthService.signIn(formData);

      if (error) {
        setError(error.message);
      } else if (data.user) {
        // Get user profile to check if admin
        const { user, profile, error: profileError } = await AuthService.getCurrentUser();
        
        if (profileError || !profile) {
          setError('Unable to verify admin access');
        } else if (profile.role !== 'admin') {
          setError('Access denied. Admin privileges required.');
          await AuthService.signOut();
        } else {
          // Redirect to admin dashboard
          router.push('/admin/dashboard');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-white">InternHub</span>
              <div className="text-sm text-red-400 font-medium">Admin Portal</div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Administrator Access
          </h2>
          <p className="text-gray-300">
            Sign in with your admin credentials
          </p>
        </div>

        {/* Warning Notice */}
        <div className="bg-red-900/50 border border-red-700 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <span className="text-red-200 text-sm font-medium">Restricted Access</span>
          </div>
          <p className="text-red-300 text-sm mt-1">
            This area is restricted to authorized administrators only. 
            All access attempts are logged and monitored.
          </p>
        </div>

        {/* Login Form */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center text-white">
              Admin Sign In
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded mb-6">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="admin@internhub.com"
                    className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter admin password"
                    className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Access Admin Panel
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Back to Main Site */}
        <div className="text-center">
          <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">
            ← Back to InternHub
          </Link>
        </div>
      </div>
    </div>
  );
}