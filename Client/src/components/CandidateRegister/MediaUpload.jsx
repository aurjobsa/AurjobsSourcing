import React from 'react'
import { Upload, Eye, EyeOff, Plus, Trash2, FileText, Briefcase, Award, Layers, Zap, ArrowRight, ArrowLeft, LogIn } from 'lucide-react';


const MediaUpload = ({formData,handleChange,togglePasswordVisibility,passwordVisible}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
                                <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-6">
                                    {/* Profile Image Upload */}
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-800 mb-3">
                                            Profile Image
                                        </h3>
                                        <div className="flex items-center space-x-4">
                                            <input
                                                type="file"
                                                id="imageUpload"
                                                name="profileImage"
                                                accept="image/*"
                                                onChange={handleChange}
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor="imageUpload"
                                                className="group cursor-pointer"
                                            >
                                                <div className="flex items-center px-4 py-2 border-2 border-blue-500 text-blue-600 rounded-md transition-all duration-300 hover:bg-blue-50 group-active:scale-95">
                                                    <Upload className="mr-2 h-5 w-5 text-blue-500 group-hover:animate-pulse" />
                                                    <span className="font-semibold text-sm">Upload Image</span>
                                                </div>
                                            </label>
                                            {formData.profileImage && (
                                                <div className="flex items-center space-x-2 text-gray-600">
                                                    <FileText className="h-5 w-5 text-gray-400" />
                                                    <span className="text-xs max-w-[150px] truncate">
                                                        {formData.profileImage.name}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Resume Upload */}
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-800 mb-3">
                                            Resume
                                        </h3>
                                        <div className="flex items-center space-x-4">
                                            <input
                                                type="file"
                                                id="resumeUpload"
                                                name="resumeFile"
                                                accept=".pdf,.doc,.docx"
                                                onChange={handleChange}
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor="resumeUpload"
                                                className="group cursor-pointer"
                                            >
                                                <div className="flex items-center px-4 py-2 border-2 border-green-500 text-green-600 rounded-md transition-all duration-300 hover:bg-green-50 group-active:scale-95">
                                                    <Upload className="mr-2 h-5 w-5 text-green-500 group-hover:animate-pulse" />
                                                    <span className="font-semibold text-sm">Upload Resume</span>
                                                </div>
                                            </label>
                                            {formData.resumeFile && (
                                                <div className="flex items-center space-x-2 text-gray-600">
                                                    <FileText className="h-5 w-5 text-gray-400" />
                                                    <span className="text-xs max-w-[150px] truncate">
                                                        {formData.resumeFile.name}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
  )
}

export default MediaUpload
