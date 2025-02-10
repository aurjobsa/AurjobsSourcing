import React from 'react';
import { PenLine, Circle } from 'lucide-react';

const AccomplishmentsSection = ({ accomplishments, onEdit }) => {
  return (
    <section className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Accomplishments</h2>
        <button
          onClick={() => onEdit('Accomplishments')}
          className="p-2 rounded-full hover:bg-blue-100 transition-colors duration-200 text-blue-600 hover:text-blue-700"
          aria-label="Edit accomplishments"
        >
          <PenLine size={20} />
        </button>
      </div>

      <ul className="list-disc pl-6 space-y-4">
        {accomplishments.map((accomplishment, index) => (
          <li key={index} className="text-gray-900 font-medium flex space-x-2 p-4">
            <Circle
              size={16}
              className="text-blue-600 mt-1 flex-shrink-0"
              fill="currentColor"
            />
            <span>{accomplishment}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AccomplishmentsSection;
