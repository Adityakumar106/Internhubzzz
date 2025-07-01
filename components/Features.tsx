import { Card, CardContent } from '@/components/ui/card';
import { Users, Briefcase, GraduationCap, Target, Clock, Shield } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Expert Mentorship',
    description: 'Experienced team leads guide interns through real-world projects, ensuring quality delivery and meaningful learning.',
  },
  {
    icon: Briefcase,
    title: 'Real Projects',
    description: 'Work on actual client projects that matter, not theoretical exercises. Build a portfolio with tangible impact.',
  },
  {
    icon: GraduationCap,
    title: 'Skill Development',
    description: 'Interns gain hands-on experience in their field while earning badges, certificates, and testimonials.',
  },
  {
    icon: Target,
    title: 'Quality Assurance',
    description: 'Every project goes through our rigorous review process to ensure client satisfaction and learning outcomes.',
  },
  {
    icon: Clock,
    title: 'Flexible Timeline',
    description: 'Projects are broken down into manageable tasks with realistic timelines that work for everyone.',
  },
  {
    icon: Shield,
    title: 'Secure Platform',
    description: 'Built-in communication tools, file sharing, and progress tracking keep everything organized and secure.',
  },
];

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose InternHub?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We bridge the gap between talented students and real-world experience while delivering 
            exceptional results for our clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-gray-200">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}