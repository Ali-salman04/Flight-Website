'use client';

import React, { useState, useEffect } from 'react';
import { Plane } from 'lucide-react';

const AirlineShowcase: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [floatingPlanes, setFloatingPlanes] = useState<Array<{
    left: string;
    top: string;
    animationDelay: string;
    animationDuration: string;
  }>>([]);

  const airlines = [
    {
      name: 'Emirates',
      logo: '🇦🇪',
      tagline: 'Fly Better',
      color: 'from-red-600 to-red-800'
    },
    {
      name: 'Qatar Airways',
      logo: '🇶🇦',
      tagline: 'Going Places Together',
      color: 'from-purple-600 to-purple-800'
    },
    {
      name: 'Singapore Airlines',
      logo: '🇸🇬',
      tagline: 'A Great Way to Fly',
      color: 'from-blue-600 to-blue-800'
    },
    {
      name: 'Turkish Airlines',
      logo: '🇹🇷',
      tagline: 'Widen Your World',
      color: 'from-red-700 to-red-900'
    },
    {
      name: 'Lufthansa',
      logo: '🇩🇪',
      tagline: 'Say Yes to the World',
      color: 'from-yellow-600 to-yellow-800'
    },
    {
      name: 'British Airways',
      logo: '🇬🇧',
      tagline: 'To Fly. To Serve.',
      color: 'from-blue-700 to-blue-900'
    },
    {
      name: 'Air France',
      logo: '🇫🇷',
      tagline: 'France is in the Air',
      color: 'from-blue-600 to-indigo-800'
    },
    {
      name: 'KLM',
      logo: '🇳🇱',
      tagline: 'Fly Responsibly',
      color: 'from-blue-500 to-blue-700'
    },
    {
      name: 'Qantas',
      logo: '🇦🇺',
      tagline: 'Spirit of Australia',
      color: 'from-red-600 to-orange-700'
    },
    {
      name: 'Virgin Australia',
      logo: '🇦🇺',
      tagline: 'Now You\'re Flying',
      color: 'from-red-500 to-purple-600'
    },
    {
      name: 'Jetstar Airways',
      logo: '🇦🇺',
      tagline: 'All Day Every Day Low Fares',
      color: 'from-orange-500 to-red-600'
    }
  ];

  // Generate floating planes only on client side to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
    const planes = Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${3 + Math.random() * 2}s`
    }));
    setFloatingPlanes(planes);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % airlines.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [airlines.length]);

  return (
    <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-4 relative overflow-hidden">
      {/* Background Animation - Only render on client */}
      {isClient && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {floatingPlanes.map((plane, i) => (
              <div
                key={i}
                className="absolute animate-float"
                style={{
                  left: plane.left,
                  top: plane.top,
                  animationDelay: plane.animationDelay,
                  animationDuration: plane.animationDuration
                }}
              >
                <Plane className="h-4 w-4 text-white opacity-30" />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <p className="text-white text-sm mb-4 opacity-80">
            ✈️ Partnered with World's Best Airlines
          </p>
          
          {/* Main Airline Display */}
          <div className="relative h-20 flex items-center justify-center">
            {airlines.map((airline, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 transform ${
                  index === currentIndex
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-95 translate-y-4'
                }`}
              >
                <div className={`bg-gradient-to-r ${airline.color} rounded-xl px-8 py-4 shadow-2xl transform hover:scale-105 transition-all duration-300`}>
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl animate-bounce">{airline.logo}</div>
                    <div className="text-left">
                      <h3 className="text-2xl font-bold text-white">{airline.name}</h3>
                      <p className="text-white opacity-90 text-sm">{airline.tagline}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Airline Indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {airlines.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-orange-500 w-8'
                    : 'bg-gray-500 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Scrolling Airlines Strip */}
          <div className="mt-6 overflow-hidden">
            <div className="flex animate-scroll space-x-8">
              {[...airlines, ...airlines].map((airline, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex items-center space-x-2 bg-white bg-opacity-10 rounded-lg px-4 py-2 backdrop-blur-sm"
                >
                  <span className="text-lg">{airline.logo}</span>
                  <span className="text-white text-sm font-medium whitespace-nowrap">
                    {airline.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-red-500 to-purple-500"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-orange-500"></div>
    </section>
  );
};

export default AirlineShowcase;