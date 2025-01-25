import { Award, Layers, Zap } from 'lucide-react';
import React from 'react'

const AdditionalDetails = ({formData,handleChange,setFormData}) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-8 space-y-6">
    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Layers className="mr-2 text-blue-600" size={18} />
                Preferred Work Mode</label>
            <select
                name="preferredWorkMode"
                value={formData.preferredWorkMode}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-md text-gray-900 
focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
transition-all duration-300"
            >
                <option value="">Select Work Mode</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">On-site</option>
            </select>
        </div>
        <div>
            <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Zap className="mr-2 text-yellow-600" size={18} />Skills</label>
            <input
                type="text"
                name="skills"
                value={formData.skills.join(', ')}
                onChange={(e) => {
                    const skillsArray = e.target.value.split(',').map(skill => skill.trim());
                    setFormData(prev => ({ ...prev, skills: skillsArray }));
                }}
                placeholder="Enter skills separated by comma"
                className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-md text-gray-900 
focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
transition-all duration-300"
            />
        </div>
    </div>

    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
            <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Award className="mr-2 text-green-600" size={18} />
                Certifications</label>
            <input
                type="text"
                name="certifications"
                value={formData.certifications.join(', ')}
                onChange={(e) => {
                    const certsArray = e.target.value.split(',').map(cert => cert.trim());
                    setFormData(prev => ({ ...prev, certifications: certsArray }));
                }}
                placeholder="Enter certifications separated by comma"
                className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-md text-gray-900 
focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
transition-all duration-300"
            />
        </div>
        <div>
            <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Zap className="mr-2 text-purple-600" size={18} />
                Extra Curricular Activities</label>
            <input
                type="text"
                name="extraCurricular"
                value={formData.extraCurricular.join(', ')}
                onChange={(e) => {
                    const activitiesArray = e.target.value.split(',').map(activity => activity.trim());
                    setFormData(prev => ({ ...prev, extraCurricular: activitiesArray }));
                }}
                placeholder="Enter activities separated by comma"
                className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-md text-gray-900 
focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
transition-all duration-300"
            />
        </div>
    </div>
</div>
  )
}

export default AdditionalDetails
