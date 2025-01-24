import React from 'react'
import HeroSection from '../components/HeroSection'
import HowItWorks from '../components/HowItWorks'
import KeyFeatures from '../components/KeyFeatures'
import Pricing from '../components/Pricing'
import Testimonials from '../components/Testimonials'
import GetStarted from '../components/GetStarted'
import FaqSection from '../components/FaqSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import Particle from '../components/Particle'

const Home = () => {
  return (
    <>
    <Particle/>
      <HeroSection/>
      <HowItWorks/>
      <KeyFeatures/>
      <Pricing/>
      <Testimonials/>
      <GetStarted/>
      <FaqSection/>
      <ContactSection/>
      <Footer/>
    </>
  )
}

export default Home
