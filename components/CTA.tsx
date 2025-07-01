import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Briefcase, GraduationCap } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join thousands of clients, interns, and mentors who are creating the future of work together.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link href="/register?type=client">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all cursor-pointer">
                <Briefcase className="h-8 w-8 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">For Clients</h3>
                <p className="text-sm opacity-90 mb-4">
                  Get your projects done by talented interns with expert guidance
                </p>
                <Button variant="secondary" size="sm" className="text-blue-600">
                  Hire Our Team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Link>

            <Link href="/register?type=intern">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all cursor-pointer">
                <GraduationCap className="h-8 w-8 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">For Interns</h3>
                <p className="text-sm opacity-90 mb-4">
                  Gain real-world experience on exciting projects with mentorship
                </p>
                <Button variant="secondary" size="sm" className="text-blue-600">
                  Start Learning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Link>

            <Link href="/register?type=mentor">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all cursor-pointer">
                <Users className="h-8 w-8 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">For Mentors</h3>
                <p className="text-sm opacity-90 mb-4">
                  Guide the next generation while working on meaningful projects
                </p>
                <Button variant="secondary" size="sm" className="text-blue-600">
                  Become a Mentor
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}