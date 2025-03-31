import React from 'react';
import { Linkedin, Twitter, Facebook } from 'lucide-react';
import FormField from './FormField';

const SocialMediaLink = ({ icon: Icon, value, color, label }) => (
  <a
    href={value}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all"
  >
    <Icon className={`w-6 h-6 ${color}`} />
    <span className="ml-3">{label}</span>
  </a>
);

const SocialMediaLinks = ({ data, isEditing, onChange }) => (
  <div className="mt-8">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">Social Media</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {isEditing ? (
        <>
          <FormField
            label="LinkedIn"
            value={data.company_linkedin}
            onChange={(value) => onChange('company_linkedin', value)}
          />
          <FormField
            label="Twitter"
            value={data.company_twitter}
            onChange={(value) => onChange('company_twitter', value)}
          />
          <FormField
            label="Facebook"
            value={data.company_facebook}
            onChange={(value) => onChange('company_facebook', value)}
          />
        </>
      ) : (
        <>
          {data?.company_linkedin && (
            <SocialMediaLink
              icon={Linkedin}
              value={data.company_linkedin}
              color="text-blue-600"
              label="LinkedIn"
            />
          )}
          {data?.company_twitter && (
            <SocialMediaLink
              icon={Twitter}
              value={data.company_twitter}
              color="text-blue-400"
              label="Twitter"
            />
          )}
          {data?.company_facebook && (
            <SocialMediaLink
              icon={Facebook}
              value={data.company_facebook}
              color="text-blue-600"
              label="Facebook"
            />
          )}
        </>
      )}
    </div>
  </div>
);

export default SocialMediaLinks;