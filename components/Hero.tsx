import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Users, Briefcase, GraduationCap } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Real Projects.{' '}
            <span className="text-blue-600">Real Interns.</span>{' '}
            Real Impact.
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with talented interns guided by experienced team leads to deliver exceptional projects 
            while providing meaningful learning opportunities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/register?type=client">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                Hire Our Team
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/register?type=intern">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-gray-300">
                Join as Intern
                <GraduationCap className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/register?type=mentor">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-gray-300">
                Become a Mentor
                <Users className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
              <div className="text-gray-600">Talented Interns</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Expert Mentors</div>
            </div>
          </div>
        </div>

        {/* Hero Image/Video Placeholder */}
        <div className="mt-16 relative">
          <div className="bg-gray-100 rounded-2xl shadow-xl aspect-video max-w-5xl mx-auto flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="h-8 w-8 text-white ml-1" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">See How It Works</h3>
              <p className="text-gray-600">Watch our 2-minute overview video</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}