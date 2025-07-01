import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Heart, TrendingUp } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Bridging the Gap Between <span className="text-blue-600">Talent</span> and <span className="text-blue-600">Opportunity</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe in the power of real-world experience. InternHub connects ambitious students 
              with meaningful projects while delivering exceptional results for our clients.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="border-l-4 border-l-blue-600">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Target className="h-8 w-8 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-gray-600 text-lg">
                  To create a sustainable ecosystem where students gain valuable real-world experience 
                  while businesses access fresh talent and innovative solutions. We're democratizing 
                  access to meaningful work opportunities and professional mentorship.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-600">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Heart className="h-8 w-8 text-green-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
                </div>
                <p className="text-gray-600 text-lg">
                  A world where every student has access to practical experience that bridges the gap 
                  between education and career success, while businesses benefit from fresh perspectives 
                  and cost-effective solutions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Clients Love This Model */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Clients Choose InternHub
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our unique model offers unparalleled value for businesses of all sizes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Cost-Effective Solutions</h3>
              <p className="text-gray-600">
                Get high-quality work at competitive rates while supporting the next generation of professionals.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fresh Perspectives</h3>
              <p className="text-gray-600">
                Interns bring innovative ideas and the latest knowledge from their academic programs.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Assurance</h3>
              <p className="text-gray-600">
                Expert mentors ensure all work meets professional standards and client expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Students Benefit */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Students Transform Their Careers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide more than just internships – we create career-launching experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-World Experience</h3>
                    <p className="text-gray-600">Work on actual client projects that matter, building a portfolio with tangible impact.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Mentorship</h3>
                    <p className="text-gray-600">Learn from industry professionals who guide your growth and career development.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Network</h3>
                    <p className="text-gray-600">Build connections with mentors, peers, and clients that last throughout your career.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Career Advancement</h3>
                    <p className="text-gray-600">Earn certificates, testimonials, and referrals that open doors to your dream job.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center">
              <div className="text-center">
                <Users className="h-20 w-20 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">500+ Success Stories</h3>
                <p className="text-gray-600">Students who launched their careers through InternHub</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}