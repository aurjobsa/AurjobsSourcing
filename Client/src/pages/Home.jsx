import React from 'react';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import KeyFeatures from '../components/KeyFeatures';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import GetStarted from '../components/GetStarted';
import FaqSection from '../components/FaqSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import Particle from '../components/Particle';

const Home = ({ pricingRef, contactRef }) => {
  return (
    <div className="relative min-h-screen">
      {/* Particle background */}
      <div className="fixed inset-0 z-0">
        <Particle />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <HeroSection />
        <HowItWorks />
        <KeyFeatures />

        {/* Pricing section with ref */}
        <section ref={pricingRef} id="pricing">
          <Pricing />
        </section>

        <Testimonials />
        <GetStarted />
        <FaqSection />

        {/* Contact section with ref */}
        <section ref={contactRef} id="contact">
          <ContactSection />
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Home;