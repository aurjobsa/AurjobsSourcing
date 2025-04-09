import React, { useState } from 'react';
import { Search, Filter, ChevronDown, Star, StarOff, Mail, Phone, Calendar, X, Check, Menu } from 'lucide-react';

const ShortlistedCandidate = () => {
  // Sample candidate data
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: "Emily Johnson",
      role: "Senior Frontend Developer",
      experience: "6 years",
      skills: ["React", "TypeScript", "Node.js", "AWS"],
      location: "San Francisco, CA",
      salary: "$120,000 - $145,000",
      status: "Interview Scheduled",
      avatar: "/api/placeholder/40/40",
      rating: 4.8,
      favorite: true,
      interview: "04/10/2025, 2:00 PM",
      notes: "Excellent problem-solving skills, great culture fit"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "UX/UI Designer",
      experience: "4 years",
      skills: ["Figma", "Adobe CC", "User Research", "Prototyping"],
      location: "New York, NY",
      salary: "$95,000 - $115,000",
      status: "Review",
      avatar: "/api/placeholder/40/40",
      rating: 4.5,
      favorite: true,
      notes: "Strong portfolio, experience with enterprise products"
    },
    {
      id: 3,
      name: "David Rodriguez",
      role: "Full Stack Developer",
      experience: "5 years",
      skills: ["JavaScript", "Python", "React", "Django"],
      location: "Austin, TX",
      salary: "$110,000 - $130,000",
      status: "Offer Pending",
      avatar: "/api/placeholder/40/40",
      rating: 4.7,
      favorite: false,
      notes: "Technical assessment: 92/100, great communication"
    },
    {
      id: 4,
      name: "Aisha Patel",
      role: "Data Scientist",
      experience: "3 years",
      skills: ["Python", "TensorFlow", "SQL", "Data Visualization"],
      location: "Remote",
      salary: "$105,000 - $125,000",
      status: "Review",
      avatar: "/api/placeholder/40/40",
      rating: 4.2,
      favorite: true,
      notes: "Strong analytical skills, previous fintech experience"
    },
    {
      id: 5,
      name: "James Wilson",
      role: "DevOps Engineer",
      experience: "7 years",
      skills: ["Kubernetes", "Docker", "CI/CD", "AWS"],
      location: "Seattle, WA",
      salary: "$130,000 - $155,000",
      status: "New",
      avatar: "/api/placeholder/40/40",
      rating: 4.6,
      favorite: false,
      notes: "Led cloud migration at previous company"
    }
  ]);

  // States for filters and search
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [expandedCandidate, setExpandedCandidate] = useState(null);


  // Handle toggling favorite status
  const toggleFavorite = (id) => {
    setCandidates(candidates.map(candidate => 
      candidate.id === id ? {...candidate, favorite: !candidate.favorite} : candidate
    ));
  };

  // Handle scheduling interview
  const scheduleInterview = (id) => {
    // In a real app, this would open a date picker or modal
    alert(`Schedule interview for candidate ID: ${id}`);
  };

  // Handle rejecting a candidate
  const rejectCandidate = (id) => {
    setCandidates(candidates.map(candidate => 
      candidate.id === id ? {...candidate, status: "Rejected"} : candidate
    ));
  };

  // Handle approving/moving forward a candidate
  const approveCandidate = (id) => {
    setCandidates(candidates.map(candidate => 
      candidate.id === id ? {...candidate, status: "Offer Pending"} : candidate
    ));
  };

  // Filter candidates based on filters and search
  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          candidate.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = filterStatus === 'All' || candidate.status === filterStatus;
    
    const matchesFavorite = !showFavoritesOnly || candidate.favorite;
    
    return matchesSearch && matchesStatus && matchesFavorite;
  });

  // Sort candidates
  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'experience') return parseInt(b.experience) - parseInt(a.experience);
    return 0;
  });

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Review': return 'bg-yellow-100 text-yellow-800';
      case 'Interview Scheduled': return 'bg-purple-100 text-purple-800';
      case 'Offer Pending': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Topbar */}
      {/* <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">Talent Pipeline</h1>
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-500">Welcome, Recruiter</span>
              <img src="/api/placeholder/32/32" alt="User avatar" className="h-8 w-8 rounded-full" />
            </div>
            <button 
              className="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header> */}

      {/* Mobile menu */}
      {/* {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 py-2 px-4">
          <div className="flex flex-col space-y-2">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Dashboard</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 bg-indigo-50">Shortlisted Candidates</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Job Postings</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Analytics</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Settings</a>
          </div>
        </div>
      )} */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Shortlisted Candidates</h2>
            <p className="text-gray-500 mt-1">Manage your top candidates for open positions</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <button className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Export List
            </button>
            <button className="bg-indigo-600 border border-transparent rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
              + Add Candidate
            </button>
          </div>
        </div>

        {/* Filters and search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search by name, role, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="relative inline-block text-left">
                <div>
                  <button type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    Status: {filterStatus}
                    <ChevronDown size={16} className="-mr-1 ml-2 h-5 w-5" />
                  </button>
                </div>
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {['All', 'New', 'Review', 'Interview Scheduled', 'Offer Pending', 'Rejected'].map((status) => (
                      <a
                        key={status}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setFilterStatus(status)}
                      >
                        {status}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative inline-block text-left">
                <div>
                  <button type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    Sort By
                    <ChevronDown size={16} className="-mr-1 ml-2 h-5 w-5" />
                  </button>
                </div>
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setSortBy('rating')}>
                      Rating
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setSortBy('name')}>
                      Name
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setSortBy('experience')}>
                      Experience
                    </a>
                  </div>
                </div>
              </div>

              <button 
                type="button" 
                className={`inline-flex items-center justify-center rounded-md border ${showFavoritesOnly ? 'bg-yellow-50 border-yellow-200 text-yellow-800' : 'border-gray-300 text-gray-700 bg-white'} px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              >
                {showFavoritesOnly ? <Star size={16} className="mr-2 text-yellow-500" /> : <StarOff size={16} className="mr-2" />}
                {showFavoritesOnly ? 'Favorites Only' : 'Show All'}
              </button>
            </div>
          </div>
        </div>

        {/* Candidates list */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {sortedCandidates.length > 0 ? (
              sortedCandidates.map((candidate) => (
                <li key={candidate.id} className="hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img src={candidate.avatar} alt={candidate.name} className="h-10 w-10 rounded-full" />
                        <div className="ml-4">
                          <div className="flex items-center">
                            <h3 className="text-sm font-medium text-gray-900">{candidate.name}</h3>
                            <button 
                              onClick={() => toggleFavorite(candidate.id)}
                              className="ml-2 text-gray-400 hover:text-yellow-500 focus:outline-none"
                            >
                              {candidate.favorite ? 
                                <Star size={16} className="text-yellow-500 fill-yellow-500" /> : 
                                <Star size={16} />
                              }
                            </button>
                          </div>
                          <p className="text-sm text-gray-500">
                            {candidate.role} • {candidate.experience} • {candidate.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
                          {candidate.status}
                        </span>
                        <button 
                          onClick={() => setExpandedCandidate(expandedCandidate === candidate.id ? null : candidate.id)}
                          className="ml-4 px-2 py-1 text-gray-500 rounded hover:bg-gray-100"
                        >
                          <ChevronDown 
                            size={16} 
                            className={`transition-transform duration-200 ${expandedCandidate === candidate.id ? 'transform rotate-180' : ''}`} 
                          />
                        </button>
                      </div>
                    </div>
                    
                    {/* Expanded view */}
                    {expandedCandidate === candidate.id && (
                      <div className="mt-4 border-t border-gray-200 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Skills</h4>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {candidate.skills.map((skill) => (
                                <span key={skill} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                  {skill}
                                </span>
                              ))}
                            </div>
                            
                            <h4 className="text-sm font-medium text-gray-500 mt-3">Salary Expectation</h4>
                            <p className="mt-1 text-sm text-gray-900">{candidate.salary}</p>
                            
                            <h4 className="text-sm font-medium text-gray-500 mt-3">Notes</h4>
                            <p className="mt-1 text-sm text-gray-900">{candidate.notes}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Rating</h4>
                            <div className="mt-1 flex items-center">
                              <span className="text-sm font-semibold text-gray-900">{candidate.rating}/5.0</span>
                              <div className="ml-2 flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} size={16} className={i < Math.floor(candidate.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} />
                                ))}
                              </div>
                            </div>
                            
                            {candidate.interview && (
                              <>
                                <h4 className="text-sm font-medium text-gray-500 mt-3">Interview Scheduled</h4>
                                <p className="mt-1 text-sm text-gray-900 flex items-center">
                                  <Calendar size={16} className="mr-1 text-gray-500" />
                                  {candidate.interview}
                                </p>
                              </>
                            )}
                            
                            <div className="mt-4">
                              <div className="flex items-center space-x-2">
                                <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                                  <Mail size={14} className="mr-1" />
                                  Email
                                </button>
                                <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                                  <Phone size={14} className="mr-1" />
                                  Call
                                </button>
                                <button 
                                  onClick={() => scheduleInterview(candidate.id)}
                                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                                >
                                  <Calendar size={14} className="mr-1" />
                                  Schedule
                                </button>
                              </div>
                              
                              <div className="mt-2 flex items-center space-x-2">
                                <button 
                                  onClick={() => rejectCandidate(candidate.id)}
                                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700"
                                >
                                  <X size={14} className="mr-1" />
                                  Reject
                                </button>
                                <button 
                                  onClick={() => approveCandidate(candidate.id)}
                                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700"
                                >
                                  <Check size={14} className="mr-1" />
                                  Approve
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-8 text-center">
                <p className="text-gray-500">No candidates match your filters. Try adjusting your search criteria.</p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShortlistedCandidate;