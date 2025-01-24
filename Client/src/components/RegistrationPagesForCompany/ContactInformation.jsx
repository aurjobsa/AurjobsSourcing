import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import the left and right arrow icons

const ContactInformation = ({
  formData,
  handleChange,
  handleNextStep,
  handlePreviousStep,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Name</label>
          <input
            type="text"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Email</label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
          <input
            type="text"
            name="companyPhone"
            value={formData.companyPhone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePreviousStep}
          className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          Previous
        </button>
        <button
          onClick={handleNextStep}
          className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
        >
          Next <FaArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default ContactInformation;
