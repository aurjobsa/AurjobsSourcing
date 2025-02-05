import React, { useState } from "react";
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import Logo from "../assets/Aurjobs_Logo.jpg";

const Navbar = ({ pricingRef, contactRef }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const isCompanyLogged = localStorage.getItem('companyToken') ? true : false;
  const isCandidateLogged = localStorage.getItem('candidateToken') ? true : false;

  const scrollToSection = (ref) => {
    setMenuOpen(false); // Close mobile menu when scrolling
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for navigation and DOM update
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearchCandidates = () => {
    setMenuOpen(false); // Close mobile menu
    if (!isCompanyLogged) {
      navigate('/company/login');
    } else {
      navigate('/search');
    }
  };

  const handleCandidateRegistration = () => {
    setMenuOpen(false); // Close mobile menu
    if (!isCandidateLogged) {
      navigate('/candidate/login');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <nav className="relative bg-white shadow z-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <RouterLink 
              to="/" 
              className="flex items-center gap-3 text-2xl font-bold text-blue-500"
              onClick={() => setMenuOpen(false)} // Close mobile menu when clicking logo
            >
              <img src={Logo} alt="Logo" className="w-12 sm:w-16 md:w-20 rounded-md" />
              <span className="text-custom-deep-blue lg:text-2xl text-xl">Sourcing AI</span>
            </RouterLink>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-4 md:space-x-6">
            <button
              onClick={handleCandidateRegistration}
              className="text-custom-deep-blue px-3 py-2 rounded-md text-md font-medium hover:bg-gray-100 transition-colors"
            >
              Candidate Registration
            </button>
            <div className="hidden md:block text-custom-deep-blue">|</div>
            <button
              onClick={handleSearchCandidates}
              className="text-custom-deep-blue cursor-pointer px-3 py-2 rounded-md text-md font-medium hover:bg-gray-100 transition-colors"
            >
              Search Candidates
            </button>
            <div className="hidden md:block text-custom-deep-blue">|</div>
            <button 
              onClick={() => scrollToSection(pricingRef)}
              className="text-custom-deep-blue cursor-pointer px-3 py-2 rounded-md text-md font-medium hover:bg-gray-100 transition-colors"
            >
              Pricing
            </button>
            <div className="hidden md:block text-custom-deep-blue">|</div>
            <button
              onClick={() => scrollToSection(contactRef)}
              className="text-custom-deep-blue cursor-pointer px-3 py-2 rounded-md text-md font-medium hover:bg-gray-100 transition-colors"
            >
              Contact
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-custom-deep-blue hover:text-black focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              <svg 
                className="h-6 w-6" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-2">
            <RouterLink 
              to="/" 
              className="block text-custom-deep-blue hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition-colors" 
              onClick={() => setMenuOpen(false)}
            >
              Home
            </RouterLink>
            <button
              onClick={handleCandidateRegistration}
              className="block w-full text-left text-custom-deep-blue hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {isCandidateLogged ? 'Dashboard' : 'Candidate Registration'}
            </button>
            <button
              onClick={handleSearchCandidates}
              className="block w-full text-left text-custom-deep-blue hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {isCompanyLogged ? 'Search Candidates' : 'Company Login'}
            </button>
            <button
              onClick={() => scrollToSection(pricingRef)}
              className="block w-full text-left text-custom-deep-blue hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection(contactRef)}
              className="block w-full text-left text-custom-deep-blue hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;