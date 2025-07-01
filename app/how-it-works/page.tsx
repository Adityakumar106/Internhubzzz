import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Upload, 
  Users, 
  Code, 
  CheckCircle, 
  ArrowRight, 
  MessageSquare, 
  Star,
  Award,
  BarChart3
} from 'lucide-react';

export default function HowItWorks() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How <span className="text-blue-600">InternHub</span> Works
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process connects clients with talented interns guided by expert mentors 
              to deliver exceptional results while creating meaningful learning opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Main Process Flow */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <Card className="hover:shadow-lg transition-shadow border-2 border-blue-100">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-8 w-8" />
                  </div>
                  <div className="text-sm font-semibold text-blue-600 mb-2">Step 1</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Client Submits Project</h3>
                  <p className="text-gray-600 mb-4">
                    Clients submit detailed project requirements, timeline, and budget through our intuitive platform.
                  </p>
                  <div className="text-sm text-gray-500">
                    ✓ Project scope definition<br/>
                    ✓ Timeline and budget setting<br/>
                    ✓ Success criteria outline
                  </div>
                </CardContent>
              </Card>
              <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <Card className="hover:shadow-lg transition-shadow border-2 border-green-100">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8" />
                  </div>
                  <div className="text-sm font-semibold text-green-600 mb-2">Step 2</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Team Lead Assigns</h3>
                  <p className="text-gray-600 mb-4">
                    Expert team leads break down projects into manageable tasks and assign them to qualified interns.
                  </p>
                  <div className="text-sm text-gray-500">
                    ✓ Task breakdown and planning<br/>
                    ✓ Intern skill matching<br/>
                    ✓ Resource allocation
                  </div>
                </CardContent>
              </Card>
              <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <Card className="hover:shadow-lg transition-shadow border-2 border-purple-100">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="h-8 w-8" />
                  </div>
                  <div className="text-sm font-semibold text-purple-600 mb-2">Step 3</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Interns Execute</h3>
                  <p className="text-gray-600 mb-4">
                    Talented interns work on tasks with continuous mentorship, feedback, and support from team leads.
                  </p>
                  <div className="text-sm text-gray-500">
                    ✓ Hands-on project work<br/>
                    ✓ Regular mentor check-ins<br/>
                    ✓ Skill development tracking
                  </div>
                </CardContent>
              </Card>
              <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </div>
            </div>

            {/* Step 4 */}
            <div>
              <Card className="hover:shadow-lg transition-shadow border-2 border-orange-100">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <div className="text-sm font-semibold text-orange-600 mb-2">Step 4</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Delivery</h3>
                  <p className="text-gray-600 mb-4">
                    Projects undergo thorough review and testing before final delivery to ensure client satisfaction.
                  </p>
                  <div className="text-sm text-gray-500">
                    ✓ Quality assurance review<br/>
                    ✓ Client feedback integration<br/>
                    ✓ Final project delivery
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Features for Each Role */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Features for Every User Type
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform is designed with specific tools and features for clients, interns, and team leads.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Client Features */}
            <Card className="border-2 border-blue-100">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">For Clients</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Submit and track project progress</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <MessageSquare className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Direct communication with team leads</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <BarChart3 className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Real-time progress analytics</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Star className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Rate and review final deliverables</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link href="/register?type=client">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Start a Project
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Intern Features */}
            <Card className="border-2 border-green-100">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">For Interns</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Apply for relevant project modules</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Upload className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Submit work and receive feedback</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Award className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Earn badges and certificates</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Users className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Access learning resources and mentorship</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link href="/register?type=intern">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Join as Intern
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Team Lead Features */}
            <Card className="border-2 border-purple-100">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">For Team Leads</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Assign and manage project tasks</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Star className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Review and approve submissions</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <MessageSquare className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Chat with interns and clients</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <BarChart3 className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Track team progress and analytics</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link href="/register?type=mentor">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Become a Mentor
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience the InternHub Process?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join our community of clients, interns, and mentors creating the future of work together.
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="text-blue-600">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}