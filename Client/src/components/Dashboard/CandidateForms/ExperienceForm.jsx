import React, { useState } from 'react';

const ExperienceForm = ({ experienceDetails:userData, onEdit }) => {
    const [experiences, setExperiences] = useState(userData || []);
    const [isAdding, setIsAdding] = useState(false);

    const handleExperienceChange = (index, field, value) => {
        const updatedExperiences = experiences.map((exp, i) => 
            i === index ? { ...exp, [field]: value } : exp
        );
        setExperiences(updatedExperiences);
    };

    const addExperience = () => {
        setExperiences([...experiences, {
            companyName: '',
            designation: '',
            startDate: '',
            endDate: '',
            isCurrentRole: false
        }]);
        setIsAdding(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onEdit('experienceDetails', experiences);
        setIsAdding(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {experiences.map((experience, index) => (
                <div key={index} className="border p-4 rounded space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Company Name</label>
                        <input
                            type="text"
                            value={experience.companyName}
                            onChange={(e) => handleExperienceChange(index, 'companyName', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter company name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Designation</label>
                        <input
                            type="text"
                            value={experience.designation}
                            onChange={(e) => handleExperienceChange(index, 'designation', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter designation"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Start Date</label>
                            <input
                                type="text"
                                value={experience.startDate}
                                onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="MM/YYYY"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">End Date</label>
                            <input
                                type="text"
                                value={experience.endDate}
                                onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="MM/YYYY"
                                disabled={experience.isCurrentRole}
                            />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={experience.isCurrentRole}
                            onChange={(e) => handleExperienceChange(index, 'isCurrentRole', e.target.checked)}
                            className="mr-2"
                        />
                        <label className="text-sm">Current Role</label>
                    </div>
                </div>
            ))}
            {!isAdding && (
                <button type="button" onClick={addExperience} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                    Add Experience
                </button>
            )}
            {experiences.length > 0 && (
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Save Changes
                </button>
            )}
        </form>
    );
};

export default ExperienceForm;
