

import React, { useState } from 'react';
import {
  MapPin,
  IndianRupee,
  Calendar,
  Layers,
  Briefcase,
  ChevronLeft,
  Users,
  Clock,
  GraduationCap,
  Share2,
  BookmarkPlus,
  Printer,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JobDetailsDisplay = ({ job, applicant }) => {
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [showFullDescription, setShowFullDescription] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleBackButtonClick = () => {
    navigate('/employer_dashboard', { state: { section: 'job_post' } });
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Format posted date with time ago
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;

    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      {/* Header Section with Gradient Background */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
        <div className="flex justify-between items-start">
          <div>
            <button
              onClick={handleBackButtonClick}
              className="text-white/80 hover:text-white mb-4 flex items-center space-x-2 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Back to Employer Dashboard</span>
            </button>
            <h1 className="text-3xl font-bold">{job?.job_title}</h1>
            <div className="mt-2 flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Briefcase className="h-4 w-4" />
                <span>{job?.employment_type}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{job?.job_location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>Posted {formatTimeAgo(job?.posted_at)}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            {/* <button
              onClick={handleBookmark}
              className={`p-2 rounded-full ${bookmarked ? 'bg-yellow-500' : 'bg-white/20 hover:bg-white/30'} transition-colors`}
              title={bookmarked ? "Bookmarked" : "Bookmark this job"}
            >
              <BookmarkPlus className="h-5 w-5" />
            </button> */}
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors relative"
              title="Share this job"
            >
              <Share2 className="h-5 w-5" />
              {showShareOptions && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <button
                    onClick={handleCopyLink}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {copied ? 'Link copied!' : 'Copy link'}
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Share on LinkedIn
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Email to a friend
                  </button>
                </div>
              )}
            </button>
            <button
              onClick={handlePrint}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              title="Print job details"
            >
              <Printer className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Job Status Badge */}
      <div className="bg-gray-50 px-6 py-2 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-green-700 font-medium">Active</span>
            {/* <span className="text-gray-400">|</span>
            <span className="text-gray-600">Job ID: {job.id || 'JD-' + Math.floor(1000 + Math.random() * 9000)}</span> */}
          </div>
          <div className="text-gray-500 text-sm">
            <span className="font-medium">{applicant?.length || 0}</span> applicants so far
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Job Highlights */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="flex items-center space-x-3 mb-1">
              <div className="p-2 bg-blue-100 rounded-md">
                <IndianRupee className="h-5 w-5 text-blue-700" />
              </div>
              <span className="text-gray-500 text-sm">Salary Range</span>
            </div>
            <div className="font-semibold text-gray-800 text-lg">{job.salary_range}</div>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <div className="flex items-center space-x-3 mb-1">
              <div className="p-2 bg-green-100 rounded-md">
                <MapPin className="h-5 w-5 text-green-700" />
              </div>
              <span className="text-gray-500 text-sm">Location</span>
            </div>
            <div className="font-semibold text-gray-800 text-lg">{job?.job_location}</div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
            <div className="flex items-center space-x-3 mb-1">
              <div className="p-2 bg-purple-100 rounded-md">
                <Layers className="h-5 w-5 text-purple-700" />
              </div>
              <span className="text-gray-500 text-sm">Industry</span>
            </div>
            <div className="font-semibold text-gray-800 text-lg">{job?.industry}</div>
          </div>

          <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
            <div className="flex items-center space-x-3 mb-1">
              <div className="p-2 bg-amber-100 rounded-md">
                <GraduationCap className="h-5 w-5 text-amber-700" />
              </div>
              <span className="text-gray-500 text-sm">Experience Required</span>
            </div>
            <div className="font-semibold text-gray-800 text-lg">
              {job?.job_experience_required || "1-5 years"}
            </div>
          </div>
        </div>

        {/* Description Section */}
        {/* <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Job Description</h2>
          <div className="prose prose-blue max-w-none text-gray-700">
            <p className="whitespace-pre-line">{job?.job_description}</p>
          </div>
        </div> */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Job Description</h2>
          <div className="prose prose-blue max-w-none text-gray-700">
            {job?.job_description && (
              <>
                <p className="whitespace-pre-line">
                  {showFullDescription
                    ? job.job_description
                    : job.job_description.slice(0, 300) + '...'}
                </p>
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-blue-600 hover:text-blue-800 font-medium mt-2"
                >
                  {showFullDescription ? 'Show less' : 'Read more'}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Requirements Section - Only show if available */}
        {job.requirements && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Requirements</h2>
            <ul className="list-disc pl-5 space-y-2">
              {(typeof job.requirements === 'string'
                ? job.requirements.split('\n')
                : Array.isArray(job.requirements)
                  ? job.requirements
                  : ["Bachelor's degree in relevant field", "Minimum 2 years of experience", "Strong communication skills"]
              ).map((requirement, index) => (
                <li key={index} className="text-gray-700">{requirement}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Additional Info */}
        {/* <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-800">Important Note</h3>
              <p className="text-gray-600 text-sm">This position may require relocation. Candidates who are willing to relocate will be given preference. Remote work options are available for exceptional candidates.</p>
            </div>
          </div>
        </div> */}
      </div>

      {/* Footer with Action Buttons */}
      <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-between items-center">
        <div className="text-gray-500 text-sm">
          <span className="font-medium">Last updated:</span> {new Date(job.updated_at || job.posted_at).toLocaleDateString()}
        </div>
        <div className="flex space-x-3">
          {/* <button 
            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
            onClick={() => navigate(`/edit-job/${job.id || '1'}`)}
          >
            Edit Job
          </button> */}
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            // onClick={() => navigate(`/job-applicants/${job.id || '1'}`)}
            onClick={() => scrollToSection("applicant_table")}
          >
            View All Applicants
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsDisplay;