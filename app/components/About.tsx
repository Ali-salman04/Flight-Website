'use client';

import React from 'react';

const About: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Travel Experience"
              className="rounded-xl shadow-2xl w-full h-96 object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Welcome to Best Fly Travel – Your Ultimate Travel Companion
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              At Best Fly Travel, we believe that every journey should be extraordinary. 
              With over a decade of experience in the travel industry, we've helped millions 
              of travelers discover the world with confidence and ease.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our commitment to providing the best flight deals, exceptional customer service, 
              and seamless booking experience has made us a trusted name in travel. From budget-friendly 
              options to luxury experiences, we cater to every traveler's needs.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-sm text-gray-600">Customer Support</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 mb-2">100%</div>
                <div className="text-sm text-gray-600">Secure Booking</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;