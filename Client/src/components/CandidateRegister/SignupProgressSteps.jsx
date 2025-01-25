import React from 'react'
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const SignupProgressSteps = ({ currentStep, progressSteps }) => {
  return (
    <div className="w-full lg:px-4 py-6 mr-2">
      <div className="flex items-center justify-between space-x-1">
        {progressSteps.map((step, index) => (
          <div key={step.label} className="flex flex-col items-center">
            <div
              className={`
                w-8 h-8 rounded-full flex  items-center justify-center
                ${index + 1 <= currentStep
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-500'}
                font-bold text-sm transition-colors duration-300
              `}
            >
              {index + 1 <= currentStep ? <Check /> : <step.icon />}
            </div>
            <span
              className={`
                text-xs mt-2 lg:ml-4
                ${index + 1 <= currentStep
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-500'}
                transition-colors duration-300
              `}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SignupProgressSteps
