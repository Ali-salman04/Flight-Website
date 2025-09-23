'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        alert('Thank you for your message! We will get back to you within 24 hours.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        alert(result.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: '24/7 Phone Support',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      description: 'Available 24/7 for urgent travel assistance'
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email Support',
      details: ['info@mastersflights.com', 'support@mastersflights.com'],
      description: 'Response within 2 hours during business hours'
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Office Address',
      details: ['123 Travel Street', 'New York, NY 10001'],
      description: 'Visit our office Monday - Friday, 9 AM - 6 PM'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Business Hours',
      details: ['Mon - Fri: 9 AM - 9 PM', 'Sat - Sun: 10 AM - 6 PM'],
      description: 'Extended hours for your convenience'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
   <section
  className="relative bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage:" url('https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')" 
 }} // apni image ka path
>
  {/* Overlay gradient */}
  <div className="absolute inset-0 "></div>

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 text-white">
    <h1 className="text-4xl md:text-6xl font-bold mb-6">Get In Touch</h1>
    <p className="text-xl text-orange-100 max-w-2xl mx-auto">
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
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
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
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you as soon as possible. 
                For urgent matters, please call us directly.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    placeholder="Please provide details about your inquiry..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                  <span>{isLoading ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </div>

            {/* Map and Additional Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Find Our Office</h2>
              
              {/* Map Placeholder */}
              <div className="bg-gray-200 rounded-xl h-80 mb-8 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Interactive Map</p>
                  <p className="text-sm text-gray-400">123 Travel Street, New York, NY 10001</p>
                </div>
              </div>

              {/* Quick Contact Options */}
              <div className="space-y-4">
                <div className="bg-orange-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Need Immediate Assistance?</h3>
                  <div className="space-y-3">
                    <a
                      href="tel:+15551234567"
                      className="flex items-center space-x-3 text-orange-600 hover:text-orange-700 transition-colors duration-300"
                    >
                      <Phone className="h-5 w-5" />
                      <span>Call Now: +1 (555) 123-4567</span>
                    </a>
                    <a
                      href="mailto:info@mastersflights.com"
                      className="flex items-center space-x-3 text-orange-600 hover:text-orange-700 transition-colors duration-300"
                    >
                      <Mail className="h-5 w-5" />
                      <span>Email: info@mastersflights.com</span>
                    </a>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Live Chat Support</h3>
                  <p className="text-gray-600 mb-4">
                    Chat with our travel experts in real-time for instant assistance.
                  </p>
                  <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300">
                    <MessageCircle className="h-5 w-5" />
                    <span>Start Live Chat</span>
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
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {[
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
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;