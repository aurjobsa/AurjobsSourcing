import React, { useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import { FaUser, FaBriefcase, FaSignOutAlt, FaChevronLeft, FaChevronRight, FaGraduationCap, FaTools, FaTrophy, FaRunning, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import CandidateDashboard from './CandidateDashboard';

const Dashboard = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [activeProfileSection, setActiveProfileSection] = useState('profile');
  const [isExpanded, setIsExpanded] = useState(true);

  const profileSections = [
    { id: 'profile', name: 'Profile', icon: FaUser },
    { id: 'education', name: 'Education', icon: FaGraduationCap },
    { id: 'skills', name: 'Skills', icon: FaTools },
    { id: 'experience', name: 'Experience', icon: FaBriefcase },
    { id: 'accomplishments', name: 'Accomplishments', icon: FaTrophy },
    { id: 'extraCurricular', name: 'Extra Curricular', icon: FaRunning }
  ];

  const sideNavItems = [
    { id: 'profile', name: 'Candidate Profile', icon: FaUser },
    { id: 'jobs', name: 'Applied Jobs', icon: FaBriefcase }
  ];

  const handleNavClick = (section) => {
    setActiveSection(section);
    if (section === 'profile') {
      setActiveProfileSection('profile');
    }
    setShowMobileMenu(false);
  };

  const handleProfileNavClick = (subsection) => {
    setActiveProfileSection(subsection);
  };

  const getActiveSectionRef = (section) => {
    const ref = {};
    ref[section] = React.createRef();
    return ref;
  };

  const handleSignOut = () => {
    console.log('Signing out...');
  };

  const navigateProfile = (direction) => {
    const currentIndex = profileSections.findIndex(section => section.id === activeProfileSection);
    if (direction === 'next' && currentIndex < profileSections.length - 1) {
      setActiveProfileSection(profileSections[currentIndex + 1].id);
    } else if (direction === 'prev' && currentIndex > 0) {
      setActiveProfileSection(profileSections[currentIndex - 1].id);
    }
  };

  const getCurrentIndex = () => profileSections.findIndex(section => section.id === activeProfileSection);
  const canNavigateNext = getCurrentIndex() < profileSections.length - 1;
  const canNavigatePrev = getCurrentIndex() > 0;

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        className="fixed sm:hidden top-20 left-4 z-50 bg-blue-600 text-white p-2 rounded-md"
      >
        <IoMenu className="w-8 h-8" />
      </button>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="sm:hidden fixed inset-x-0 top-16 bottom-0 bg-white bg-opacity-100 z-40" onClick={() => setShowMobileMenu(false)}>
          <div className="w-full h-full bg-white" onClick={e => e.stopPropagation()}>
            <div className="h-full flex flex-col mt-5">
              <div className="flex-1 pt-12 px-4">
                <nav className="space-y-4">
                  {sideNavItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
                        activeSection === item.id ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
              <div className="p-4 border-t">
                <button
                  onClick={handleSignOut}
                  className="w-full z-100 flex items-center space-x-3 p-3 rounded-lg text-red-600 hover:bg-red-50"
                >
                  <FaSignOutAlt className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tablet/Desktop Sidebar */}
      <div className={`hidden sm:flex flex-col items-center fixed top-16 bottom-0 bg-white shadow-lg transition-all duration-300 overflow-y-visible ${
        isExpanded ? 'lg:w-60' : 'w-20'
      }`}>
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="hidden lg:block absolute -right-14 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-blue-100 text-blue-600 p-2 rounded-full shadow-md hover:bg-blue-200"
        >
          {isExpanded ? (
            <FaAngleDoubleLeft className="w-4 h-4" />
          ) : (
            <FaAngleDoubleRight className="w-4 h-4" />
          )}
        </button>

        <div className="flex-1 pt-6 p-2 w-full">
          <nav className="space-y-2">
            {sideNavItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center px-4 py-4 ${
                  activeSection === item.id ? 'bg-blue-200 rounded-md text-blue-600' : 'hover:bg-blue-100 hover:rounded-md'
                }`}
              >
                <item.icon className="w-6 h-6" />
                {(isExpanded) && <span className="ml-3">{item.name}</span>}
              </button>
            ))}
          </nav>
        </div>
        <div className="border-t w-full">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50"
          >
            <FaSignOutAlt className="w-5 h-5" />
            {(isExpanded) && <span className="ml-3">Sign Out</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${isExpanded ? 'sm:ml-60' : 'sm:ml-20'}`}>
        <div className="p-4 min-h-screen">
          {/* Desktop Navigation */}
          <div className="sticky top-16 w-full bg-transparent z-10 rounded-sm hidden lg:block">
            <nav className="flex justify-evenly items-center">
              {activeSection === 'profile' && profileSections.map((section) => (
                <button 
                  key={section.id}
                  onClick={() => handleProfileNavClick(section.id)}
                  className={`flex items-center space-x-2 p-3 hover:bg-blue-100 hover:rounded-md ${
                    activeProfileSection === section.id ? 'text-blue-700 bg-blue-200 rounded-md' : ''
                  }`}
                >
                  <section.icon className="w-4 h-4" />
                  <span>{section.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content Section */}
          <div className="mt-10 sm:mt-0">
            {activeSection === 'profile' ? (
              <CandidateDashboard sectionRefs={getActiveSectionRef(activeProfileSection)} />
            ) : (
              <div className="text-center p-8">
                <h2 className="text-2xl font-bold">Applied Jobs</h2>
              </div>
            )}
          </div>

          {/* Mobile/Tablet Bottom Navigation */}
          {activeSection === 'profile' && (canNavigateNext || canNavigatePrev) && (
            <div className="fixed bottom-0 left-0 sm:left-[8%] right-0 shadow-lg lg:hidden z-30">
              <div className="w-full max-w-90% mx-auto flex justify-between items-center p-4">
                {canNavigatePrev && (
                  <button
                    onClick={() => navigateProfile('prev')}
                    className="flex items-center space-x-2 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-full"
                  >
                    <FaChevronLeft className="w-4 h-4" />
                    <span className="text-sm">{profileSections[getCurrentIndex() - 1].name}</span>
                  </button>
                )}
                
                {canNavigateNext && (
                  <button
                    onClick={() => navigateProfile('next')}
                    className="flex items-center space-x-2 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-full"
                  >
                    <span className="text-sm">{profileSections[getCurrentIndex() + 1].name}</span>
                    <FaChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;