// import React, { useState, useEffect } from 'react';
// import { Briefcase, MapPin, Mail, Phone, Calendar, Award, Clock, IndianRupee, CheckCircle, Star, Heart, Share2, MessageCircle, StarHalf } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import RatingModal from './RatingModal';
// import { useSelector } from 'react-redux';

// const CandidateCard = ({ candidate: initialCandidate, onRatingUpdate }) => {
//   // Use local state to track the candidate data so we can update it locally
//   const [candidate, setCandidate] = useState(initialCandidate);
//   const [shortlistedCandidates, setShortlistedCandidates] = useState([]);
//   const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const employer = useSelector((state) => state.employer.employerProfile);
  
//   // Update local candidate when props change
//   useEffect(() => {
//     setCandidate(initialCandidate);
//   }, [initialCandidate]);
  
//   const shortlistCandidate = (candidate) => {
//     // Prevent duplicates
//     if (!shortlistedCandidates.find(c => c.id === candidate.id)) {
//       setShortlistedCandidates([...shortlistedCandidates, candidate]);
//     }
//   };

//   // Remove from shortlist
//   const removeFromShortlist = (candidateId) => {
//     setShortlistedCandidates(
//       shortlistedCandidates.filter(candidate => candidate.id !== candidateId)
//     );
//   };

//   // Calculate average rating from all employer ratings
//   const calculateAverageRating = (ratings) => {
//     if (!ratings || !Array.isArray(ratings) || ratings.length === 0) {
//       return 0;
//     }
    
//     // Sum all ratings and divide by the number of ratings
//     const totalRating = ratings.reduce((sum, rating) => sum + rating.rating_value, 0);
//     return totalRating / ratings.length;
//   };

//   const renderStarRating = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 >= 0.5;

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<Star key={`star-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
//     }

//     if (hasHalfStar) {
//       stars.push(<StarHalf key="half-star" className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
//     }

//     // Fill remaining stars as empty
//     const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
//     for (let i = 0; i < remainingStars; i++) {
//       stars.push(<Star key={`empty-star-${i}`} className="w-4 h-4 text-gray-300" />);
//     }

//     return (
//       <div className="flex items-center">
//         <div className="flex">{stars}</div>
//         {rating > 0 && (
//           <span className="ml-1 text-xs text-gray-600">
//             ({rating.toFixed(1)}) • {candidate?.candidate_preference[0]?.star_ratingg?.length || 0} {candidate?.candidate_preference[0]?.star_ratingg?.length === 1 ? 'rating' : 'ratings'}
//           </span>
//         )}
//       </div>
//     );
//   };

//   const handleRatingSubmit = async (candidateId, ratingData, previousRating) => {
//     try {
//       // First, update the UI immediately with the new rating
//       updateRatingLocally(ratingData);
      
//       // Then send the rating to the server in the background
//       // This is where you would make your API call to update the rating in the database
//       // const response = await apiCallToUpdateRating(candidateId, ratingData);
      
//       // If the server update fails, you might want to revert the UI changes
//       // or show an error message
      
//       // Notify parent component if needed
//       if (onRatingUpdate) {
//         onRatingUpdate(candidateId, ratingData);
//       }
//     } catch (error) {
//       console.error("Error submitting rating:", error);
//       alert("Failed to submit rating. Please try again.");
      
      
//     }
//   };
  
//   // Function to update the rating locally in the component state
//   const updateRatingLocally = (ratingData) => {
//     // Clone the candidate object
//     const updatedCandidate = {...candidate};
    
//     // Make sure candidate_preference and star_ratingg arrays exist
//     if (!updatedCandidate.candidate_preference) {
//       updatedCandidate.candidate_preference = [{ star_ratingg: [] }];
//     } else if (!updatedCandidate.candidate_preference[0]) {
//       updatedCandidate.candidate_preference[0] = { star_ratingg: [] };
//     } else if (!updatedCandidate.candidate_preference[0].star_ratingg) {
//       updatedCandidate.candidate_preference[0].star_ratingg = [];
//     }
    
//     // Check if this employer has already rated this candidate
//     const existingRatingIndex = updatedCandidate.candidate_preference[0].star_ratingg.findIndex(
//       rating => rating.employer_id === employer?.employer_id
//     );
    
//     if (existingRatingIndex !== -1) {
//       // Update existing rating
//       updatedCandidate.candidate_preference[0].star_ratingg[existingRatingIndex] = {
//         ...updatedCandidate.candidate_preference[0].star_ratingg[existingRatingIndex],
//         ...ratingData,
//         employer_id: employer?.employer_id
//       };
//     } else {
//       // Add new rating
//       updatedCandidate.candidate_preference[0].star_ratingg.push({
//         ...ratingData,
//         employer_id: employer?.employer_id
//       });
//     }
    
//     // Update the component state with the modified candidate
//     setCandidate(updatedCandidate);
//   };

//   function calculateTotalExperience(experiences) {
//     let totalDays = 0;

//     if (!experiences || experiences.length === 0) {
//       return "Freshers";
//     }

//     experiences.forEach(exp => {
//       // Make sure dates are properly parsed
//       const startDate = new Date(exp.candidate_start_date);
//       const endDate = new Date(exp.candidate_end_date);

//       // Check if dates are valid
//       if (isNaN(startDate) || isNaN(endDate)) {
//         console.error("Invalid date format:", exp.candidate_start_date, exp.candidate_end_date);
//         return;
//       }

//       // Calculate difference in milliseconds (endDate - startDate)
//       const diffTime = endDate - startDate;

//       // Convert to days (adding 1 to include both the start and end dates)
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

//       totalDays += diffDays;
//     });

//     // Convert days to years and months
//     const years = Math.floor(totalDays / 365);
//     const months = Math.floor((totalDays % 365) / 30);

//     // Return a formatted string with years and months
//     if (years >= 1 && months > 0) {
//       return `${years}y ${months}m`;
//     } else if (years >= 1) {
//       return `${years}y`;
//     } else {
//       return `${months}m`;
//     }
//   }

//   function extractEducation(educationData) {
//     if (!educationData || !Array.isArray(educationData) || educationData.length === 0) {
//       return "No education data available";
//     }

//     // Sort education by end year (most recent first)
//     const sortedEducation = [...educationData].sort((a, b) =>
//       (b.candidate_end_year || 0) - (a.candidate_end_year || 0)
//     );

//     // Get just the most recent education
//     const mostRecentEdu = sortedEducation[0];
//     const degree = mostRecentEdu.candidate_degree || "Degree not specified";
//     const institute = mostRecentEdu.candidate_institute || "Institute not specified";
    
//     return `${degree}, ${institute}`;
//   }

//   // Get current employer's rating of this candidate (if any)
//   const getCurrentEmployerRating = () => {
//     if (!candidate?.candidate_preference[0]?.star_ratingg) return null;
    
//     return candidate?.candidate_preference[0]?.star_ratingg.find(
//       rating => rating.employer_id === employer?.employer_id
//     );
//   };

//   const employerRating = getCurrentEmployerRating();
  
//   // Calculate the average rating for this candidate
//   const avgRating = calculateAverageRating(candidate?.candidate_preference[0]?.star_ratingg);

//   return (
//     <div className="bg-white flex-1 rounded-lg shadow-sm mb-4 p-4 hover:shadow-md transition-shadow border border-gray-100">
//       <div className="flex">
//         {/* Candidate Image */}
//         <div className="mr-4">
//           <img
//             src={candidate?.candidate_image_link}
//             alt={candidate?.candidate_first_name}
//             className="w-20 h-20 rounded-full object-cover border border-gray-200"
//           />
//           <div className="mt-2">
//             {renderStarRating(avgRating)}
//           </div>
//         </div>

//         {/* Candidate Details */}
//         <div className="flex-1">
//           <div className="flex justify-between items-start">
//             <div>
//               <h2 className="text-lg font-semibold text-gray-800">{candidate?.candidate_first_name}</h2>
//               <p className="text-gray-600 flex items-center">
//                 <Briefcase className="w-4 h-4 mr-1" />
//                 {candidate?.candidate_current_role} at Aurjobs
//               </p>
//               <div className="flex items-center mt-1">
//                 <MapPin className="w-4 h-4 mr-1 text-gray-500" />
//                 <span className="text-gray-600">{candidate?.candidate_location}</span>
//               </div>
//             </div>
//             <div className="flex space-x-2">
//               <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
//                 <Mail className="w-4 h-4 text-gray-600" />
//               </button>
//               <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
//                 <Phone className="w-4 h-4 text-gray-600" />
//               </button>
//               <Link to={`/candidate_profile/${candidate.candidate_id}`}>
//                 <button className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm">
//                   View Profile
//                 </button>
//               </Link>
//             </div>
//           </div>

//           <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
//             <div className="flex items-center">
//               <Calendar className="w-4 h-4 mr-2 text-gray-500" />
//               <span className="text-gray-600">Experience: </span>
//               <span className="ml-1 font-medium">
//                 {calculateTotalExperience(candidate?.candidate_experience)}
//               </span>
//             </div>
//             <div className="flex items-center">
//               <Award className="w-4 h-4 mr-2 text-gray-500" />
//               <span className="text-gray-600">Education: </span>
//               <span className="ml-1 font-medium">{extractEducation(candidate?.candidate_education)}</span>
//             </div>
//             <div className="flex items-center">
//               <Clock className="w-4 h-4 mr-2 text-gray-500" />
//               <span className="text-gray-600">Available: </span>
//               <span className="ml-1 font-medium">{candidate?.candidate_availability}</span>
//             </div>
//             <div className="flex items-center">
//               <IndianRupee className="w-4 h-4 mr-2 text-gray-500" />
//               <span className="text-gray-600">Expected Salary: </span>
//               <span className="ml-1 font-medium">{candidate?.candidate_preference[0]?.expected_salary || "Not Available"} </span>
//             </div>
//             <div className="flex items-center">
//               <IndianRupee className="w-4 h-4 mr-2 text-gray-500" />
//               <span className="text-gray-600">Current Salary: </span>
//               <span className="ml-1 font-medium">{candidate?.candidate_current_salary || "Not Available"}</span>
//             </div>
//           </div>

//           <div className="mt-3">
//             <div className="flex flex-wrap gap-1">
//               {candidate?.candidate_skills?.map((skill, index) => (
//                 <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
//                   {skill?.candidate_skill}
//                 </span>
//               ))}
//             </div>
//           </div>

//           <div className="flex justify-between mt-3 pt-3 border-t border-gray-100 text-sm">
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center">
//                 <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
//                 <span className="text-gray-600">Last active: 2 days ago</span>
//               </div>
              
//               {/* Rating Button */}
//               <button 
//                 onClick={() => setIsRatingModalOpen(true)}
//                 className="flex items-center text-indigo-600 hover:text-indigo-800"
//               >
//                 <Star className={`w-4 h-4 mr-1 ${employerRating ? "fill-yellow-400" : ""}`} />
//                 {employerRating ? "Edit Your Rating" : "Rate Candidate"}
//               </button>
//             </div>
            
//             <div>
//               {shortlistedCandidates.find(c => c.id === candidate.id) ? (
//                 <span className="ml-2 text-green-600 flex items-center">
//                   <CheckCircle className="h-5 w-5 mr-1" /> Shortlisted
//                 </span>
//               ) : (
//                 <button
//                   onClick={() => shortlistCandidate(candidate)}
//                   className="ml-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
//                 >
//                   Shortlist
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Rating Modal */}
//       <RatingModal 
//         isOpen={isRatingModalOpen}
//         onClose={() => setIsRatingModalOpen(false)}
//         candidate={candidate}
//         onRatingSubmit={handleRatingSubmit}
//         currentRating={employerRating}
//       />
//     </div>

//   );
// };

// export default CandidateCard;



import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Mail, Phone, Calendar, Award, Clock, IndianRupee, CheckCircle, Star, Heart, Share2, MessageCircle, StarHalf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASEURL } from "../utility/config";

const CandidateCard = ({ candidate: initialCandidate, onRatingUpdate }) => {
  // Use local state to track the candidate data so we can update it locally
  const [candidate, setCandidate] = useState(initialCandidate);
  const [shortlistedCandidates, setShortlistedCandidates] = useState([]);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRatingSuccess, setShowRatingSuccess] = useState(false);
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

  const renderAverageRating = (rating) => {
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

  // Get current employer's rating of this candidate (if any)
  const getCurrentEmployerRating = () => {
    if (!candidate?.candidate_preference[0]?.star_ratingg) return null;
    
    return candidate?.candidate_preference[0]?.star_ratingg.find(
      rating => rating.employer_id === employer?.employer_id
    );
  };

  const employerRating = getCurrentEmployerRating();
  const currentRatingValue = employerRating?.rating_value || 0;
  
  // Calculate the average rating for this candidate
  const avgRating = calculateAverageRating(candidate?.candidate_preference[0]?.star_ratingg);

  // Handle star click for rating
  const handleRatingClick = async (rating) => {
    setIsSubmitting(true);
    
    const ratingData = {
      rating_value: rating,
      employer_id: employer?.employer_id
    };
    
    const ratingData1 = {
      ratingData,
      candidate_id: candidate?.candidate_id,
    };
    
    try {
      // First update the UI through local state
      updateRatingLocally(ratingData);
      
      // Then send the data to the server
      await axios.post(`http://localhost:3000/candidates/candidate_rating`, ratingData1, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        }
      });
      
      // Notify parent component if needed
      if (onRatingUpdate) {
        onRatingUpdate(candidate?.candidate_id, ratingData);
      }
      
      // Show success animation
      setShowRatingSuccess(true);
      setTimeout(() => {
        setShowRatingSuccess(false);
      }, 2000);
      
    } catch (error) {
      console.error("Error submitting rating:", error);
      // You could add error handling here, like a toast notification
    } finally {
      setIsSubmitting(false);
      setHoveredRating(0);
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

  // Render the employer's rating stars (interactive)
  const renderEmployerRatingStars = () => {
    return (
      <div className="flex flex-col">
        <div className="flex items-center mb-1">
          <span className="text-xs text-gray-600 mr-2">Your Rating:</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={`employer-star-${star}`}
                disabled={isSubmitting}
                onClick={() => handleRatingClick(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  className={`w-5 h-5 transition-all duration-200 ${
                    (hoveredRating || currentRatingValue) >= star
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          {isSubmitting && (
            <div className="ml-2 animate-spin w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
          )}
          {showRatingSuccess && (
            <span className="ml-2 text-green-600 text-xs flex items-center">
              <CheckCircle className="w-3 h-3 mr-1" /> Saved
            </span>
          )}
        </div>
        <div className="flex items-center mt-1">
          <span className="text-xs text-gray-600 mr-2">Average:</span>
          {renderAverageRating(avgRating)}
        </div>
      </div>
    );
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
            {renderEmployerRatingStars()}
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
    </div>
  );
};

export default CandidateCard;


