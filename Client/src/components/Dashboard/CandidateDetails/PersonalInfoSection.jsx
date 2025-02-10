import React from 'react';
import { PenLine, Mail, Phone, MapPin, User } from 'lucide-react';

const PersonalInfoSection = ({ personalInfo, onEdit }) => {
  return (
    <section className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-md border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Personal Information</h2>
        <button
          onClick={() => onEdit('Personal Information')}
          className="p-2 rounded-full hover:bg-blue-100 transition-colors duration-200 text-blue-600 hover:text-blue-700"
          aria-label="Edit personal information"
        >
          <PenLine size={20} />
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center md:items-start space-y-3">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-transparent">
              {personalInfo.profileImage ? (
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  className="w-full h-full object-fit bg-transparent"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <User size={40} className="text-gray-400" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Information Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <User size={18} className="text-blue-600" />
              <p className="text-sm font-medium">Name</p>
            </div>
            <p className="text-gray-800 font-medium pl-6">{personalInfo.name}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <Mail size={18} className="text-blue-600" />
              <p className="text-sm font-medium">Email</p>
            </div>
            <p className="text-gray-800 font-medium pl-6 break-all">{personalInfo.email}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <Phone size={18} className="text-blue-600" />
              <p className="text-sm font-medium">Mobile</p>
            </div>
            <p className="text-gray-800 font-medium pl-6">{personalInfo.mobile}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin size={18} className="text-blue-600" />
              <p className="text-sm font-medium">Location</p>
            </div>
            <p className="text-gray-800 font-medium pl-6">{personalInfo.location}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalInfoSection;