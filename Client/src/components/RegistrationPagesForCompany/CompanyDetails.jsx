import React from "react";
import { FaArrowRight } from "react-icons/fa"; // Import the right arrow icon

const CompanyDetails = ({ formData, handleChange, handleNextStep }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Company Details</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Registration Number</label>
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Industry</label>
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
      </div>
      <div>
      <button
        onClick={handleNextStep}
        className="mt-6 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center"
      >
        Next <FaArrowRight className="ml-2" />
      </button>
      </div>
    </div>
  );
};

export default CompanyDetails;
