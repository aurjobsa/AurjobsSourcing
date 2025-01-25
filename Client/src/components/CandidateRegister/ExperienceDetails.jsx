import React, { useEffect, useState } from 'react'

import { Plus, Trash2, Briefcase } from 'lucide-react';

const ExperienceDetails = ({ formData, handleChange, setFormData, addExperienceEntry, removeExperienceEntry }) => {



    return (
      
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-8 space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl md:text-sm font-bold text-gray-800 flex items-center mb-2 sm:mb-0">
                    <Briefcase className="mr-2 sm:mr-3 text-blue-600" size={20} sm:size={24} />
                    Experience Details
                </h3>
                <button
                    type="button"
                    onClick={addExperienceEntry}
                    className="w-full md:text-sm sm:w-auto flex items-center justify-center px-3 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                >
                    <Plus size={16} className="mr-2" /> Add Experience
                </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto scrollbar-hide space-y-4 pr-2">
                {formData.experienceDetails.map((experience, index) => (
                    <div
                        key={index}
                        className="space-y-4 sm:space-y-6 p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200 relative"
                    >
                        {formData.experienceDetails.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeExperienceEntry(experience.id)}
                                className="absolute top-2 sm:top-4 right-2 sm:right-4 text-red-500 hover:text-red-700 transition-colors"
                            >
                                <Trash2 size={18} sm:size={20} />
                            </button>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={experience.companyName}
                                    onChange={(e) => handleChange(e, 'experience', index)}
                                    placeholder="Enter company name"
                                    className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border-2 border-gray-300 rounded-md text-gray-900 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                            transition-all duration-300 text-sm sm:text-base"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Industry
                                </label>
                                <input
                                    type="text"
                                    name="industry"
                                    value={experience.industry}
                                    onChange={(e) => handleChange(e, 'experience', index)}
                                    placeholder="Enter industry"
                                    className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border-2 border-gray-300 rounded-md text-gray-900 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                            transition-all duration-300 text-sm sm:text-base"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Designation
                                </label>
                                <input
                                    type="text"
                                    name="designation"
                                    value={experience.designation}
                                    onChange={(e) => handleChange(e, 'experience', index)}
                                    placeholder="Enter job title"
                                    className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border-2 border-gray-300 rounded-md text-gray-900 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                            transition-all duration-300 text-sm sm:text-base"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Current Salary
                                </label>
                                <input
                                    type="text"
                                    name="currentSalary"
                                    value={experience.currentSalary}
                                    onChange={(e) => handleChange(e, 'experience', index)}
                                    placeholder="Enter salary"
                                    className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border-2 border-gray-300 rounded-md text-gray-900 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                            transition-all duration-300 text-sm sm:text-base"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={experience.startDate}
                                    onChange={(e) => handleChange(e, 'experience', index)}
                                    className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border-2 border-gray-300 rounded-md text-gray-900 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                            transition-all duration-300 text-sm sm:text-base"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={experience.endDate}
                                    onChange={(e) => handleChange(e, 'experience', index)}
                                    disabled={experience.isCurrentRole}
                                    className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border-2 border-gray-300 rounded-md text-gray-900 
                            disabled:opacity-50 disabled:cursor-not-allowed
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                            transition-all duration-300 text-sm sm:text-base"
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="isCurrentRole"
                                checked={experience.isCurrentRole}
                                onChange={(e) => {
                                    const updatedExperience = [...formData.experienceDetails];
                                    updatedExperience[index].isCurrentRole = e.target.checked;
                                    if (e.target.checked) {
                                        updatedExperience[index].endDate = '';
                                    }
                                    setFormData(prev => ({
                                        ...prev,
                                        experienceDetails: updatedExperience
                                    }));
                                }}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label className="text-xs sm:text-sm text-gray-700">
                                Currently working here
                            </label>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ExperienceDetails



