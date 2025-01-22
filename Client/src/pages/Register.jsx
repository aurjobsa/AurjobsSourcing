import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState('applicant');

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Back Button */}
      <button className="text-yellow-400 text-sm font-medium hover:text-yellow-500 transition-colors">
        ← Home
      </button>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto flex">
        {/* Left Side - Logo */}
        <div className="flex-1 flex flex-col justify-center items-start mt-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-400 text-5xl">⚓</span>
            <h1 className="text-yellow-400 text-5xl font-bold">JobHook</h1>
          </div>
          <p className="text-gray-400 text-xl">Find the job made for you</p>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 mt-8">
          <div className="max-w-md">
            <h2 className="text-white text-2xl font-semibold mb-6">Create Account</h2>
            
            <form className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-2 bg-gray-800/50 rounded text-gray-300 border border-gray-700 focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">@</span>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full pl-10 pr-4 py-2 bg-gray-800/50 rounded text-gray-300 border border-gray-700 focus:outline-none focus:border-yellow-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full pr-10 pl-4 py-2 bg-gray-800/50 rounded text-gray-300 border border-gray-700 focus:outline-none focus:border-yellow-400"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    <Eye size={20} />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Confirm password"
                    className="w-full pr-10 pl-4 py-2 bg-gray-800/50 rounded text-gray-300 border border-gray-700 focus:outline-none focus:border-yellow-400"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    <Eye size={20} />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">
                  You are? <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setUserType('applicant')}
                    className={`flex-1 py-2 px-4 rounded border ${
                      userType === 'applicant'
                        ? 'bg-yellow-400 text-gray-900 border-yellow-400'
                        : 'bg-transparent text-gray-300 border-gray-700'
                    }`}
                  >
                    Applicant
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType('employer')}
                    className={`flex-1 py-2 px-4 rounded border ${
                      userType === 'employer'
                        ? 'bg-yellow-400 text-gray-900 border-yellow-400'
                        : 'bg-transparent text-gray-300 border-gray-700'
                    }`}
                  >
                    Employer
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-400 text-gray-900 py-2 rounded font-semibold hover:bg-yellow-500 transition-colors"
              >
                Sign up
              </button>

              <p className="text-center text-gray-400">
                Have an account?{' '}
                <a href="#" className="text-yellow-400 hover:text-yellow-500">
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
