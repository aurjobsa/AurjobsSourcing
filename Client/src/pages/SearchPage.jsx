// import React, { useState } from 'react';
// import { 
//   Search, 
//   MapPin, 
//   Briefcase, 
//   Users, 
//   Zap,
//   Target,
//   Clock,
//   Star,
//   ArrowRight
// } from 'lucide-react';

// const SearchPage = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [location, setLocation] = useState('');
//   const [jobType, setJobType] = useState('');
  
//   const popularSearches = [
//     "Frontend Developer",
//     "Backend Engineer",
//     "Product Manager",
//     "UI/UX Designer",
//     "Data Scientist",
//     "DevOps Engineer"
//   ];

//   const features = [
//     {
//       icon: <Users className="h-6 w-6 text-teal-500" />,
//       title: "5M+ Candidates",
//       description: "Access our vast database of qualified professionals"
//     },
//     {
//       icon: <Zap className="h-6 w-6 text-teal-500" />,
//       title: "Advanced Matching",
//       description: "AI-powered candidate matching for your requirements"
//     },
//     {
//       icon: <Target className="h-6 w-6 text-teal-500" />,
//       title: "Precise Filtering",
//       description: "Find exactly what you're looking for with smart filters"
//     },
//     {
//       icon: <Clock className="h-6 w-6 text-teal-500" />,
//       title: "Real-time Updates",
//       description: "Get notified when new matching candidates join"
//     }
//   ];

//   const handleSearch = (e) => {
//     e.preventDefault();
//     window.location.href = `/search-results?q=${searchQuery}&location=${location}&jobType=${jobType}`;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <div className="relative bg-gradient-to-b from-blue-100 to-white pt-12 md:pt-20 pb-16 md:pb-32">
//         {/* Background Pattern */}
//         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,_rgb(255,255,255)_1px,_transparent_0)] bg-[length:24px_24px]"></div>
        
//         <div className="container mx-auto px-4">
//           <div className="max-w-6xl mx-auto">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
//               {/* Left Column - Text Content */}
//               <div className="text-black text-center md:text-left">
//                 <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
//                   Find & Hire Top Talent <br/>
//                   <span className="text-teal-500">In Record Time</span>
//                 </h1>
//                 <p className="text-base md:text-xl text-gray-500 mb-6 md:mb-8">
//                   Access our curated pool of pre-screened candidates and find your perfect match with advanced AI-powered matching.
//                 </p>
//                 <div className="flex justify-center md:justify-start gap-4">
//                   <div className="flex items-center gap-2 bg-white bg-opacity-20 rounded-lg px-3 md:px-4 py-2">
//                     <Users className="h-4 w-4 md:h-5 md:w-5" />
//                     <span className="text-sm md:text-base">5M+ Candidates</span>
//                   </div>
//                   <div className="flex items-center gap-2 bg-white bg-opacity-20 rounded-lg px-3 md:px-4 py-2">
//                     <Star className="h-4 w-4 md:h-5 md:w-5" />
//                     <span className="text-sm md:text-base">95% Success Rate</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Right Column - Search Form */}
//               <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
//                 <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-6">Start Your Search</h2>
//                 <form onSubmit={handleSearch} className="space-y-4 md:space-y-6">
//                   {/* Search Query Input */}
//                   <div>
//                     <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
//                       What role are you hiring for?
//                     </label>
//                     <div className="relative">
//                       <Search className="absolute left-3 top-3 md:left-4 md:top-3.5 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
//                       <input
//                         type="text"
//                         placeholder="Job title, skills, or keywords..."
//                         className="w-full pl-8 md:pl-12 pr-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm md:text-base"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                       />
//                     </div>
//                   </div>

//                   {/* Location Input */}
//                   <div>
//                     <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
//                       Location
//                     </label>
//                     <div className="relative">
//                       <MapPin className="absolute left-3 top-3 md:left-4 md:top-3.5 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
//                       <input
//                         type="text"
//                         placeholder="City or remote"
//                         className="w-full pl-8 md:pl-12 pr-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm md:text-base"
//                         value={location}
//                         onChange={(e) => setLocation(e.target.value)}
//                       />
//                     </div>
//                   </div>

//                   {/* Job Type Input */}
//                   <div>
//                     <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
//                       Job Type
//                     </label>
//                     <div className="relative">
//                       <Briefcase className="absolute left-3 top-3 md:left-4 md:top-3.5 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
//                       <input
//                         type="text"
//                         placeholder="Full-time, Contract, etc."
//                         className="w-full pl-8 md:pl-12 pr-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm md:text-base"
//                         value={jobType}
//                         onChange={(e) => setJobType(e.target.value)}
//                       />
//                     </div>
//                   </div>

//                   {/* Search Button */}
//                   <button
//                     type="submit"
//                     className="w-full bg-teal-500 text-white py-2 md:py-3 rounded-lg hover:bg-teal-600 transition-colors font-medium flex items-center justify-center gap-2"
//                   >
//                     Search Candidates
//                     <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
//                   </button>

//                   {/* Popular Searches */}
//                   <div className="pt-4">
//                     <p className="text-xs md:text-sm text-gray-500 mb-2 md:mb-3">Popular searches:</p>
//                     <div className="flex flex-wrap gap-2">
//                       {popularSearches.slice(0, 3).map((search, index) => (
//                         <button
//                           key={index}
//                           onClick={() => setSearchQuery(search)}
//                           className="px-2 py-1 md:px-3 md:py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs md:text-sm text-gray-600"
//                         >
//                           {search}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="container mx-auto px-4 py-12 md:py-16">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-8 md:mb-12">
//             <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3 md:mb-4">Why Choose Our Platform</h2>
//             <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
//               Our advanced hiring platform helps you find and connect with the best talent quickly and efficiently
//             </p>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
//             {features.map((feature, index) => (
//               <div 
//                 key={index} 
//                 className="bg-white rounded-xl shadow-sm p-4 md:p-6 hover:shadow-md transition-shadow text-center"
//               >
//                 <div className="flex justify-center mb-3 md:mb-4">
//                   {feature.icon}
//                 </div>
//                 <h3 className="font-semibold text-gray-900 mb-1 md:mb-2 text-sm md:text-base">{feature.title}</h3>
//                 <p className="text-xs md:text-sm text-gray-600">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchPage;

import React, { useState } from 'react';
import axios from 'axios';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Users, 
  Zap,
  Target,
  Clock,
  Star,
  ArrowRight,
  Building,
  Award,
  Code
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [industry, setIndustry] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const navigate = useNavigate()
  
  const popularSearches = [
    "Frontend Developer",
    "Backend Engineer",
    "Product Manager",
    "UI/UX Designer",
    "Data Scientist",
    "DevOps Engineer"
  ];

  const features = [
    {
      icon: <Users className="h-6 w-6 text-teal-500" />,
      title: "5M+ Candidates",
      description: "Access our vast database of qualified professionals"
    },
    {
      icon: <Zap className="h-6 w-6 text-teal-500" />,
      title: "Advanced Matching",
      description: "AI-powered candidate matching for your requirements"
    },
    {
      icon: <Target className="h-6 w-6 text-teal-500" />,
      title: "Precise Filtering",
      description: "Find exactly what you're looking for with smart filters"
    },
    {
      icon: <Clock className="h-6 w-6 text-teal-500" />,
      title: "Real-time Updates",
      description: "Get notified when new matching candidates join"
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Start searching...")
    // console.log("Api Initiated")
    // const res = await axios.get(`http://localhost:3000/candidates/search_candidates?job_role=${searchQuery}&industry=${industry}&job_experience_required=${experience}&job_location=${location}&job_skills_required=${skills}`)

    // console.log(res)
    // window.location.href = `/search_results?q=${searchQuery}&location=${location}&jobType=${jobType}&industry=${industry}&experience=${experience}&skills=${skills}`;
    navigate(`/search_result?q=${searchQuery}&location=${location}&jobType=${jobType}&industry=${industry}&experience=${experience}&skills=${skills}`);

  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-blue-100 to-white pt-12 md:pt-20 pb-16 md:pb-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,_rgb(255,255,255)_1px,_transparent_0)] bg-[length:24px_24px]"></div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              {/* Left Column - Text Content */}
              <div className="text-black text-center md:text-left">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
                  Find & Hire Top Talent <br/>
                  <span className="text-teal-500">In Record Time</span>
                </h1>
                <p className="text-base md:text-xl text-gray-500 mb-6 md:mb-8">
                  Access our curated pool of pre-screened candidates and find your perfect match with advanced AI-powered matching.
                </p>
                <div className="flex justify-center md:justify-start gap-4">
                  <div className="flex items-center gap-2 bg-white bg-opacity-20 rounded-lg px-3 md:px-4 py-2">
                    <Users className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="text-sm md:text-base">5M+ Candidates</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white bg-opacity-20 rounded-lg px-3 md:px-4 py-2">
                    <Star className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="text-sm md:text-base">95% Success Rate</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Search Form */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-6">Start Your Search</h2>
                <form onSubmit={handleSearch} className="space-y-4 md:space-y-6">
                  {/* Search Query Input */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                      What role are you hiring for?
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 md:left-4 md:top-3.5 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Job title, skills, or keywords..."
                        className="w-full pl-8 md:pl-12 pr-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm md:text-base"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Industry Input */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                      Industry
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 md:left-4 md:top-3.5 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Technology, Healthcare, Finance, etc."
                        className="w-full pl-8 md:pl-12 pr-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm md:text-base"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Experience Input */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                      Experience Level
                    </label>
                    <div className="relative">
                      <Award className="absolute left-3 top-3 md:left-4 md:top-3.5 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Entry-level, Mid-level, Senior, etc."
                        className="w-full pl-8 md:pl-12 pr-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm md:text-base"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Skills Input */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                      Required Skills
                    </label>
                    <div className="relative">
                      <Code className="absolute left-3 top-3 md:left-4 md:top-3.5 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="React, Python, Project Management, etc."
                        className="w-full pl-8 md:pl-12 pr-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm md:text-base"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Location Input */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 md:left-4 md:top-3.5 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="City or remote"
                        className="w-full pl-8 md:pl-12 pr-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm md:text-base"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Job Type Input */}
                  {/* <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                      Job Type
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-3 md:left-4 md:top-3.5 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Full-time, Contract, etc."
                        className="w-full pl-8 md:pl-12 pr-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm md:text-base"
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                      />
                    </div>
                  </div> */}

                  {/* Search Button */}
                  <button
                    type="submit"
                    // onClick={handleSearch}
                    className="w-full bg-teal-500 text-white py-2 md:py-3 rounded-lg hover:bg-teal-600 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    Search Candidates
                    <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                  </button>

                  {/* Popular Searches */}
                  {/* <div className="pt-4">
                    <p className="text-xs md:text-sm text-gray-500 mb-2 md:mb-3">Popular searches:</p>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.slice(0, 3).map((search, index) => (
                        <button
                          key={index}
                          onClick={() => setSearchQuery(search)}
                          className="px-2 py-1 md:px-3 md:py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs md:text-sm text-gray-600"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3 md:mb-4">Why Choose Our Platform</h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              Our advanced hiring platform helps you find and connect with the best talent quickly and efficiently
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-sm p-4 md:p-6 hover:shadow-md transition-shadow text-center"
              >
                <div className="flex justify-center mb-3 md:mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 md:mb-2 text-sm md:text-base">{feature.title}</h3>
                <p className="text-xs md:text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;