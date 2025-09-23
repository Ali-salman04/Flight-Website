'use client';

import React, { useState } from 'react';
import { Send } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert('Thank you for subscribing! You will receive our latest travel deals and updates.');
      setEmail('');
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-700 relative overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=1920" 
          alt="Newsletter Background"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-float"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 right-20 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Subscribe Our Newsletter
        </h2>
        <p className="text-xl text-orange-100 mb-8">
          Subscribe and get special discount with the latest updates
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto relative z-10">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="flex-1 px-6 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-300 backdrop-blur-sm bg-white bg-opacity-95"
          />
          <button
            type="submit"
            className="bg-white text-orange-600 hover:bg-orange-50 font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg transform hover:scale-105"
          >
            <Send className="h-5 w-5" />
            <span>Subscribe</span>
          </button>
        </form>
        
        {/* Additional Visual Elements */}
        <div className="mt-8 flex justify-center space-x-8 opacity-60">
          <img 
            src="https://images.pexels.com/photos/1308940/pexels-photo-1308940.jpeg?auto=compress&cs=tinysrgb&w=100" 
            alt="Paris"
            className="w-12 h-12 rounded-full object-cover border-2 border-white border-opacity-50"
          />
          <img 
            src="https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=100" 
            alt="Tokyo"
            className="w-12 h-12 rounded-full object-cover border-2 border-white border-opacity-50"
          />
          <img 
            src="https://images.pexels.com/photos/618079/pexels-photo-618079.jpeg?auto=compress&cs=tinysrgb&w=100" 
            alt="Dubai"
            className="w-12 h-12 rounded-full object-cover border-2 border-white border-opacity-50"
          />
          <img 
            src="https://images.pexels.com/photos/161901/santorini-greece-island-travel-161901.jpeg?auto=compress&cs=tinysrgb&w=100" 
            alt="Santorini"
            className="w-12 h-12 rounded-full object-cover border-2 border-white border-opacity-50"
          />
        </div>
      </div>
    </section>
  );
};

export default Newsletter;