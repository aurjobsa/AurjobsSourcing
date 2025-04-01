import React, { useEffect, useState } from 'react'
import { Briefcase, MapPin, Mail, Phone, Calendar, Award, Clock, CheckCircle, ChevronUp, ChevronDown, Star, StarHalf, IndianRupee } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';


const CandidateCard = ({candidate}) => {

    

    

    const [shortlistedCandidates, setShortlistedCandidates] = useState([]);

   

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

    const renderStarRating = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={`star-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
        }

        if (hasHalfStar) {
            stars.push(<StarHalf key="half-star" className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
        }

        return <div className="flex">{stars}</div>;
    };

    function calculateTotalExperience(experiences) {
        let totalDays = 0;

        if (!experiences || experiences.length === 0) {
            //   return "No experience";
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

        // Map each education entry to a formatted string
        const educationEntries = sortedEducation.map(edu => {
            const degree = edu.candidate_degree || "Degree not specified";
            const institute = edu.candidate_institute || "Institute not specified";
            const startYear = edu.candidate_start_year || "";
            const endYear = edu.candidate_end_year || "";
            const timeframe = startYear && endYear ? `(${startYear}-${endYear})` : "";
            const score = edu.candidate_score ? `, ${edu.candidate_score}` : "";

            return `${degree}, ${institute} ${timeframe}${score}`;
        });

        return educationEntries.join("\n");
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
                    <div className="mt-2 flex justify-center">
                        {/* {renderStarRating(candidate.rating)} */}
                        {renderStarRating(4)}

                    </div>
                </div>

                {/* Candidate Details */}
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">{candidate?.candidate_first_name}</h2>
                            <p className="text-gray-600 flex items-center">
                                <Briefcase className="w-4 h-4 mr-1" />
                                {/* {candidate?.candidate_current_role} at {candidate.company} */}
                                {candidate?.candidate_current_role} at Aurjobs

                            </p>
                            <div className="flex items-center mt-1">
                                <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                                <span className="text-gray-600">{candidate?.candidate_location}</span>
                                {/* {candidate.willingToRelocate &&
                                                                                <span className="ml-2 text-xs bg-blue-100 text-blue-800 py-0.5 px-2 rounded">
                                                                                    Willing to Relocate
                                                                                </span>
                                                                            } */}
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
                                {/* {candidate.experience} years */}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <Award className="w-4 h-4 mr-2 text-gray-500" />
                            <span className="text-gray-600">Education: </span>
                            {/* <span className="ml-1 font-medium">{candidate?.candidate_degree}</span> */}
                            {/* <span className="ml-1 font-medium">B.tech in Mechanical</span> */}
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
                            {/* <span className="ml-1 font-medium">{candidate.salary}</span> */}
                            <span className="ml-1 font-medium">{candidate?.candidate_preference[0]?.expected_salary || "Not Available"} </span>

                        </div>
                        <div className="flex items-center">
                            <IndianRupee className="w-4 h-4 mr-2 text-gray-500" />
                            <span className="text-gray-600">Current Salary: </span>
                            <span className="ml-1 font-medium">{candidate?.candidate_current_salary || "Not Available"}</span>
                            {/* <span className="ml-1 font-medium">{candidate?.candidate_preference[0]?.expected_salary || "Not Available"} </span> */}

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
                        <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                            {/* <span className="text-gray-600">Last active: {candidate.lastActive}</span> */}
                            <span className="text-gray-600">Last active: 2 days ago</span>

                        </div>
                        <div>
                            {/* <button onClick={() => shortlistCandidate(candidate)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                                Save Candidate
                            </button> */}
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
    )
}

export default CandidateCard
