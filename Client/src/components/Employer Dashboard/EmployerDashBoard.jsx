import React, { useState, useEffect } from 'react';
import JobPost from './section/JobPost';
import { UserCircle, BriefcaseIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import EmployerProfile from './section/EmployerProfile';
import { useLocation } from 'react-router-dom';

const EmployerDashBoard = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [isExpanded, setIsExpanded] = useState(true);

  const navItems = [
    { id: 'profile', icon: UserCircle, label: 'Profile' },
    { id: 'job_post', icon: BriefcaseIcon, label: 'Job Post' }
  ];

  const location = useLocation();  // Hook to access location state

  useEffect(() => {
    // Check if the state contains the 'section' and set the active section accordingly
    if (location.state && location.state.section) {
      setActiveSection(location.state.section);
    }
  }, [location.state]);

  return (
    <div className="flex min-h-screen w-full bg-gray-50 ">
      
      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-20 z-50 
        ${isExpanded ? 'w-64' : 'w-20'} 
        h-screen transition-width duration-300 ease-in-out
        bg-white border-r border-gray-200 shadow-sm`}
      >
        {/* Toggle Button */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -right-3 top-1/60 z-50 hidden lg:flex
            items-center justify-center h-6 w-6
            bg-white border border-gray-200 
            rounded-full shadow-sm text-gray-600 
            hover:bg-gray-50 hover:text-gray-900 
            transition-colors"
        >
          {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 p-4 pt-8">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`flex items-center gap-3 p-3 rounded-lg 
              transition-all duration-200
              ${isExpanded ? 'justify-start' : 'justify-center'}
              ${activeSection === id 
                ? 'bg-gray-900 text-white' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
            >
              <Icon size={24} />
              {isExpanded && <span className="whitespace-nowrap font-medium">{label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ease-in-out ${isExpanded ? 'ml-64' : 'ml-20'}`}>
        {activeSection === 'profile' && <EmployerProfile />}
        {activeSection === 'job_post' && <JobPost />}
      </main>
    </div>
  );
};

export default EmployerDashBoard;
