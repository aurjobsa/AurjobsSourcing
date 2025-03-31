
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp, ChevronDown, Star, StarHalf } from 'lucide-react';

const JobApplicantsTable = ({ applicants }) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });

  console.log(applicants)

  function calculateTotalExperience(experiences) {
    let totalDays = 0;
    
    if (!experiences || experiences.length === 0) {
      return "No experience";
    }
    
    experiences.forEach(exp => {
      // Make sure dates are properly parsed
      const startDate = new Date(exp.candidate_start_date);
      const endDate = new Date(exp.candidate_end_date);
      
      // Check if dates are valid
      if (isNaN(startDate) || isNaN(endDate)) {
        console.error("Invalid date format:", exp.candidate_start_date, exp.candidate_end_date);
        return;
      }
      
      // Calculate difference in milliseconds (endDate - startDate)
      const diffTime = endDate - startDate;
      
      // Convert to days (adding 1 to include both the start and end dates)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      
      totalDays += diffDays;
    });
    
    // Convert days to years and months
    const years = Math.floor(totalDays / 365);
    const months = Math.floor((totalDays % 365) / 30);
    
    // Return a formatted string with years and months
    if (years >= 1 && months > 0) {
      return `${years}y ${months}m`;
    } else if (years >= 1) {
      return `${years}y`;
    } else {
      return `${months}m`;
    }
  }

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortedApplicants = () => {
    if (!sortConfig.key) return applicants;

    return [...applicants].sort((a, b) => {
      // Handle special case for experience
      if (sortConfig.key === 'experience') {
        const expA = calculateTotalExperience(a.experiences);
        const expB = calculateTotalExperience(b.experiences);
        return sortConfig.direction === 'ascending'
          ? expA.localeCompare(expB)
          : expB.localeCompare(expA);
      }

      // Special case for education (college name)
      if (sortConfig.key === 'education') {
        const collegeA = a.education && a.education.length > 0 
          ? a.education[0].candidate_institute : '';
        const collegeB = b.education && b.education.length > 0 
          ? b.education[0].candidate_institute : '';
        return sortConfig.direction === 'ascending'
          ? collegeA.localeCompare(collegeB)
          : collegeB.localeCompare(collegeA);
      }

      // Handle sorting for name
      if (sortConfig.key === 'name') {
        const nameA = `${a.candidate_first_name} ${a.candidate_last_name}`;
        const nameB = `${b.candidate_first_name} ${b.candidate_last_name}`;
        return sortConfig.direction === 'ascending'
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      }

      // Default sorting for other fields
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  // Display rating stars based on screening score
  const renderScore = (score) => {
    const scoreValue = parseInt(score, 10);
    const maxStars = 5;
    const scoreOutOfFive = Math.round(scoreValue / 20 * 2) / 2; // Convert to 0-5 scale with 0.5 increments
    
    return (
      <div className="flex items-center">
        <div className="flex mr-2">
          {[...Array(maxStars)].map((_, i) => {
            const starValue = i + 1;
            return starValue <= scoreOutOfFive ? (
              <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            ) : starValue - 0.5 === scoreOutOfFive ? (
              <StarHalf key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            ) : (
              <Star key={i} className="h-4 w-4 text-gray-300" />
            );
          })}
        </div>
        <span className="text-sm text-gray-700">{score}%</span>
      </div>
    );
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <span className="text-gray-300 inline-block ml-1">↕</span>;
    }
    return sortConfig.direction === 'ascending' ? 
      <ChevronUp className="inline h-4 w-4 text-blue-600" /> : 
      <ChevronDown className="inline h-4 w-4 text-blue-600" />;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th 
              className="px-4 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-200"
              onClick={() => requestSort('name')}
            >
              Full Name {getSortIcon('name')}
            </th>
            <th 
              className="px-4 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-200"
              onClick={() => requestSort('education')}
            >
              College Name {getSortIcon('education')}
            </th>
            <th 
              className="px-4 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-200"
              onClick={() => requestSort('experience')}
            >
              Experience {getSortIcon('experience')}
            </th> 
            <th 
              className="px-4 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-200"
              onClick={() => requestSort('candidate_current_role')}
            >
              Current Role {getSortIcon('candidate_current_role')}
            </th>
            <th 
              className="px-4 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-200"
              onClick={() => requestSort('candidate_location')}
            >
              Location {getSortIcon('candidate_location')}
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
              Profile
            </th>
            <th 
              className="px-4 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-200"
              onClick={() => requestSort('candidate_gender')}
            >
              Gender {getSortIcon('candidate_gender')}
            </th>
            <th 
              className="px-4 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-200"
              onClick={() => requestSort('screening_score')}
            >
              Profile Score {getSortIcon('screening_score')}
            </th>
          </tr>
        </thead>
        <tbody>
          {applicants.length > 0 ? (
            getSortedApplicants().map((applicant) => {
              // Calculate experience for each individual applicant
              const totalExp = calculateTotalExperience(applicant.experiences);
              
              return (
                <tr key={applicant.candidate_id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm">
                    <div className="font-medium text-gray-800">
                      {applicant.candidate_first_name} {applicant.candidate_last_name}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {applicant?.education && applicant.education.length > 0 
                      ? applicant.education[0].candidate_institute 
                      : "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      totalExp.includes('y') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {totalExp}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{applicant.candidate_current_role || "N/A"}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{applicant.candidate_location || "N/A"}</td>
                  <td className="px-4 py-3 text-sm">
                    <Link 
                      to={`/applicant_profile/${applicant.candidate_id}`}
                      // to={`/applicant_profile`}

                      className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs font-medium transition-colors inline-block"
                    >
                      View Profile
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{applicant.candidate_gender || "N/A"}</td>
                  <td className="px-4 py-3 text-sm">
                    {renderScore(applicant.screening_score)}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="8" className="px-4 py-6 text-gray-700 text-center">
                <div className="flex flex-col items-center">
                  <svg className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-base font-medium">No applicants available</p>
                  <p className="text-sm text-gray-500 mt-1">There are no applicants for this position yet.</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JobApplicantsTable;

