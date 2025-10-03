'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

interface NavItem {
  name: string;
  id: string;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { name: 'Home', id: 'home' },
    // { name: 'Book Now', id: 'booking' },
    // { name: 'Hotels', id: 'hotels' },
    // { name: 'Cars', id: 'cars' },
    // { name: 'Tours', id: 'tours' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-orange-600 shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <div className="relative w-12 h-12 bg-white rounded-full p-1.5">
              <img
                src="/27Sep24 Simon  Free Upload1.png"
                alt="Masters Flights Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-2xl font-bold text-white">
              Starway Flights
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-white hover:text-orange-200 transition-colors duration-200 font-medium ${
                  currentPage === item.id
                    ? 'text-orange-200 border-b-2 border-orange-200'
                    : ''
                }`}
                suppressHydrationWarning
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-orange-200 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            suppressHydrationWarning
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-orange-600 shadow-lg border-t border-orange-500">
            <nav className="px-4 py-2 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left text-white hover:text-orange-200 transition-colors duration-200 py-2 font-medium ${
                    currentPage === item.id ? 'text-orange-200' : ''
                  }`}
                  suppressHydrationWarning
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;