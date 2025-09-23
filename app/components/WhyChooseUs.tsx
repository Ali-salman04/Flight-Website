import React from 'react';
import { Shield, Clock, Award, HeartHandshake } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-orange-600" />,
      title: 'Secure Booking',
      description: '100% secure payments and data protection',
      image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: <Clock className="h-8 w-8 text-orange-600" />,
      title: '24/7 Support',
      description: 'Round-the-clock customer assistance',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: <HeartHandshake className="h-8 w-8 text-orange-600" />,
      title: 'Trusted Service',
      description: 'Over 10 years of reliable service',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <div className="lg:w-1/3 bg-gray-900 text-white p-8 lg:p-12 relative overflow-hidden rounded-lg ">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600 rounded-full transform translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-600 rounded-full transform -translate-x-12 translate-y-12"></div>
      </div>
      
      <h2 className="text-3xl font-bold mb-8">Why Choose Us</h2>
      <div className="space-y-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
          >
            {/* Feature Image Background */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
              <img 
                src={feature.image} 
                alt={feature.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className=" rounded-lg p-3 flex-shrink-0 relative z-10 group-hover:bg-orange-500 transition-colors duration-300">
              {feature.icon}
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300 group-hover:text-white transition-colors duration-300">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;