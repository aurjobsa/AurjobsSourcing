


import React, { useState, useEffect } from 'react';
// import { Briefcase, MapPin, Mail, Phone, Calendar, Award, Clock, CheckCircle, Star, StarHalf, IndianRupee } from 'lucide-react';
import { Briefcase, MapPin, Mail, Phone, Calendar, Award, Clock, IndianRupee, CheckCircle, Star, Heart, Share2, MessageCircle, StarHalf } from 'lucide-react';
import { Link } from 'react-router-dom';
import RatingModal from './RatingModal';
import { useSelector } from 'react-redux';

const CandidateCard = ({ candidate: initialCandidate, onRatingUpdate }) => {
  // Use local state to track the candidate data so we can update it locally
  const [candidate, setCandidate] = useState(initialCandidate);
  const [shortlistedCandidates, setShortlistedCandidates] = useState([]);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const employer = useSelector((state) => state.employer.employerProfile);
  
  // Update local candidate when props change
  useEffect(() => {
    setCandidate(initialCandidate);
  }, [initialCandidate]);
  
  const shortlistCandidate = (candidate) => {
    // Prevent duplicates
    if (!shortlistedCandidates.find(c => c.id === candidate.id)) {
      setShortlistedCandidates([...shortlistedCandidates, candidate]);
    }
  };

  // Remove from shortlist
  const removeFromShortlist = (candidateId) => {
    setShortlistedCandidates(
      shortlistedCandidates.filter(candidate => candidate.id !== candidateId)
    );
  };

  // Calculate average rating from all employer ratings
  const calculateAverageRating = (ratings) => {
    if (!ratings || !Array.isArray(ratings) || ratings.length === 0) {
      return 0;
    }
    
    // Sum all ratings and divide by the number of ratings
    const totalRating = ratings.reduce((sum, rating) => sum + rating.rating_value, 0);
    return totalRating / ratings.length;
  };

  const renderStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    // Fill remaining stars as empty
    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return (
      <div className="flex items-center">
        <div className="flex">{stars}</div>
        {rating > 0 && (
          <span className="ml-1 text-xs text-gray-600">
            ({rating.toFixed(1)}) • {candidate?.candidate_preference[0]?.star_ratingg?.length || 0} {candidate?.candidate_preference[0]?.star_ratingg?.length === 1 ? 'rating' : 'ratings'}
          </span>
        )}
      </div>
    );
  };

  const handleRatingSubmit = async (candidateId, ratingData, previousRating) => {
    try {
      // First, update the UI immediately with the new rating
      updateRatingLocally(ratingData);
      
      // Then send the rating to the server in the background
      // This is where you would make your API call to update the rating in the database
      // const response = await apiCallToUpdateRating(candidateId, ratingData);
      
      // If the server update fails, you might want to revert the UI changes
      // or show an error message
      
      // Notify parent component if needed
      if (onRatingUpdate) {
        onRatingUpdate(candidateId, ratingData);
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("Failed to submit rating. Please try again.");
      
      // Revert the local UI changes if the server update failed
      // This would require keeping a backup of the original state
    }
  };
  
  // Function to update the rating locally in the component state
  const updateRatingLocally = (ratingData) => {
    // Clone the candidate object
    const updatedCandidate = {...candidate};
    
    // Make sure candidate_preference and star_ratingg arrays exist
    if (!updatedCandidate.candidate_preference) {
      updatedCandidate.candidate_preference = [{ star_ratingg: [] }];
    } else if (!updatedCandidate.candidate_preference[0]) {
      updatedCandidate.candidate_preference[0] = { star_ratingg: [] };
    } else if (!updatedCandidate.candidate_preference[0].star_ratingg) {
      updatedCandidate.candidate_preference[0].star_ratingg = [];
    }
    
    // Check if this employer has already rated this candidate
    const existingRatingIndex = updatedCandidate.candidate_preference[0].star_ratingg.findIndex(
      rating => rating.employer_id === employer?.employer_id
    );
    
    if (existingRatingIndex !== -1) {
      // Update existing rating
      updatedCandidate.candidate_preference[0].star_ratingg[existingRatingIndex] = {
        ...updatedCandidate.candidate_preference[0].star_ratingg[existingRatingIndex],
        ...ratingData,
        employer_id: employer?.employer_id
      };
    } else {
      // Add new rating
      updatedCandidate.candidate_preference[0].star_ratingg.push({
        ...ratingData,
        employer_id: employer?.employer_id
      });
    }
    
    // Update the component state with the modified candidate
    setCandidate(updatedCandidate);
  };

  function calculateTotalExperience(experiences) {
    let totalDays = 0;

    if (!experiences || experiences.length === 0) {
      return "Freshers";
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

  function extractEducation(educationData) {
    if (!educationData || !Array.isArray(educationData) || educationData.length === 0) {
      return "No education data available";
    }

    // Sort education by end year (most recent first)
    const sortedEducation = [...educationData].sort((a, b) =>
      (b.candidate_end_year || 0) - (a.candidate_end_year || 0)
    );

    // Get just the most recent education
    const mostRecentEdu = sortedEducation[0];
    const degree = mostRecentEdu.candidate_degree || "Degree not specified";
    const institute = mostRecentEdu.candidate_institute || "Institute not specified";
    
    return `${degree}, ${institute}`;
  }

  // Get current employer's rating of this candidate (if any)
  const getCurrentEmployerRating = () => {
    if (!candidate?.candidate_preference[0]?.star_ratingg) return null;
    
    return candidate?.candidate_preference[0]?.star_ratingg.find(
      rating => rating.employer_id === employer?.employer_id
    );
  };

  const employerRating = getCurrentEmployerRating();
  
  // Calculate the average rating for this candidate
  const avgRating = calculateAverageRating(candidate?.candidate_preference[0]?.star_ratingg);

  return (
    <div className="bg-white flex-1 rounded-lg shadow-sm mb-4 p-4 hover:shadow-md transition-shadow border border-gray-100">
      <div className="flex">
        {/* Candidate Image */}
        <div className="mr-4">
          <img
            src={candidate?.candidate_image_link}
            alt={candidate?.candidate_first_name}
            className="w-20 h-20 rounded-full object-cover border border-gray-200"
          />
          <div className="mt-2">
            {renderStarRating(avgRating)}
          </div>
        </div>

        {/* Candidate Details */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{candidate?.candidate_first_name}</h2>
              <p className="text-gray-600 flex items-center">
                <Briefcase className="w-4 h-4 mr-1" />
                {candidate?.candidate_current_role} at Aurjobs
              </p>
              <div className="flex items-center mt-1">
                <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                <span className="text-gray-600">{candidate?.candidate_location}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                <Mail className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                <Phone className="w-4 h-4 text-gray-600" />
              </button>
              <Link to={`/candidate_profile/${candidate.candidate_id}`}>
                <button className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm">
                  View Profile
                </button>
              </Link>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-gray-500" />
              <span className="text-gray-600">Experience: </span>
              <span className="ml-1 font-medium">
                {calculateTotalExperience(candidate?.candidate_experience)}
              </span>
            </div>
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-2 text-gray-500" />
              <span className="text-gray-600">Education: </span>
              <span className="ml-1 font-medium">{extractEducation(candidate?.candidate_education)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-gray-500" />
              <span className="text-gray-600">Available: </span>
              <span className="ml-1 font-medium">{candidate?.candidate_availability}</span>
            </div>
            <div className="flex items-center">
              <IndianRupee className="w-4 h-4 mr-2 text-gray-500" />
              <span className="text-gray-600">Expected Salary: </span>
              <span className="ml-1 font-medium">{candidate?.candidate_preference[0]?.expected_salary || "Not Available"} </span>
            </div>
            <div className="flex items-center">
              <IndianRupee className="w-4 h-4 mr-2 text-gray-500" />
              <span className="text-gray-600">Current Salary: </span>
              <span className="ml-1 font-medium">{candidate?.candidate_current_salary || "Not Available"}</span>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex flex-wrap gap-1">
              {candidate?.candidate_skills?.map((skill, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                  {skill?.candidate_skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-3 pt-3 border-t border-gray-100 text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                <span className="text-gray-600">Last active: 2 days ago</span>
              </div>
              
              {/* Rating Button */}
              <button 
                onClick={() => setIsRatingModalOpen(true)}
                className="flex items-center text-indigo-600 hover:text-indigo-800"
              >
                <Star className={`w-4 h-4 mr-1 ${employerRating ? "fill-yellow-400" : ""}`} />
                {employerRating ? "Edit Your Rating" : "Rate Candidate"}
              </button>
            </div>
            
            <div>
              {shortlistedCandidates.find(c => c.id === candidate.id) ? (
                <span className="ml-2 text-green-600 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-1" /> Shortlisted
                </span>
              ) : (
                <button
                  onClick={() => shortlistCandidate(candidate)}
                  className="ml-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                >
                  Shortlist
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Rating Modal */}
      <RatingModal 
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
        candidate={candidate}
        onRatingSubmit={handleRatingSubmit}
        currentRating={employerRating}
      />
    </div>

    // <div 
    //   className={`bg-white rounded-lg shadow-sm mb-4 p-5 border border-gray-100 transition-all duration-300 ${
    //     isHovered ? 'shadow-md transform translate-y-[-2px]' : ''
    //   }`}
    //   onMouseEnter={() => setIsHovered(true)}
    //   onMouseLeave={() => setIsHovered(false)}
    // >
    //   <div className="flex">
    //     {/* Candidate Image with Badge */}
    //     <div className="mr-5 flex flex-col items-center">
    //       <div className="relative">
    //         <img
    //           src={candidate?.candidate_image_link || '/placeholder-avatar.jpg'}
    //           alt={candidate?.candidate_first_name}
    //           className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 shadow-sm"
    //           onError={(e) => { e.target.src = '/placeholder-avatar.jpg' }}
    //         />
    //         {candidate?.premium_badge && (
    //           <div className="absolute -top-1 -right-1 bg-yellow-400 text-xs font-bold text-white rounded-full w-6 h-6 flex items-center justify-center shadow-sm">
    //             <Star className="w-4 h-4 fill-white" />
    //           </div>
    //         )}
    //       </div>
          
    //       {/* Rating Stars */}
    //       <div className="mt-3 bg-gray-50 px-2 py-1 rounded-full">
    //         {renderStarRating(avgRating)}
    //       </div>
          
    //       {/* Last Active Status */}
    //       <div className="mt-2 text-xs text-gray-500 flex items-center">
    //         <div className={`w-2 h-2 rounded-full mr-1 ${
    //           candidate?.last_active_days <= 1 ? 'bg-green-500' : 'bg-gray-400'
    //         }`}></div>
    //         {candidate?.last_active_days <= 1 ? 'Active now' : `${candidate?.last_active_days || 2} days ago`}
    //       </div>
    //     </div>

    //     {/* Candidate Details */}
    //     <div className="flex-1">
    //       <div className="flex justify-between items-start">
    //         <div>
    //           <div className="flex items-center">
    //             <h2 className="text-xl font-semibold text-gray-800">
    //               {candidate?.candidate_first_name} {candidate?.candidate_last_name}
    //             </h2>
    //             {candidate?.is_verified && (
    //               <div className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">Verified</div>
    //             )}
    //           </div>
    //           <p className="text-gray-600 flex items-center mt-1">
    //             <Briefcase className="w-4 h-4 mr-1" />
    //             {candidate?.candidate_current_role} at {candidate?.candidate_current_company || 'Aurjobs'}
    //           </p>
    //           <div className="flex items-center mt-1">
    //             <MapPin className="w-4 h-4 mr-1 text-gray-500" />
    //             <span className="text-gray-600">{candidate?.candidate_location}</span>
    //             {candidate?.open_to_relocate && (
    //               <span className="ml-2 text-xs text-green-600">Open to relocate</span>
    //             )}
    //           </div>
    //         </div>
            
    //         {/* Action Buttons */}
    //         <div className="flex space-x-2">
    //           {/* Contact Buttons with Tooltips */}
    //           <div className="relative group">
    //             <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
    //               <Mail className="w-4 h-4 text-gray-600" />
    //             </button>
    //             <div className="absolute right-0 top-full mt-1 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
    //               Email
    //             </div>
    //           </div>
              
    //           <div className="relative group">
    //             <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
    //               <Phone className="w-4 h-4 text-gray-600" />
    //             </button>
    //             <div className="absolute right-0 top-full mt-1 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
    //               Call
    //             </div>
    //           </div>
              
    //           <div className="relative group">
    //             <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
    //               <MessageCircle className="w-4 h-4 text-gray-600" />
    //             </button>
    //             <div className="absolute right-0 top-full mt-1 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
    //               Message
    //             </div>
    //           </div>
              
    //           <Link to={`/candidate_profile/${candidate.candidate_id}`}>
    //             <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm">
    //               View Profile
    //             </button>
    //           </Link>
    //         </div>
    //       </div>

    //       {/* Candidate Details Grid */}
    //       <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 text-sm bg-gray-50 p-3 rounded-lg">
    //         <div className="flex items-center">
    //           <Calendar className="w-4 h-4 mr-2 text-gray-500" />
    //           <span className="text-gray-600">Experience: </span>
    //           <span className="ml-1 font-medium">
    //             {calculateTotalExperience(candidate?.candidate_experience)}
    //           </span>
    //         </div>
    //         <div className="flex items-center">
    //           <Award className="w-4 h-4 mr-2 text-gray-500" />
    //           <span className="text-gray-600">Education: </span>
    //           <span className="ml-1 font-medium">{extractEducation(candidate?.candidate_education)}</span>
    //         </div>
    //         <div className="flex items-center">
    //           <Clock className="w-4 h-4 mr-2 text-gray-500" />
    //           <span className="text-gray-600">Available: </span>
    //           <span className="ml-1 font-medium">{candidate?.candidate_availability || "Not specified"}</span>
    //         </div>
    //         <div className="flex items-center">
    //           <IndianRupee className="w-4 h-4 mr-2 text-gray-500" />
    //           <span className="text-gray-600">Expected: </span>
    //           <span className="ml-1 font-medium">{candidate?.candidate_preference?.[0]?.expected_salary || "Not Available"}</span>
    //         </div>
    //         <div className="flex items-center">
    //           <IndianRupee className="w-4 h-4 mr-2 text-gray-500" />
    //           <span className="text-gray-600">Current: </span>
    //           <span className="ml-1 font-medium">{candidate?.candidate_current_salary || "Not Available"}</span>
    //         </div>
    //         <div className="flex items-center">
    //           <CheckCircle className="w-4 h-4 mr-2 text-gray-500" />
    //           <span className="text-gray-600">Notice Period: </span>
    //           <span className="ml-1 font-medium">{candidate?.notice_period || "Not specified"}</span>
    //         </div>
    //       </div>

    //       {/* Skills Section */}
    //       <div className="mt-4">
    //         <div className="flex flex-wrap gap-1.5">
    //           {candidate?.candidate_skills?.slice(0, 6).map((skill, index) => (
    //             <span key={index} className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full">
    //               {skill?.candidate_skill}
    //             </span>
    //           ))}
    //           {candidate?.candidate_skills?.length > 6 && (
    //             <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
    //               +{candidate?.candidate_skills.length - 6} more
    //             </span>
    //           )}
    //         </div>
    //       </div>

    //       {/* Bottom Actions */}
    //       <div className="flex justify-between mt-4 pt-3 border-t border-gray-100 text-sm">
    //         <div className="flex items-center space-x-4">
    //           {/* Rating Button with Animation */}
    //           <button 
    //             onClick={() => setIsRatingModalOpen(true)}
    //             className={`flex items-center px-2 py-1 rounded-md transition-all ${
    //               employerRating 
    //                 ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200" 
    //                 : "text-gray-600 hover:bg-gray-100"
    //             }`}
    //           >
    //             <Star className={`w-4 h-4 mr-1 transition-colors ${
    //               employerRating ? "fill-yellow-500 text-yellow-500" : ""
    //             }`} />
    //             {employerRating ? "Your Rating: " + employerRating.rating_value : "Rate Candidate"}
    //             {employerRating && (
    //               <span className="ml-1 text-xs underline">Edit</span>
    //             )}
    //           </button>
              
    //           {/* Share Button */}
    //           <button className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
    //             <Share2 className="w-4 h-4 mr-1" />
    //             Share
    //           </button>
    //         </div>
            
    //         {/* Shortlist Button with Animation */}
    //         <div>
    //           {shortlistedCandidates.find(c => c.id === candidate.id) ? (
    //             <button className="flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-md hover:bg-green-200 transition-colors">
    //               <CheckCircle className="h-4 w-4 mr-1.5" /> 
    //               Shortlisted
    //             </button>
    //           ) : (
    //             <button
    //               onClick={() => shortlistCandidate(candidate)}
    //               className="flex items-center bg-white border border-green-500 text-green-600 px-3 py-1 rounded-md hover:bg-green-500 hover:text-white transition-all"
    //             >
    //               <Heart className={`h-4 w-4 mr-1.5 ${isHovered ? 'animate-pulse' : ''}`} />
    //               Shortlist
    //             </button>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
      
    //   {/* Rating Modal */}
    //   <RatingModal 
    //     isOpen={isRatingModalOpen}
    //     onClose={() => setIsRatingModalOpen(false)}
    //     candidate={candidate}
    //     onRatingSubmit={handleRatingSubmit}
    //     currentRating={employerRating}
    //   />
    // </div>
  );
};

export default CandidateCard;



