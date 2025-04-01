import React from 'react';
import FormField from './FormField';

const InfoCard = ({ icon: Icon, label, value, color, isEditing, onChange, field }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
    <div className="flex items-start space-x-4">
      <div className={`p-3 ${color} rounded-xl`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="flex-grow">
        <h3 className="text-sm font-medium text-gray-500">{label}</h3>
        {isEditing ? (
          <FormField
            value={value}
            onChange={(newValue) => onChange(field, newValue)}
            type={field === 'description' ? 'textarea' : 'text'}
          />
        ) : (
          <p className="mt-1 text-gray-900">{value || 'Not specified'}</p>
        )}
      </div>
    </div>
  </div>
);

export default InfoCard;