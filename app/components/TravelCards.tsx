'use client';

import React from 'react';

const TravelCards: React.FC = () => {
  const travelPackages = [
    {
      location: 'Europe',
      duration: '7 Days',
      price: '$599',
      image: 'https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Explore historic cities and beautiful landscapes'
    },
    {
      location: 'Asia',
      duration: '10 Days',
      price: '$799',
      image: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Experience diverse cultures and delicious cuisine'
    },
    {
      location: 'Africa',
      duration: '14 Days',
      price: '$1299',
      image: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Safari adventures and wildlife encounters'
    },
    {
      location: 'Americas',
      duration: '12 Days',
      price: '$999',
      image: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'From ancient ruins to modern metropolis'
    },
    {
      location: 'Oceania',
      duration: '9 Days',
      price: '$899',
      image: 'https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Island paradise and unique wildlife'
    },
    {
      location: 'Middle East',
      duration: '8 Days',
      price: '$749',
      image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Rich history and architectural wonders'
    },
    {
      location: 'Scandinavia',
      duration: '11 Days',
      price: '$1099',
      image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Northern lights and fjord experiences'
    },
    {
      location: 'Caribbean',
      duration: '6 Days',
      price: '$699',
      image: 'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Tropical beaches and crystal-clear waters'
    }
  ];

  return (
    <section className="py-16 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explore These Welcoming Destinations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handpicked travel packages for the ultimate adventure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {travelPackages.map((pkg, index) => (
            <div
              key={index}
              className="bg-orange-600 text-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <img
                src={pkg.image}
                alt={pkg.location}
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold">{pkg.location}</h3>
                  <span className="text-orange-200 text-sm">{pkg.duration}</span>
                </div>
                <p className="text-orange-100 text-sm mb-4">{pkg.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">{pkg.price}</span>
                  <button className="bg-white text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-lg font-semibold transition-colors duration-300">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelCards;