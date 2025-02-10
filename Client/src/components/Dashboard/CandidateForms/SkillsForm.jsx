import React, { useState } from "react";
import { X } from "lucide-react";

const SkillsForm = ({ skills: initialSkills, onEdit }) => {
    const [skills, setSkills] = useState(initialSkills);
    const [newSkill, setNewSkill] = useState('');

    const addSkill = () => {
        if (newSkill.trim()) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill('');
        }
    };

    const removeSkill = (skillToRemove) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onEdit('skills', skills);
            }}
            className="space-y-4"
        >
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a new skill"
                    className="flex-1 p-2 border rounded"
                />
                <button
                    type="button"
                    onClick={addSkill}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Add
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center">
                        {skill}
                        <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="ml-2 text-gray-500 hover:text-red-500"
                        >
                            <X size={14} />
                        </button>
                    </span>
                ))}
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Save Changes
            </button>
        </form>
    );
};

export default SkillsForm;
