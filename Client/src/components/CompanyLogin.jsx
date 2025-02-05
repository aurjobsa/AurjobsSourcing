import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginImage from '../assets/Login.png';

function CompanyLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const requestBody = { email, password };
      console.log("Login Request: ", requestBody);
    } catch (error) {
      console.log("Error during login: ", error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white animate-slide-out">
      <div className="flex flex-col md:flex-row items-center justify-center bg-white rounded-lg shadow-lg p-8 md:p-12 w-full max-w-4xl">
        
        {/* Left: Form */}
        <div className="w-full md:w-1/2 p-6">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-black mb-2">Login to your account</h2>
              <p className="text-gray-600">Welcome back!</p>
            </div>
            <hr />
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full p-2 border-black border-b-[1.5px] focus:outline-none peer"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute text-md text-black duration-300 transform top-0 -translate-y-4 scale-75 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Email address
                </label>
              </div>

              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full p-2 border-black border-b-[1.5px] focus:outline-none peer"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="absolute text-md text-black duration-300 transform top-0 -translate-y-4 scale-75 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Password
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            >
              LOG IN
            </button>

            <div className="text-center space-y-3">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to={"/company/register"}>
                  <span className="text-blue-500 hover:text-blue-600 font-medium cursor-pointer">
                    Create an account
                  </span>
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Right: Image */}
        <div className="hidden md:flex w-full md:w-1/2 justify-center">
          <img src={LoginImage} className="max-w-full h-auto" alt="Login" />
        </div>
      </div>
    </div>
  );
}

export default CompanyLogin;
