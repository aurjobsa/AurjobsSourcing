import React from 'react'
import {  CheckIcon } from 'lucide-react'
import BoyImg from "../assets/Boy.png"

const HeroSection = () => {
  return (

    <div className="min-h-screen relative bg-gradient-to-b from-blue-100 to-white flex items-center justify-center">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Find the Best Talent with{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              AI-Powered Search
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-xl mx-auto md:mx-0 leading-relaxed">
            Discover top talent quickly with our AI-driven recruitment platform. Streamline your hiring process and find the perfect match today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="mx-auto md:mx-0 flex text-center items-center gap-2 transform hover:scale-105 transition-all duration-300 ease-in-out bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg">
              Start Free Trial
            </button>
          </div>

          <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckIcon className="w-4 h-4 text-blue-500" />
              AI-Powered Matching
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="w-4 h-4 text-blue-500" />
              Fast Recruitment
            </div>
          </div>
        </div>

        {/* Image Section - Visible in Mobile and Desktop */}
        <div className="flex justify-center items-center">
          <div className="relative">
            <img
              src={BoyImg}
              alt="Talent Search Illustration"
              className="rounded-xl  transform  transition-transform duration-300 w-full"
            />

          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
