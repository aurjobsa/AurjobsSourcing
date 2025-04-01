import React, { useState } from 'react';
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
import { BASEURL } from '../utility/config';

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
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add form submission logic here

    try {
      setLoading(true);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-4xl border border-blue-100 transform transition duration-500 hover:scale-[1.01]">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
            Company Registration
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Create your company profile and start connecting with top talent
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative">
              <label htmlFor="company_email" className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
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
              <label htmlFor="company_password" className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
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
              <label htmlFor="company_name" className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
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
              <label htmlFor="company_name" className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
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
              <label htmlFor="cin" className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
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
              <label htmlFor="company_logo" className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
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

          <div className='grid md:grid-cols-2 gap-6'>
            <div>
              <label htmlFor="cin" className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
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
              <label htmlFor="company_size" className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Users className="mr-2 text-blue-500" size={20} />
                Company Size
              </label>
              <select
                id="company_size"
                name="company_size"
                value={formData.comapny_size}
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
              <label htmlFor="industry" className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
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
                {
                  industries.map((industry) => (
                    <option value={industry}>{industry}</option>
                  ))
                }

              </select>
            </div>
            <div>
              <label htmlFor="headquarters" className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
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
            <label htmlFor="description" className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
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
              <label htmlFor="company_twitter" className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
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
              <label htmlFor="company_facebook" className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
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
            <label htmlFor="company_phone_number" className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
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

              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create Company Profile
                </>
              )}
            </button>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <ReactLink to={"/company_login"} className="font-medium text-blue-600 hover:text-blue-500 transition duration-300">
                Login here
              </ReactLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyRegistration;