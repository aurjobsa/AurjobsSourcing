import { useState } from "react";
import { Download, Search, ChevronUp, ChevronDown, User, Award, Zap, TrendingUp, MapPin, Star, Bookmark, Code, Github, Trophy } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function AIScreeningResult() {
  const [sortConfig, setSortConfig] = useState({
    key: "match_score",
    direction: "desc"
  });
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const candidates = location.state?.screeningData;

  console.log(candidates)



const sortedByScore = [...candidates].sort((a, b) => {
  // First sort by match_score (higher score first)
  if (b.match_score !== a.match_score) {
    return b.match_score - a.match_score;
  }
  // If match_scores are equal, use experience as tiebreaker (more experience first)
  return b.years_of_job_experience_after_graduation_in_months - a.years_of_job_experience_after_graduation_in_months;
});

// Keep track of how many candidates we've seen
let uniqueRank = 0;
let previousScore = null;
let previousExperience = null;

// Map through and assign ranks with sequential numbering
const rankedCandidates = sortedByScore.map((candidate, index) => {
  // If this is a new score or same score but different experience, increment the unique rank
  // if (candidate.match_score !== previousScore || 
  //     (candidate.match_score === previousScore && candidate.years_of_job_experience_after_graduation_in_months !== previousExperience)) {
  //   uniqueRank++;
  // }
  
  // // Store current values for next comparison
  // previousScore = candidate.match_score;
  // previousExperience = candidate.years_of_job_experience_after_graduation_in_months;

  uniqueRank = index + 1;
  
  return {
    ...candidate,
    rank: uniqueRank,
    tech_level: determineTechLevel(candidate),
    badges: determineBadges(candidate)
  };
});
  

  // Function to determine tech level based on experience and match_score
  function determineTechLevel(candidate) {
    const experienceMonths = candidate.years_of_job_experience_after_graduation_in_months || 0;
    const matchScore = candidate.match_score || 0;
    
    if (experienceMonths >= 36 || matchScore >= 85) {
      return { level: "Expert", color: "bg-purple-100 text-purple-800" };
    } else if (experienceMonths >= 12 || matchScore >= 70) {
      return { level: "Intermediate", color: "bg-blue-100 text-blue-800" };
    } else if (experienceMonths >= 6 || matchScore >= 60) {
      return { level: "Junior", color: "bg-green-100 text-green-800" };
    } else {
      return { level: "Beginner", color: "bg-yellow-100 text-yellow-800" };
    }
  }

  // Function to determine badges based on candidate attributes
  function determineBadges(candidate) {
    const badges = [];
    
    if (candidate.match_score >= 80) {
      badges.push({ name: "Top Talent", icon: <Star size={14} className="text-yellow-500" /> });
    }
    
    if ((candidate.years_of_job_experience_after_graduation_in_months || 0) >= 24) {
      badges.push({ name: "Experienced", icon: <Zap size={14} className="text-purple-500" /> });
    }
    
    if (candidate.education?.university?.toLowerCase().includes("institute of technology") || 
        candidate.education?.university?.toLowerCase().includes("iit")) {
      badges.push({ name: "Top University", icon: <Award size={14} className="text-blue-500" /> });
    }
    
    // You can add more badges based on other criteria
    if (candidate.current_role?.toLowerCase().includes("developer") || 
        candidate.current_role?.toLowerCase().includes("engineer")) {
      badges.push({ name: "Tech Pro", icon: <Code size={14} className="text-green-500" /> });
    }
    
    return badges;
  }

  // Function to truncate university names
  const truncateUniversity = (education) => {
    if (!education || !education.university) return "";
    return education.university.length > 20 ? education.university.substring(0, 20) + "..." : education.university;
  };

  // Calculate experience in years and months
  const formatExperience = (months) => {
    if (months === 0) return "Freshers";
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    if (remainingMonths === 0) return `${years} year${years !== 1 ? 's' : ''}`;
    return `${years} year${years !== 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  };

  // Sort function
  const sortedCandidates = [...rankedCandidates].sort((a, b) => {
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];
    
    // Handle nested objects like education
    if (sortConfig.key === "education") {
      aValue = a.education?.university || "";
      bValue = b.education?.university || "";
    } else if (sortConfig.key === "experience") {
      aValue = a.years_of_job_experience_after_graduation_in_months || 0;
      bValue = b.years_of_job_experience_after_graduation_in_months || 0;
    } else if (sortConfig.key === "rank") {
      aValue = a.rank || Infinity;
      bValue = b.rank || Infinity;
    }
    
    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Filtered candidates based on search
  const filteredCandidates = sortedCandidates.filter(candidate => 
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (candidate.education?.university && candidate.education.university.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (candidate.education?.degree && candidate.education.degree.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (candidate.current_role && candidate.current_role.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (candidate.last_company_worked_in && candidate.last_company_worked_in.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (candidate.tech_level && candidate.tech_level.level.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Request sort
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };



  const downloadExcel = () => {
    
    const escapeCsvValue = (value) => {
      if (value === null || value === undefined) {
        return '';
      }
      
      // Convert value to string
      const stringValue = String(value);
      
      // If the value contains commas, quotes, or newlines, wrap it in quotes and escape any quotes
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    };
    
    const csvContent = [
      ["Rank", "Name", "Match Score", "Tech Level", "Location", "Gender", "Education", "Degree", "Year", "Current Role", "Experience (Months)", "Last Company", "Mobile", "Email"],
      ...rankedCandidates.map(c => [
        c.rank,
        c.name,
        c.match_score, 
        c.tech_level.level,
        c.location,
        c.gender,
        c.education?.university || "",
        c.education?.degree || "",
        c.education?.year || "",
        c.current_role || "",
        c.years_of_job_experience_after_graduation_in_months || 0,
        c.last_company_worked_in || "",
        c.mobile,
        c.email,
        // c.badges.map(b => b.name).join("; ") // Use semicolons instead of commas for badge separation
      ].map(escapeCsvValue)) // Apply CSV escaping to each cell value
    ].map(row => row.join(",")).join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "hr_candidate_screening_data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to get sort icon
  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
    }
    return null;
  };

  // Function to get rating color class
  const getMatchScoreColorClass = (score) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 70) return 'bg-blue-100 text-blue-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  // Function to get rank color class
  const getRankColorClass = (rank) => {
    if (rank === 1) return 'bg-amber-100 text-amber-800 border border-amber-300';
    if (rank === 2) return 'bg-slate-100 text-slate-800 border border-slate-300';
    if (rank === 3) return 'bg-orange-100 text-orange-800 border border-orange-300';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen">
      <div className="w-full mx-auto h-full">
        <div className="bg-white  p-6">
          
          {/* Search and Download Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={downloadExcel}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md flex items-center gap-2 transition-colors w-full md:w-auto justify-center"
            >
              <Download size={18} />
              Download CSV
            </button>
          </div>
          
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-center gap-2">
                <User className="text-blue-600" size={20} />
                <h3 className="font-medium text-blue-800">Total Candidates</h3>
              </div>
              <p className="text-2xl font-bold mt-2">{candidates.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="flex items-center gap-2">
                <Award className="text-green-600" size={20} />
                <h3 className="font-medium text-green-800">Top Match</h3>
              </div>
              <p className="text-2xl font-bold mt-2">{Math.max(...candidates.map(c => c.match_score))}%</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <div className="flex items-center gap-2">
                <Zap className="text-purple-600" size={20} />
                <h3 className="font-medium text-purple-800">Experienced</h3>
              </div>
              <p className="text-2xl font-bold mt-2">{candidates.filter(c => (c.years_of_job_experience_after_graduation_in_months || 0) > 12).length}</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <div className="flex items-center gap-2">
                <TrendingUp className="text-indigo-600" size={20} />
                <h3 className="font-medium text-indigo-800">Expert Level</h3>
              </div>
              <p className="text-2xl font-bold mt-2">{rankedCandidates.filter(c => c.tech_level.level === "Expert").length}</p>
            </div>
          </div>
          
          {/* Candidates Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th onClick={() => requestSort("rank")} className="px-4 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer">
                    <div className="flex items-center gap-1">
                    <Trophy />
                      Rank
                      {getSortIcon("rank")}
                    </div>
                  </th>
                  <th onClick={() => requestSort("name")} className="px-4 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer">
                    <div className="flex items-center gap-1">
                      Name
                      {getSortIcon("name")}
                    </div>
                  </th>
                  {/* <th className="px-4 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      Badges
                    </div>
                  </th> */}
                  <th onClick={() => requestSort("location")} className="px-4 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer">
                    <div className="flex items-center gap-1">
                      Location
                      {getSortIcon("location")}
                    </div>
                  </th>
                  <th onClick={() => requestSort("education")} className="px-4 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer">
                    <div className="flex items-center gap-1">
                      Education
                      {getSortIcon("education")}
                    </div>
                  </th>
                  <th onClick={() => requestSort("current_role")} className="px-4 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer">
                    <div className="flex items-center gap-1">
                      Current Role
                      {getSortIcon("current_role")}
                    </div>
                  </th>
                  <th onClick={() => requestSort("experience")} className="px-4 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer">
                    <div className="flex items-center gap-1">
                      Experience
                      {getSortIcon("experience")}
                    </div>
                  </th>
                  <th onClick={() => requestSort("match_score")} className="px-4 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer">
                    <div className="flex items-center gap-1">
                      Match Score
                      {getSortIcon("match_score")}
                    </div>
                  </th>
                  <th className="px-4 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      Tech Level
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCandidates.map((candidate, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getRankColorClass(candidate.rank)}`}>
                        #{candidate.rank}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-start">
                        {/* <div className="h-8 w-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mr-3">
                          {candidate.name.charAt(0)}
                        </div> */}
                        <div>
                          <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                          {/* <div className="text-xs text-gray-500">
                            {candidate.last_company_worked_in || "N/A"}
                          </div> */}
                        </div>
                      </div>
                    </td>
                    {/* <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {candidate.badges.map((badge, bidx) => (
                          <div key={bidx} className="flex items-center bg-gray-100 rounded-full px-2 py-1 text-xs">
                            {badge.icon}
                            <span className="ml-1">{badge.name}</span>
                          </div>
                        ))}
                        {candidate.badges.length === 0 && <span className="text-gray-400 text-xs">No badges</span>}
                      </div>
                    </td> */}
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin size={14} className="text-gray-400 mr-1" />
                        {candidate.location}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>
                        <div>{truncateUniversity(candidate.education)}</div>
                        <div className="text-xs text-gray-400">{candidate.education?.degree || "N/A"}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.current_role || "N/A"}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatExperience(candidate.years_of_job_experience_after_graduation_in_months || 0)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchScoreColorClass(candidate.match_score)}`}>
                          {candidate.match_score}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${candidate.tech_level.color}`}>
                        {candidate.tech_level.level}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredCandidates.length === 0 && (
                  <tr>
                    <td colSpan="9" className="px-6 py-4 text-center text-sm text-gray-500">
                      No candidates found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          
        </div>
      </div>
    </div>
  );
}