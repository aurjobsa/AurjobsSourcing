// JobCard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, DollarSign, ArrowRight, Users, IndianRupee, Clock, Trash2, MoreHorizontal } from 'lucide-react';

const JobCard = ({ job }) => {
    const navigate = useNavigate();
    const [showActions, setShowActions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);


    const actionMenuItems = [
        //     {
        //         icon: Edit,
        //         text: 'Edit Job',
        //         onClick: () => navigate(`/employer_dashboard/edit_job/${job.job_id}`),
        //     },
        //     {
        //         icon: ToggleLeft,
        //         text: job.status === 'active' ? 'Deactivate Job' : 'Activate Job',
        //         onClick: handleToggleStatus,
        //     },
        //     {
        //         icon: Copy,
        //         text: 'Duplicate Job',
        //         onClick: handleDuplicateJob,
        //     },
        {
            icon: Trash2,
            text: 'Delete Job',
            onClick: () => setShowConfirmation(true),
            danger: true
        },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Side - Job Title */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Briefcase className="w-6 h-6 text-blue-500" />
                        <h3 className="text-xl font-semibold text-gray-900">{job.job_title}</h3>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-5 h-5 text-gray-500" />
                        <p>{job.job_location} {job.remote && "(Remote)"}</p>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                        <IndianRupee className="w-5 h-5 text-green-500" />
                        <p>{job.salary_range}</p>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-5 h-5 text-gray-500" />
                        <p>{job.job_experience_required} Experience</p>
                    </div>
                </div>

                {/* Right Side - Skills and Status */}
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold mb-3">Required Skills</h4>
                        <div className="flex flex-wrap gap-2">
                            {job.job_skills_required.slice(0, 3).map(skill => (
                                <span
                                    key={skill}
                                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                                >
                                    {skill}
                                </span>
                            ))}
                            {job.job_skills_required.length > 3 && (
                                <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-sm font-medium">
                                    +{job.job_skills_required.length - 3} more
                                </span>
                            )}
                        </div>
                    </div>

                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${job.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                        Status: {job.status}
                        {/* {console.log(job.status)} */}
                    </div>

                    <button
                        onClick={() => navigate(`/employer_dashboard/jobs/${job.job_id}`)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        View Details
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="  ">
                    <button
                        onClick={() => setShowActions(!showActions)}
                        className="p-1 rounded-full hover:bg-gray-100"
                    >
                        <MoreHorizontal className="w-5 h-5 text-gray-500" />
                    </button>

                    {/* Actions Dropdown */}
                    {showActions && (
                        <div className=" right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-100">
                            <div className="py-1">
                                {actionMenuItems.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={item.onClick}
                                        disabled={isLoading}
                                        className={`w-full text-left px-4 py-2 flex items-center space-x-2 hover:bg-gray-50 ${item.danger ? 'text-red-600 hover:bg-red-50' : 'text-gray-700'
                                            }`}
                                    >
                                        <item.icon className="w-4 h-4" />
                                        <span>{item.text}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Confirmation Modal */}
                {showConfirmation && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Job</h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete "{job.job_title}"? This action cannot be undone.
                            </p>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => setShowConfirmation(false)}
                                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
                                    disabled={isLoading}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteJob}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Clock className="w-4 h-4 mr-2 animate-spin" />
                                            Deleting...
                                        </>
                                    ) : (
                                        <>
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Delete
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobCard;


