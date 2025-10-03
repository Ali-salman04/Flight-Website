'use client';

import React from 'react';
import { MapPin } from 'lucide-react';

const PopularDestinations: React.FC = () => {
  const destinations = [
    {
      name: 'Santorini',
      country: 'Greece',
      image: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Beautiful white buildings and stunning sunsets'
    },
    {
      name: 'Bali',
      country: 'Indonesia',
      image: 'https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Tropical paradise with rich culture'
    },
    {
      name: 'Swiss Alps',
      country: 'Switzerland',
      image: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Breathtaking mountain landscapes'
    },
    {
      name: 'Maldives',
      country: 'Maldives',
      image: 'https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Crystal clear waters and luxury resorts'
    },
    {
      name: 'Morocco',
      country: 'Morocco',
      image: 'https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Exotic markets and historic architecture'
    },
    {
      name: 'Iceland',
      country: 'Iceland',
      image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Northern lights and geothermal wonders'
    },
    {
      name: 'Thailand',
      country: 'Thailand',
      image: 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Golden temples and tropical beaches'
    },
    {
      name: 'Peru',
      country: 'Peru',
      image: 'https://images.pexels.com/photos/259967/pexels-photo-259967.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Ancient ruins and diverse landscapes'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Holiday Destinations</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing places around the world with our curated travel experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm opacity-90">{destination.country}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
                <p className="text-sm opacity-90 mb-4">{destination.description}</p>
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300 transform group-hover:scale-105">
                  Explore
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;