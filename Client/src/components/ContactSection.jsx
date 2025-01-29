import React, { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';

const ContactSection = () => {
    const handleEmailClick = () => {
        window.location.href = 'mailto:support@aurjobs.com';
      };

  return (
    <div name="contact" className="relative w-full bg-gradient-to-b from-blue-200 to-blue-white py-16">
      <div className=" mx-auto px-4">
        <div className=" rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-3">
            <span className="text-blue-600 pr-2">Contact</span>
            <span className="text-blue-600">Us</span>
          </h2>
          
          <p className="text-gray-800 text-xl mb-8">
            If you have any questions, feel free to reach out to our support team.
          </p>

          <button
            onClick={handleEmailClick}
            className="group inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg transition-all duration-200"
          >
            <Mail className="w-5 h-5 text-white-800" />
            <span className='text-white-800'>Info@Aurjobs.com</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;