import React, { useState } from 'react';
import ActiveJobs from './ActiveJobs';
import CreateJobPost from './CreateJobPost';

const JobPost = () => {
  const [activeSection, setActiveSection] = useState('active_jobs');

  return (
    <div className="w-full bg-white">
      {/* Tabs Navigation */}
      <div className="sticky top-0 bg-white shadow-md z-40 m-1 mt-0">
        <div className="flex flex-row justify-evenly items-center space-x-4 p-1">
          <div 
            onClick={() => setActiveSection('active_jobs')} 
            className={`cursor-pointer px-2 py-2 rounded-lg transition-colors ${
              activeSection === 'active_jobs' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
            }`}
          >
            Active Jobs
          </div>
          <span className="h-full text-gray-300">|</span>
          <div 
            onClick={() => setActiveSection('post_job')} 
            className={`cursor-pointer px-1 py-1 rounded-lg transition-colors ${
              activeSection === 'post_job' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
            }`}
          >
            Post a Job
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="m-1 p-1 rounded-sm">
        {activeSection === 'active_jobs' && <ActiveJobs />}
        {activeSection === 'post_job' && <CreateJobPost />}
      </div>
    </div>
  );
};

export default JobPost;


