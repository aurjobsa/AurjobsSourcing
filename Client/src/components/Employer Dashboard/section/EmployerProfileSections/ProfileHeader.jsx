import React from 'react';
import { MapPin, Globe, Mail } from 'lucide-react';
import FormField from './FormField';

const ProfileHeader = ({ data, isEditing, onChange }) => (
  <div className="mt-4 space-y-4">
    {isEditing ? (
      <>
        <FormField
          label="Headquarters"
          value={data.headquarters}
          onChange={(value) => onChange('headquarters', value)}
        />
        <FormField
          label="Website"
          value={data.company_website}
          onChange={(value) => onChange('company_website', value)}
        />
        <FormField
          label="Email"
          value={data.employer_email}
          onChange={(value) => onChange('employer_email', value)}
          type="email"
        />
      </>
    ) : (
      <>
        <div className="flex items-center text-gray-600">
          <MapPin className="w-5 h-5 mr-2 text-gray-400" />
          {data?.headquarters}
        </div>
        <div className="flex items-center text-gray-600">
          <Globe className="w-5 h-5 mr-2 text-gray-400" />
          {data?.company_website}
        </div>
        <div className="flex items-center text-gray-600">
          <Mail className="w-5 h-5 mr-2 text-gray-400" />
          {data?.employer_email}
        </div>
      </>
    )}
  </div>
);

export default ProfileHeader;