import React from 'react';
import { PenLine, GraduationCap, School, Award, CalendarCheck, BookOpen, Percent } from 'lucide-react';

const EducationSection = ({ educationDetails, onEdit }) => {
  return (
    <section className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-md border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <GraduationCap className="text-blue-600" size={24} />
          <h2 className="text-2xl font-semibold text-gray-800">Education</h2>
        </div>
        <button
          onClick={() => onEdit('Education')}
          className="p-2 rounded-full hover:bg-blue-100 transition-colors duration-200 text-blue-600 hover:text-blue-700"
          aria-label="Edit education"
        >
          <PenLine size={20} />
        </button>
      </div>

      <div className="space-y-8">
        {/* Graduation Details */}
        <div className="p-4">
          <h3 className="flex items-center gap-2 text-lg font-medium text-gray-800 mb-4">
            <BookOpen className="text-blue-600" size={20} />
            {educationDetails[0].educationLevel}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <School size={16} className="text-blue-600" />
                <p className="text-sm font-medium">College</p>
              </div>
              <p className="pl-6 font-medium text-gray-800">{educationDetails[0].collegeName}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Award size={16} className="text-blue-600" />
                <p className="text-sm font-medium">Specialisation</p>
              </div>
              <p className="pl-6 font-medium text-gray-800">{educationDetails[0].specialisation}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <CalendarCheck size={16} className="text-blue-600" />
                <p className="text-sm font-medium">Graduation Year</p>
              </div>
              <p className="pl-6 font-medium text-gray-800">{educationDetails[0].graduationYear}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Percent size={16} className="text-blue-600" />
                <p className="text-sm font-medium">Score</p>
              </div>
              <p className="pl-6 font-medium text-gray-800">{educationDetails[0].graduationScore}</p>
            </div>
          </div>
        </div>

        {/* Class XII Details */}
        <div className="p-4">
          <h3 className="flex items-center gap-2 text-lg font-medium text-gray-800 mb-4">
            <School className="text-blue-600" size={20} />
            Class XII
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <School size={16} className="text-blue-600" />
                <p className="text-sm font-medium">School</p>
              </div>
              <p className="pl-6 font-medium text-gray-800">{educationDetails[0].twelfthDetails.school}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Percent size={16} className="text-blue-600" />
                <p className="text-sm font-medium">Score</p>
              </div>
              <p className="pl-6 font-medium text-gray-800">{educationDetails[0].twelfthDetails.score}</p>
            </div>
          </div>
        </div>

        {/* Class X Details */}
        <div className="p-4">
          <h3 className="flex items-center gap-2 text-lg font-medium text-gray-800 mb-4">
            <School className="text-blue-600" size={20} />
            Class X
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <School size={16} className="text-blue-600" />
                <p className="text-sm font-medium">School</p>
              </div>
              <p className="pl-6 font-medium text-gray-800">{educationDetails[0].tenthDetails.school}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Percent size={16} className="text-blue-600" />
                <p className="text-sm font-medium">Score</p>
              </div>
              <p className="pl-6 font-medium text-gray-800">{educationDetails[0].tenthDetails.score}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;