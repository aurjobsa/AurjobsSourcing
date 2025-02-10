import React from 'react';
import { PenLine, Briefcase, Building2, UserRound, CalendarRange } from 'lucide-react';

const ExperienceSection = ({ experienceDetails, onEdit }) => {
  return (
    <section className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-md border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Briefcase className="text-blue-600" size={24} />
          <h2 className="text-2xl font-semibold text-gray-800">Experience</h2>
        </div>
        <button
          onClick={() => onEdit('Experience')}
          className="p-2 rounded-full hover:bg-blue-100 transition-colors duration-200 text-blue-600 hover:text-blue-700"
          aria-label="Edit experience"
        >
          <PenLine size={20} />
        </button>
      </div>

      <div className="space-y-6">
        {experienceDetails.map((exp, index) => (
          <div
            key={index}
            className="p-4 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Building2 size={16} className="text-blue-600" />
                  <p className="text-sm font-medium">Company</p>
                </div>
                <p className="pl-6 font-medium text-gray-800">{exp.companyName}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <UserRound size={16} className="text-blue-600" />
                  <p className="text-sm font-medium">Designation</p>
                </div>
                <p className="pl-6 font-medium text-gray-800">{exp.designation}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <CalendarRange size={16} className="text-blue-600" />
                  <p className="text-sm font-medium">Duration</p>
                </div>
                <p className="pl-6 font-medium text-gray-800">
                  {exp.startDate} - {' '}
                  <span className={exp.isCurrentRole ? 'text-green-600 font-semibold' : ''}>
                    {exp.isCurrentRole ? 'Present' : exp.endDate}
                  </span>
                </p>
              </div>
            </div>

            {index < experienceDetails.length - 1 && (
              <div className="border-b border-gray-200 my-4" />
            )}
          </div>
        ))}

        {experienceDetails.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No experience details added yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;