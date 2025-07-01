import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Upload, Users, Code, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Client Submits Project',
    description: 'Clients submit their project requirements through our platform with detailed specifications and timeline.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Users,
    title: 'Team Lead Assigns Tasks',
    description: 'Our experienced team leads break down the project into manageable tasks and assign them to qualified interns.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: Code,
    title: 'Interns Execute',
    description: 'Skilled interns work on their assigned tasks with continuous mentorship and feedback from team leads.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: CheckCircle,
    title: 'Quality Delivery',
    description: 'Projects undergo thorough review before final delivery, ensuring client satisfaction and learning outcomes.',
    color: 'bg-orange-100 text-orange-600',
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our streamlined process ensures successful project delivery while providing 
            meaningful learning experiences for interns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="hover:shadow-lg transition-shadow border-gray-200">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${step.color}`}>
                    <step.icon className="h-8 w-8" />
                  </div>
                  <div className="text-sm font-semibold text-blue-600 mb-2">
                    Step {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-6 w-6 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}