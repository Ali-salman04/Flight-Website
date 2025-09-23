'use client';

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import ExploreDestinations from './components/ExploreDestinations';
import PopularDestinations from './components/PopularDestinations';
import TravelCards from './components/TravelCards';
import Statistics from './components/Statistics';
import About from './components/About';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import ContactPage from './components/ContactPage';
import WhatsAppButton from './components/WhatsAppButton';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'contact':
        return <ContactPage />;
      default:
        return (
          <>
            <Hero />
            <div className="flex flex-col lg:flex-row">
              <ExploreDestinations />
              <WhyChooseUs />
            </div>
            <PopularDestinations />
            <TravelCards />
            <Statistics />
            <About />
            <Newsletter />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
      <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <WhatsAppButton />
    </div>
  );
}