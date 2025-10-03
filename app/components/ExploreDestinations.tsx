'use client';

import React from 'react';
import { MapPin, Star } from 'lucide-react';

const ExploreDestinations: React.FC = () => {
  const destinations = [
    {
      name: 'Paris',
      country: 'France',
      image: 'https://images.pexels.com/photos/1308940/pexels-photo-1308940.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 'From $299',
      rating: 4.8
    },
    {
      name: 'Tokyo',
      country: 'Japan',
      image: 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 'From $599',
      rating: 4.9
    },
    {
      name: 'New York',
      country: 'USA',
      image: 'https://images.pexels.com/photos/64271/queen-of-liberty-statue-of-liberty-new-york-liberty-statue-64271.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 'From $399',
      rating: 4.7
    },
    {
      name: 'Dubai',
      country: 'UAE',
      image: 'https://images.pexels.com/photos/618079/pexels-photo-618079.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 'From $449',
      rating: 4.8
    }
  ];

  return (
    <div 
      className="lg:w-2/3 p-8 lg:p-12 min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: 'url(https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg?auto=compress&cs=tinysrgb&w=1200)'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-white bg-opacity-90"></div>
      
      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Explore These Welcoming Destinations
        </h2>
        
        <div className="grid grid-cols-2 gap-6">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white bg-opacity-95 backdrop-blur-sm"
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{destination.country}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-current text-yellow-400" />
                    <span className="text-sm">{destination.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
                
                <div className="flex items-center justify-between">
                  <span className="text-orange-300 font-semibold">{destination.price}</span>
                  <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-300">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreDestinations;