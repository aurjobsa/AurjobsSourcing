import React, { useEffect, useState } from 'react';
import { 
  Mail, 
  Lock, 
  LogIn, 
  Loader2
} from 'lucide-react';
import { Link, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import { getEmployerProfile, setEmployerAuthentication } from "../redux/employerSlice";
import { BASEURL } from '../utility/config';

const CompanyLogin = () => {
  const [loginData, setLoginData] = useState({
    company_email: '',
    company_password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {isAuthenticated} = useSelector((state)=>state.employer)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const res = await axios.post(`${BASEURL}/employers/Employer_Login`, loginData, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })

      if (res?.data?.success) {
        toast.success(res?.data?.message , {
          duration: 4000,
          position: 'top-right',
          
        });
        navigate("/search")

        dispatch(getEmployerProfile(res?.data?.employer))
        dispatch(setEmployerAuthentication(true))

      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message , {
        duration: 4000,
        position: 'top-right',
        
      });
      dispatch(setEmployerAuthentication(false))
    } finally {
      setLoading(false)
    }

  };

  useEffect(()=>{
    if(isAuthenticated){
      navigate("/search")
    }
  },[isAuthenticated])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-blue-100 transform transition duration-500 hover:scale-[1.01]">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
            Company Login
          </h2>
          <p className="text-gray-500 max-w-xs mx-auto">
            Access your company dashboard and manage job postings
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Mail className="mr-2 text-blue-500" size={20} />
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="company_email"
                name="company_email"
                value={loginData.company_email}
                onChange={handleChange}
                required
                placeholder="Enter your company email"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          <div>
            <label htmlFor="password" className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Lock className="mr-2 text-blue-500" size={20} />
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="company_password"
                name="company_password"
                value={loginData.company_password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition duration-300">
                Forgot password?
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center mt-6">
            <button
              type="submit"
              className="flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg hover:shadow-xl"
            >
              
              
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait...
                </>
              ) : (
                <>
                  <LogIn className="mr-2" size={20} />
                  Log In
                </>
              )}
            </button>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to={"/company_register"} className="font-medium text-blue-600 hover:text-blue-500 transition duration-300">
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyLogin;