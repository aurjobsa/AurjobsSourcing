import React, { useState } from 'react';

const EducationForm = ({educationDetails: userData, onEdit }) => {
    const [educations, setEducations] = useState(userData || []);
    const [isAdding, setIsAdding] = useState(false);

    const handleEducationChange = (index, field, value) => {
        const updatedEducations = educations.map((edu, i) => 
            i === index ? { ...edu, [field]: value } : edu
        );
        setEducations(updatedEducations);
    };

    const handleNestedChange = (index, section, field, value) => {
        const updatedEducations = educations.map((edu, i) => 
            i === index ? { 
                ...edu, 
                [section]: { ...edu[section], [field]: value } 
            } : edu
        );
        setEducations(updatedEducations);
    };

    const addEducation = () => {
        setEducations([...educations, {
            educationLevel: '',
            collegeName: '',
            specialisation: '',
            graduationYear: '',
            graduationScore: '',
            twelfthDetails: { school: '', score: '' },
            tenthDetails: { school: '', score: '' }
        }]);
        setIsAdding(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onEdit('educationDetails', educations);
        setIsAdding(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {educations.map((education, index) => (
                <div key={index} className="border p-4 rounded space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Education Level</label>
                        <input
                            type="text"
                            value={education.educationLevel}
                            onChange={(e) => handleEducationChange(index, 'educationLevel', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter education level"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">College Name</label>
                        <input
                            type="text"
                            value={education.collegeName}
                            onChange={(e) => handleEducationChange(index, 'collegeName', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter college name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Specialisation</label>
                        <input
                            type="text"
                            value={education.specialisation}
                            onChange={(e) => handleEducationChange(index, 'specialisation', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter specialisation"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Graduation Year</label>
                            <input
                                type="text"
                                value={education.graduationYear}
                                onChange={(e) => handleEducationChange(index, 'graduationYear', e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="Enter graduation year"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Score</label>
                            <input
                                type="text"
                                value={education.graduationScore}
                                onChange={(e) => handleEducationChange(index, 'graduationScore', e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="Enter score"
                            />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-medium">Class XII Details</h4>
                        <div>
                            <label className="block text-sm font-medium mb-1">School</label>
                            <input
                                type="text"
                                value={education.twelfthDetails.school}
                                onChange={(e) => handleNestedChange(index, 'twelfthDetails', 'school', e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="Enter school name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Score</label>
                            <input
                                type="text"
                                value={education.twelfthDetails.score}
                                onChange={(e) => handleNestedChange(index, 'twelfthDetails', 'score', e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="Enter score"
                            />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-medium">Class X Details</h4>
                        <div>
                            <label className="block text-sm font-medium mb-1">School</label>
                            <input
                                type="text"
                                value={education.tenthDetails.school}
                                onChange={(e) => handleNestedChange(index, 'tenthDetails', 'school', e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="Enter school name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Score</label>
                            <input
                                type="text"
                                value={education.tenthDetails.score}
                                onChange={(e) => handleNestedChange(index, 'tenthDetails', 'score', e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="Enter score"
                            />
                        </div>
                    </div>
                </div>
            ))}
            {!isAdding && (
                <button type="button" onClick={addEducation} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                    Add Education
                </button>
            )}
            {educations.length > 0 && (
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Save Changes
                </button>
            )}
        </form>
    );
};

export default EducationForm;
