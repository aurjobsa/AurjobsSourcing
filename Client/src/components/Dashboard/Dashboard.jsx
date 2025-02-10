import React, { useRef, useState } from 'react';
import CandidateDashboard from './CandidateDashboard';
import profile_image from '../../assets/Aurjobs_LogoRemBack.png';
import { IoMenu, IoClose } from 'react-icons/io5';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false); // Toggle state for sidebar

  const sectionRefs = {
    profile: useRef(null),
    education: useRef(null),
    skills: useRef(null),
    experience: useRef(null),
    accomplishments: useRef(null),
    extraCurricular: useRef(null),
  };

  const handleNavClick = (section) => {
    sectionRefs[section].current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',  // Aligns the section to the center of the viewport
      inline: 'nearest'
    });
    setIsOpen(false); // Close sidebar after selection
  };


  return (
    <div className="flex flex-col md:flex-row overflow-x-hidden h-screen relative bg-gray-100">
      {/* Toggle Button (Relative to Container) */}
      <div className="md:hidden p-3">
        <button
          className="fixed bg-gray-800 z-50 text-white p-2 rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <div
        className={`absolute w-full inset-0 md:relative md:h-screen md:flex md:flex-col md:justify-center md:items-center top-0 left-0 md:w-[30%] flex flex-col items-center p-4 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0`}
      >
        <h1 className='text-xl font-semibold text-blue-600 text-center pt-4 bg-white w-full rounded-t-md'>Quick Links</h1>

        {/* Navigation */}
        <nav className="w-full h-auto p-10 space-y-6 rounded-md rounded-t-none text-lg text-center text-black bg-white shadow-sm">
          <div onClick={() => handleNavClick('profile')} className="cursor-pointer hover:font-bold">Profile</div>
          <div onClick={() => handleNavClick('education')} className="cursor-pointer hover:font-bold">Education Details</div>
          <div onClick={() => handleNavClick('skills')} className="cursor-pointer hover:font-bold">Skills</div>
          <div onClick={() => handleNavClick('experience')} className="cursor-pointer hover:font-bold">Experience</div>
          <div onClick={() => handleNavClick('accomplishments')} className="cursor-pointer hover:font-bold">Accomplishments</div>
          <div onClick={() => handleNavClick('extraCurricular')} className="cursor-pointer hover:font-bold">Extra Curricular</div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-[80%] overflow-x-hidden overflow-y-auto p-4 scrollbar-hide bg-white m-4 rounded-md shadow-sm">
        <CandidateDashboard sectionRefs={sectionRefs} />
      </div>
    </div>
  );
};

export default Dashboard;
