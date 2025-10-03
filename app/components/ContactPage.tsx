'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, X, CheckCircle, AlertCircle } from 'lucide-react';

// Type definitions for the components
interface AlertCardProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  onClose: () => void;
  isVisible: boolean;
}

interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  details: string[];
  description: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface AlertState {
  isVisible: boolean;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
}

interface FAQ {
  question: string;
  answer: string;
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
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-sm"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertCard, setAlertCard] = useState<AlertState>({
    isVisible: false,
    type: 'success',
    title: '',
    message: ''
  });

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

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject || !formData.message.trim()) {
      showAlert(
        'warning',
        'Missing Required Information',
        'Please fill in all required fields: Name, Email, Subject, and Message to send your inquiry.'
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/send-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        showAlert(
          'success',
          'Message Sent Successfully! 📧',
          'Thank you for reaching out to us! We have received your message and will get back to you within 2 hours. Check your email for confirmation.'
        );
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        showAlert(
          'error',
          'Unable to Send Message',
          result.error || 'We encountered an issue while processing your message. Please check your information and try again.'
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

  const contactInfo: ContactInfo[] = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: '24/7 Phone Support',
      details: ['(+62) 4681 47485'],
      description: 'Available 24/7 for urgent travel assistance'
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email Support',
      details: ['starwayflights@gmail.com'],
      description: 'Response within 10 minute during business hours'
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Office Address',
      details: ['712 Pittwater Rd, Sydney', '2100, Australia'], 
      description: 'Visit our office Monday - Friday, 9 AM - 6 PM'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Business Hours',
      details: ['Mon - Fri: 9 AM - 9 PM', 'Sat - Sun: 10 AM - 6 PM'],
      description: 'Extended hours for your convenience'
    }
  ];

  const faqs: FAQ[] = [
    {
      question: "How can I cancel or change my flight booking?",
      answer: "You can cancel or change your booking by contacting our customer service team at +1 (555) 123-4567 or through your booking confirmation email. Cancellation and change fees may apply depending on the airline's policy."
    },
    {
      question: "What is your refund policy?",
      answer: "Refunds are processed according to the airline's refund policy. Refundable tickets can be refunded minus any applicable fees. Non-refundable tickets may be eligible for travel credits. Contact us for specific details about your booking."
    },
    {
      question: "Do you offer 24/7 customer support?",
      answer: "Yes, we provide 24/7 customer support for urgent travel assistance. Our phone lines are always open, and our email support responds within 2 hours during business hours."
    },
    {
      question: "How far in advance should I book my flight?",
      answer: "We recommend booking domestic flights 1-3 months in advance and international flights 2-6 months in advance for the best deals. However, we can help you find great prices even for last-minute bookings."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')" 
        }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">Get In Touch</h1>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto animate-fade-in-up">
            Have questions about your travel plans? Our expert team is here to help you 24/7
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-orange-100 rounded-lg p-3 w-fit mb-4">
                  <div className="text-orange-600">{info.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{info.title}</h3>
                <div className="space-y-1 mb-3">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 font-medium">{detail}</p>
                  ))}
                </div>
                <p className="text-sm text-gray-500">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-slide-in-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you as soon as possible. 
                For urgent matters, please call us directly.
              </p>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select a subject</option>
                      <option value="booking">Flight Booking</option>
                      <option value="cancellation">Cancellation</option>
                      <option value="refund">Refund Request</option>
                      <option value="change">Flight Change</option>
                      <option value="general">General Inquiry</option>
                      <option value="complaint">Complaint</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all duration-200"
                    placeholder="Please provide details about your inquiry..."
                  ></textarea>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 disabled:cursor-not-allowed shadow-lg"
                >
                  <Send className="h-5 w-5" />
                  <span>{isLoading ? 'Sending...' : 'Send Message'}</span>
                </button>
              </div>
            </div>

            {/* Map and Additional Info */}
            <div className="animate-slide-in-right">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Find Our Office</h2>
              
              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-80 mb-8 flex items-center justify-center shadow-inner">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 font-semibold">Interactive Map</p>
                  <p className="text-sm text-gray-400">712 Pittwater Rd, Sydney, New South Wales 2100, Australia</p>
                </div>
              </div>

              {/* Quick Contact Options */}
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Need Immediate Assistance?</h3>
                  <div className="space-y-3">
                    <a
                      href="tel:+15551234567"
                      className="flex items-center space-x-3 text-orange-600 hover:text-orange-700 transition-colors duration-300 transform hover:scale-105"
                    >
                      <Phone className="h-5 w-5" />
                      <span className="font-medium">Call Now:(+62) 4681 47485</span>
                    </a>
                    <a
                      href="mailto:info@mastersflights.com"
                      className="flex items-center space-x-3 text-orange-600 hover:text-orange-700 transition-colors duration-300 transform hover:scale-105"
                    >
                      <Mail className="h-5 w-5" />
                      <span className="font-medium">Email: starwayflights@gmail.com</span>
                    </a>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Live Chat Support</h3>
                  <p className="text-gray-600 mb-4">
                    Chat with our travel experts in real-time for instant assistance.
                  </p>
                  <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md">
                    <MessageCircle className="h-5 w-5" />
                    <span className="font-medium">Start Live Chat</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12 animate-fade-in">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
        
        @keyframes slide-in-left {
          from { 
            opacity: 0; 
            transform: translateX(-30px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @keyframes slide-in-right {
          from { 
            opacity: 0; 
            transform: translateX(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
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
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 0.5s both;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out both;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;