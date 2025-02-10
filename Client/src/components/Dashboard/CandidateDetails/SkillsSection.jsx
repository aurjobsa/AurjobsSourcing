import React from 'react';
import { PenLine, Code } from 'lucide-react';

const SkillsSection = ({ skills, onEdit }) => {
  return (
    <section className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-md border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Skills</h2>
        <button
          onClick={() => onEdit('Skills')}
          className="p-2 rounded-full hover:bg-blue-100 transition-colors duration-200 text-blue-600 hover:text-blue-700"
          aria-label="Edit skills"
        >
          <PenLine size={20} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill, index) => (
          <div key={index} className="space-y-2 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <Code size={18} className="text-blue-600" />
              <p className="text-base font-medium">{skill}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;