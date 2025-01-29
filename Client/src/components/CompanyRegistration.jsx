import React, { useState } from "react";
import { Link } from "react-router-dom";

const CompanyRegistration = ({ navigateToLogin }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on change
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company Name is required.";
    }
    if (!formData.companyEmail.trim()) {
      newErrors.companyEmail = "Company Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.companyEmail)
    ) {
      newErrors.companyEmail = "Invalid email address.";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    }
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted: ", formData);
      // Add form submission logic here
    }
  };

  return (
    <div className="min-h-screen flex bg-white flex-col items-center justify-center">
      <div className="w-[85%] max-w-lg bg-white rounded-lg shadow-lg p-8 overflow-x-hidden max-h-[90vh] scrollbar-hide">

        <div className="space-y-2">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">
          Registration
        </h2>
        <form onSubmit={handleSubmit} noValidate>
          {/* Company Name */}
          <div className="relative mt-4">
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className={`block w-full p-2 border-black border-b-[1.5px] focus:outline-none peer ${errors.companyName ? 'border-b-red-500' : 'border-b-black'
                } ${formData.companyName ? 'pt-4 pb-0' : ''}`}
              placeholder=" "
            />
            <label
              htmlFor="companyName"
              className={`absolute text-md text-black duration-300 transform origin-[0] ${formData.companyName
                  ? 'top-0 -translate-y-4 scale-75'
                  : 'peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:scale-75 top-2 scale-100 translate-y-0'
                }`}
            >
              Company Name
            </label>
            {errors.companyName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.companyName}
              </p>
            )}
          </div>

          {/* Company Email */}
          <div className="relative mt-4">
            <input
              type="email"
              id="companyEmail"
              name="companyEmail"
              value={formData.companyEmail}
              onChange={handleChange}
              className={`block w-full p-2 border-black border-b-[1.5px] focus:outline-none peer ${errors.companyEmail ? 'border-b-red-500' : 'border-b-black'
                } ${formData.companyEmail ? 'pt-4 pb-0' : ''}`}
              placeholder=" "
            />
            <label
              htmlFor="companyEmail mt-4"
              className={`absolute text-md text-black duration-300 transform origin-[0] ${formData.companyEmail
                  ? 'top-0 -translate-y-4 scale-75'
                  : 'peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:scale-75 top-2 scale-100 translate-y-0'
                }`}
            >
              Company Email
            </label>
            {errors.companyEmail && (
              <p className="text-red-500 text-sm mt-1">
                {errors.companyEmail}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative mt-4">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`block w-full p-2 border-black border-b-[1.5px] focus:outline-none peer ${errors.password ? 'border-b-red-500' : 'border-b-black'
                } ${formData.password ? 'pt-4 pb-0' : ''}`}
              placeholder=" "
            />
            <label
              htmlFor="password"
              className={`absolute text-md text-black duration-300 transform origin-[0] ${formData.password
                  ? 'top-0 -translate-y-4 scale-75'
                  : 'peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:scale-75 top-2 scale-100 translate-y-0'
                }`}
            >
              Password
            </label>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative mt-4">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`block w-full p-2 border-black border-b-[1.5px] focus:outline-none peer ${errors.confirmPassword ? 'border-b-red-500' : 'border-b-black'
                } ${formData.confirmPassword ? 'pt-4 pb-0' : ''}`}
              placeholder=" "
            />
            <label
              htmlFor="confirmPassword"
              className={`absolute text-md text-black duration-300 transform origin-[0] ${formData.confirmPassword
                  ? 'top-0 -translate-y-4 scale-75'
                  : 'peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:scale-75 top-2 scale-100 translate-y-0'
                }`}
            >
              Confirm Password
            </label>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
      </div>
      <div className="text-center space-y-3 mt-4">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link to={"/company_login"}>
          <span
            onClick={navigateToLogin}
            className="text-blue-500 hover:text-blue-600 font-medium cursor-pointer"
          >
            Log in
          </span>
          </Link>
        </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegistration;
