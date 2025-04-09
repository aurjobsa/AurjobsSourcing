import React, { useState, useEffect } from 'react';
import {
  Mail,
  Lock,
  Building2,
  Globe,
  Image,
  Factory,
  MapPin,
  Link,
  Phone,
  Twitter,
  Linkedin,
  Facebook,
  Users,
  BadgeInfo,
  Loader2,
  UserPlus
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate ,Link as ReactLink} from 'react-router-dom';
import { BASEURL, BASEURL1 } from '../utility/config';


const CompanyRegistration = () => {
  
    const industries = [
    // Technology & IT
    "Technology",
    "Information Technology (IT)",
    "Software Development",
    "Artificial Intelligence (AI) & Machine Learning",
    "Cybersecurity",
    "Cloud Computing",
    "Blockchain",
    "Big Data & Analytics",
    "Telecommunications",
    "Game Development",
    "Web Development",
    "Mobile App Development",
    "Internet of Things (IoT)",
    "Augmented Reality (AR) & Virtual Reality (VR)",

    // Finance & Banking
    "Banking & Financial Services",
    "FinTech",
    "Investment Banking",
    "Insurance",
    "Accounting & Auditing",
    "Wealth Management",
    "Real Estate & Mortgage",

    // Healthcare & Pharmaceuticals
    "Healthcare",
    "Pharmaceuticals",
    "Biotechnology",
    "Medical Devices",
    "HealthTech",
    "Telemedicine",
    "Public Health & Hospitals",
    "Medical Research",

    // Education & Research
    "Education & E-learning",
    "Higher Education",
    "EdTech",
    "Research & Development (R&D)",
    "Training & Coaching",

    // Manufacturing & Engineering
    "Manufacturing",
    "Automotive",
    "Aerospace & Defense",
    "Electronics & Electricals",
    "Industrial Automation",
    "Textiles & Apparel",
    "Chemical Industry",
    "Metallurgy & Mining",

    // Energy & Utilities
    "Energy",
    "Oil & Gas",
    "Renewable Energy",
    "Electricity & Utilities",
    "Nuclear Energy",

    // Retail & E-commerce
    "Retail",
    "E-commerce",
    "Consumer Goods",
    "Luxury & Fashion",
    "Wholesale Distribution",
    "Supply Chain & Logistics",

    // Media & Entertainment
    "Media & Entertainment",
    "Film & Television",
    "Music Industry",
    "Advertising & Marketing",
    "Publishing",
    "Digital Media",
    "Gaming Industry",

    // Travel & Hospitality
    "Tourism & Hospitality",
    "Hotels & Resorts",
    "Airlines & Aviation",
    "Cruise & Maritime",
    "Travel Agencies",
    "Event Management",

    // Government & Nonprofit
    "Government & Public Administration",
    "Nonprofit & NGOs",
    "Legal Services",
    "Law Enforcement & Security",
    "International Relations",
    "Social Work",

    // Construction & Infrastructure
    "Construction",
    "Real Estate",
    "Urban Planning",
    "Architecture & Design",
    "Civil Engineering",

    // Agriculture & Food Industry
    "Agriculture",
    "Food & Beverage",
    "Dairy & Poultry",
    "Fisheries & Aquaculture",
    "AgriTech",

    // Transportation & Logistics
    "Transportation",
    "Logistics & Supply Chain",
    "Shipping & Freight",
    "Railways",
    "Maritime & Ports",

    // Environmental & Sustainability
    "Environmental Services",
    "Sustainable Energy",
    "Recycling & Waste Management",
    "Climate Change & Conservation"
  ];
  // Basic form state
  const [formData, setFormData] = useState({
    company_email: '',
    company_password: '',
    company_registered_name: '',
    company_name: '',
    cin: '',
    company_website: '',
    company_size: '',
    company_logo: null,
    industry: '',
    headquarters: '',
    description: '',
    company_linkedin: '',
    company_twitter: '',
    company_facebook: '',
    company_phone_number: '',
    status: 'active'
  });
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // OTP related states (added from CandidateSignup)
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [generatedOtp, setGeneratedOtp] = useState('');

  // Handle basic form changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  // OTP input handling functions
  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    // Allow only numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Ensure only one character is stored
    setOtp(newOtp);

    // Auto-move to next input if value is entered
    if (value && index < 5) {
      const nextInput = e.target.form.elements[index + 1];
      nextInput.focus();
    }
  };

  // Handle paste event for OTP
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();

    // Check if pasted content is numeric and has correct length
    if (/^\d+$/.test(pastedData) && pastedData.length <= 6) {
      const otpArray = pastedData.split('').slice(0, 6);
      const newOtp = [...otp];

      otpArray.forEach((char, index) => {
        if (index < 6) newOtp[index] = char;
      });

      setOtp(newOtp);

      // Focus the next empty input or the last one if all filled
      const lastFilledIndex = Math.min(otpArray.length, 5);
      if (lastFilledIndex < 5) {
        e.target.form.elements[lastFilledIndex + 1].focus();
      }
    }
  };

  // Handle key down for OTP input - for backspace and arrow navigation
  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // If current input is empty and backspace is pressed, focus previous input
      e.target.form.elements[index - 1].focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.target.form.elements[index - 1].focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      e.target.form.elements[index + 1].focus();
    }
  };

  // Generate OTP function
  const generateOTP = () => {
    const randomNumber = Math.floor(Math.random() * 1000000);
    return randomNumber.toString().padStart(6, '0');
  };

  // Send OTP to user's email
  const sendOtpWithCode = async (otpCode) => {
    if (!formData.company_email) {
      toast.error('Email is required to send OTP', {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#FF6B6B',
          color: 'white',
          fontWeight: 'bold',
          padding: '16px',
          borderRadius: '8px'
        }
      });
      return;
    }

    try {
      setOtpLoading(true);
      // Use company OTP verification endpoint (you'll need to create this on backend)
      const res = await axios.post(`${BASEURL1}/candidates/otp_verification`, {
        email: formData.company_email,
        otp: otpCode
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      if (res?.data?.success) {
        setOtpSent(true);
        setTimer(60); // 60 seconds countdown for resend
        toast.success('OTP sent to your email!', {
          duration: 4000,
          position: 'top-right',
          style: {
            background: '#4CAF50',
            color: 'white',
            fontWeight: 'bold',
            padding: '16px',
            borderRadius: '8px'
          },
          iconTheme: {
            primary: 'white',
            secondary: '#4CAF50'
          }
        });
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || 'Failed to send OTP', {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#FF6B6B',
          color: 'white',
          fontWeight: 'bold',
          padding: '16px',
          borderRadius: '8px'
        }
      });
    } finally {
      setOtpLoading(false);
    }
  };

  // Initiate OTP verification process
  const initiateVerification = async (e) => {
    e.preventDefault();
    
    // Basic form validation
    if (!formData.company_email || !formData.company_password) {
      toast.error('Email and password are required', {
        duration: 4000,
        position: 'top-right'
      });
      return;
    }
    
    // Generate OTP immediately and store the value
    const newOtp = generateOTP();
    setGeneratedOtp(newOtp);
    
    // Show OTP verification section
    setShowOtpSection(true);
    
    // Send OTP
    await sendOtpWithCode(newOtp);
  };

  // Verify OTP and complete registration
  const verifyOtpAndRegister = async (e) => {
    e.preventDefault();

    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      toast.error('Please enter the complete 6-digit OTP', {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#FF6B6B',
          color: 'white',
          fontWeight: 'bold',
          padding: '16px',
          borderRadius: '8px'
        }
      });
      return;
    }

    try {
      setLoading(true);
      
      // Verify OTP matches
      if (otpValue === generatedOtp) {
        // If OTP is verified, proceed with company registration
        const res = await axios.post(`${BASEURL}/employers/Employer_Signup`, formData, {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        });
        
        if (res?.data?.success) {
          toast.success(res?.data?.message, {
            duration: 4000,
            position: 'top-right'
          });
          navigate("/company_login");
        }
      } else {
        toast.error('Invalid OTP. Please try again.', {
          duration: 4000,
          position: 'top-right',
          style: {
            background: '#FF6B6B',
            color: 'white',
            fontWeight: 'bold',
            padding: '16px',
            borderRadius: '8px'
          }
        });
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message, {
        duration: 4000,
        position: 'top-right',
      });
    } finally {
      setLoading(false);
    }
  };

  // Timer countdown for OTP resend
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  // Resend OTP function
  const resendOtp = async () => {
    if (timer === 0) {
      const newOtp = generateOTP();
      setGeneratedOtp(newOtp);
      await sendOtpWithCode(newOtp);
    }
  };

  // Main render function
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6 mt-16">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-4xl border border-blue-100 transform transition duration-500 hover:scale-[1.01]">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
            Company Registration
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Create your company profile and start connecting with top talent
          </p>
        </div>

        {!showOtpSection ? (
          // Registration Form
          <form onSubmit={initiateVerification} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <label htmlFor="company_email" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Mail className="mr-2 text-blue-500" size={20} />
                  Company Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="company_email"
                    name="company_email"
                    value={formData.company_email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>
              <div className="relative">
                <label htmlFor="company_password" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Lock className="mr-2 text-blue-500" size={20} />
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="company_password"
                    name="company_password"
                    value={formData.company_password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="company_name" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Building2 className="mr-2 text-blue-500" size={20} />
                  Company Name
                </label>
                <input
                  type="text"
                  id="company_name"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
              </div>
              <div>
                <label htmlFor="company_registered_name" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Building2 className="mr-2 text-blue-500" size={20} />
                  Company Registered Name
                </label>
                <input
                  type="text"
                  id="company_registered_name"
                  name="company_registered_name"
                  value={formData.company_registered_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
              </div>
            </div>

            <div className='grid md:grid-cols-2 gap-6'>
              <div>
                <label htmlFor="cin" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <BadgeInfo className="mr-2 text-blue-500" size={20} />
                  CIN
                </label>
                <input
                  type="text"
                  id="cin"
                  name="cin"
                  value={formData.cin}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
              </div>
              <div>
                <label htmlFor="company_logo" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Image className="mr-2 text-blue-500" size={20} />
                  Company Logo
                </label>
                <input
                  type="file"
                  id="company_logo"
                  name="company_logo"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm file:mr-4 file:rounded-xl file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-600 hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Other form fields remain the same */}
            {/* ... (other fields from original form) */}

            <div className='grid md:grid-cols-2 gap-6'>
              <div>
                <label htmlFor="company_website" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Globe className="mr-2 text-blue-500" size={20} />
                  Company Website
                </label>
                <input
                  type="text"
                  id="company_website"
                  name="company_website"
                  value={formData.company_website}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
              </div>
              <div>
                <label htmlFor="company_size" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Users className="mr-2 text-blue-500" size={20} />
                  Company Size
                </label>
                <select
                  id="company_size"
                  name="company_size"
                  value={formData.company_size}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                >
                  <option value="">Select company size</option>
                  <option value="Startup (1-50)">Startup (1-50)</option>
                  <option value="Small (51-200)">Small (51-200)</option>
                  <option value="Medium (201-1000)">Medium (201-1000)</option>
                  <option value="Large (1000+)">Large (1000+)</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="industry" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Factory className="mr-2 text-blue-500" size={20} />
                  Industry
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                >
                  <option value="">Select Industry</option>
                  {industries.map((industry, index) => (
                    <option key={index} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="headquarters" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <MapPin className="mr-2 text-blue-500" size={20} />
                  Headquarters
                </label>
                <input
                  type="text"
                  id="headquarters"
                  name="headquarters"
                  value={formData.headquarters}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Link className="mr-2 text-blue-500" size={20} />
                Company Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Tell us about your company..."
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="company_linkedin" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Linkedin className="mr-2 text-blue-500" size={20} />
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  id="company_linkedin"
                  name="company_linkedin"
                  value={formData.company_linkedin}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
              </div>
              <div>
                <label htmlFor="company_twitter" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Twitter className="mr-2 text-blue-500" size={20} />
                  Twitter Handle
                </label>
                <input
                  type="text"
                  id="company_twitter"
                  name="company_twitter"
                  value={formData.company_twitter}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
              </div>
              <div>
                <label htmlFor="company_facebook" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Facebook className="mr-2 text-blue-500" size={20} />
                  Facebook Page
                </label>
                <input
                  type="url"
                  id="company_facebook"
                  name="company_facebook"
                  value={formData.company_facebook}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
              </div>
            </div>

            <div>
              <label htmlFor="company_phone_number" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Phone className="mr-2 text-blue-500" size={20} />
                Company Phone Number
              </label>
              <input
                type="tel"
                id="company_phone_number"
                name="company_phone_number"
                value={formData.company_phone_number}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>

            <div className="flex items-center justify-center mt-8">
              <button
                type="submit"
                className="bg-gradient-to-r inline-flex items-center from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg hover:shadow-xl"
              >
                {otpLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending Verification Code...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Verify Email & Register
                  </>
                )}
              </button>
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <ReactLink to="/company_login" className="font-medium text-blue-600 hover:text-blue-500 transition duration-300">
                  Login here
                </ReactLink>
              </p>
            </div>
          </form>
        ) : (
          // OTP Verification Form
          <form onSubmit={verifyOtpAndRegister} className="space-y-6">
            <div className="text-center mb-8">
              <div className="bg-blue-50 p-4 rounded-xl inline-flex items-center justify-center mb-4">
                <Mail className="text-blue-500" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Email Verification</h3>
              <p className="text-gray-600">
                We've sent a verification code to <span className="font-semibold">{formData.company_email}</span>
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                Enter the 6-digit verification code
              </label>
              <div className="flex justify-center gap-2 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    onPaste={handleOtpPaste}
                    className="w-12 h-14 text-center text-xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                ))}
              </div>

              <div className="text-center mb-6">
                <p className="text-sm text-gray-600 mb-2">
                  Didn't receive the code?
                </p>
                {timer > 0 ? (
                  <p className="text-sm text-gray-500">
                    Resend code in <span className="font-medium text-blue-600">{timer}s</span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={resendOtp}
                    className="text-sm font-medium text-blue-600 hover:text-blue-500 transition duration-300"
                  >
                    Resend Code
                  </button>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  type="button"
                  onClick={() => setShowOtpSection(false)}
                  className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
                  Go Back
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="inline mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify & Create Account'
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CompanyRegistration;