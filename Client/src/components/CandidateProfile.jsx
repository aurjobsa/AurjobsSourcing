import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, MapPin, Mail, Phone, Download, Building, 
  Award, Book, Star, Calendar, Clock, CheckCircle2,
  Bookmark, Share2, History, FileText, MessageSquare,
  AlertCircle, ThumbsUp, ThumbsDown, Menu
} from 'lucide-react';
import axios from 'axios';
import { BASEURL } from '../utility/config';
import { useParams } from 'react-router-dom';

const CandidateProfile = () => {
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('New');
  const [savedToJobs, setSavedToJobs] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const params = useParams();
    const candidateId = params.id;
    const [candidate, setCandidate] = useState(null);

    console.log(candidate)

  const fetchCandidateData = async () => {
    try {
        const res = await axios.get(`${BASEURL}/candidates/candidate_profile/${candidateId}`, {
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

  // Candidate data (same as in the original component)
  // const candidate = {
  //   id: 1,
  //   name: "Sarah Wilson",
  //   avatar: "SW",
  //   role: "Senior Frontend Developer",
  //   company: "TechCorp Inc.",
  //   location: "San Francisco, CA",
  //   email: "sarah.wilson@email.com",
  //   phone: "+1 (555) 123-4567",
  //   linkedIn: "linkedin.com/in/sarahwilson",
  //   github: "github.com/sarahwilson",
  //   totalExp: "8 years",
  //   relevantExp: "6 years",
  //   salary: "$120k - $150k",
  //   availability: "2 weeks",
  //   noticePeriod: "30 days",
  //   preferredWorkMode: "Hybrid",
  //   visaStatus: "H1B",
  //   interviewAvailability: "Mon-Fri, 9AM-5PM PST",
  //   lastActive: "2 days ago",
  //   matchScore: 92,
  //   summary: "Experienced frontend developer with a strong focus on creating responsive, accessible, and performant web applications. Specialized in React ecosystem and modern JavaScript.",
  //   skills: [
  //     { name: "React", years: 6, level: "Expert" },
  //     { name: "TypeScript", years: 4, level: "Advanced" },
  //     { name: "Next.js", years: 3, level: "Advanced" },
  //     { name: "TailwindCSS", years: 3, level: "Advanced" },
  //     { name: "Redux", years: 5, level: "Expert" },
  //     { name: "Node.js", years: 4, level: "Intermediate" },
  //     { name: "GraphQL", years: 3, level: "Intermediate" },
  //     { name: "Jest", years: 4, level: "Advanced" },
  //     { name: "Cypress", years: 2, level: "Intermediate" },
  //     { name: "Webpack", years: 4, level: "Advanced" }
  //   ],
  //   experience: [
  //     {
  //       role: "Senior Frontend Developer",
  //       company: "TechCorp Inc.",
  //       period: "2020 - Present",
  //       description: "Led frontend development for multiple high-impact projects, improved performance metrics by 40%, and mentored junior developers.",
  //       achievements: [
  //         "Reduced page load time by 60% through code optimization",
  //         "Led a team of 5 developers for major platform redesign",
  //         "Implemented automated testing improving coverage by 40%"
  //       ]
  //     },
  //     {
  //       role: "Frontend Developer",
  //       company: "StartupXYZ",
  //       period: "2017 - 2020",
  //       description: "Developed and maintained multiple React-based applications, implemented responsive designs, and improved site performance.",
  //       achievements: [
  //         "Built core product features used by 100k+ users",
  //         "Reduced bug reports by 50% through better testing",
  //         "Mentored 3 junior developers"
  //       ]
  //     }
  //   ],
  //   education: [
  //     {
  //       degree: "BS in Computer Science",
  //       school: "University of California, Berkeley",
  //       year: "2015"
  //     }
  //   ],
  //   certifications: [
  //     {
  //       name: "AWS Certified Developer",
  //       issuer: "Amazon Web Services",
  //       year: "2022"
  //     },
  //     {
  //       name: "Google Cloud Professional Developer",
  //       issuer: "Google",
  //       year: "2021"
  //     }
  //   ],
  //   projects: [
  //     {
  //       name: "E-commerce Platform Redesign",
  //       description: "Led the complete redesign of the company's e-commerce platform, resulting in a 25% increase in conversion rate.",
  //       technologies: ["React", "Next.js", "TailwindCSS", "Redux"]
  //     },
  //     {
  //       name: "Analytics Dashboard",
  //       description: "Built a real-time analytics dashboard used by 500+ internal users.",
  //       technologies: ["React", "D3.js", "GraphQL", "TypeScript"]
  //     }
  //   ]
  // };

  return (
    // <div className="min-h-screen bg-gray-50">
    //   {/* Top Navigation - Responsive */}
    //   <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
    //     <div className="container mx-auto px-4 py-4">
    //       <div className="flex justify-between items-center">
    //         <button 
    //           onClick={() => window.history.back()} 
    //           className="flex items-center text-gray-600 hover:text-gray-900"
    //         >
    //           <ArrowLeft className="h-5 w-5 mr-2" />
    //           <span className="hidden sm:inline">Back to Search</span>
    //         </button>
    //         <div className="flex items-center gap-4">
    //           <button 
    //             onClick={() => setSavedToJobs(!savedToJobs)}
    //             className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
    //               savedToJobs ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
    //             }`}
    //           >
    //             <Bookmark className="h-4 w-4" fill={savedToJobs ? "currentColor" : "none"} />
    //             <span className="hidden sm:inline">{savedToJobs ? 'Saved' : 'Save'}</span>
    //           </button>
    //           <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg">
    //             <Share2 className="h-4 w-4" />
    //             <span className="hidden sm:inline">Share</span>
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="container mx-auto px-4 py-8">
    //     {/* Profile Header - Responsive */}
    //     <div className="bg-white rounded-lg shadow-sm mb-8">
    //       <div className="p-6">
    //         <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
    //           <div className="relative">
    //             <div className="w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
    //               {candidate?.candidate_image_link}
    //             </div>
    //             <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-sm px-2 py-1 rounded-full">
    //               {candidate.matchScore}% Match
    //             </div>
    //           </div>
    //           <div className="flex-1 w-full">
    //             <div className="flex flex-col sm:flex-row justify-between items-start">
    //               <div className="w-full">
    //                 <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-2">
    //                   <h1 className="text-2xl font-semibold text-gray-900">{candidate.candidate_first_name}</h1>
    //                   <span className="px-2 py-1 bg-blue-50 text-blue-600 text-sm rounded-full">
    //                     Active
    //                   </span>
    //                 </div>
    //                 <p className="text-lg text-gray-600 mb-2">{candidate.role} at {candidate.company}</p>
    //                 <div className="flex flex-wrap gap-4">
    //                   <div className="flex items-center text-gray-500">
    //                     <MapPin className="h-4 w-4 mr-1" />
    //                     <span>{candidate.location}</span>
    //                   </div>
    //                   <div className="flex items-center text-gray-500">
    //                     <Mail className="h-4 w-4 mr-1" />
    //                     <span>{candidate.email}</span>
    //                   </div>
    //                   <div className="flex items-center text-gray-500">
    //                     <Phone className="h-4 w-4 mr-1" />
    //                     <span>{candidate.phone}</span>
    //                   </div>
    //                   <div className="flex items-center text-gray-500">
    //                     <Clock className="h-4 w-4 mr-1" />
    //                     <span>Last active: {candidate.lastActive}</span>
    //                   </div>
    //                 </div>
    //               </div>
    //               <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
    //                 <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2">
    //                   <Download className="h-4 w-4" />
    //                   <span className="hidden sm:inline">Download CV</span>
    //                 </button>
    //                 <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 flex items-center gap-2">
    //                   <MessageSquare className="h-4 w-4" />
    //                   <span className="hidden sm:inline">Contact</span>
    //                 </button>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Grid Layout - Responsive */}
    //     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    //       {/* Left Column - Responsive */}
    //       <div className="md:col-span-2 space-y-8">
    //         {/* Application Status */}
    //         <div className="bg-white rounded-lg shadow-sm p-6">
    //           <h2 className="text-xl font-semibold mb-4">Application Status</h2>
    //           <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
    //             <select 
    //               value={status}
    //               onChange={(e) => setStatus(e.target.value)}
    //               className="w-full sm:w-auto border rounded-lg px-3 py-2"
    //             >
    //               <option>New</option>
    //               <option>Screening</option>
    //               <option>Interview Scheduled</option>
    //               <option>Offer Made</option>
    //               <option>Rejected</option>
    //             </select>
    //             <div className="flex gap-4">
    //               <button className="flex items-center gap-2 text-green-600">
    //                 <ThumbsUp className="h-4 w-4" />
    //                 <span className="hidden sm:inline">Shortlist</span>
    //               </button>
    //               <button className="flex items-center gap-2 text-red-600">
    //                 <ThumbsDown className="h-4 w-4" />
    //                 <span className="hidden sm:inline">Reject</span>
    //               </button>
    //             </div>
    //           </div>
    //         </div>

    //         {/* Recruiter Notes */}
    //         <div className="bg-white rounded-lg shadow-sm p-6">
    //           <div className="flex justify-between items-center mb-4">
    //             <h2 className="text-xl font-semibold">Recruiter Notes</h2>
    //             <button 
    //               onClick={() => setShowNotes(!showNotes)}
    //               className="text-blue-600 hover:text-blue-700"
    //             >
    //               {showNotes ? 'Hide' : 'Show'} Notes
    //             </button>
    //           </div>
    //           {showNotes && (
    //             <textarea
    //               value={notes}
    //               onChange={(e) => setNotes(e.target.value)}
    //               placeholder="Add your notes about the candidate here..."
    //               className="w-full h-32 p-3 border rounded-lg"
    //             />
    //           )}
    //         </div>

    //         {/* Professional Summary */}
    //         <div className="bg-white rounded-lg shadow-sm">
    //           <div className="p-6">
    //             <h2 className="text-xl font-semibold mb-4">Professional Summary</h2>
    //             <p className="text-gray-600">{candidate.summary}</p>
    //           </div>
    //         </div>

    //         {/* Work Experience */}
    //         <div className="bg-white rounded-lg shadow-sm">
    //           <div className="p-6">
    //             <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
    //               <Building className="h-5 w-5" />
    //               Work Experience
    //             </h2>
    //             <div className="space-y-6">
    //               {candidate.experience.map((exp, index) => (
    //                 <div key={index} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
    //                   <div className="flex flex-col sm:flex-row justify-between mb-2">
    //                     <div>
    //                       <h3 className="font-semibold text-gray-900">{exp.role}</h3>
    //                       <p className="text-gray-600">{exp.company}</p>
    //                     </div>
    //                     <span className="text-gray-500 mt-2 sm:mt-0">{exp.period}</span>
    //                   </div>
    //                   <p className="text-gray-600">{exp.description}</p>
    //                   {exp.achievements && (
    //                     <ul className="list-disc list-inside text-gray-600 mt-2">
    //                       {exp.achievements.map((achievement, i) => (
    //                         <li key={i}>{achievement}</li>
    //                       ))}
    //                     </ul>
    //                   )}
    //                 </div>
    //               ))}
    //             </div>
    //           </div>
    //         </div>

    //         {/* Projects */}
    //         <div className="bg-white rounded-lg shadow-sm">
    //           <div className="p-6">
    //             <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
    //               <Star className="h-5 w-5" />
    //               Projects
    //             </h2>
    //             <div className="space-y-6">
    //               {candidate.projects.map((project, index) => (
    //                 <div key={index} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
    //                   <h3 className="font-semibold text-gray-900 mb-2">{project.name}</h3>
    //                   <p className="text-gray-600 mb-2">{project.description}</p>
    //                   <div className="flex flex-wrap gap-2">
    //                     {project.technologies.map((tech, i) => (
    //                       <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
    //                         {tech}
    //                       </span>
    //                     ))}
    //                   </div>
    //                 </div>
    //               ))}
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="space-y-8">
    //          {/* Quick Info */}
    //          <div className="bg-white rounded-lg shadow-sm">
    //            <div className="p-6">
    //              <h2 className="text-xl font-semibold mb-4">Quick Info</h2>
    //              <div className="space-y-4">
    //                <div className="flex justify-between">
    //                  <span className="text-gray-500">Total Experience</span>
    //                  <span className="font-medium">{candidate.totalExp}</span>
    //                </div>
    //                <div className="flex justify-between">
    //                  <span className="text-gray-500">Relevant Experience</span>
    //                  <span className="font-medium">{candidate.relevantExp}</span>
    //                </div>
    //                <div className="flex justify-between">
    //                  <span className="text-gray-500">Expected Salary</span>
    //                  <span className="font-medium">{candidate.salary}</span>
    //                </div>
    //                <div className="flex justify-between">
    //                  <span className="text-gray-500">Availability</span>
    //                  <span className="font-medium">{candidate.availability}</span>
    //                </div>
    //              </div>
    //            </div>
    //          </div>

    //          {/* Skills */}
    //          <div className="bg-white rounded-lg shadow-sm p-6">
    //            <h2 className="text-xl font-semibold mb-4">Requirements Match</h2>
    //            <div className="space-y-4">
    //              <div className="flex items-center justify-between">
    //                <span>Required Skills</span>
    //                <span className="text-green-600">9/10 Match</span>
    //              </div>
    //              <div className="flex items-center justify-between">
    //                <span>Experience Level</span>
    //                <span className="text-green-600">Exceeds</span>
    //              </div>                 <div className="flex items-center justify-between">
    //                <span>Location</span>
    //                <span className="text-yellow-600">Partial Match</span>
    //              </div>
    //            </div>
    //          </div>

    //          {/* Additional Information */}
    //          <div className="bg-white rounded-lg shadow-sm p-6">
    //            <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
    //            <div className="space-y-4">
    //              <div className="flex justify-between">
    //                <span className="text-gray-500">Notice Period</span>
    //                <span className="font-medium">{candidate.noticePeriod}</span>
    //              </div>
    //              <div className="flex justify-between">
    //                <span className="text-gray-500">Work Mode Preference</span>
    //                <span className="font-medium">{candidate.preferredWorkMode}</span>
    //              </div>
    //              <div className="flex justify-between">
    //                <span className="text-gray-500">Visa Status</span>
    //                <span className="font-medium">{candidate.visaStatus}</span>
    //              </div>
    //              <div className="flex justify-between">
    //                <span className="text-gray-500">Interview Availability</span>
    //                <span className="font-medium">{candidate.interviewAvailability}</span>
    //              </div>
    //            </div>
    //          </div>

    //          {/* Enhanced Skills Section */}
    //          <div className="bg-white rounded-lg shadow-sm p-6">
    //            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
    //              <Award className="h-5 w-5" />
    //              Skills Assessment
    //            </h2>
    //            <div className="space-y-4">
    //              {candidate.skills.map((skill, index) => (
    //               <div key={index} className="border-b last:border-0 pb-3">
    //                 <div className="flex justify-between mb-1">
    //                   <span className="font-medium">{skill.name}</span>
    //                   <span className="text-gray-500">{skill.years} years</span>
    //                 </div>
    //                 <div className="flex items-center gap-2">
    //                   <div className="flex-1 h-2 bg-gray-100 rounded-full">
    //                     <div 
    //                       className="h-2 bg-teal-500 rounded-full"
    //                       style={{ 
    //                         width: skill.level === 'Expert' ? '100%' : 
    //                                skill.level === 'Advanced' ? '75%' : '50%' 
    //                       }}
    //                     />
    //                   </div>
    //                   <span className="text-sm text-gray-500">{skill.level}</span>
    //                 </div>
    //               </div>
    //             ))}
    //           </div>
    //         </div>

    //         {/* Education */}
    //         <div className="bg-white rounded-lg shadow-sm">
    //           <div className="p-6">
    //             <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
    //               <Book className="h-5 w-5" />
    //               Education
    //             </h2>
    //             <div className="space-y-4">
    //               {candidate.education.map((edu, index) => (
    //                 <div key={index}>
    //                   <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
    //                   <p className="text-gray-600">{edu.school}</p>
    //                   <p className="text-gray-500">{edu.year}</p>
    //                 </div>
    //               ))}
    //             </div>
    //           </div>
    //         </div>

    //          {/* Certifications */}
    //         <div className="bg-white rounded-lg shadow-sm">
    //           <div className="p-6">
    //             <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
    //               <Award className="h-5 w-5" />
    //               Certifications
    //             </h2>
    //             <div className="space-y-4">
    //               {candidate.certifications.map((cert, index) => (
    //                 <div key={index}>
    //                   <h3 className="font-semibold text-gray-900">{cert.name}</h3>
    //                   <p className="text-gray-600">{cert.issuer}</p>
    //                   <p className="text-gray-500">{cert.year}</p>
    //                 </div>
    //               ))}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation - Responsive */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => window.history.back()} 
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">Back to Search</span>
            </button>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSavedToJobs(!savedToJobs)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  savedToJobs ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                }`}
              >
                <Bookmark className="h-4 w-4" fill={savedToJobs ? "currentColor" : "none"} />
                <span className="hidden sm:inline">{savedToJobs ? 'Saved' : 'Save'}</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg">
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header - Responsive */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                  {candidate?.candidate_first_name.charAt(0)}{candidate?.candidate_last_name.charAt(0)}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-sm px-2 py-1 rounded-full">
                  75% Match
                </div>
              </div>
              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start">
                  <div className="w-full">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-2">
                      <h1 className="text-2xl font-semibold text-gray-900">
                        {candidate?.candidate_first_name} {candidate?.candidate_last_name}
                      </h1>
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 text-sm rounded-full">
                        Active
                      </span>
                    </div>
                    {/* <p className="text-lg text-gray-600 mb-2">{candidate.role} at {candidate.company}</p> */}
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{candidate?.candidate_location}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Mail className="h-4 w-4 mr-1" />
                        <span>{candidate?.candidate_email}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Phone className="h-4 w-4 mr-1" />
                        <span>{candidate?.candidate_phone}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {/* <span>Last active: {candidate.lastActive}</span> */}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
                    <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      <span className="hidden sm:inline">Download CV</span>
                    </button>
                    <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      <span className="hidden sm:inline">Contact</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Layout - Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Responsive */}
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

            {/* Professional Summary */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Professional Summary</h2>
                {/* <p className="text-gray-600">{candidate.summary}</p> */}
              </div>
            </div>

            {/* Work Experience */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Work Experience
                </h2>
                <div className="space-y-6">
                  {candidate?.experience?.map((exp, index) => (
                    <div key={index} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                      <div className="flex flex-col sm:flex-row justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{exp?.candidate_job_role}</h3>
                          <p className="text-gray-600">{exp?.candidate_company}</p>
                        </div>
                        {/* <span className="text-gray-500 mt-2 sm:mt-0">{exp.period}</span> */}
                      </div>
                      {/* <p className="text-gray-600">{exp.description}</p> */}
                      {/* {exp.achievements && (
                        <ul className="list-disc list-inside text-gray-600 mt-2">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      )} */}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Projects
                </h2>
                {/* <div className="space-y-6">
                  {candidate.projects.map((project, index) => (
                    <div key={index} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                      <h3 className="font-semibold text-gray-900 mb-2">{project.name}</h3>
                      <p className="text-gray-600 mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div> */}
              </div>
            </div>
          </div>

          <div className="space-y-8">
             {/* Quick Info */}
             <div className="bg-white rounded-lg shadow-sm">
               <div className="p-6">
                 <h2 className="text-xl font-semibold mb-4">Quick Info</h2>
                 <div className="space-y-4">
                   <div className="flex justify-between">
                     <span className="text-gray-500">Total Experience</span>
                     {/* <span className="font-medium">{candidate.totalExp}</span> */}
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-500">Relevant Experience</span>
                     {/* <span className="font-medium">{candidate.relevantExp}</span> */}
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-500">Expected Salary</span>
                     <span className="font-medium">{candidate?.preferences[0]?.expected_salary}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-500">Availability</span>
                     <span className="font-medium">{candidate?.candidate_availability}</span>
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

             {/* Additional Information */}
             <div className="bg-white rounded-lg shadow-sm p-6">
               <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
               <div className="space-y-4">
                 <div className="flex justify-between">
                   <span className="text-gray-500">Notice Period</span>
                   {/* <span className="font-medium">{candidate.noticePeriod}</span> */}
                 </div>
                 <div className="flex justify-between">
                   <span className="text-gray-500">Work Mode Preference</span>
                   <span className="font-medium">{candidate?.preferences[0]?.preferred_work_location}</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-gray-500">Visa Status</span>
                   {/* <span className="font-medium">{candidate.visaStatus}</span> */}
                 </div>
                 <div className="flex justify-between">
                   <span className="text-gray-500">Interview Availability</span>
                   <span className="font-medium">{candidate?.candidate_availability}</span>
                 </div>
               </div>
             </div>

             {/* Enhanced Skills Section */}
             <div className="bg-white rounded-lg shadow-sm p-6">
               <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                 <Award className="h-5 w-5" />
                 Skills Assessment
               </h2>
               <div className="space-y-4">
                 {candidate?.skills.map((skill, index) => (
                  <div key={index} className="border-b last:border-0 pb-3">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill?.candidate_skill}</span>
                      {/* <span className="text-gray-500">{skill.years} years</span> */}
                    </div>
                    {/* <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full">
                        <div 
                          className="h-2 bg-teal-500 rounded-full"
                          style={{ 
                            width: skill.level === 'Expert' ? '100%' : 
                                   skill.level === 'Advanced' ? '75%' : '50%' 
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-500">{skill.level}</span>
                    </div> */}
                  </div>
                ))}
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
                  {candidate?.education.map((edu, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-gray-900">{edu?.candidate_degree}</h3>
                      <p className="text-gray-600">{edu?.candidate_institute
                      }</p>
                      {/* <p className="text-gray-500">{edu.year}</p> */}
                    </div>
                  ))}
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
                  {candidate?.certifications.map((cert, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-gray-900">{cert?.candidate_certificate_name
                      }</h3>
                      <p className="text-gray-600">{cert?.certificate_issuing_organization}</p>
                      <p className="text-gray-500">{cert?.certificate_issue_date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;