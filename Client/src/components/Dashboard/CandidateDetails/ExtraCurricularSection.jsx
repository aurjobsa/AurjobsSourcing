import React from 'react';
import { PenLine, Trophy, Circle} from 'lucide-react';

const ExtraCurricularSection = ({ extraCurricular, onEdit }) => {
  return (
    <section className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Trophy className="text-blue-600" size={24} />
          <h2 className="text-2xl font-semibold text-gray-800">Extra Curricular</h2>
        </div>
        <button
          onClick={() => onEdit('Extra Curricular')}
          className="p-2 rounded-full hover:bg-blue-100 transition-colors duration-200 text-blue-600 hover:text-blue-700"
          aria-label="Edit extra curricular activities"
        >
          <PenLine size={20} />
        </button>
      </div>

      <div className=" p-4">
        {extraCurricular.length > 0 ? (
          <ul className="space-y-3">
            {extraCurricular.map((activity, index) => (
              <li key={index} className="flex items-start gap-3">
                <Circle 
                  size={16} 
                  className="text-blue-600 mt-1 flex-shrink-0"
                  fill="currentColor"
                />
                <span className="text-gray-800 font-medium">{activity}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center py-4 text-gray-500">
            No extra curricular activities added yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default ExtraCurricularSection;