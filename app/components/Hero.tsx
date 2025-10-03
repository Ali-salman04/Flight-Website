'use client';

import React, { useState } from 'react';
import { Search, Calendar, Users, MapPin, Plane, Mail, User, Phone, X, CheckCircle, AlertCircle } from 'lucide-react';

// Type definitions
interface AlertCardProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  onClose: () => void;
  isVisible: boolean;
}

interface SearchData {
  from: string;
  to: string;
  departure: string;
  return: string;
  passengers: number;
  tripType: 'round-trip' | 'one-way';
  email: string;
  name: string;
  phone: string;
}

interface AlertState {
  isVisible: boolean;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
}

// Beautiful Alert Card Component
const AlertCard: React.FC<AlertCardProps> = ({ type, title, message, onClose, isVisible }) => {
  if (!isVisible) return null;

  const getCardStyle = (): string => {
    switch (type) {
      case 'success':
        return 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-gradient-to-r from-red-50 to-rose-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-800';
    }
  };

  const getIcon = (): React.ReactNode => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'error':
      case 'warning':
        return <AlertCircle className="h-6 w-6 text-red-600" />;
      default:
        return <AlertCircle className="h-6 w-6 text-blue-600" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className={`${getCardStyle()} max-w-md w-full mx-auto rounded-xl border-2 shadow-2xl transform animate-scale-in`}>
        <div className="p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              {getIcon()}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm opacity-90 leading-relaxed">{message}</p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              suppressHydrationWarning
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-sm"
              suppressHydrationWarning
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Hero: React.FC = () => {
  const [searchData, setSearchData] = useState<SearchData>({
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

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertCard, setAlertCard] = useState<AlertState>({
    isVisible: false,
    type: 'success',
    title: '',
    message: ''
  });

  const popularCities: string[] = [
    'New York', 'London', 'Paris', 'Tokyo', 'Dubai', 'Sydney', 'Singapore', 'Mumbai', 'Bangkok', 'Istanbul'
  ];

  const showAlert = (type: AlertState['type'], title: string, message: string): void => {
    setAlertCard({
      isVisible: true,
      type,
      title,
      message
    });
  };

  const closeAlert = (): void => {
    setAlertCard(prev => ({ ...prev, isVisible: false }));
  };

  const handleInputChange = (field: keyof SearchData, value: string | number): void => {
    setSearchData(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = async (): Promise<void> => {
    // Validate required fields
    if (!searchData.from || !searchData.to || !searchData.departure || !searchData.email) {
      showAlert(
        'warning',
        'Missing Required Information',
        'Please fill in all required fields: From, To, Departure Date, and Email Address to proceed with your flight search.'
      );
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
        showAlert(
          'success',
          'Flight Inquiry Sent Successfully! ✈️',
          'We have received your flight request and will contact you soon with the best deals and options. Check your email for confirmation.'
        );
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
        showAlert(
          'error',
          'Unable to Send Inquiry',
          result.error || 'We encountered an issue while processing your request. Please check your information and try again.'
        );
      }
    } catch (error) {
      console.error('Error:', error);
      showAlert(
        'error',
        'Connection Error',
        'Unable to connect to our servers. Please check your internet connection and try again in a moment.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    handleInputChange('tripType', e.target.value as 'round-trip' | 'one-way');
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    handleInputChange('passengers', parseInt(e.target.value));
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
  <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
    Discover Your Dream Destination
  </h1>
  <p className="text-lg md:text-xl text-orange-200 mb-8">
    Book flights at unbeatable prices and save up to 20% on your next adventure
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
                onChange={handleRadioChange}
                className="text-orange-600 focus:ring-orange-500"
                suppressHydrationWarning
              />
              <span className="text-gray-700 font-medium">Round Trip</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="tripType"
                value="one-way"
                checked={searchData.tripType === 'one-way'}
                onChange={handleRadioChange}
                className="text-orange-600 focus:ring-orange-500"
                suppressHydrationWarning
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
                  suppressHydrationWarning
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
                  suppressHydrationWarning
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
                  suppressHydrationWarning
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
                  suppressHydrationWarning
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
                  suppressHydrationWarning
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
                  suppressHydrationWarning
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
                    suppressHydrationWarning
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
                  onChange={handleSelectChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
                  suppressHydrationWarning
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
            suppressHydrationWarning
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
                suppressHydrationWarning
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

      {/* Beautiful Alert Card */}
      <AlertCard
        type={alertCard.type}
        title={alertCard.title}
        message={alertCard.message}
        isVisible={alertCard.isVisible}
        onClose={closeAlert}
      />

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from { 
            opacity: 0; 
            transform: scale(0.9) translateY(-20px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 0.5s both;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;