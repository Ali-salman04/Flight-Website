'use client';

import React from 'react';
import { Plane, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ currentPage, setCurrentPage }) => {
  const quickLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Flights', id: 'flights' },
    { name: 'Hotels', id: 'hotels' },
    { name: 'Cars', id: 'cars' },
    { name: 'Tours', id: 'tours' },
    { name: 'Contact', id: 'contact' }
  ];

  const destinations = [
    'New York', 'London', 'Paris', 'Tokyo', 'Dubai', 'Sydney'
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Plane className="h-8 w-8 text-orange-600" />
              <span className="text-2xl font-bold">Masters Flights</span>
            </div>
            <p className="text-gray-300 mb-6">
              Your trusted partner for amazing travel experiences. We provide the best flight deals 
              and exceptional customer service to make your journey memorable.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-gray-400 hover:text-orange-600 cursor-pointer transition-colors duration-300" />
              <Twitter className="h-6 w-6 text-gray-400 hover:text-orange-600 cursor-pointer transition-colors duration-300" />
              <Instagram className="h-6 w-6 text-gray-400 hover:text-orange-600 cursor-pointer transition-colors duration-300" />
              <Linkedin className="h-6 w-6 text-gray-400 hover:text-orange-600 cursor-pointer transition-colors duration-300" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => setCurrentPage(link.id)}
                    className="text-gray-300 hover:text-orange-600 transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="text-xl font-bold mb-6">Popular Destinations</h3>
            <ul className="space-y-3">
              {destinations.map(destination => (
                <li key={destination}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-orange-600 transition-colors duration-300"
                  >
                    {destination}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-600 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-400">Mon - Sun: 9am - 9pm</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-600 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">info@mastersflights.com</p>
                  <p className="text-sm text-gray-400">24/7 Email Support</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-orange-600 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">123 Travel Street</p>
                  <p className="text-sm text-gray-400">New York, NY 10001</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Masters Flights. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;