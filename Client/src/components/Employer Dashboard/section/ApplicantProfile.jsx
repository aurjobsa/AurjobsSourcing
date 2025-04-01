
import React, { useEffect, useState } from 'react';
import {
  ArrowLeft, MapPin, Mail, Phone, Download, Building,
  Award, Book, Star, Calendar, Clock, CheckCircle2,
  Bookmark, Share2, History, FileText, MessageSquare,
  AlertCircle, ThumbsUp, ThumbsDown, Menu,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react';
import axios from 'axios';
import { BASEURL, BASEURL1 } from '../../../utility/config';
import { useParams } from 'react-router-dom';

const ApplicantProfile = () => {
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('New');
  const [copied, setCopied] = useState(false);


  const handleCopy = () => {
    navigator.clipboard.writeText(candidate?.candidate_resume_link)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.error('Failed to copy URL: ', err));
  };

  const handleOpen = () => {
    window.open(candidate?.candidate_resume_link, '_blank');
  };
  const params = useParams();
  const candidateId = params.id;

  const [candidate, setCandidate] = useState(null);

  const fetchCandidateData = async () => {
    try {
      const res = await axios.get(`${BASEURL1}/candidates/CandidateProfile/${candidateId}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res?.data?.success) {
        console.log(res?.data?.candidate);
        setCandidate(res?.data?.candidate);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCandidateData();
  }, []);

  // Loading state
  if (!candidate) {
    return <div className="min-h-screen mt-20 bg-gray-50 flex items-center justify-center">
      <p>Loading candidate profile...</p>
    </div>;
  }

  // Calculate experience years (simple calculation)
  const calculateExperienceYears = (experiences) => {
    if (!experiences || experiences.length === 0) return '0 years';

    let totalMonths = 0;
    experiences.forEach(exp => {
      const startDate = new Date(exp.candidate_start_date);
      const endDate = exp.candidate_end_date ? new Date(exp.candidate_end_date) : new Date();
      const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        (endDate.getMonth() - startDate.getMonth());
      totalMonths += months;
    });

    return `${Math.floor(totalMonths / 12)} years ${totalMonths % 12} months`;
  };

  // Format skills for display
  const formatSkills = (skills) => {
    if (!skills) return [];

    return skills.map(skill => ({
      name: skill.candidate_skill,
      years: 1, // Default since we don't have years data
      level: 'Intermediate' // Default since we don't have level data
    }));
  };

  const totalExp = calculateExperienceYears(candidate.experiences);
  const formattedSkills = formatSkills(candidate.skills);

  return (
    <div className="min-h-screen mt-20 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                  {candidate.candidate_first_name.charAt(0)}{candidate.candidate_last_name.charAt(0)}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-sm px-2 py-1 rounded-full">
                  62% Match
                </div>
              </div>
              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start">
                  <div className="w-full">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-2">
                      <h1 className="text-2xl font-semibold text-gray-900">
                        {candidate.candidate_first_name} {candidate.candidate_last_name}
                      </h1>
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 text-sm rounded-full">
                        {status}
                      </span>
                    </div>
                    <p className="text-lg text-gray-600 mb-2">
                      {candidate.candidate_current_role}
                      {candidate.experiences && candidate.experiences[0]?.candidate_company &&
                        ` at ${candidate.experiences[0].candidate_company}`}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{candidate.candidate_location}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Mail className="h-4 w-4 mr-1" />
                        <span>{candidate.candidate_email}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Phone className="h-4 w-4 mr-1" />
                        <span>{candidate.candidate_phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
                    <button
                      onClick={handleCopy}
                      className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3 w-3 text-green-500" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy Resume URL</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleOpen}
                      className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>Open Resume</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-8">
            {/* Application Status */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Application Status</h2>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full sm:w-auto border rounded-lg px-3 py-2"
                >
                  <option>New</option>
                  <option>Screening</option>
                  <option>Interview Scheduled</option>
                  <option>Offer Made</option>
                  <option>Rejected</option>
                </select>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 text-green-600">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="hidden sm:inline">Shortlist</span>
                  </button>
                  <button className="flex items-center gap-2 text-red-600">
                    <ThumbsDown className="h-4 w-4" />
                    <span className="hidden sm:inline">Reject</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Recruiter Notes */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recruiter Notes</h2>
                <button
                  onClick={() => setShowNotes(!showNotes)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  {showNotes ? 'Hide' : 'Show'} Notes
                </button>
              </div>
              {showNotes && (
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add your notes about the candidate here..."
                  className="w-full h-32 p-3 border rounded-lg"
                />
              )}
            </div>

            {/* Work Experience */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Work Experience
                </h2>
                <div className="space-y-6">
                  {candidate.experiences && candidate.experiences.map((exp, index) => (
                    <div key={index} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                      <div className="flex flex-col sm:flex-row justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{exp.candidate_job_role}</h3>
                          <p className="text-gray-600">{exp.candidate_company}</p>
                        </div>
                        <span className="text-gray-500 mt-2 sm:mt-0">
                          {new Date(exp.candidate_start_date).toLocaleDateString()} -
                          {exp.candidate_end_date ? new Date(exp.candidate_end_date).toLocaleDateString() : 'Present'}
                        </span>
                      </div>
                      <p className="text-gray-600">
                        {exp.candidate_job_type} role in {exp.candidate_industry}
                      </p>
                    </div>
                  ))}
                  {(!candidate.experiences || candidate.experiences.length === 0) && (
                    <p className="text-gray-500">No work experience data available</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quick Info */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Quick Info</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Experience</span>
                    <span className="font-medium">{totalExp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Current Salary</span>
                    <span className="font-medium">${candidate.candidate_current_salary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Availability</span>
                    <span className="font-medium">{candidate.candidate_availability}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Work Preference</span>
                    <span className="font-medium">{candidate.candidate_work_preference}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Requirements Match</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Required Skills</span>
                  <span className="text-green-600">9/10 Match</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Experience Level</span>
                  <span className="text-green-600">Exceeds</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Location</span>
                  <span className="text-yellow-600">Partial Match</span>
                </div>
              </div>
            </div>

            {/* Enhanced Skills Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Award className="h-5 w-5" />
                Skills
              </h2>
              <div className="space-y-4">
                {candidate.skills && candidate.skills.map((skill, index) => (
                  <div key={index} className="border-b last:border-0 pb-3">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.candidate_skill}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full">
                        <div
                          className="h-2 bg-teal-500 rounded-full"
                          style={{ width: '75%' }}
                        />
                      </div>
                      <span className="text-sm text-gray-500">Intermediate</span>
                    </div>
                  </div>
                ))}
                {(!candidate.skills || candidate.skills.length === 0) && (
                  <p className="text-gray-500">No skills data available</p>
                )}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Book className="h-5 w-5" />
                  Education
                </h2>
                <div className="space-y-4">
                  {candidate.education && candidate.education.map((edu, index) => (
                    <div key={index} className="border-b last:border-0 pb-3 last:pb-0">
                      <h3 className="font-semibold text-gray-900">{edu.candidate_degree}</h3>
                      <p className="text-gray-600">{edu.candidate_institute}</p>
                      <p className="text-gray-500">{edu.candidate_start_year} - {edu.candidate_end_year}</p>
                      <p className="text-gray-500">Level: {edu.candidate_education_level}</p>
                      <p className="text-gray-500">Score: {edu.candidate_score}</p>
                    </div>
                  ))}
                  {(!candidate.education || candidate.education.length === 0) && (
                    <p className="text-gray-500">No education data available</p>
                  )}
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Certifications
                </h2>
                <div className="space-y-4">
                  {candidate.certifications && candidate.certifications.map((cert, index) => (
                    <div key={index} className="border-b last:border-0 pb-3 last:pb-0">
                      <h3 className="font-semibold text-gray-900">{cert.candidate_certificate_name}</h3>
                      <p className="text-gray-600">{cert.certificate_issuing_organization}</p>
                      <p className="text-gray-500">
                        {cert.certificate_issue_date ? new Date(cert.certificate_issue_date).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  ))}
                  {(!candidate.certifications || candidate.certifications.length === 0) && (
                    <p className="text-gray-500">No certification data available</p>
                  )}
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Languages
                </h2>
                <div className="space-y-4">
                  {candidate.languages && candidate.languages.map((lang, index) => (
                    <div key={index} className="border-b last:border-0 pb-3 last:pb-0">
                      <div className="flex justify-between">
                        <span className="font-medium">{lang.candidate_language}</span>
                        <span className="text-gray-500">{lang.candidate_proficiency}</span>
                      </div>
                    </div>
                  ))}
                  {(!candidate.languages || candidate.languages.length === 0) && (
                    <p className="text-gray-500">No language data available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantProfile;