// import React, { useState } from 'react';
// import ActiveJobs from './ActiveJobs';
// import CreateJobPost from './CreateJobPost';

// const JobPost = () => {
//   const [activeSection, setActiveSection] = useState('active_jobs');

//   return (
//     <div className="w-full bg-white">
//       {/* Tabs Navigation */}
//       <div className="sticky top-0 bg-white shadow-md z-40 m-1 mt-0">
//         <div className="flex flex-row justify-evenly items-center space-x-4 p-1">
//           <div 
//             onClick={() => setActiveSection('active_jobs')} 
//             className={`cursor-pointer px-2 py-2 rounded-lg transition-colors ${
//               activeSection === 'active_jobs' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
//             }`}
//           >
//             Active Jobs
//           </div>
//           <span className="h-full text-gray-300">|</span>
//           <div 
//             onClick={() => setActiveSection('post_job')} 
//             className={`cursor-pointer px-1 py-1 rounded-lg transition-colors ${
//               activeSection === 'post_job' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
//             }`}
//           >
//             Post a Job
//           </div>
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="m-1 p-1 rounded-sm">
//         {activeSection === 'active_jobs' && <ActiveJobs />}
//         {activeSection === 'post_job' && <CreateJobPost />}
//       </div>
//     </div>
//   );
// };

// export default JobPost;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ActiveJobs from './ActiveJobs';
import CreateJobPost from './CreateJobPost';
import { Briefcase, Plus, ArrowLeft, Clock } from 'lucide-react';

const JobPost = () => {
  const [activeSection, setActiveSection] = useState('active_jobs');
  const [isLoading, setIsLoading] = useState(false);
  const [recentActivity, setRecentActivity] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Check URL parameters or state to determine initial active section
  useEffect(() => {
    // If navigated from elsewhere with state, use that to set the active section
    if (location.state?.section) {
      setActiveSection(location.state.section);
    }
    // Or check if URL has a query parameter
    const params = new URLSearchParams(location.search);
    if (params.get('section')) {
      setActiveSection(params.get('section'));
    }
  }, [location]);

  // Simulate fetching recent activity
  useEffect(() => {
    setIsLoading(true);
    // Mock API call to get recent activity
    setTimeout(() => {
      setRecentActivity([
        { id: 1, type: 'view', job: 'Senior React Developer', count: 5, time: '2 hours ago' },
        { id: 2, type: 'application', job: 'UI/UX Designer', count: 3, time: '1 day ago' },
        { id: 3, type: 'view', job: 'Product Manager', count: 12, time: '3 days ago' },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Handle tab change and update URL if needed
  const handleTabChange = (section) => {
    setActiveSection(section);
    // Optionally update URL query parameter without full page reload
    const url = new URL(window.location);
    url.searchParams.set('section', section);
    window.history.pushState({}, '', url);
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="sticky top-0 bg-white shadow-sm z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-800 flex items-center">
                <Briefcase className="w-6 h-6 text-blue-600 mr-2" />
                Job Management
              </h1>
            </div>
            
            <div className="flex items-center">
              {activeSection === 'active_jobs' ? (
                <button
                  onClick={() => handleTabChange('post_job')}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Post New Job
                </button>
              ) : (
                <button
                  onClick={() => handleTabChange('active_jobs')}
                  className="inline-flex items-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Jobs
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar for Navigation (visible only on larger screens and in jobs view) */}
          {activeSection === 'active_jobs' && (
            <div className="hidden lg:block lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20">
                <nav className="space-y-1">
                  <a 
                    href="#" 
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-blue-50 text-blue-700"
                    onClick={(e) => {
                      e.preventDefault();
                      handleTabChange('active_jobs');
                    }}
                  >
                    <Briefcase className="w-5 h-5 mr-3" />
                    Manage Jobs
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    onClick={(e) => {
                      e.preventDefault();
                      handleTabChange('post_job');
                    }}
                  >
                    <Plus className="w-5 h-5 mr-3" />
                    Post a New Job
                  </a>
                </nav>

                {/* Recent Activity Section */}
                <div className="mt-8">
                  <h2 className="text-sm font-medium text-gray-500">RECENT ACTIVITY</h2>
                  <div className="mt-2 space-y-3">
                    {isLoading ? (
                      <div className="flex items-center justify-center p-4">
                        <Clock className="w-5 h-5 text-gray-400 animate-spin" />
                      </div>
                    ) : (
                      recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start p-2 hover:bg-gray-50 rounded-md">
                          <div className={`p-1.5 rounded-full ${
                            activity.type === 'view' ? 'bg-blue-100' : 'bg-green-100'
                          }`}>
                            {activity.type === 'view' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                              </svg>
                            )}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {activity.job}
                            </p>
                            <p className="text-xs text-gray-500">
                              {activity.count} {activity.type === 'view' ? 'views' : 'applications'} · {activity.time}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className={`${activeSection === 'active_jobs' ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
            {/* Tabs Navigation (for mobile) */}
            {activeSection === 'active_jobs' && (
              <div className="mb-4 block lg:hidden">
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                  <div className="flex divide-x divide-gray-200">
                    <button
                      onClick={() => handleTabChange('active_jobs')}
                      className={`flex-1 py-3 px-4 text-center font-medium text-sm ${
                        activeSection === 'active_jobs' 
                          ? 'text-blue-600 bg-blue-50' 
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Manage Jobs
                    </button>
                    <button
                      onClick={() => handleTabChange('post_job')}
                      className={`flex-1 py-3 px-4 text-center font-medium text-sm ${
                        activeSection === 'post_job' 
                          ? 'text-blue-600 bg-blue-50' 
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Post a Job
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Conditional Content */}
            {activeSection === 'active_jobs' && <ActiveJobs />}
            {activeSection === 'post_job' && <CreateJobPost onSuccess={() => handleTabChange('active_jobs')} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPost;


