'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase, GraduationCap, Users, Upload, Loader2 } from 'lucide-react';
import { AuthService } from '@/lib/auth';
import type { UserRole } from '@/lib/supabase';

export default function Register() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userType = (searchParams.get('type') || 'client') as UserRole;
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    phone: '',
    company: '',
    experience_level: '',
    skills: '',
    portfolio_url: '',
    bio: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Client-side validation
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const skillsArray = formData.skills ? formData.skills.split(',').map(s => s.trim()) : [];
      
      const { data, error } = await AuthService.signUp({
        email: formData.email,
        password: formData.password,
        full_name: formData.full_name,
        phone: formData.phone || undefined,
        role: userType,
        company: formData.company || undefined,
        experience_level: formData.experience_level || undefined,
        skills: skillsArray.length > 0 ? skillsArray : undefined,
        portfolio_url: formData.portfolio_url || undefined,
        bio: formData.bio || undefined,
      });

      if (error) {
        setError(error.message);
      } else {
        // Redirect to dashboard or confirmation page
        router.push('/dashboard');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      experience_level: value,
    });
  };

  const getUserTypeInfo = () => {
    switch (userType) {
      case 'client':
        return {
          title: 'Join as a Client',
          subtitle: 'Get your projects done by talented interns with expert guidance',
          icon: Briefcase,
          color: 'blue',
        };
      case 'intern':
        return {
          title: 'Join as an Intern',
          subtitle: 'Gain real-world experience on exciting projects with mentorship',
          icon: GraduationCap,
          color: 'green',
        };
      case 'team_lead':
        return {
          title: 'Become a Mentor',
          subtitle: 'Guide the next generation while working on meaningful projects',
          icon: Users,
          color: 'purple',
        };
      default:
        return {
          title: 'Join InternHub',
          subtitle: 'Choose your role to get started',
          icon: Users,
          color: 'blue',
        };
    }
  };

  const typeInfo = getUserTypeInfo();
  const IconComponent = typeInfo.icon;

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className={`w-16 h-16 bg-${typeInfo.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
            <IconComponent className={`h-8 w-8 text-${typeInfo.color}-600`} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {typeInfo.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {typeInfo.subtitle}
          </p>
        </div>

        {/* Registration Form */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Registration Form
            </CardTitle>
            <p className="text-gray-600">
              Fill out the form below to get started with InternHub.
            </p>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    id="full_name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password * (minimum 6 characters)
                  </label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Create a strong password"
                    minLength={6}
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <Input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm your password"
                    minLength={6}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              {/* Role-specific fields */}
              {userType === 'client' && (
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <Input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company name"
                  />
                </div>
              )}

              {(userType === 'intern' || userType === 'team_lead') && (
                <>
                  <div>
                    <label htmlFor="experience_level" className="block text-sm font-medium text-gray-700 mb-2">
                      Experience Level
                    </label>
                    <Select onValueChange={handleSelectChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                        <SelectItem value="advanced">Advanced (3+ years)</SelectItem>
                        <SelectItem value="expert">Expert (5+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
                      Skills & Technologies
                    </label>
                    <Textarea
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="List your relevant skills separated by commas (e.g., React, Node.js, Python)"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label htmlFor="portfolio_url" className="block text-sm font-medium text-gray-700 mb-2">
                      Portfolio/Resume URL
                    </label>
                    <Input
                      type="url"
                      id="portfolio_url"
                      name="portfolio_url"
                      value={formData.portfolio_url}
                      onChange={handleChange}
                      placeholder="https://your-portfolio.com"
                    />
                  </div>
                </>
              )}

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                  About You
                </label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us more about yourself and your goals..."
                  rows={4}
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className={`w-full bg-${typeInfo.color}-600 hover:bg-${typeInfo.color}-700`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}