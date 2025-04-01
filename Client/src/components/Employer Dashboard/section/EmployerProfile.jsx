import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Edit2, Save } from 'lucide-react';
import { Hash, Building2, Users, AlertCircle } from 'lucide-react';
import ProfileSection from './EmployerProfileSections/ProfileHeader';
import InfoCard from './EmployerProfileSections/InfoCard';
import SocialMediaLinks from './EmployerProfileSections/SocialMediaLinks';
import FormField from './EmployerProfileSections/FormField';
import { updateEmployerAPI } from './EmployerProfileSections/updateEmployerProfile';
import { updateEmployerProfile } from '../../../redux/employerSlice';

const EmployerProfile = () => {
  const dispatch = useDispatch();
  const employerData = useSelector((state) => state.employer?.employerProfile);
 console.log(employerData.employer_id);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});

  // Update editedProfile when employerData changes
  useEffect(() => {
    if (employerData) {
      setEditedProfile(employerData);
    }
  }, [employerData]);

  const handleEditClick = () => {
    // Ensure we have the latest data when starting to edit
    setEditedProfile({ ...employerData });
    setIsEditing(true);
  };

  const handleSave = async () => {
    // Log the data being saved
    console.log('Saving profile:', editedProfile);
    
    try {
        // First, make the API call
        const response = await updateEmployerAPI(employerData.employer_id, editedProfile);
        console.log(editedProfile);
        
        if (response.success) {
            // Then, update Redux using the action creator from your slice
            dispatch(updateEmployerProfile(response.updatedEmployer.employer));
            setIsEditing(false);
        } else {
            // Handle error - maybe show a notification
            console.error('Failed to update profile:', response.error);
        }
    } catch (error) {
        console.error('Error updating profile:', error);
    }
  };

  const handleFieldChange = (field, value) => {
    setEditedProfile(prev => {
      const updated = {
        ...prev,
        [field]: value
      };
      // Log the change
      console.log(`Field ${field} updated:`, updated);
      return updated;
    });
  };

  // Early return if no employer data
  if (!employerData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Company Logo Section */}
            <div className="flex-shrink-0 space-y-4">
              <div className="relative">
                <img
                  src={isEditing ? (editedProfile.company_logo || "https://via.placeholder.com/150") : (employerData.company_logo || "https://via.placeholder.com/150")}
                  alt="Company Logo"
                  className="w-40 h-40 rounded-xl shadow-lg object-fill bg-white border-2 border-gray-100"
                />
              </div>
              {isEditing && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Logo URL
                  </label>
                  <input
                    type="text"
                    value={editedProfile.company_logo || ''}
                    onChange={(e) => handleFieldChange('company_logo', e.target.value)}
                    placeholder="Enter logo URL"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>

            {/* Company Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div className="w-full pr-8">
                  {isEditing ? (
                    <div className="space-y-4">
                      <FormField
                        label="Company Name"
                        value={editedProfile.company_display_name || ''}
                        onChange={(value) => handleFieldChange('company_display_name', value)}
                      />
                      <FormField
                        label="Industry"
                        value={editedProfile.industry || ''}
                        onChange={(value) => handleFieldChange('industry', value)}
                      />
                    </div>
                  ) : (
                    <>
                      <h1 className="text-3xl font-bold text-gray-900">
                        {employerData.company_display_name}
                      </h1>
                      <span className="mt-2 inline-block px-4 py-1.5 bg-blue-500 text-white text-sm font-medium rounded-full">
                        {employerData.industry}
                      </span>
                    </>
                  )}
                </div>
                <button
                  onClick={isEditing ? handleSave : handleEditClick}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {isEditing ? (
                    <Save className="w-6 h-6 text-blue-500" />
                  ) : (
                    <Edit2 className="w-6 h-6 text-blue-500" />
                  )}
                </button>
              </div>

              <ProfileSection
                data={isEditing ? editedProfile : employerData}
                isEditing={isEditing}
                onChange={handleFieldChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <InfoCard
            icon={Hash}
            label="CIN"
            value={isEditing ? editedProfile.cin : employerData.cin}
            color="bg-purple-500"
            isEditing={isEditing}
            onChange={handleFieldChange}
            field="cin"
          />
          <InfoCard
            icon={Building2}
            label="Registered Name"
            value={isEditing ? editedProfile.company_registered_name : employerData.company_registered_name}
            color="bg-indigo-500"
            isEditing={isEditing}
            onChange={handleFieldChange}
            field="company_registered_name"
          />
          <InfoCard
            icon={Users}
            label="Company Size"
            value={isEditing ? editedProfile.company_size : employerData.company_size}
            color="bg-green-500"
            isEditing={isEditing}
            onChange={handleFieldChange}
            field="company_size"
          />
          <InfoCard
            icon={AlertCircle}
            label="Description"
            value={isEditing ? editedProfile.description : employerData.description}
            color="bg-yellow-500"
            isEditing={isEditing}
            onChange={handleFieldChange}
            field="description"
          />
        </div>

        <SocialMediaLinks
          data={isEditing ? editedProfile : employerData}
          isEditing={isEditing}
          onChange={handleFieldChange}
        />

        {isEditing && (
          <div className="fixed bottom-6 right-6">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2 shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerProfile;