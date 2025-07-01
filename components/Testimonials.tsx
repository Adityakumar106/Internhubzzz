import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO, TechStart Inc.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'InternHub delivered our mobile app project faster than we expected. The quality was outstanding and the interns were incredibly talented.',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'Product Manager, Digital Solutions',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'Working with InternHub was a game-changer. We got fresh perspectives and innovative solutions while supporting the next generation of talent.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Intern, Computer Science',
    image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    content: 'This internship gave me real-world experience I couldn\'t get anywhere else. The mentorship was incredible and I landed my dream job after.',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Community Says
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from clients, interns, and mentors who have experienced the InternHub difference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                
                <div className="relative mb-6">
                  <Quote className="h-6 w-6 text-gray-300 mb-2" />
                  <p className="text-gray-600 italic">
                    "{testimonial.content}"
                  </p>
                </div>

                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}