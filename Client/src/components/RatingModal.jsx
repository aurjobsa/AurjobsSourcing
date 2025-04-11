
import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Star, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASEURL } from "../utility/config";

// const RatingModal = ({ isOpen, onClose, candidate, onRatingSubmit, currentRating }) => {

//   const [rating, setRating] = useState(0);
//   const [hoveredRating, setHoveredRating] = useState(0);
//   const [comment, setComment] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState(null);

//   const employer = useSelector((state) => state.employer.employerProfile);

//   // Initialize form with current rating data when modal opens or currentRating changes
//   useEffect(() => {
//     if (currentRating) {
//       setRating(currentRating.rating_value || 0);
//       setComment(currentRating.comment || '');
//     } else {
//       // Reset for new rating
//       setRating(0);
//       setComment('');
//     }

//     // Reset error state when modal opens/closes
//     setError(null);
//   }, [currentRating, isOpen]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError(null);

//     const ratingData = {
//       //   employer_id: currentUser.id,
//       //   employer_name: currentUser.name,
//       rating_value: rating,
//       employer_id: employer?.employer_id
//     };
//     const ratingData1 = {
//       ratingData,
//       candidate_id: candidate?.candidate_id,
//     }
//     try {
//       // First update the UI through the callback
//       onRatingSubmit(candidate?.candidate_id, ratingData, currentRating);

//       // Then send the data to the server
      

//       // Make the API call
//       const res = axios.post(`http://localhost:3000/candidates/candidate_rating`, ratingData1, {
//                 withCredentials: true,
//                 headers: {
//                   "Content-Type": "application/json",
//                 },})

//       // If successful, close the modal
//       onClose();
//     } catch (err) {
//       console.error("Error submitting rating:", err);
//       setError("Failed to submit rating. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md">
//         <h2 className="text-xl font-semibold mb-4">
//           {currentRating ? `Update Rating for ${candidate?.candidate_first_name}` : `Rate ${candidate?.candidate_first_name}`}
//         </h2>

//         <form onSubmit={handleSubmit}>
//           {/* Star Rating */}
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Your Rating</label>
//             <div className="flex space-x-1">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <button
//                   key={star}
//                   type="button"
//                   onClick={() => setRating(star)}
//                   onMouseEnter={() => setHoveredRating(star)}
//                   onMouseLeave={() => setHoveredRating(0)}
//                   className="focus:outline-none"
//                 >
//                   <Star
//                     className={`w-8 h-8 ${(hoveredRating || rating) >= star
//                         ? "fill-yellow-400 text-yellow-400"
//                         : "text-gray-300"
//                       }`}
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Comment */}
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2" htmlFor="comment">
//               Comment (Optional)
//             </label>
//             <textarea
//               id="comment"
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               rows="3"
//               placeholder="Share your experience with this candidate..."
//             ></textarea>
//           </div>

//           {/* Error message */}
//           {error && (
//             <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
//               {error}
//             </div>
//           )}

//           {/* Buttons */}
//           <div className="flex justify-end space-x-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
//               disabled={isSubmitting}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={!rating || isSubmitting}
//               className={`px-4 py-2 rounded ${rating && !isSubmitting
//                   ? "bg-indigo-600 text-white hover:bg-indigo-700"
//                   : "bg-indigo-300 text-white cursor-not-allowed"
//                 }`}
//             >
//               {isSubmitting
//                 ? "Submitting..."
//                 : currentRating
//                   ? "Update Rating"
//                   : "Submit Rating"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RatingModal;



const RatingModal = ({ isOpen, onClose, candidate, onRatingSubmit, currentRating }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const employer = useSelector((state) => state.employer.employerProfile);

  // Initialize form with current rating data when modal opens or currentRating changes
  useEffect(() => {
    if (currentRating) {
      setRating(currentRating.rating_value || 0);
      setComment(currentRating.comment || '');
    } else {
      // Reset for new rating
      setRating(0);
      setComment('');
    }

    // Reset states when modal opens/closes
    setError(null);
    setShowSuccess(false);
  }, [currentRating, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const ratingData = {
      rating_value: rating,
      employer_id: employer?.employer_id
    };
    const ratingData1 = {
      ratingData,
      candidate_id: candidate?.candidate_id,
    }
    
    try {
      // First update the UI through the callback
      onRatingSubmit(candidate?.candidate_id, ratingData, currentRating);

      // Then send the data to the server
      await axios.post(`${BASEURL}/candidates/candidate_rating`, ratingData1, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        }
      });

      // Show success animation
      setShowSuccess(true);
      
      // Close the modal after a delay to show the success animation
      setTimeout(() => {
        onClose();
      }, 1500);
      
    } catch (err) {
      console.error("Error submitting rating:", err);
      setError("Failed to submit rating. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        {showSuccess ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-green-600">Rating Submitted!</h3>
            <p className="text-gray-600 text-center mt-2">
              Thank you for rating {candidate?.candidate_first_name}
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {currentRating ? `Update Rating for ${candidate?.candidate_first_name}` : `Rate ${candidate?.candidate_first_name}`}
              </h2>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Star Rating */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-3 font-medium">Your Rating</label>
                <div className="flex space-x-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="focus:outline-none transform transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-10 h-10 transition-all duration-200 ${
                          (hoveredRating || rating) >= star
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                
                {rating > 0 && (
                  <div className="text-center mt-2 text-gray-600">
                    {rating === 1 && "Poor"}
                    {rating === 2 && "Fair"}
                    {rating === 3 && "Good"}
                    {rating === 4 && "Very Good"}
                    {rating === 5 && "Excellent"}
                  </div>
                )}
              </div>

              {/* Comment */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="comment">
                  Comment <span className="text-gray-500 font-normal">(Optional)</span>
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows="3"
                  placeholder="Share your experience with this candidate..."
                ></textarea>
              </div>

              {/* Error message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-100 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  {error}
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!rating || isSubmitting}
                  className={`px-4 py-2 rounded-lg flex items-center justify-center min-w-28 ${
                    rating && !isSubmitting
                      ? "bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                      : "bg-indigo-300 text-white cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    currentRating ? "Update Rating" : "Submit Rating"
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default RatingModal;