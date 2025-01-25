import React from "react";
import { FaArrowLeft, FaEdit } from "react-icons/fa"; // Import React Icons

const AccountCreation = ({
  formData,
  handleChange,
  handlePreviousStep,
  handleNextStep,
  setStep,
}) => {
  const handleReview = () => {
    setStep(3); // Set step to 3 to show the Review component
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Account Creation</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
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
          onClick={handleReview}
          className="py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center"
        >
          Review <FaEdit className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default AccountCreation;
