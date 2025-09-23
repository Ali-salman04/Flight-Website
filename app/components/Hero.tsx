'use client';

import React, { useState } from 'react';
import { Search, Calendar, Users, MapPin, Plane, Mail, User, Phone } from 'lucide-react';

const Hero: React.FC = () => {
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    passengers: 1,
    tripType: 'round-trip',
    email: '',
    name: '',
    phone: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const popularCities = [
    'New York', 'London', 'Paris', 'Tokyo', 'Dubai', 'Sydney', 'Singapore', 'Mumbai', 'Bangkok', 'Istanbul'
  ];

  const handleInputChange = (field: string, value: string | number) => {
    setSearchData(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = async () => {
    // Validate required fields
    if (!searchData.from || !searchData.to || !searchData.departure || !searchData.email) {
      alert('Please fill in all required fields (From, To, Departure Date, and Email)');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/send-flight-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Flight inquiry sent successfully! We will contact you soon with the best deals.');
        // Reset form
        setSearchData({
          from: '',
          to: '',
          departure: '',
          return: '',
          passengers: 1,
          tripType: 'round-trip',
          email: '',
          name: '',
          phone: ''
        });
      } else {
        alert(result.error || 'Failed to send inquiry. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send inquiry. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            FLIGHT SEARCH
          </h1>
          <p className="text-xl md:text-2xl text-orange-200 mb-8">
            Search Your Destination With 20% Discounted Price
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 max-w-6xl mx-auto animate-slide-up">
          {/* Trip Type Selector */}
          <div className="flex flex-wrap gap-4 mb-6">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="tripType"
                value="round-trip"
                checked={searchData.tripType === 'round-trip'}
                onChange={(e) => handleInputChange('tripType', e.target.value)}
                className="text-orange-600 focus:ring-orange-500"
              />
              <span className="text-gray-700 font-medium">Round Trip</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="tripType"
                value="one-way"
                checked={searchData.tripType === 'one-way'}
                onChange={(e) => handleInputChange('tripType', e.target.value)}
                className="text-orange-600 focus:ring-orange-500"
              />
              <span className="text-gray-700 font-medium">One Way</span>
            </label>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={searchData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Your full name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  value={searchData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Flight Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {/* From */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">From *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  list="fromCities"
                  value={searchData.from}
                  onChange={(e) => handleInputChange('from', e.target.value)}
                  placeholder="Departure City"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <datalist id="fromCities">
                  {popularCities.map(city => (
                    <option key={city} value={city} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* To */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">To *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  list="toCities"
                  value={searchData.to}
                  onChange={(e) => handleInputChange('to', e.target.value)}
                  placeholder="Arrival City"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <datalist id="toCities">
                  {popularCities.map(city => (
                    <option key={city} value={city} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Departure Date */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Departure *</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  value={searchData.departure}
                  onChange={(e) => handleInputChange('departure', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Return Date */}
            {searchData.tripType === 'round-trip' && (
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Return</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={searchData.return}
                    onChange={(e) => handleInputChange('return', e.target.value)}
                    min={searchData.departure || new Date().toISOString().split('T')[0]}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Passengers */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  value={searchData.passengers}
                  onChange={(e) => handleInputChange('passengers', parseInt(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="w-full md:w-auto bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg disabled:cursor-not-allowed"
          >
            <Search className="h-5 w-5" />
            <span>{isLoading ? 'Sending Inquiry...' : 'Send Flight Inquiry'}</span>
          </button>

          <p className="text-sm text-gray-500 mt-4 text-center">
            * Required fields. We'll send you the best flight deals via email.
          </p>
        </div>

        {/* Popular Destinations Quick Links */}
        <div className="mt-8 animate-fade-in-up">
          <p className="text-white mb-4">Popular destinations:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {popularCities.slice(0, 6).map(city => (
              <button
                key={city}
                onClick={() => handleInputChange('to', city)}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-full transition-all duration-300 backdrop-blur-sm"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Plane Animation */}
      <div className="absolute top-1/4 right-10 text-white opacity-30 animate-float hidden lg:block">
        <Plane className="h-16 w-16" />
      </div>
    </section>
  );
};

export default Hero;