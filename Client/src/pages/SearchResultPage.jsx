// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { X, Filter, Settings, Search, Briefcase, MapPin, Mail, Phone, Calendar, Award, Clock, DollarSign, CheckCircle, ChevronUp, ChevronDown, Star, StarHalf } from 'lucide-react';

// const TalentSearchPage = () => {
//     const [candidates, setCandidates] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filterVisible, setFilterVisible] = useState(false);
//     const [showLeftFilters, setShowLeftFilters] = useState(true);
//     const [expandedFilters, setExpandedFilters] = useState({
//         basicInfo: true,
//         experience: true,
//         skills: true,
//         education: true,
//         availability: false,
//         compensation: false,
//         preferences: false,
//         activity: false
//     });

//     // Function to get query parameters from URL
//     function getQueryParams() {
//         const urlParams = new URLSearchParams(window.location.search);

//         // Extract each parameter
//         const searchQuery = urlParams.get('q') || '';
//         const location = urlParams.get('location') || '';
//         const jobType = urlParams.get('jobType') || '';
//         const industry = urlParams.get('industry') || '';
//         const experience = urlParams.get('experience') || '';
//         const skills = urlParams.get('skills') || '';

//         // Return as an object
//         return {
//             searchQuery,
//             location,
//             jobType,
//             industry,
//             experience,
//             skills
//         };
//     }

//     // Get URL parameters
//     const params = getQueryParams();

//     // Primary search filters (displayed at top) - Initialize from URL params
//     const [primaryFilters, setPrimaryFilters] = useState({
//         jobRole: params.searchQuery || "Software Engineer",
//         industry: params.industry || "Technology",
//         experience: params.experience || "5-10 years",
//         location: params.location || "New York, NY"
//     });

//     // Build dynamic applied filters from URL parameters
//     const buildAppliedFiltersFromParams = () => {
//         const filters = [];

//         if (params.searchQuery) {
//             filters.push({ key: "jobRole", value: params.searchQuery });
//         }

//         if (params.location) {
//             filters.push({ key: "location", value: params.location });
//         }

//         if (params.industry) {
//             filters.push({ key: "industry", value: params.industry });
//         }

//         if (params.experience) {
//             filters.push({ key: "experience", value: params.experience });
//         }

//         if (params.skills) {
//             // If skills is comma-separated, split and add each skill
//             const skillsList = params.skills.split(',');
//             skillsList.forEach(skill => {
//                 if (skill.trim()) {
//                     filters.push({ key: "skills", value: skill.trim() });
//                 }
//             });
//         }

//         if (params.jobType) {
//             filters.push({ key: "jobType", value: params.jobType });
//         }

//         // Return default filters if no parameters found
//         return filters.length > 0 ? filters : [
//             { key: "jobRole", value: "Software Engineer" },
//             { key: "industry", value: "Technology" },
//             { key: "experience", value: "5-10 years" },
//             { key: "location", value: "New York, NY" }
//         ];
//     };

//     // Applied filters to be shown as chips - Initialize from URL params
//     const [appliedFilters, setAppliedFilters] = useState(buildAppliedFiltersFromParams());

//     // Advanced filters state
//     const [advancedFilters, setAdvancedFilters] = useState({
//         // Skills section
//         skills: params.skills ? params.skills.split(',') : [],
//         yearsOfExperience: params.experience || "Any",

//         // Education section
//         degree: "Any",
//         university: "",
//         graduationYear: "Any",

//         // Employment section
//         currentTitle: "",
//         currentCompany: "",
//         industry: params.industry || "Any",

//         // Compensation section
//         salaryRange: "Any",

//         // Availability
//         availableFrom: "Any",

//         // Preferences
//         willingToRelocate: false,
//         remoteOnly: params.jobType === "Remote" || false,
//         openToTravel: false,

//         // Activity
//         lastActive: "Any",
//         responseRate: "Any"
//     });
//     const fetchCandidates = async () => {
//         console.log("API Initiated");
//         try {
//             const res = await axios.get(
//                 `http://localhost:3000/candidates/search_candidates?job_role=${params.searchQuery || ''}&industry=${params.industry || ''}&job_experience_required=${params.experience || ''}&job_location=${params.location || ''}&job_skills_required=${params.skills || ''}`
//             );

//             if (res?.data?.data) {
//                 console.log("Candidates data:", res.data.data);
//                 setCandidates(res.data.data);
//             } else {
//                 console.error("No data received from API");
//                 setCandidates([]);
//             }
//         } catch (error) {
//             console.error("Error fetching candidates:", error);
//             setCandidates([]);
//         }
//     };

//     // Update URL based on applied filters
//     const updateURL = (filters) => {
//         const urlParams = new URLSearchParams();

//         // Group filters by key
//         const filterGroups = {};
//         filters.forEach(filter => {
//             if (!filterGroups[filter.key]) {
//                 filterGroups[filter.key] = [];
//             }
//             filterGroups[filter.key].push(filter.value);
//         });

//         // Add params to URL
//         if (filterGroups.jobRole) {
//             urlParams.set('q', filterGroups.jobRole[0]);
//         }

//         if (filterGroups.location) {
//             urlParams.set('location', filterGroups.location[0]);
//         }

//         if (filterGroups.industry) {
//             urlParams.set('industry', filterGroups.industry[0]);
//         }

//         if (filterGroups.experience) {
//             urlParams.set('experience', filterGroups.experience[0]);
//         }

//         if (filterGroups.skills) {
//             urlParams.set('skills', filterGroups.skills.join(','));
//         }

//         if (filterGroups.jobType) {
//             urlParams.set('jobType', filterGroups.jobType[0]);
//         }

//         // Update browser URL without reloading the page
//         window.history.pushState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
//     };

//     // Function to fetch candidates with specific parameters
//     const fetchCandidatesWithParams = async (params) => {
//         console.log("API Initiated with params:", params);
//         try {
//             const res = await axios.get(
//                 `http://localhost:3000/candidates/search_candidates?job_role=${params.searchQuery || ''}&industry=${params.industry || ''}&job_experience_required=${params.experience || ''}&job_location=${params.location || ''}&job_skills_required=${params.skills || ''}`
//             );
//             console.log(res?.data?.data);
//             setCandidates(res?.data?.data);
//         } catch (error) {
//             console.error("Error fetching candidates:", error);
//         }
//     };

//     const toggleFilter = (filterName) => {
//         setExpandedFilters({
//             ...expandedFilters,
//             [filterName]: !expandedFilters[filterName]
//         });
//     };


//     const applyPrimaryFilters = () => {
//         const newFilters = [];

//         if (primaryFilters.jobRole) {
//             newFilters.push({ key: "jobRole", value: primaryFilters.jobRole });
//         }

//         if (primaryFilters.industry) {
//             newFilters.push({ key: "industry", value: primaryFilters.industry });
//         }

//         if (primaryFilters.experience) {
//             newFilters.push({ key: "experience", value: primaryFilters.experience });
//         }

//         if (primaryFilters.location) {
//             newFilters.push({ key: "location", value: primaryFilters.location });
//         }

//         setAppliedFilters(newFilters);
//         updateURL(newFilters);
//         setFilterVisible(false);

//         // Use local filtering instead of API call
//         filterCandidatesLocally();
//     };

//     // Modified removeFilter function to work with local filtering
//     const removeFilter = (filterKey, filterValue) => {
//         // Remove specific filter by key and value
//         const updatedFilters = appliedFilters.filter(
//             filter => !(filter.key === filterKey && filter.value === filterValue)
//         );

//         setAppliedFilters(updatedFilters);
//         updateURL(updatedFilters);

//         // Update the relevant state
//         if (filterKey === 'jobRole') {
//             setPrimaryFilters({ ...primaryFilters, jobRole: '' });
//         } else if (filterKey === 'industry') {
//             setPrimaryFilters({ ...primaryFilters, industry: '' });
//         } else if (filterKey === 'experience') {
//             setPrimaryFilters({ ...primaryFilters, experience: '' });
//         } else if (filterKey === 'location') {
//             setPrimaryFilters({ ...primaryFilters, location: '' });
//         } else if (filterKey === 'degree') {
//             setAdvancedFilters({ ...advancedFilters, degree: 'Any' });
//         } else if (filterKey === 'university') {
//             setAdvancedFilters({ ...advancedFilters, university: '' });
//         } else if (filterKey === 'graduationYear') {
//             setAdvancedFilters({ ...advancedFilters, graduationYear: 'Any' });
//         } else if (filterKey === 'currentTitle') {
//             setAdvancedFilters({ ...advancedFilters, currentTitle: '' });
//         } else if (filterKey === 'currentCompany') {
//             setAdvancedFilters({ ...advancedFilters, currentCompany: '' });
//         } else if (filterKey === 'skills') {
//             // Remove only the specific skill
//             setAdvancedFilters({
//                 ...advancedFilters,
//                 skills: advancedFilters.skills.filter(skill => skill !== filterValue)
//             });
//         } else if (filterKey === 'yearsOfExperience') {
//             setAdvancedFilters({ ...advancedFilters, yearsOfExperience: 'Any' });
//         }

//         // Re-apply remaining filters locally
//         setTimeout(() => filterCandidatesLocally(), 0);
//     };

//     const resetAllFilters = () => {
//         setAppliedFilters([]);
//         setPrimaryFilters({
//             jobRole: "",
//             industry: "",
//             experience: "",
//             location: ""
//         });
//         setAdvancedFilters({
//             // Skills section
//             skills: [],
//             yearsOfExperience: "Any",

//             // Education section
//             degree: "Any",
//             university: "",
//             graduationYear: "Any",

//             // Employment section
//             currentTitle: "",
//             currentCompany: "",
//             industry: "Any",

//             // Compensation section
//             salaryRange: "Any",

//             // Availability
//             availableFrom: "Any",

//             // Preferences
//             willingToRelocate: false,
//             remoteOnly: false,
//             openToTravel: false,

//             // Activity
//             lastActive: "Any",
//             responseRate: "Any"
//         });

//         // Clear URL parameters
//         window.history.pushState({}, '', window.location.pathname);

//         // Fetch all candidates again to reset
//         fetchCandidates();
//     };
//     const renderStarRating = (rating) => {
//         const stars = [];
//         const fullStars = Math.floor(rating);
//         const hasHalfStar = rating % 1 !== 0;

//         for (let i = 0; i < fullStars; i++) {
//             stars.push(<Star key={`star-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
//         }

//         if (hasHalfStar) {
//             stars.push(<StarHalf key="half-star" className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
//         }

//         return <div className="flex">{stars}</div>;
//     };

//     // Handle skill input in advanced filters
//     const handleSkillsChange = (e) => {
//         const skillsInput = e.target.value;
//         const skillsList = skillsInput.split(',').map(skill => skill.trim()).filter(skill => skill);
//         setAdvancedFilters({ ...advancedFilters, skills: skillsList });
//     };
//     const applyAdvancedFilters = () => {
//         // Get existing filters that aren't related to advanced filters
//         const basicFilters = appliedFilters.filter(filter =>
//             !['skills', 'degree', 'yearsOfExperience', 'university', 'graduationYear', 
//               'currentTitle', 'currentCompany', 'availableFrom', 'remoteOnly'].includes(filter.key)
//         );

//         // Add new advanced filters
//         const newFilters = [...basicFilters];

//         // Add skills
//         advancedFilters.skills.forEach(skill => {
//             if (skill) {
//                 newFilters.push({ key: "skills", value: skill });
//             }
//         });

//         // Add other advanced filters if they're not set to "Any"
//         if (advancedFilters.yearsOfExperience !== "Any") {
//             newFilters.push({ key: "yearsOfExperience", value: advancedFilters.yearsOfExperience });
//         }

//         // Add education filters
//         if (advancedFilters.degree !== "Any") {
//             newFilters.push({ key: "degree", value: advancedFilters.degree });
//         }

//         if (advancedFilters.university) {
//             newFilters.push({ key: "university", value: advancedFilters.university });
//         }

//         if (advancedFilters.graduationYear !== "Any") {
//             newFilters.push({ key: "graduationYear", value: advancedFilters.graduationYear });
//         }

//         // Add employment filters
//         if (advancedFilters.currentTitle) {
//             newFilters.push({ key: "currentTitle", value: advancedFilters.currentTitle });
//         }

//         if (advancedFilters.currentCompany) {
//             newFilters.push({ key: "currentCompany", value: advancedFilters.currentCompany });
//         }

//         // Add availability filter
//         if (advancedFilters.availableFrom !== "Any") {
//             newFilters.push({ key: "availableFrom", value: advancedFilters.availableFrom });
//         }

//         // Add remote work preference
//         if (advancedFilters.remoteOnly) {
//             newFilters.push({ key: "remoteOnly", value: "Remote" });
//         }

//         setAppliedFilters(newFilters);
//         updateURL(newFilters);

//         // Filter candidates locally instead of making API call
//         setTimeout(() => filterCandidatesLocally(), 0);
//     };



//     const filterCandidatesLocally = () => {
//         // Fetch all candidates if none are loaded yet (only done once)
//         if (candidates.length === 0) {
//             fetchCandidates();
//             return;
//         }

//         // Start with all candidates
//         let filteredCandidates = [...candidates];

//         // Apply filters based on primaryFilters
//         if (primaryFilters.jobRole) {
//             filteredCandidates = filteredCandidates.filter(candidate => 
//                 candidate.candidate_current_role?.toLowerCase().includes(primaryFilters.jobRole.toLowerCase())
//             );
//         }

//         if (primaryFilters.location) {
//             filteredCandidates = filteredCandidates.filter(candidate => {
//                 // Check both candidate_location and address city
//                 const candidateLocation = candidate.candidate_location || 
//                     candidate.candidate_address?.[0]?.candidate_city;
//                 return candidateLocation?.toLowerCase().includes(primaryFilters.location.toLowerCase());
//             });
//         }

//         // Industry filter - note: field not directly visible in your example response
//         if (primaryFilters.industry) {
//             filteredCandidates = filteredCandidates.filter(candidate => {
//                 // Try to match against current role if industry field isn't available
//                 return candidate.candidate_current_role?.toLowerCase().includes(primaryFilters.industry.toLowerCase());
//             });
//         }

//         // Filter by experience - check candidate_experience array
//         if (primaryFilters.experience && primaryFilters.experience !== "Any") {
//             filteredCandidates = filteredCandidates.filter(candidate => {
//                 // Since experience is an array in the API response
//                 // We would need to calculate total experience from array entries
//                 // or check if any entry matches the criteria

//                 // As a fallback, if array is empty, let's check the current role
//                 if (!candidate.candidate_experience || candidate.candidate_experience.length === 0) {
//                     // Allow candidates with missing experience data if we can't filter accurately
//                     return true;
//                 }

//                 // If we had detailed experience data, we would implement filtering logic here
//                 return true; // Placeholder - modify based on actual experience data structure
//             });
//         }

//         // Filter by skills
//         if (advancedFilters.skills.length > 0) {
//             filteredCandidates = filteredCandidates.filter(candidate => {
//                 // Check if candidate has any of the required skills
//                 return advancedFilters.skills.some(skill => 
//                     candidate.candidate_skills?.some(candidateSkill => 
//                         candidateSkill.candidate_skill?.toLowerCase().includes(skill.toLowerCase())
//                     )
//                 );
//             });
//         }

//         // Filter by education - degree
//         if (advancedFilters.degree !== "Any") {
//             filteredCandidates = filteredCandidates.filter(candidate => {
//                 if (!candidate.candidate_education || candidate.candidate_education.length === 0) {
//                     return false;
//                 }

//                 return candidate.candidate_education.some(education => 
//                     education.candidate_education_level?.toLowerCase().includes(advancedFilters.degree.toLowerCase()) ||
//                     education.candidate_degree?.toLowerCase().includes(advancedFilters.degree.toLowerCase())
//                 );
//             });
//         }

//         // Filter by education - university
//         if (advancedFilters.university) {
//             filteredCandidates = filteredCandidates.filter(candidate => {
//                 if (!candidate.candidate_education || candidate.candidate_education.length === 0) {
//                     return false;
//                 }

//                 return candidate.candidate_education.some(education => 
//                     education.candidate_institute?.toLowerCase().includes(advancedFilters.university.toLowerCase())
//                 );
//             });
//         }

//         // Filter by education - graduation year
//         if (advancedFilters.graduationYear !== "Any") {
//             filteredCandidates = filteredCandidates.filter(candidate => {
//                 if (!candidate.candidate_education || candidate.candidate_education.length === 0) {
//                     return false;
//                 }

//                 let yearThreshold;
//                 if (advancedFilters.graduationYear.includes('+')) {
//                     yearThreshold = parseInt(advancedFilters.graduationYear.replace('+', ''));
//                     return candidate.candidate_education.some(education => 
//                         education.candidate_end_year >= yearThreshold
//                     );
//                 } else {
//                     // Exact year match
//                     const exactYear = parseInt(advancedFilters.graduationYear);
//                     return candidate.candidate_education.some(education => 
//                         education.candidate_end_year === exactYear
//                     );
//                 }
//             });
//         }

//         // Filter by employment - current title
//         if (advancedFilters.currentTitle) {
//             filteredCandidates = filteredCandidates.filter(candidate => 
//                 candidate.candidate_current_role?.toLowerCase().includes(advancedFilters.currentTitle.toLowerCase())
//             );
//         }

//         // Filter by employment - current company
//         if (advancedFilters.currentCompany) {
//             filteredCandidates = filteredCandidates.filter(candidate => 
//                 candidate.candidate_current_company?.toLowerCase().includes(advancedFilters.currentCompany.toLowerCase())
//             );
//         }

//         // Filter by availability
//         if (advancedFilters.availableFrom !== "Any") {
//             filteredCandidates = filteredCandidates.filter(candidate => 
//                 candidate.candidate_availability?.toLowerCase().includes(advancedFilters.availableFrom.toLowerCase())
//             );
//         }

//         // Filter by work preference (remote only)
//         if (advancedFilters.remoteOnly) {
//             filteredCandidates = filteredCandidates.filter(candidate => 
//                 candidate.candidate_work_preference?.toLowerCase().includes("remote")
//             );
//         }

//         // Update the UI with filtered results
//         setCandidates(filteredCandidates);
//     };


//     const handleSearch = () => {
//         // Update jobRole primary filter with search term
//         const updatedPrimaryFilters = { ...primaryFilters, jobRole: searchTerm };
//         setPrimaryFilters(updatedPrimaryFilters);

//         // Update applied filters
//         const updatedFilters = appliedFilters.filter(filter => filter.key !== "jobRole");
//         if (searchTerm) {
//             updatedFilters.push({ key: "jobRole", value: searchTerm });
//         }

//         setAppliedFilters(updatedFilters);
//         updateURL(updatedFilters);

//         // Use local filtering
//         setTimeout(() => filterCandidatesLocally(), 0);
//     };

//     useEffect(() => {
//         // Initialize search term from URL params
//         if (params.searchQuery) {
//             setSearchTerm(params.searchQuery);
//         }

//         fetchCandidates();
//     }, []); // Empty dependency array ensures this only runs once on mount

//     return (
//         <div className="flex h-screen bg-gray-50 p-8">
//             {/* Left sidebar with advanced filters */}
//             {showLeftFilters && (
//                 <div className="w-80 min-h-full h-auto bg-white border-r border-gray-200 p-5">
//                     <div className="flex justify-between items-center mb-4">
//                         <h2 className="text-lg font-bold text-gray-800">Advanced Filters</h2>
//                         <button
//                             className="text-gray-500 hover:text-gray-700"
//                             onClick={() => setShowLeftFilters(false)}
//                         >
//                             <X className="w-4 h-4" />
//                         </button>
//                     </div>

//                     {/* Skills & Experience */}
//                     <div className="mb-4 pb-4 border-b border-gray-200">
//                         <button
//                             className="flex justify-between items-center w-full text-left font-medium text-gray-800 mb-2 hover:text-indigo-600 transition-colors"
//                             onClick={() => toggleFilter('skills')}
//                         >
//                             <span>Skills & Experience</span>
//                             {expandedFilters.skills ? <ChevronUp className="h-4 w-4 text-indigo-500" /> :
//                                 <ChevronDown className="h-4 w-4 text-gray-500" />
//                             }
//                         </button>

//                         {expandedFilters.skills && (
//                             <div className="space-y-3 mt-2">
//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Skills (comma separated)</label>
//                                     <input
//                                         type="text"
//                                         className="w-full p-2 border border-gray-300 rounded-md text-sm"
//                                         placeholder="e.g., React, Python, AWS"
//                                         value={advancedFilters.skills.join(', ')}
//                                         onChange={handleSkillsChange}
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Years of Experience</label>
//                                     <select
//                                         className="w-full p-2 border border-gray-300 rounded-md text-sm"
//                                         value={advancedFilters.yearsOfExperience}
//                                         onChange={(e) => setAdvancedFilters({ ...advancedFilters, yearsOfExperience: e.target.value })}
//                                     >
//                                         <option>Any</option>
//                                         <option>1+ years</option>
//                                         <option>3+ years</option>
//                                         <option>5+ years</option>
//                                         <option>7+ years</option>
//                                         <option>10+ years</option>
//                                     </select>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Education */}
//                     <div className="mb-4 pb-4 border-b border-gray-200">
//                         <button
//                             className="flex justify-between items-center w-full text-left font-medium text-gray-800 mb-2 hover:text-indigo-600 transition-colors"
//                             onClick={() => toggleFilter('education')}
//                         >
//                             <span>Education</span>
//                             {expandedFilters.education ?
//                                 <ChevronUp className="h-4 w-4 text-indigo-500" /> :
//                                 <ChevronDown className="h-4 w-4 text-gray-500" />
//                             }
//                         </button>

//                         {expandedFilters.education && (
//                             <div className="space-y-3 mt-2">
//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Degree</label>
//                                     <select
//                                         className="w-full p-2 border border-gray-300 rounded-md text-sm"
//                                         value={advancedFilters.degree}
//                                         onChange={(e) => setAdvancedFilters({ ...advancedFilters, degree: e.target.value })}
//                                     >
//                                         <option>Any</option>
//                                         <option>Bachelor's</option>
//                                         <option>Master's</option>
//                                         <option>PhD</option>
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">University</label>
//                                     <input
//                                         type="text"
//                                         className="w-full p-2 border border-gray-300 rounded-md text-sm"
//                                         placeholder="University name"
//                                         value={advancedFilters.university}
//                                         onChange={(e) => setAdvancedFilters({ ...advancedFilters, university: e.target.value })}
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Graduation Year</label>
//                                     <select
//                                         className="w-full p-2 border border-gray-300 rounded-md text-sm"
//                                         value={advancedFilters.graduationYear}
//                                         onChange={(e) => setAdvancedFilters({ ...advancedFilters, graduationYear: e.target.value })}
//                                     >
//                                         <option>Any</option>
//                                         <option>2023+</option>
//                                         <option>2020+</option>
//                                         <option>2015+</option>
//                                         <option>2010+</option>
//                                     </select>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Employment */}
//                     <div className="mb-4 pb-4 border-b border-gray-200">
//                         <button
//                             className="flex justify-between items-center w-full text-left font-medium text-gray-800 mb-2 hover:text-indigo-600 transition-colors"
//                             onClick={() => toggleFilter('employment')}
//                         >
//                             <span>Employment</span>
//                             {expandedFilters.employment ?
//                                 <ChevronUp className="h-4 w-4 text-indigo-500" /> :
//                                 <ChevronDown className="h-4 w-4 text-gray-500" />
//                             }
//                         </button>

//                         {expandedFilters.employment && (
//                             <div className="space-y-3 mt-2">
//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Current Title</label>
//                                     <input
//                                         type="text"
//                                         className="w-full p-2 border border-gray-300 rounded-md text-sm"
//                                         placeholder="Job title"
//                                         value={advancedFilters.currentTitle}
//                                         onChange={(e) => setAdvancedFilters({ ...advancedFilters, currentTitle: e.target.value })}
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Current Company</label>
//                                     <input
//                                         type="text"
//                                         className="w-full p-2 border border-gray-300 rounded-md text-sm"
//                                         placeholder="Company name"
//                                         value={advancedFilters.currentCompany}
//                                         onChange={(e) => setAdvancedFilters({ ...advancedFilters, currentCompany: e.target.value })}
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Industry</label>
//                                     <select
//                                         className="w-full p-2 border border-gray-300 rounded-md text-sm"
//                                         value={advancedFilters.industry}
//                                         onChange={(e) => setAdvancedFilters({ ...advancedFilters, industry: e.target.value })}
//                                     >
//                                         <option>Any</option>
//                                         <option>Technology</option>
//                                         <option>Healthcare</option>
//                                         <option>Finance</option>
//                                         <option>Education</option>
//                                         <option>Retail</option>
//                                     </select>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Compensation */}
//                     <div className="mb-4 pb-4 border-b border-gray-200">
//                         <button
//                             className="flex justify-between items-center w-full text-left font-medium text-gray-800 mb-2 hover:text-indigo-600 transition-colors"
//                             onClick={() => toggleFilter('compensation')}
//                         >
//                             <span>Compensation</span>
//                             {expandedFilters.compensation ?
//                                 <ChevronUp className="h-4 w-4 text-indigo-500" /> :
//                                 <ChevronDown className="h-4 w-4 text-gray-500" />
//                             }
//                         </button>

//                         {expandedFilters.compensation && (
//                             <div className="space-y-3 mt-2">
//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Salary Range</label>
//                                     <select
//                                         className="w-full p-2 border border-gray-300 rounded-md text-sm"
//                                         value={advancedFilters.salaryRange}
//                                         onChange={(e) => setAdvancedFilters({ ...advancedFilters, salaryRange: e.target.value })}
//                                     >
//                                         <option>Any</option>
//                                         <option>$50k - $75k</option>
//                                         <option>$75k - $100k</option>
//                                         <option>$100k - $150k</option>
//                                         <option>$150k+</option>
//                                     </select>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Availability */}
//                     <div className="mb-4 pb-4 border-b border-gray-200">
//                         <button
//                             className="flex justify-between items-center w-full text-left font-medium text-gray-800 mb-2 hover:text-indigo-600 transition-colors"
//                             onClick={() => toggleFilter('availability')}
//                         >
//                             <span>Availability</span>
//                             {expandedFilters.availability ?
//                                 <ChevronUp className="h-4 w-4 text-indigo-500" /> :
//                                 <ChevronDown className="h-4 w-4 text-gray-500" />
//                             }
//                         </button>

//                         {expandedFilters.availability && (
//                             <div className="space-y-3 mt-2">
//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Available From</label>
//                                     <select
//                                         className="w-full p-2 border border-gray-300 rounded-md text-sm"
//                                         value={advancedFilters.availableFrom}
//                                         onChange={(e) => setAdvancedFilters({ ...advancedFilters, availableFrom: e.target.value })}
//                                     >
//                                         <option>Any</option>
//                                         <option>Immediate</option>
//                                         <option>1 week</option>
//                                         <option>2 weeks</option>
//                                         <option>1 month</option>
//                                         <option>2+ months</option>
//                                     </select>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Preferences */}
//                     <div className="mb-4 pb-4 border-b border-gray-200">
//                         <button
//                             className="flex justify-between items-center w-full text-left font-medium text-gray-800 mb-2 hover:text-indigo-600 transition-colors"
//                             onClick={() => toggleFilter('preferences')}
//                         >
//                             <span>Preferences</span>
//                             {expandedFilters.preferences ?
//                                 <ChevronUp className="h-4 w-4 text-indigo-500" /> :
//                                 <ChevronDown className="h-4 w-4 text-gray-500" />
//                             }
//                         </button>

//                         {expandedFilters.preferences && (
//                             <div className="space-y-3 mt-2">
//                                 <div className="flex items-center">
//                                     <input
//                                         type="checkbox"
//                                         id="willingToRelocate"
//                                         className="rounded border-gray-300 text-indigo-600"
//                                         checked={advancedFilters.willingToRelocate}
//                                         onChange={(e) => setAdvancedFilters({ ...advancedFilters, willingToRelocate: e.target.checked })}
//                                     />
//                                     <label htmlFor="willingToRelocate" className="ml-2 block text-sm text-gray-600">
//                                         Willing to Relocate
//                                     </label>
//                                 </div>
//                                 <div className="flex items-center">
//                                     <input
//                                         type="checkbox"
//                                         id="remoteOnly"
//                                         className="rounded border-gray-300 text-indigo-600"
//                                         checked={advancedFilters.remoteOnly}
//                                         onChange={(e) => setAdvancedFilters({ ...advancedFilters, remoteOnly: e.target.checked })}
//                                     />
//                                     <label htmlFor="remoteOnly" className="ml-2 block text-sm text-gray-600">
//                                         Remote Only
//                                     </label>
//                                 </div>
//                                 <div className="flex items-center">
//                                     <input
//                                         type="checkbox"
//                                         id="openToTravel"
//                                         className="rounded border-gray-300 text-indigo-600"
//                                         checked={advancedFilters.openToTravel}
//                                         onChange={(e) => setAdvancedFilters({ ...advancedFilters, openToTravel: e.target.checked })}
//                                     />
//                                     <label htmlFor="openToTravel" className="ml-2 block text-sm text-gray-600">
//                                         Open to Travel
//                                     </label>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Activity */}
//                     <div className="mb-4">
//                         <button
//                             className="flex justify-between items-center w-full text-left font-medium text-gray-800 mb-2 hover:text-indigo-600 transition-colors"
//                             onClick={() => toggleFilter('activity')}
//                         >
//                             <span>Activity</span>
//                             {expandedFilters.activity ?
//                                 <ChevronUp className="h-4 w-4 text-indigo-500" /> :
//                                 <ChevronDown className="h-4 w-4 text-gray-500" />
//                             }
//                         </button>

//                         {expandedFilters.activity && (
//                             <div className="space-y-3 mt-2">
//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Last Active</label>
//                                     <select
//                                         className="w-full p-2 border border-gray-300 rounded-md text-sm"
//                                         value={advancedFilters.lastActive}
//                                         onChange={(e) => setAdvancedFilters({ ...advancedFilters, lastActive: e.target.value })}
//                                     >
//                                         <option>Any</option>
//                                         <option>Today</option>
//                                         <option>This week</option>
//                                         <option>This month</option>
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Response Rate</label>
//                                     <select
//                                         className="w-full p-2 border border-gray-300 rounded-md text-sm"
//                                         value={advancedFilters.responseRate}
//                                         onChange={(e) => setAdvancedFilters({ ...advancedFilters, responseRate: e.target.value })}
//                                     >
//                                         <option>Any</option>
//                                         <option>70%+</option>
//                                         <option>80%+</option>
//                                         <option>90%+</option></select>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Apply filters button */}
//                     <div className="mt-6">
//                         <button
//                             className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors"
//                             onClick={applyAdvancedFilters}
//                         >
//                             Apply Filters
//                         </button>
//                         <button
//                             className="w-full mt-2 py-2 px-4 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
//                             onClick={resetAllFilters}
//                         >
//                             Reset All
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {/* Main content */}
//             <div className={`flex-1 ${showLeftFilters ? 'ml-4' : ''}`}>
//                 {/* Top search bar and filters */}
//                 <div className="bg-white rounded-lg shadow-sm p-5 mb-4">
//                     <div className="mb-4">
//                         <div className="flex items-center gap-2">
//                             <div className="relative flex-1">
//                                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                                 <input
//                                     type="text"
//                                     placeholder="Search for job roles, skills, titles..."
//                                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                     onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
//                                 />
//                             </div>
//                             <button
//                                 className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
//                                 onClick={() => setFilterVisible(!filterVisible)}
//                             >
//                                 <Filter className="text-gray-600" size={18} />
//                             </button>
//                             {!showLeftFilters && (
//                                 <button
//                                     className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
//                                     onClick={() => setShowLeftFilters(true)}
//                                 >
//                                     <Settings className="text-gray-600" size={18} />
//                                 </button>
//                             )}
//                             <button
//                                 className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//                                 onClick={handleSearch}
//                             >
//                                 Search
//                             </button>
//                         </div>
//                     </div>

//                     {/* Primary filters dropdown */}
//                     {filterVisible && (
//                         <div className="bg-gray-50 rounded-md p-4 my-3 border border-gray-200">
//                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Job Role</label>
//                                     <input
//                                         type="text"
//                                         className="w-full p-2 border border-gray-300 rounded-md"
//                                         placeholder="e.g., Software Engineer"
//                                         value={primaryFilters.jobRole}
//                                         onChange={(e) => setPrimaryFilters({ ...primaryFilters, jobRole: e.target.value })}
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
//                                     <select
//                                         className="w-full p-2 border border-gray-300 rounded-md"
//                                         value={primaryFilters.industry}
//                                         onChange={(e) => setPrimaryFilters({ ...primaryFilters, industry: e.target.value })}
//                                     >
//                                         <option value="">Any</option>
//                                         <option>Technology</option>
//                                         <option>Healthcare</option>
//                                         <option>Finance</option>
//                                         <option>Education</option>
//                                         <option>Retail</option>
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
//                                     <select
//                                         className="w-full p-2 border border-gray-300 rounded-md"
//                                         value={primaryFilters.experience}
//                                         onChange={(e) => setPrimaryFilters({ ...primaryFilters, experience: e.target.value })}
//                                     >
//                                         <option value="">Any</option>
//                                         <option>0-1 years</option>
//                                         <option>1-3 years</option>
//                                         <option>3-5 years</option>
//                                         <option>5-10 years</option>
//                                         <option>10+ years</option>
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
//                                     <input
//                                         type="text"
//                                         className="w-full p-2 border border-gray-300 rounded-md"
//                                         placeholder="e.g., New York, NY"
//                                         value={primaryFilters.location}
//                                         onChange={(e) => setPrimaryFilters({ ...primaryFilters, location: e.target.value })}
//                                     />
//                                 </div>
//                             </div>
//                             <div className="flex justify-end mt-4">
//                                 <button
//                                     className="py-2 px-4 border border-gray-300 text-gray-700 rounded-md mr-2 hover:bg-gray-50"
//                                     onClick={() => setFilterVisible(false)}
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//                                     onClick={applyPrimaryFilters}
//                                 >
//                                     Apply
//                                 </button>
//                             </div>
//                         </div>
//                     )}

//                     {/* Applied filters chips */}
//                     {appliedFilters.length > 0 && (
//                         <div className="flex flex-wrap items-center mt-3 gap-2">
//                             <span className="text-sm text-gray-600">Filters:</span>
//                             {appliedFilters.map((filter, index) => (
//                                 <div
//                                     key={`${filter.key}-${index}`}
//                                     className="flex items-center bg-indigo-50 text-indigo-700 rounded-full py-1 px-3 text-sm"
//                                 >
//                                     <span className="mr-1 font-medium">{filter.key === 'jobRole' ? 'Role' : filter.key}:</span>
//                                     <span>{filter.value}</span>
//                                     <button
//                                         className="ml-1 focus:outline-none"
//                                         onClick={() => removeFilter(filter.key, filter.value)}
//                                     >
//                                         <X className="w-3 h-3" />
//                                     </button>
//                                 </div>
//                             ))}
//                             <button
//                                 className="text-sm text-indigo-600 hover:text-indigo-800"
//                                 onClick={resetAllFilters}
//                             >
//                                 Clear all
//                             </button>
//                         </div>
//                     )}
//                 </div>

//                 {/* Results count */}
//                 <div className="bg-white rounded-lg shadow-sm p-5 mb-4">
//                     <div className="flex justify-between items-center">
//                         <h3 className="text-lg font-semibold text-gray-800">
//                             {candidates.length} Candidates
//                         </h3>
//                         <select className="border border-gray-300 rounded-md p-2 text-sm">
//                             <option>Sort by: Relevance</option>
//                             <option>Sort by: Last Active</option>
//                             <option>Sort by: Experience</option>
//                             <option>Sort by: Rating</option>
//                         </select>
//                     </div>
//                 </div>

//                 {/* Candidate cards */}
//                 <div className="space-y-4">
//                     {candidates.length > 0 ? (
//                         // candidates.map((candidate, index) => (
//                         //     <div key={index} className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow">
//                         //         <div className="flex flex-col md:flex-row md:items-start">
//                         //             {/* Profile pic and main info */}
//                         //             <div className="flex items-start mb-4 md:mb-0">
//                         //                 <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
//                         //                     <span className="text-xl font-medium text-indigo-600">
//                         //                         {candidate?.candidate_first_name?.split(' ').map(name => name[0]).join('')}
//                         //                     </span>
//                         //                 </div>
//                         //                 <div>
//                         //                     <h3 className="text-lg font-semibold text-gray-800">{candidate?.candidate_first_name}</h3>
//                         //                     <div className="flex items-center mt-1">
//                         //                         <Briefcase className="w-4 h-4 text-gray-500 mr-1" />
//                         //                         <span className="text-sm text-gray-600">{candidate?.candidate_current_role}</span>
//                         //                     </div>
//                         //                     <div className="flex items-center mt-1">
//                         //                         <MapPin className="w-4 h-4 text-gray-500 mr-1" />
//                         //                         <span className="text-sm text-gray-600">{candidate?.candidate_location
//                         //                         }</span>
//                         //                     </div>
//                         //                     <div className="flex items-center mt-1">
//                         //                         {renderStarRating(4.5)}
//                         //                         <span className="text-sm text-gray-600 ml-1">4.5/5</span>
//                         //                     </div>
//                         //                 </div>
//                         //             </div>

//                         //             {/* Skills and experience */}
//                         //             <div className="flex-1 md:ml-6">
//                         //                 <div className="flex items-start mb-2">
//                         //                     <Mail className="w-4 h-4 text-gray-500 mr-1 mt-1" />
//                         //                     <span className="text-sm text-gray-600">
//                         //                         {candidate?.email}
//                         //                     </span>
//                         //                 </div>
//                         //                 <div className="flex items-start mb-2">
//                         //                     <Phone className="w-4 h-4 text-gray-500 mr-1 mt-1" />
//                         //                     <span className="text-sm text-gray-600">
//                         //                         {candidate?.phone}
//                         //                     </span>
//                         //                 </div>
//                         //                 <div className="flex items-start mb-2">
//                         //                     <Award className="w-4 h-4 text-gray-500 mr-1 mt-1" />
//                         //                     <span className="text-sm text-gray-600">
//                         //                         {candidate?.experience} of experience
//                         //                     </span>
//                         //                 </div>
//                         //                 <div className="flex items-start">
//                         //                     <CheckCircle className="w-4 h-4 text-gray-500 mr-1 mt-1" />
//                         //                     <div>
//                         //                         <span className="text-sm text-gray-600">
//                         //                             Skills:
//                         //                         </span>
//                         //                         <div className="flex flex-wrap gap-1 mt-1">
//                         //                             {candidate?.candidate_skills
//                         //                                 ?.map((skill, i) => (
//                         //                                     <span
//                         //                                         key={i}
//                         //                                         className="bg-gray-100 text-xs text-gray-700 px-2 py-1 rounded-full"
//                         //                                     >
//                         //                                         {skill?.candidate_skill
//                         //                                         }
//                         //                                     </span>
//                         //                                 ))}
//                         //                         </div>
//                         //                     </div>
//                         //                 </div>
//                         //             </div>

//                         //             {/* Status and actions */}
//                         //             <div className="mt-4 md:mt-0 md:ml-4 flex flex-col items-end">
//                         //                 <div className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full flex items-center mb-2">
//                         //                     <Clock className="w-3 h-3 mr-1" />
//                         //                     <span>{candidate?.candidate_availability}</span>
//                         //                 </div>
//                         //                 <div className="flex items-center mb-2">
//                         //                     <DollarSign className="w-4 h-4 text-gray-500 mr-1" />
//                         //                     <span className="text-sm text-gray-600">{candidate?.salary_expectations}</span>
//                         //                 </div>
//                         //                 <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
//                         //                     Contact
//                         //                 </button>
//                         //             </div>
//                         //         </div>
//                         //     </div>
//                         // ))
//                         candidates?.map(candidate => (
//                                                     <div key={candidate.id} className="bg-white rounded-lg shadow-sm mb-4 p-4 hover:shadow-md transition-shadow border border-gray-100">
//                                                         <div className="flex">
//                                                             {/* Candidate Image */}
//                                                             <div className="mr-4">
//                                                                 <img
//                                                                     src={candidate?.candidate_image_link}
//                                                                     alt={candidate?.candidate_first_name}
//                                                                     className="w-20 h-20 rounded-full object-cover border border-gray-200"
//                                                                 />
//                                                                 <div className="mt-2 flex justify-center">
//                                                                     {/* {renderStarRating(candidate.rating)} */}
//                                                                     {renderStarRating(4)}

//                                                                 </div>
//                                                             </div>

//                                                             {/* Candidate Details */}
//                                                             <div className="flex-1">
//                                                                 <div className="flex justify-between items-start">
//                                                                     <div>
//                                                                         <h2 className="text-lg font-semibold text-gray-800">{candidate?.candidate_first_name}</h2>
//                                                                         <p className="text-gray-600 flex items-center">
//                                                                             <Briefcase className="w-4 h-4 mr-1" />
//                                                                             {/* {candidate?.candidate_current_role} at {candidate.company} */}
//                                                                             {candidate?.candidate_current_role} at Aurjobs

//                                                                         </p>
//                                                                         <div className="flex items-center mt-1">
//                                                                             <MapPin className="w-4 h-4 mr-1 text-gray-500" />
//                                                                             <span className="text-gray-600">{candidate?.candidate_location}</span>
//                                                                             {/* {candidate.willingToRelocate &&
//                                                                                 <span className="ml-2 text-xs bg-blue-100 text-blue-800 py-0.5 px-2 rounded">
//                                                                                     Willing to Relocate
//                                                                                 </span>
//                                                                             } */}
//                                                                         </div>
//                                                                     </div>
//                                                                     <div className="flex space-x-2">
//                                                                         <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
//                                                                             <Mail className="w-4 h-4 text-gray-600" />
//                                                                         </button>
//                                                                         <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
//                                                                             <Phone className="w-4 h-4 text-gray-600" />
//                                                                         </button>
//                                                                         <button className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm">
//                                                                             View Profile
//                                                                         </button>
//                                                                     </div>
//                                                                 </div>

//                                                                 <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
//                                                                     <div className="flex items-center">
//                                                                         <Calendar className="w-4 h-4 mr-2 text-gray-500" />
//                                                                         <span className="text-gray-600">Experience: </span>
//                                                                         <span className="ml-1 font-medium">{candidate.experience} years</span>
//                                                                     </div>
//                                                                     <div className="flex items-center">
//                                                                         <Award className="w-4 h-4 mr-2 text-gray-500" />
//                                                                         <span className="text-gray-600">Education: </span>
//                                                                         {/* <span className="ml-1 font-medium">{candidate.education}</span> */}
//                                                                         <span className="ml-1 font-medium">B.tech in Mechanical</span>

//                                                                     </div>
//                                                                     <div className="flex items-center">
//                                                                         <Clock className="w-4 h-4 mr-2 text-gray-500" />
//                                                                         <span className="text-gray-600">Available: </span>
//                                                                         <span className="ml-1 font-medium">{candidate?.candidate_availability}</span>
//                                                                     </div>
//                                                                     <div className="flex items-center">
//                                                                         <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
//                                                                         <span className="text-gray-600">Expected Salary: </span>
//                                                                         {/* <span className="ml-1 font-medium">{candidate.salary}</span> */}
//                                                                         <span className="ml-1 font-medium">80000</span>

//                                                                      </div>
//                                                                  </div>

//                                                                  <div className="mt-3">
//                                                                      <div className="flex flex-wrap gap-1">
//                                                                          {candidate?.candidate_skills.map((skill, index) => (
//                                                                             <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
//                                                                                 {skill?.candidate_skill}
//                                                                             </span>
//                                                                         ))}
//                                                                     </div>
//                                                                 </div>

//                                                                 <div className="flex justify-between mt-3 pt-3 border-t border-gray-100 text-sm">
//                                                                     <div className="flex items-center">
//                                                                         <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
//                                                                         {/* <span className="text-gray-600">Last active: {candidate.lastActive}</span> */}
//                                                                         <span className="text-gray-600">Last active: 2 days ago</span>

//                                                                     </div>
//                                                                     <div>
//                                                                         <button className="text-indigo-600 hover:text-indigo-800 hover:underline">
//                                                                             Save Candidate
//                                                                         </button>
//                                                                     </div>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 ))
//                     ) : (
//                         <div className="bg-white rounded-lg shadow-sm p-10 text-center">
//                             <p className="text-gray-600">No candidates found matching your criteria.</p>
//                             <button
//                                 className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
//                                 onClick={resetAllFilters}
//                             >
//                                 Clear filters and try again
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TalentSearchPage;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Filter, Settings, Search, Briefcase, MapPin, Mail, Phone, Calendar, Award, Clock, DollarSign, CheckCircle, ChevronUp, ChevronDown, Star, StarHalf } from 'lucide-react';
import CandidateCard from '../components/CandidateCard';

const TalentSearchPage = () => {
    

    const [allCandidates, setAllCandidates] = useState([]);
    // Filtered candidates to display
    const [filteredCandidates, setFilteredCandidates] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterVisible, setFilterVisible] = useState(false);
    const [showLeftFilters, setShowLeftFilters] = useState(true);
    const [expandedFilters, setExpandedFilters] = useState({
        basicInfo: true,
        experience: true,
        skills: true,
        education: true,
        availability: false,
        compensation: false,
        preferences: false,
        activity: false
    });

    // Function to get query parameters from URL
    function getQueryParams() {
        const urlParams = new URLSearchParams(window.location.search);

        // Extract each parameter
        const searchQuery = urlParams.get('q') || '';
        const location = urlParams.get('location') || '';
        const jobType = urlParams.get('jobType') || '';
        const industry = urlParams.get('industry') || '';
        const experience = urlParams.get('experience') || '';
        const skills = urlParams.get('skills') || '';

        // Return as an object
        return {
            searchQuery,
            location,
            jobType,
            industry,
            experience,
            skills
        };
    }

    // Get URL parameters
    const params = getQueryParams();

    // Primary search filters (displayed at top) - Initialize from URL params
    const [primaryFilters, setPrimaryFilters] = useState({
        jobRole: params.searchQuery || "",
        industry: params.industry || "",
        experience: params.experience || "",
        location: params.location || ""
    });

    // Build dynamic applied filters from URL parameters
    const buildAppliedFiltersFromParams = () => {
        const filters = [];

        if (params.searchQuery) {
            filters.push({ key: "jobRole", value: params.searchQuery });
        }

        if (params.location) {
            filters.push({ key: "location", value: params.location });
        }

        if (params.industry) {
            filters.push({ key: "industry", value: params.industry });
        }

        if (params.experience) {
            filters.push({ key: "experience", value: params.experience });
        }

        if (params.skills) {
            // If skills is comma-separated, split and add each skill
            const skillsList = params.skills.split(',');
            skillsList.forEach(skill => {
                if (skill.trim()) {
                    filters.push({ key: "skills", value: skill.trim() });
                }
            });
        }

        if (params.jobType) {
            filters.push({ key: "jobType", value: params.jobType });
        }

        // Return default filters if no parameters found
        return filters.length > 0 ? filters : [
            { key: "jobRole", value: "N.A" },
            { key: "industry", value: "N.A" },
            { key: "experience", value: "N.A" },
            { key: "location", value: "N.A" }
        ];
    };

    // Applied filters to be shown as chips - Initialize from URL params
    const [appliedFilters, setAppliedFilters] = useState(buildAppliedFiltersFromParams());

    // Advanced filters state
    const [advancedFilters, setAdvancedFilters] = useState({
        // Skills section
        skills: params.skills ? params.skills.split(',') : [],
        yearsOfExperience: params.experience || "Any",

        // Education section
        degree: "Any",
        university: "",
        graduationYear: "Any",

        // Employment section
        currentTitle: "",
        currentCompany: "",
        industry: params.industry || "Any",

        // Compensation section
        salaryRange: "Any",

        // Availability
        availableFrom: "Any",

        // Preferences
        workType: "Any",
        willingToRelocate: false,
        remoteOnly: params.jobType === "Remote" || false,
        openToTravel: false,

        // Activity
        lastActive: "Any",
        responseRate: "Any"
    });

    // Safely access nested properties in candidate object
    // const getNestedProperty = (obj, path) => {
    //     if (!obj) return undefined;

    //     if (path.includes('[')) {
    //         // Handle array paths like 'candidate_education[0].candidate_institute'
    //         const parts = path.split('.');
    //         let current = obj;

    //         for (const part of parts) {
    //             if (part.includes('[')) {
    //                 const arrName = part.split('[')[0];
    //                 const index = parseInt(part.split('[')[1].replace(']', ''), 10);

    //                 if (!current[arrName] || !current[arrName][index]) {
    //                     return undefined;
    //                 }

    //                 current = current[arrName][index];
    //             } else {
    //                 if (current === undefined || current === null) {
    //                     return undefined;
    //                 }
    //                 current = current[part];
    //             }
    //         }

    //         return current;
    //     } else {
    //         // Handle simple dot notation
    //         const properties = path.split('.');
    //         return properties.reduce((prev, curr) =>
    //             prev && prev[curr] !== undefined ? prev[curr] : undefined, obj);
    //     }
    // };

    const fetchCandidates = async () => {
        console.log("API Initiated");
        try {
            const res = await axios.get(
                `http://localhost:3000/candidates/search_candidates?job_role=${params.searchQuery || ''}&industry=${params.industry || ''}&job_experience_required=${params.experience || ''}&job_location=${params.location || ''}&job_skills_required=${params.skills || ''}`
            );

            if (res?.data?.data) {
                console.log("Candidates data received:", res.data.data.length);
                // Log first candidate for debugging structure
               

                setAllCandidates(res.data.data);
                setFilteredCandidates(res.data.data);
            } else {
                console.error("No data received from API");
                // setAllCandidates([]);
                // setFilteredCandidates([]);
            }
        } catch (error) {
            console.error("Error fetching candidates:", error);
            // setAllCandidates([]);
            // setFilteredCandidates([]);
        }
    };

    // Update URL based on applied filters
    const updateURL = (filters) => {
        const urlParams = new URLSearchParams();

        // Group filters by key
        const filterGroups = {};
        filters.forEach(filter => {
            if (!filterGroups[filter.key]) {
                filterGroups[filter.key] = [];
            }
            filterGroups[filter.key].push(filter.value);
        });

        // Add params to URL
        if (filterGroups.jobRole) {
            urlParams.set('q', filterGroups.jobRole[0]);
        }

        if (filterGroups.location) {
            urlParams.set('location', filterGroups.location[0]);
        }

        if (filterGroups.industry) {
            urlParams.set('industry', filterGroups.industry[0]);
        }

        if (filterGroups.experience) {
            urlParams.set('experience', filterGroups.experience[0]);
        }

        if (filterGroups.skills) {
            urlParams.set('skills', filterGroups.skills.join(','));
        }

        if (filterGroups.jobType) {
            urlParams.set('jobType', filterGroups.jobType[0]);
        }

        // Update browser URL without reloading the page
        window.history.pushState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
    };

    const toggleFilter = (filterName) => {
        setExpandedFilters({
            ...expandedFilters,
            [filterName]: !expandedFilters[filterName]
        });
    };

    const applyPrimaryFilters = () => {
        const newFilters = [];

        if (primaryFilters.jobRole) {
            newFilters.push({ key: "jobRole", value: primaryFilters.jobRole });
        }

        if (primaryFilters.industry) {
            newFilters.push({ key: "industry", value: primaryFilters.industry });
        }

        if (primaryFilters.experience) {
            newFilters.push({ key: "experience", value: primaryFilters.experience });
        }

        if (primaryFilters.location) {
            newFilters.push({ key: "location", value: primaryFilters.location });
        }

        setAppliedFilters(newFilters);
        updateURL(newFilters);
        setFilterVisible(false);
    };

    // Modified removeFilter function to work with local filtering
    const removeFilter = (filterKey, filterValue) => {
        // Remove specific filter by key and value
        const updatedFilters = appliedFilters.filter(
            filter => !(filter.key === filterKey && filter.value === filterValue)
        );

        setAppliedFilters(updatedFilters);
        updateURL(updatedFilters);

        // Update the relevant state
        if (filterKey === 'jobRole') {
            setPrimaryFilters({ ...primaryFilters, jobRole: '' });
        } else if (filterKey === 'industry') {
            setPrimaryFilters({ ...primaryFilters, industry: '' });
        } else if (filterKey === 'experience') {
            setPrimaryFilters({ ...primaryFilters, experience: '' });
        } else if (filterKey === 'location') {
            setPrimaryFilters({ ...primaryFilters, location: '' });
        } else if (filterKey === 'degree') {
            setAdvancedFilters({ ...advancedFilters, degree: 'Any' });
        } else if (filterKey === 'university') {
            setAdvancedFilters({ ...advancedFilters, university: '' });
        } else if (filterKey === 'graduationYear') {
            setAdvancedFilters({ ...advancedFilters, graduationYear: 'Any' });
        } else if (filterKey === 'currentTitle') {
            setAdvancedFilters({ ...advancedFilters, currentTitle: '' });
        } else if (filterKey === 'employmentType') {
            setAdvancedFilters({ ...advancedFilters, employmentType: '' });
        } else if (filterKey === 'currentCompany') {
            setAdvancedFilters({ ...advancedFilters, currentCompany: '' });
        }else if (filterKey === 'workType') {
            setAdvancedFilters({ ...advancedFilters, workType: '' });
        } else if (filterKey === 'skills') {
            // Remove only the specific skill
            setAdvancedFilters({
                ...advancedFilters,
                skills: advancedFilters.skills.filter(skill => skill !== filterValue)
            });
        } else if (filterKey === 'yearsOfExperience') {
            setAdvancedFilters({ ...advancedFilters, yearsOfExperience: 'Any' });
        }
    };

    const resetAllFilters = () => {
        setAppliedFilters([]);
        setPrimaryFilters({
            jobRole: "",
            industry: "",
            experience: "",
            location: ""
        });
        setAdvancedFilters({
            // Skills section
            skills: [],
            yearsOfExperience: "Any",

            // Education section
            degree: "Any",
            university: "",
            graduationYear: "Any",

            // Employment section
            currentTitle: "",
            currentCompany: "",
            industry: "Any",
            employmentType: "Any",

            // Compensation section
            salaryRange: "Any",

            // Availability
            availableFrom: "Any",

            // Preferences
            workType: "Any",
            willingToRelocate: false,
            remoteOnly: false,
            openToTravel: false,

            // Activity
            lastActive: "Any",
            responseRate: "Any"
        });

        // Clear URL parameters
        window.history.pushState({}, '', window.location.pathname);

        // Display all candidates
        setFilteredCandidates(allCandidates);
    };


    // Handle skill input in advanced filters
    const handleSkillsChange = (e) => {
        const skillsInput = e.target.value;
        const skillsList = skillsInput.split(',').map(skill => skill.trim()).filter(skill => skill);
        setAdvancedFilters({ ...advancedFilters, skills: skillsList });
    };

    const applyAdvancedFilters = () => {
        // Get existing filters that aren't related to advanced filters
        const basicFilters = appliedFilters.filter(filter =>
            !['skills', 'degree', 'yearsOfExperience', 'university', 'graduationYear','employmentType',
                'currentTitle', 'currentCompany', 'availableFrom', 'remoteOnly'].includes(filter.key)
        );

        // Add new advanced filters
        const newFilters = [...basicFilters];

        // Add skills
        advancedFilters.skills.forEach(skill => {
            if (skill) {
                newFilters.push({ key: "skills", value: skill });
            }
        });

        // Add other advanced filters if they're not set to "Any"
        if (advancedFilters.yearsOfExperience !== "Any") {
            newFilters.push({ key: "yearsOfExperience", value: advancedFilters.yearsOfExperience });
        }

        // Add education filters
        if (advancedFilters.degree !== "Any") {
            newFilters.push({ key: "degree", value: advancedFilters.degree });
        }
        console.log(advancedFilters.degree)

        if (advancedFilters.university) {
            newFilters.push({ key: "university", value: advancedFilters.university });
        }

        if (advancedFilters.graduationYear !== "Any") {
            newFilters.push({ key: "graduationYear", value: advancedFilters.graduationYear });
        }

        // Add employment filters
        if (advancedFilters.currentTitle) {
            newFilters.push({ key: "currentTitle", value: advancedFilters.currentTitle });
        }

        if (advancedFilters.currentCompany) {
            newFilters.push({ key: "currentCompany", value: advancedFilters.currentCompany });
        }
        if (advancedFilters.employmentType) {
            newFilters.push({ key: "employmentType", value: advancedFilters.employmentType });
        }

        // Add availability filter
        if (advancedFilters.availableFrom !== "Any") {
            newFilters.push({ key: "availableFrom", value: advancedFilters.availableFrom });
        }

        // Add Work mode preference filter
        if (advancedFilters.workType !== "Any") {
            newFilters.push({ key: "workType", value: advancedFilters.workType });
        }

        // Add remote work preference
        if (advancedFilters.remoteOnly) {
            newFilters.push({ key: "remoteOnly", value: "Remote" });
        }

        setAppliedFilters(newFilters);
        updateURL(newFilters);
    };

    const filterCandidatesLocally = () => {
        console.log("Starting local filtering with applied filters:", appliedFilters);

        // Always start with all candidates for each filtering operation
        // console.log(allCandidates)
        let results = [...allCandidates];
        console.log(results)
        console.log(`Starting with ${results.length} total candidates`);

        // Track filters applied for debugging
        const appliedFilterTracker = {};

        // Apply each filter one by one
        appliedFilters.forEach(filter => {
            const { key, value } = filter;
            const beforeCount = results.length;

            // Job Role filter
            // if (key === "jobRole" && value) {
            //     results = results.filter(candidate => {
            //         const role = candidate.candidate_current_role || '';
            //         return role.toLowerCase().includes(value.toLowerCase());
            //     });
            //     appliedFilterTracker["jobRole"] = `${beforeCount} → ${results.length}`;
            // }

            // Location filter
            // else if (key === "location" && value) {
            //     results = results.filter(candidate => {
            //         const location = candidate.candidate_location || '';
            //         const city = candidate.candidate_address?.[0]?.candidate_city || '';
            //         return location.toLowerCase().includes(value.toLowerCase()) ||
            //             city.toLowerCase().includes(value.toLowerCase());
            //     });
            //     appliedFilterTracker["location"] = `${beforeCount} → ${results.length}`;
            // }

            // Industry filter
            // else if (key === "industry" && value) {
            //     results = results.filter(candidate => {
            //         // Check industry in current role if direct field not available
            //         const role = candidate.candidate_current_role || '';
            //         const industry = candidate.candidate_industry || '';
            //         return role.toLowerCase().includes(value.toLowerCase()) ||
            //             industry.toLowerCase().includes(value.toLowerCase());
            //     });
            //     appliedFilterTracker["industry"] = `${beforeCount} → ${results.length}`;
            // }

            // Experience filter
            // else if (key === "experience" && value && value !== "Any") {
            //     results = results.filter(candidate => {
            //         // Parse experience range like "5-10 years"
            //         let minYears = 0, maxYears = 100;

            //         if (value.includes('-')) {
            //             const parts = value.split('-');
            //             minYears = parseInt(parts[0], 10) || 0;
            //             maxYears = parseInt(parts[1], 10) || 100;
            //         } else if (value.includes('+')) {
            //             minYears = parseInt(value, 10) || 0;
            //         } else {
            //             minYears = parseInt(value, 10) || 0;
            //             maxYears = minYears + 1;
            //         }

            //         // Calculate candidate's total experience
            //         let totalExp = 0;
            //         if (candidate.candidate_experience && Array.isArray(candidate.candidate_experience)) {
            //             totalExp = candidate.candidate_experience.reduce((sum, exp) => {
            //                 // Calculate duration for each experience
            //                 let startDate = new Date(exp.candidate_start_date);
            //                 let endDate = exp.candidate_end_date ? new Date(exp.candidate_end_date) : new Date();

            //                 if (isNaN(startDate.getTime())) return sum;

            //                 // Calculate years difference
            //                 const years = (endDate - startDate) / (1000 * 60 * 60 * 24 * 365);
            //                 return sum + years;
            //             }, 0);
            //         }

            //         return totalExp >= minYears && totalExp <= maxYears;
            //     });
            //     appliedFilterTracker["experience"] = `${beforeCount} → ${results.length}`;
            // }

            // Skills filter
            // else if (key === "skills" && value) {
            //     results = results.filter(candidate => {
            //         if (!candidate.candidate_skills || !Array.isArray(candidate.candidate_skills)) {
            //             return false;
            //         }

            //         return candidate.candidate_skills.some(skillObj => {
            //             const skill = skillObj.candidate_skill || '';
            //             return skill.toLowerCase().includes(value.toLowerCase());
            //         });
            //     });
            //     appliedFilterTracker["skills"] = `${beforeCount} → ${results.length}`;
            // }


             if (key === "degree" && value && value !== "Any") {
                console.log("Degree filter value:", value);
                console.log(value)
                console.log(results)

                results = results.filter(candidate => {
                    // Log the education data for each candidate
                    console.log("Candidate ID:", candidate.id, "Education:", candidate.candidate_education);

                    if (!candidate.candidate_education || !Array.isArray(candidate.candidate_education)) {
                        console.log("-> Candidate has no education array");
                        return false;
                    }

                    const matchFound = candidate.candidate_education.some(edu => {
                        const educationLevel = (edu.candidate_education_level || '').toLowerCase();
                        console.log("-> Checking education level:", educationLevel, "against filter:", value.toLowerCase());
                        return educationLevel.includes(value.toLowerCase());
                    });

                    console.log("-> Match found:", matchFound);
                    return matchFound;
                });
                appliedFilterTracker["degree"] = `${beforeCount} → ${results.length}`;


                console.log("Results count after degree filter:", results.length);
            }

            // University filter
            else if (key === "university" && value) {
                results = results.filter(candidate => {
                    if (!candidate.candidate_education || !Array.isArray(candidate.candidate_education)) {
                        return false;
                    }

                    return candidate.candidate_education.some(edu => {
                        const institute = (edu.candidate_institute || '').toLowerCase();
                        return institute.includes(value.toLowerCase());
                    });
                });
                appliedFilterTracker["university"] = `${beforeCount} → ${results.length}`;
            }

            // Graduation Year filter
            else if (key === "graduationYear" && value && value !== "Any") {
                results = results.filter(candidate => {
                    if (!candidate.candidate_education || !Array.isArray(candidate.candidate_education)) {
                        return false;
                    }

                    if (value.includes('+')) {
                        // Format: "2015+" means 2015 or later
                        const minYear = parseInt(value.replace('+', ''), 10);
                        return candidate.candidate_education.some(edu => {
                            const endYear = parseInt(edu.candidate_end_year, 10);
                            return !isNaN(endYear) && endYear >= minYear;
                        });
                    } else {
                        // Exact year match
                        const exactYear = parseInt(value, 10);
                        return candidate.candidate_education.some(edu => {
                            const endYear = parseInt(edu.candidate_end_year, 10);
                            return !isNaN(endYear) && endYear === exactYear;
                        });
                    }
                });
                appliedFilterTracker["graduationYear"] = `${beforeCount} → ${results.length}`;
            }

            // Current Title filter
            else if (key === "currentTitle" && value) {
                results = results.filter(candidate => {
                    const title = candidate.candidate_current_role || '';
                    return title.toLowerCase().includes(value.toLowerCase());
                });
                appliedFilterTracker["currentTitle"] = `${beforeCount} → ${results.length}`;
            }

            // Current Company filter
            else if (key === "currentCompany" && value) {
                results = results.filter(candidate => {
                    const company = candidate.candidate_current_company || '';
                    return company.toLowerCase().includes(value.toLowerCase());
                });
                appliedFilterTracker["currentCompany"] = `${beforeCount} → ${results.length}`;
            }

            // Availability filter
            else if (key === "availableFrom" && value && value !== "Any") {
                results = results.filter(candidate => {
                    const availability = candidate.candidate_availability || '';
                    return availability.toLowerCase().includes(value.toLowerCase());
                });
                appliedFilterTracker["availableFrom"] = `${beforeCount} → ${results.length}`;
            }
            // Emplyment Type
            else if (key === "employmentType" && value && value !== "Any") {
                results = results.filter(candidate => {
                    const availability = candidate.candidate_availability || '';
                    return availability.toLowerCase().includes(value.toLowerCase());
                });
                appliedFilterTracker["availableFrom"] = `${beforeCount} → ${results.length}`;
            }

            //Work  type filter

            else if (key === "workType" && value && value !== "Any") {
                results = results.filter(candidate => {
                    const workPreference = candidate.candidate_work_preference || '';
                    return workPreference.toLowerCase().includes(value.toLowerCase());
                });
                appliedFilterTracker["availableFrom"] = `${beforeCount} → ${results.length}`;
            }

            // Remote Only filter
            else if (key === "remoteOnly" && value === "Remote") {
                results = results.filter(candidate => {
                    const preference = candidate.candidate_work_preference || '';
                    return preference.toLowerCase().includes('remote');
                });
                appliedFilterTracker["remoteOnly"] = `${beforeCount} → ${results.length}`;
            }
        });

        console.log("Filter results by step:", appliedFilterTracker);
        console.log(`Final filtered candidates: ${results.length}`);

        // Update state with filtered results
        setFilteredCandidates(results);
        console.log(results)
    };

    const handleSearch = () => {
        // Update jobRole primary filter with search term
        const updatedPrimaryFilters = { ...primaryFilters, jobRole: searchTerm };
        setPrimaryFilters(updatedPrimaryFilters);

        // Update applied filters
        const updatedFilters = appliedFilters.filter(filter => filter.key !== "jobRole");
        if (searchTerm) {
            updatedFilters.push({ key: "jobRole", value: searchTerm });
        }

        setAppliedFilters(updatedFilters);
        updateURL(updatedFilters);
    };

    // Initial data fetch
    useEffect(() => {
        // Initialize search term from URL params
        if (params.searchQuery) {
            setSearchTerm(params.searchQuery);
        }
        fetchCandidates();
    }, []);

    // Trigger filtering whenever applied filters change
    useEffect(() => {
        if (allCandidates.length > 0) {
            filterCandidatesLocally();
        }
    }, [appliedFilters]);


    return (
        <div className="flex h-screen bg-gray-50 p-8">
            {/* Left sidebar with advanced filters */}
            {showLeftFilters && (
                <div className="w-80 min-h-full h-auto bg-white border-r border-gray-200 p-5">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-gray-800">Advanced Filters</h2>
                        <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => setShowLeftFilters(false)}
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Skills & Experience */}
                    <div className="mb-4 pb-4 border-b border-gray-200">
                        <button
                            className="flex justify-between items-center w-full text-left font-medium text-gray-800 mb-2 hover:text-indigo-600 transition-colors"
                            onClick={() => toggleFilter('skills')}
                        >
                            <span>Skills & Experience</span>
                            {expandedFilters.skills ? <ChevronUp className="h-4 w-4 text-indigo-500" /> :
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                            }
                        </button>

                        {expandedFilters.skills && (
                            <div className="space-y-3 mt-2">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Skills (comma separated)</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        placeholder="e.g., React, Python, AWS"
                                        value={advancedFilters.skills.join(', ')}
                                        onChange={handleSkillsChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Years of Experience</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        value={advancedFilters.yearsOfExperience}
                                        onChange={(e) => setAdvancedFilters({ ...advancedFilters, yearsOfExperience: e.target.value })}
                                    >
                                        <option>Any</option>
                                        <option>1+ years</option>
                                        <option>3+ years</option>
                                        <option>5+ years</option>
                                        <option>7+ years</option>
                                        <option>10+ years</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Education */}
                    <div className="mb-4 pb-4 border-b border-gray-200">
                        <button
                            className="flex justify-between items-center w-full text-left font-medium text-gray-800 mb-2 hover:text-indigo-600 transition-colors"
                            onClick={() => toggleFilter('education')}
                        >
                            <span>Education</span>
                            {expandedFilters.education ?
                                <ChevronUp className="h-4 w-4 text-indigo-500" /> :
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                            }
                        </button>

                        {expandedFilters.education && (
                            <div className="space-y-3 mt-2">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Degree</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        value={advancedFilters.degree}
                                        onChange={(e) => setAdvancedFilters({ ...advancedFilters, degree: e.target.value })}
                                    >
                                        <option>Any</option>
                                        <option>Bachelor's</option>
                                        <option>Master's</option>
                                        <option>PhD</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">University</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        placeholder="University name"
                                        value={advancedFilters.university}
                                        onChange={(e) => setAdvancedFilters({ ...advancedFilters, university: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Graduation Year</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        value={advancedFilters.graduationYear}
                                        onChange={(e) => setAdvancedFilters({ ...advancedFilters, graduationYear: e.target.value })}
                                    >
                                        <option>Any</option>
                                        <option>2023+</option>
                                        <option>2020+</option>
                                        <option>2015+</option>
                                        <option>2010+</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Employment */}
                    <div className="mb-4 pb-4 border-b border-gray-200">
                        <button
                            className="flex justify-between items-center w-full text-left font-medium text-gray-800 mb-2 hover:text-indigo-600 transition-colors"
                            onClick={() => toggleFilter('employment')}
                        >
                            <span>Employment</span>
                            {expandedFilters.employment ?
                                <ChevronUp className="h-4 w-4 text-indigo-500" /> :
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                            }
                        </button>

                        {expandedFilters.employment && (
                            <div className="space-y-3 mt-2">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Current Title</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        placeholder="Job title"
                                        value={advancedFilters.currentTitle}
                                        onChange={(e) => setAdvancedFilters({ ...advancedFilters, currentTitle: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Current Company</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        placeholder="Company name"
                                        value={advancedFilters.currentCompany}
                                        onChange={(e) => setAdvancedFilters({ ...advancedFilters, currentCompany: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Industry</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        value={advancedFilters.industry}
                                        onChange={(e) => setAdvancedFilters({ ...advancedFilters, industry: e.target.value })}
                                    >
                                        <option>Any</option>
                                        <option>Technology</option>
                                        <option>Healthcare</option>
                                        <option>Finance</option>
                                        <option>Education</option>
                                        <option>Retail</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Employment Type</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        value={advancedFilters.employmentType}
                                        onChange={(e) => setAdvancedFilters({ ...advancedFilters, employmentType: e.target.value })}
                                    >
                                        <option>Any</option>
                                        <option>Full-time</option>
                                        <option>Internship</option>
                                        <option>Contract</option>
                                        
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Compensation */}
                    <div className="mb-4 pb-4 border-b border-gray-200">
                        <button
                            className="flex justify-between items-center w-full text-left font-medium text-gray-800 mb-2 hover:text-indigo-600 transition-colors"
                            onClick={() => toggleFilter('compensation')}
                        >
                            <span>Compensation</span>
                            {expandedFilters.compensation ?
                                <ChevronUp className="h-4 w-4 text-indigo-500" /> :
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                            }
                        </button>

                        {expandedFilters.compensation && (
                            <div className="space-y-3 mt-2">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Salary Range</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        value={advancedFilters.salaryRange}
                                        onChange={(e) => setAdvancedFilters({ ...advancedFilters, salaryRange: e.target.value })}
                                    >
                                        <option>Any</option>
                                        <option>$50k - $75k</option>
                                        <option>$75k - $100k</option>
                                        <option>$100k - $150k</option>
                                        <option>$150k+</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Availability */}
                    <div className="mb-4 pb-4 border-b border-gray-200">
                        <button
                            className="flex justify-between items-center w-full text-left font-medium text-gray-800 mb-2 hover:text-indigo-600 transition-colors"
                            onClick={() => toggleFilter('availability')}
                        >
                            <span>Availability</span>
                            {expandedFilters.availability ?
                                <ChevronUp className="h-4 w-4 text-indigo-500" /> :
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                            }
                        </button>

                        {expandedFilters.availability && (
                            <div className="space-y-3 mt-2">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Available From</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        value={advancedFilters.availableFrom}
                                        onChange={(e) => setAdvancedFilters({ ...advancedFilters, availableFrom: e.target.value })}
                                    >
                                        <option>Any</option>
                                        <option>Immediate</option>
                                        <option>1 week</option>
                                        <option>2 weeks</option>
                                        <option>1 month</option>
                                        <option>2+ months</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Preferences */}
                    <div className="mb-4 pb-4 border-b border-gray-200">
                        <button
                            className="flex justify-between items-center w-full text-left font-medium text-gray-800 mb-2 hover:text-indigo-600 transition-colors"
                            onClick={() => toggleFilter('preferences')}
                        >
                            <span>Preferences</span>
                            {expandedFilters.preferences ?
                                <ChevronUp className="h-4 w-4 text-indigo-500" /> :
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                            }
                        </button>

                        {expandedFilters.preferences && (
                            // <div className="space-y-3 mt-2">
                            //     <div className="flex items-center">
                            //         <input
                            //             type="checkbox"
                            //             id="willingToRelocate"
                            //             className="rounded border-gray-300 text-indigo-600"
                            //             checked={advancedFilters.willingToRelocate}
                            //             onChange={(e) => setAdvancedFilters({ ...advancedFilters, willingToRelocate: e.target.checked })}
                            //         />
                            //         <label htmlFor="willingToRelocate" className="ml-2 block text-sm text-gray-600">
                            //             Willing to Relocate
                            //         </label>
                            //     </div>
                            //     <div className="flex items-center">
                            //         <input
                            //             type="checkbox"
                            //             id="remoteOnly"
                            //             className="rounded border-gray-300 text-indigo-600"
                            //             checked={advancedFilters.remoteOnly}
                            //             onChange={(e) => setAdvancedFilters({ ...advancedFilters, remoteOnly: e.target.checked })}
                            //         />
                            //         <label htmlFor="remoteOnly" className="ml-2 block text-sm text-gray-600">
                            //             Remote Only
                            //         </label>
                            //     </div>
                            //     <div className="flex items-center">
                            //         <input
                            //             type="checkbox"
                            //             id="openToTravel"
                            //             className="rounded border-gray-300 text-indigo-600"
                            //             checked={advancedFilters.openToTravel}
                            //             onChange={(e) => setAdvancedFilters({ ...advancedFilters, openToTravel: e.target.checked })}
                            //         />
                            //         <label htmlFor="openToTravel" className="ml-2 block text-sm text-gray-600">
                            //             Open to Travel
                            //         </label>
                            //     </div>
                            // </div>
                            <div>
                                    <label className="block text-sm text-gray-600 mb-1">Work Type</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        value={advancedFilters.workType}
                                        onChange={(e) => setAdvancedFilters({ ...advancedFilters, workType: e.target.value })}
                                    >
                                        <option>Any</option>
                                        <option>Remote</option>
                                        <option>Hybrid</option>
                                        <option>On-site</option>
                                        
                                    </select>
                                </div>
                        )}
                    </div>

                    {/* Activity */}
                    <div className="mb-4">
                        <button
                            className="flex justify-between items-center w-full text-left font-medium text-gray-800 mb-2 hover:text-indigo-600 transition-colors"
                            onClick={() => toggleFilter('activity')}
                        >
                            <span>Activity</span>
                            {expandedFilters.activity ?
                                <ChevronUp className="h-4 w-4 text-indigo-500" /> :
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                            }
                        </button>

                        {expandedFilters.activity && (
                            <div className="space-y-3 mt-2">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Last Active</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        value={advancedFilters.lastActive}
                                        onChange={(e) => setAdvancedFilters({ ...advancedFilters, lastActive: e.target.value })}
                                    >
                                        <option>Any</option>
                                        <option>Today</option>
                                        <option>This week</option>
                                        <option>This month</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Response Rate</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        value={advancedFilters.responseRate}
                                        onChange={(e) => setAdvancedFilters({ ...advancedFilters, responseRate: e.target.value })}
                                    >
                                        <option>Any</option>
                                        <option>70%+</option>
                                        <option>80%+</option>
                                        <option>90%+</option></select>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Apply filters button */}
                    <div className="mt-6">
                        <button
                            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors"
                            onClick={applyAdvancedFilters}
                        >
                            Apply Filters
                        </button>
                        <button
                            className="w-full mt-2 py-2 px-4 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
                            onClick={resetAllFilters}
                        >
                            Reset All
                        </button>
                    </div>
                </div>
            )}

            {/* Main content */}
            <div className={`flex-1 ${showLeftFilters ? 'ml-4' : ''}`}>
                {/* Top search bar and filters */}
                <div className="bg-white rounded-lg shadow-sm p-5 mb-4">
                    <div className="mb-4">
                        <div className="flex items-center gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search for job roles, skills, titles..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                />
                            </div>
                            <button
                                className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                onClick={() => setFilterVisible(!filterVisible)}
                            >
                                <Filter className="text-gray-600" size={18} />
                            </button>
                            {!showLeftFilters && (
                                <button
                                    className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                    onClick={() => setShowLeftFilters(true)}
                                >
                                    <Settings className="text-gray-600" size={18} />
                                </button>
                            )}
                            <button
                                className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                onClick={handleSearch}
                            >
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Primary filters dropdown */}
                    {filterVisible && (
                        <div className="bg-gray-50 rounded-md p-4 my-3 border border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Role</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        placeholder="e.g., Software Engineer"
                                        value={primaryFilters.jobRole}
                                        onChange={(e) => setPrimaryFilters({ ...primaryFilters, jobRole: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        value={primaryFilters.industry}
                                        onChange={(e) => setPrimaryFilters({ ...primaryFilters, industry: e.target.value })}
                                    >
                                        <option value="">Any</option>
                                        <option>Technology</option>
                                        <option>Healthcare</option>
                                        <option>Finance</option>
                                        <option>Education</option>
                                        <option>Retail</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        value={primaryFilters.experience}
                                        onChange={(e) => setPrimaryFilters({ ...primaryFilters, experience: e.target.value })}
                                    >
                                        <option value="">Any</option>
                                        <option>0-1 years</option>
                                        <option>1-3 years</option>
                                        <option>3-5 years</option>
                                        <option>5-10 years</option>
                                        <option>10+ years</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        placeholder="e.g., New York, NY"
                                        value={primaryFilters.location}
                                        onChange={(e) => setPrimaryFilters({ ...primaryFilters, location: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <button
                                    className="py-2 px-4 border border-gray-300 text-gray-700 rounded-md mr-2 hover:bg-gray-50"
                                    onClick={() => setFilterVisible(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                    onClick={applyPrimaryFilters}
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Applied filters chips */}
                    {appliedFilters.length > 0 && (
                        <div className="flex flex-wrap items-center mt-3 gap-2">
                            <span className="text-sm text-gray-600">Filters:</span>
                            {appliedFilters.map((filter, index) => (
                                <div
                                    key={`${filter.key}-${index}`}
                                    className="flex items-center bg-indigo-50 text-indigo-700 rounded-full py-1 px-3 text-sm"
                                >
                                    <span className="mr-1 font-medium">{filter.key === 'jobRole' ? 'Role' : filter.key}:</span>
                                    <span>{filter.value}</span>
                                    <button
                                        className="ml-1 focus:outline-none"
                                        onClick={() => removeFilter(filter.key, filter.value)}
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                            <button
                                className="text-sm text-indigo-600 hover:text-indigo-800"
                                onClick={resetAllFilters}
                            >
                                Clear all
                            </button>
                        </div>
                    )}
                </div>

                {/* Results count */}
                <div className="bg-white rounded-lg shadow-sm p-5 mb-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-800">
                            {filteredCandidates.length} Candidates
                        </h3>
                        <select className="border border-gray-300 rounded-md p-2 text-sm">
                            <option>Sort by: Relevance</option>
                            <option>Sort by: Last Active</option>
                            <option>Sort by: Experience</option>
                            <option>Sort by: Rating</option>
                        </select>
                    </div>
                </div>

                {/* Candidate cards */}
                <div className="space-y-4">
                    {filteredCandidates.length > 0 ? (
                       
                        filteredCandidates?.map(candidate => (
                            // 
                            <CandidateCard candidate={candidate}/>
                        ))
                    ) : (
                        <div className="bg-white rounded-lg shadow-sm p-10 text-center">
                            <p className="text-gray-600">No candidates found matching your criteria.</p>
                            <button
                                className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
                                onClick={resetAllFilters}
                            >
                                Clear filters and try again
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TalentSearchPage;