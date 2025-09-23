'use client';

import React from 'react';
import { Users, Plane, MapPin, Award } from 'lucide-react';

const Statistics: React.FC = () => {
  const stats = [
    {
      icon: <Users className="h-8 w-8 text-white" />,
      number: '5M+',
      label: 'Happy Customers',
      bgColor: 'bg-blue-500',
      image: 'https://images.pexels.com/photos/1367276/pexels-photo-1367276.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: <Plane className="h-8 w-8 text-white" />,
      number: '50K+',
      label: 'Flights Booked',
      bgColor: 'bg-green-500',
      image: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: <MapPin className="h-8 w-8 text-white" />,
      number: '200+',
      label: 'Destinations',
      bgColor: 'bg-purple-500',
      image: 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: <Award className="h-8 w-8 text-white" />,
      number: '10+',
      label: 'Years Experience',
      bgColor: 'bg-orange-500',
      image: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <section className="py-16 bg-gray-900 relative overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=1920" 
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Our Achievements</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Numbers that speak for our commitment to excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group text-center transform hover:scale-105 transition-all duration-300 relative"
            >
              {/* Stat Card with Image Background */}
              <div className="relative bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 hover:bg-opacity-20 transition-all duration-300">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-xl overflow-hidden">
                  <img 
                    src={stat.image} 
                    alt={stat.label}
                    className="w-full h-full object-cover"
                  />
                </div>
                
              <div className={`${stat.bgColor} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-white mb-2 relative z-10">{stat.number}</div>
              <div className="text-gray-300 relative z-10 group-hover:text-white transition-colors duration-300">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;