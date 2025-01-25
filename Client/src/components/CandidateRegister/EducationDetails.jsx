import React from 'react'
import { Plus, Trash2, GraduationCap} from 'lucide-react';

const EducationDetails = ({formData,handleChange,addEducationEntry,removeEducationEntry}) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 sm:p-8 space-y-4 sm:space-y-6">
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
      <h3 className="text-lg sm:text-xl md:text-sm font-bold text-gray-800 mb-2 sm:mb-0 flex items-center">
        <GraduationCap className="mr-2 text-blue-500" size={24} /> 
        Education Details
      </h3>
      <button
        type="button"
        onClick={addEducationEntry}
        className="w-full sm:w-auto md:text-sm flex items-center justify-center px-3 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
      >
        <Plus size={16} className="mr-2" /> Add Education
      </button>
    </div>

    <div className="max-h-[60vh] overflow-y-auto scrollbar-hide space-y-4 pr-2">
      {formData.educationDetails.map((education, index) => (
        <div
          key={index}
          className="space-y-4 sm:space-y-6 p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200 relative"
        >
          {formData.educationDetails.length > 1 && (
            <button
              type="button"
              onClick={() => removeEducationEntry(education.id)}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 size={18} sm:size={20} />
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Education Level
              </label>
              <select
                name="educationLevel"
                value={education.educationLevel}
                onChange={(e) => handleChange(e,'education', index)}
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border-2 border-gray-300 rounded-md text-gray-900 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                transition-all duration-300 text-sm sm:text-base"
              >
                <option value="">Select Level</option>
                <option value="bachelor">Bachelor's</option>
                <option value="master">Master's</option>
                <option value="phd">PhD</option>
                <option value="12th">12th</option>
                <option value="10th">10th</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                College Name
              </label>
              <input
                type="text"
                name="collegeName"
                value={education.collegeName}
                onChange={(e) => handleChange(e,'education', index)}
                placeholder="Enter college name"
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border-2 border-gray-300 rounded-md text-gray-900 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                transition-all duration-300 text-sm sm:text-base"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialisation
              </label>
              <input
                type="text"
                name="specialisation"
                value={education.specialisation}
                onChange={(e) => handleChange(e,'education', index)}
                placeholder="Enter specialisation"
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border-2 border-gray-300 rounded-md text-gray-900 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                transition-all duration-300 text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Graduation Year
              </label>
              <input
                type="text"
                name="graduationYear"
                value={education.graduationYear}
                onChange={(e) => handleChange(e,'education', index)}
                placeholder="YYYY"
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border-2 border-gray-300 rounded-md text-gray-900 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                transition-all duration-300 text-sm sm:text-base"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Score in Graduation
              </label>
              <input
                type="text"
                name="graduationScore"
                value={education.graduationScore}
                onChange={(e) => handleChange(e,'education', index)}
                placeholder="Enter score"
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border-2 border-gray-300 rounded-md text-gray-900 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                transition-all duration-300 text-sm sm:text-base"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  )
}

export default EducationDetails
