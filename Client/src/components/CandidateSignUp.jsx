import React, { useState, useEffect } from 'react'
// import {  } from 'lucide-react';
import {  User, Info, ArrowRight, ArrowLeft, Mail, Eye, EyeOff, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import RegisterImage from '../assets/Signup2.png'

const CandidateSignUp = ({ navigateToLogin }) => {
  const [formData, setFormData] = useState({
    candidate_first_name: '', candidate_last_name: '', candidate_email: '', candidate_phone: '',

    candidate_location: '', candidate_resume_link: '', password: '', confirmPassword: '',

    candidate_linkedin_link: '', candidate_github_link: '', 
    
    candidate_country: '', candidate_nationality: '', candidate_date_of_birth: '', candidate_gender: '',pwd:'',veteran_status:'',

    preferred_industry: '', job_preference: '', candidate_availability: '',

    work_authorization: '', preferred_work_location: '', expected_salary: ''
  });
  
  const [currentSection, setCurrentSection] = useState(1);
  const totalSections = 8;
  const [passwordVisible, setPasswordVisible] = useState({
    password: false,
    confirmPassword: false,
  });
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: ''
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextSection = () => {
    if (currentSection < totalSections) {
      setCurrentSection(prev => prev + 1);
    }
  };

  const previousSection = () => {
    if (currentSection > 1) {
      setCurrentSection(prev => prev - 1);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  
    
    const completeFormData = {
      ...formData,
      educations: [...educations], 
      experiences: [...experiences],
    };
    
    console.log('Form submitted:', completeFormData);
  
  
    
  };

  
  

  const [educations, setEducations] = useState([
    { candidate_institute: "", candidate_degree: "", candidate_education: "", candidate_score: "", candidate_start_year: "", candidate_end_year: "" }
  ]);

  const [experiences, setExperiences] = useState([
    { candidate_company: "", candidate_job_role: "", candidate_industry: "", candidate_job_type: "", candidate_start_date: "", candidate_end_date: "" }
  ]);

  const handleChangeEducation = (index, e) => {
    const { name, value } = e.target;
    const updatedEducations = [...educations];
    updatedEducations[index][name] = value;
    setEducations(updatedEducations);
  };

  const handleChangeExp = (index, e) => {
    const { name, value } = e.target;
    const updatedExperiences = [...experiences];
    updatedExperiences[index][name] = value;
    setExperiences(updatedExperiences);
  };

  const addEducation = () => {
    setEducations([...educations, { candidate_institute: "", candidate_degree: "", candidate_education: "", candidate_score: "", candidate_start_year: "", candidate_end_year: ""  }]);
  };

  const removeEducation = (index) => {
    const updatedEducations = educations.filter((_, i) => i !== index);
    setEducations(updatedEducations);
  };

  const addExperience = () => {
    setExperiences([...experiences, { candidate_company: "", candidate_job_role: "", candidate_industry: "", candidate_job_type: "", candidate_start_date: "", candidate_end_date: "" }]);
  };

  const removeExperience = (index) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(updatedExperiences);
  };
    

  const getFieldsForSection = () => {
    const sections = [
      ['firstName', 'lastName', 'email', 'phoneNumber'],
      ['location', 'resumeUrl', 'password', 'confirmPassword'],
     
      ['linkedin', 'github'],
      ['companyName', 'jobRole', 'startDate', 'endDate'],
      ['country', 'nationality', 'dob', 'gender','pwd','veteran'],
      ['remoteWork', 'industry', 'employmentType', 'availability'],
      ['workAuthorization', 'relocation', 'preferredLocation', 'salaryExpectation']
    ];
    return sections[currentSection - 1];
  };
  const togglePasswordVisibility = (field) => {
    setPasswordVisible(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };


  useEffect(() => {
    // Check password match whenever password or confirmPassword changes
    if (formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        setErrors(prev => ({
          ...prev,
          confirmPassword: 'Passwords do not match'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          confirmPassword: ''
        }));
      }
    }
  }, [formData.password, formData.confirmPassword]);


  return (


<div className="min-h-screen flex items-center justify-center bg-blue-50 px-4 sm:px-6 lg:px-8">
  <div className="w-full max-w-6xl bg-white p-4 sm:p-12 shadow-lg rounded-lg">
    <div className="w-full bg-white p-1 flex flex-col justify-between">
      <div className="flex flex-col items-center">
        <h2 className="text-4xl font-sans font-bold text-black my-2 text-center">Join us today!</h2>

        {/* Progress bar */}
        <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-white p-2 sm:p-12">
          <div className="mb-6 px-2">
            <div className="flex flex-col items-center mt-2">
              {/* Desktop labels with proper alignment */}
              <div className="w-full hidden sm:flex justify-between mb-2">
                <div className="w-1/4 text-center">
                  <span className={`text-sm font-medium ${currentSection === 1 ? "text-blue-600 font-semibold" : "text-gray-500"}`}>
                    Personal Details
                  </span>
                </div>
                <div className="w-1/4 text-center">
                  <span className={`text-sm font-medium ${currentSection === 2 ? "text-blue-600 font-semibold" : "text-gray-500"}`}>
                    Education
                  </span>
                </div>
                <div className="w-1/4 text-center">
                  <span className={`text-sm font-medium ${currentSection === 3 ? "text-blue-600 font-semibold" : "text-gray-500"}`}>
                    Preferences
                  </span>
                </div>
                <div className="w-1/4 text-center">
                  <span className={`text-sm font-medium ${currentSection === 4 ? "text-blue-600 font-semibold" : "text-gray-500"}`}>
                    Additional Details
                  </span>
                </div>
              </div>
              
              {/* Mobile labels with proper alignment */}
              <div className="w-full flex sm:hidden justify-between mb-2">
                <div className="w-1/4 text-center">
                  <span className={`text-xs font-medium ${currentSection === 1 ? "text-blue-600 font-semibold" : "text-gray-500"}`}>
                    Personal
                  </span>
                </div>
                <div className="w-1/4 text-center">
                  <span className={`text-xs font-medium ${currentSection === 2 ? "text-blue-600 font-semibold" : "text-gray-500"}`}>
                    Education
                  </span>
                </div>
                <div className="w-1/4 text-center">
                  <span className={`text-xs font-medium ${currentSection === 3 ? "text-blue-600 font-semibold" : "text-gray-500"}`}>
                    Preferences
                  </span>
                </div>
                <div className="w-1/4 text-center">
                  <span className={`text-xs font-medium ${currentSection === 4 ? "text-blue-600 font-semibold" : "text-gray-500"}`}>
                    Additional
                  </span>
                </div>
              </div>

              {/* Progress circles and connecting lines */}
              <div className="flex items-center w-full">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="flex items-center w-1/4">
                    <div className="flex justify-center w-full">
                      <div
                        className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm ${
                          currentSection >= index + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
                        }`}
                      >
                        {index + 1}
                      </div>
                    </div>
                    
                    {index < 3 && (
                      <div className="h-0.5 w-full bg-gray-200 -ml-2">
                        <div
                          className={`h-full bg-blue-600 transition-all duration-300 ${
                            currentSection > index + 1 ? "w-full" : "w-0"
                          }`}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Form Fields */}
          <div className="relative overflow-hidden">
            {currentSection === 1 && (
              <form className="w-full grid grid-cols-1 gap-6 sm:gap-y-4 sm:px-4 sm:w-full">
                {/* First Name Field */}
                <div className="flex flex-col w-full">
                  <label className="flex items-center text-md font-medium text-gray-700 mb-2">
                    <User className="mr-2 text-blue-500" size={18} />
                    First Name <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="candidate_first_name"
                    value={formData.candidate_first_name}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900  
                      transition-all duration-300 hover:border-blue-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:w-full"
                    placeholder="Enter first name"
                    required
                  />
                </div>
  
  <div className="flex flex-col w-full">
    <label className="flex items-center text-md font-medium text-gray-700 mb-2">
      <User className="mr-2 text-blue-500" size={18} />
      Last Name <span className="text-red-500 ml-1">*</span>
    </label>
    <input
      type="text"
      name="candidate_last_name"
      value={formData.candidate_last_name}
      onChange={handleChange}
      className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
        transition-all duration-300 hover:border-blue-400"
      placeholder="Enter last name"
      required
    />
  </div>

  <div className="flex flex-col w-full">
    <label className="flex items-center text-md font-medium text-gray-700 mb-2">
      <Mail className="mr-2 text-blue-500" size={18} />
      Email <span className="text-red-500 ml-1">*</span>
    </label>
    <input
      type="email"
      name="candidate_email"
      value={formData.candidate_email}
      onChange={handleChange}
      className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
        transition-all duration-300 hover:border-blue-400"
      placeholder="Enter email address"
      required
    />
  </div>
  
  <div className="flex flex-col w-full">
    <label className="flex items-center text-md font-medium text-gray-700 mb-2">
      <Phone className="mr-2 text-blue-500" size={18} />
      Phone Number
    </label>
    <input
      type="tel"
      name="candidate_phone"
      value={formData.candidate_phone}
      onChange={handleChange}
      className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
        transition-all duration-300 hover:border-blue-400"
      placeholder="Enter phone number"
    />
  </div>

  <div className="flex flex-col w-full">
    <label className="flex items-center text-md font-medium text-gray-700 mb-2">
    <MapPin className="mr-2 text-blue-500" size={18} />

      Location <span className="text-red-500 ml-1">*</span>
    </label>
    <input
      type="text"
      name="candidate_location"
      value={formData.candidate_location}
      onChange={handleChange}
      className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
        transition-all duration-300 hover:border-blue-400"
      placeholder="Enter your location"
      required
    />
  </div>

  <div className="flex flex-col w-full">
    <label className="text-md font-medium text-gray-700 mb-2">
      Resume URL <span className="text-red-500 ml-1">*</span>
    </label>
    <input
      type="text"
      name="candidate_resume_link"
      value={formData.candidate_resume_link}
      onChange={handleChange}
      className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
        transition-all duration-300 hover:border-blue-400"
      placeholder="Enter resume URL"
      required
    />
  </div>

  <div className="relative w-full">
    <label className="flex items-center text-md font-medium text-gray-700 mb-2">
      {/* <User className="mr-2 text-blue-500" size={18} /> */}
      Password <span className="text-red-500 ml-1">*</span>
    </label>
    <div className="relative">
      <input
        type={passwordVisible.password ? "text" : "password"}
        name="password"
        value={formData.password}
        onChange={handleChange}
        className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
        transition-all duration-300 hover:border-blue-400"
        placeholder="Create password"
        required
      />
      <button
        type="button"
        onClick={() => togglePasswordVisibility('password')}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
      >
        {passwordVisible.password ? <Eye size={20} /> : <EyeOff size={20} />}
      </button>
    </div>
  </div>

  <div className="relative w-full">
    <label className="flex items-center text-md font-medium text-gray-700 mb-2">
      {/* <User className="mr-2 text-blue-500" size={18} /> */}
      Confirm Password <span className="text-red-500 ml-1">*</span>
    </label>
    <div className="relative">
      <input
        type={passwordVisible.confirmPassword ? "text" : "password"}
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
        transition-all duration-300 hover:border-blue-400"
        placeholder="Confirm password"
        required
      />
      <button
        type="button"
        onClick={() => togglePasswordVisibility('confirmPassword')}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
      >
        {passwordVisible.confirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
      </button>
    </div>
  </div>

  {/* <button type="submit" className="col-span-1 md:col-span-2 bg-blue-600 text-white p-4 rounded-md text-lg font-medium">Next</button> */}
</form>

              )}
              

              {currentSection === 2 && (
                
                    <form className="w-full grid grid-cols-1 gap-6">
                    <div className="w-full">
  {educations.map((edu, index) => (
    <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm bg-gray-50">
      <div className="flex flex-col w-full">
        <label className="flex items-center text-md font-medium text-gray-700 mb-2">
          Institution <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          name="candidate_institute"
          value={edu.candidate_institute}
          onChange={(e) => handleChangeEducation(index, e)}
          className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
      transition-all duration-300 hover:border-blue-400"
          placeholder="Enter institution"
          required
        />
      </div>

      <div className="flex flex-col w-full mt-2">
        <label className="flex items-center text-md font-medium text-gray-700 mb-2">
          Degree <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          name="candidate_degree"
          value={edu.candidate_degree}
          onChange={(e) => handleChangeEducation(index, e)}
          className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
      transition-all duration-300 hover:border-blue-400"
          placeholder="Enter degree"
          required
        />
      </div>

      <div className="flex flex-col w-full mt-2">
        <label className="flex items-center text-md font-medium text-gray-700 mb-2">
          Education Level <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          name="candidate_education"
          value={edu.candidate_education}
          onChange={(e) => handleChangeEducation(index, e)}
          className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
      transition-all duration-300 hover:border-blue-400"
          placeholder="Enter Education Level"
          required
        />
      </div>

      <div className="flex flex-col w-full mt-2">
        <label className="flex items-center text-md font-medium text-gray-700 mb-2">
          CGPA
        </label>
        <input
          type="text"
          name="candidate_score"
          value={edu.candidate_score}
          onChange={(e) => handleChangeEducation(index, e)}
          className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
      transition-all duration-300 hover:border-blue-400"
          placeholder="Enter CGPA"
        />
      </div>

      <div className="flex flex-col w-full mt-2">
        <label className="flex items-center text-md font-medium text-gray-700 mb-2">
          Start Date <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="date"
          name="candidate_start_year"
          value={edu.candidate_start_year}
          onChange={(e) => handleChangeEducation(index, e)}
          className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
      transition-all duration-300 hover:border-blue-400"
          placeholder="Enter start date"
          required
        />
      </div>

      <div className="flex flex-col w-full mt-2">
        <label className="flex items-center text-md font-medium text-gray-700 mb-2">
          End Date <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="date"
          name="candidate_end_year"
          value={edu.candidate_end_year}
          onChange={(e) => handleChangeEducation(index, e)}
          className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
      transition-all duration-300 hover:border-blue-400"
          placeholder="Enter end date"
          required
        />
      </div>

      {educations.length > 1 && (
        <button
          onClick={() => removeEducation(index)}
          className="mt-3 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
        >
          Remove
        </button>
      )}
    </div>
  ))}

  <button
    onClick={addEducation}
    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
  >
    + Add More Education
  </button>
  
</div>

    <div className="w-full">
      {experiences.map((exp, index) => (
        <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm bg-gray-50">
          <div className="flex flex-col w-full">
            <label className="flex items-center text-md font-medium text-gray-700 mb-2">
              Company Name <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="candidate_company"
              value={exp.candidate_company}
              onChange={(e) => handleChangeExp(index, e)}
              className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
        transition-all duration-300 hover:border-blue-400"
              placeholder="Enter company name"
              required
            />
          </div>

          <div className="flex flex-col w-full mt-2">
            <label className="flex items-center text-md font-medium text-gray-700 mb-2">
              Job Role <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="candidate_job_role"
              value={exp.candidate_job_role}
              onChange={(e) => handleChangeExp(index, e)}
              className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
        transition-all duration-300 hover:border-blue-400"
              placeholder="Enter job role"
              required
            />
          </div>
          <div className="flex flex-col w-full mt-2">
            <label className="flex items-center text-md font-medium text-gray-700 mb-2">
              Job Industry <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="candidate_industry"
              value={exp.candidate_industry}
              onChange={(e) => handleChangeExp(index, e)}
              className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
        transition-all duration-300 hover:border-blue-400"
              placeholder="Enter job industry"
              required
            />
          </div>
          <div className="flex flex-col w-full mt-2">
            <label className="flex items-center text-md font-medium text-gray-700 mb-2">
              Job Type <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="candidate_job_type"
              value={exp.candidate_job_type}
              onChange={(e) => handleChangeExp(index, e)}
              className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
        transition-all duration-300 hover:border-blue-400"
              placeholder="Enter job type"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="flex flex-col w-full">
              <label className="flex items-center text-md font-medium text-gray-700 mb-2">
                Start Date <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="date"
                name="candidate_start_date"
                value={exp.candidate_start_date}
                onChange={(e) => handleChangeExp(index, e)}
                className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
        transition-all duration-300 hover:border-blue-400"
                required
              />
            </div>

            <div className="flex flex-col w-full">
              <label className="flex items-center text-md font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                name="candidate_end_date"
                value={exp.candidate_end_date}
                onChange={(e) => handleChangeExp(index, e)}
                className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
        transition-all duration-300 hover:border-blue-400"
              />
            </div>
          </div>

          {experiences.length > 1 && (
            <button
              onClick={() => removeExperience(index)}
              className="mt-3 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <button
        onClick={addExperience}
    
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
        
      >
        + Add More Experience
      </button>
    </div>
  {/* <button type="submit" className="col-span-1 md:col-span-2 bg-blue-600 text-white p-4 rounded-md text-lg font-medium">Next</button> */}
</form>
                  

              )}

              {currentSection === 3 && (
                <form className="w-full grid grid-cols-1 gap-6">
  <div className="flex flex-col w-full">
    <label className="flex items-center text-md font-medium text-gray-700 mb-2">
      {/* <User className="mr-2 text-blue-500" size={18} /> */}
     Work Authorization <span className="text-red-500 ml-1">*</span>
    </label>
    <input
      type="text"
      name="work_authorization"
      value={formData.work_authorization}
      onChange={handleChange}
      className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
        transition-all duration-300 hover:border-blue-400"
      placeholder="Yes/No"
      required
    />
  </div>
  
  <div className="flex flex-col w-full">
    <label className="flex items-center text-md font-medium text-gray-700 mb-2">
      {/* <User className="mr-2 text-blue-500" size={18} /> */}
      Expected Salary <span className="text-red-500 ml-1">*</span>
    </label>
    <input
      type="text"
      name="expected_salary"
      value={formData.expected_salary}
      onChange={handleChange}
      className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
        transition-all duration-300 hover:border-blue-400"
      placeholder="Enter in LPA"
      required
    />
  </div>

  <div className="flex flex-col w-full">
    <label className="flex items-center text-md font-medium text-gray-700 mb-2">
      {/* <Mail className="mr-2 text-blue-500" size={18} /> */}
      Preferred Industry <span className="text-red-500 ml-1">*</span>
    </label>
    <input
      type="text"
      name="preferred_industry"
      value={formData.preferred_industry}
      onChange={handleChange}
      className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
        transition-all duration-300 hover:border-blue-400"
      placeholder="Enter Preferred Industry"
      required
    />
  </div>
  
  <div className="flex flex-col w-full">
    <label className="flex items-center text-md font-medium text-gray-700 mb-2">
      {/* <Phone className="mr-2 text-blue-500" size={18} /> */}
      Preferred Location
    </label>
    <input
      type="text"
      name="preferred_work_location"
      value={formData.preferred_work_location}
      onChange={handleChange}
      className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
        transition-all duration-300 hover:border-blue-400"
      placeholder="Enter Preferred Location"
    />
  </div>

  

  <div className="flex flex-col w-full">
    <label className="text-md font-medium text-gray-700 mb-2">
      Availability <span className="text-red-500 ml-1">*</span>
    </label>
    <input
      type="number"
      name="candidate_availability"
      value={formData.candidate_availability}
      onChange={handleChange}
      className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
        transition-all duration-300 hover:border-blue-400"
      placeholder="Availability in days"
      required
    />
  </div>

  <div className="relative w-full">
    <label className="flex items-center text-md font-medium text-gray-700 mb-2">
      {/* <User className="mr-2 text-blue-500" size={18} /> */}
      Remote Work <span className="text-red-500 ml-1">*</span>
    </label>
    <div className="relative">
      <input
        type="text"
        name="RemoteWork"
        value={formData.RemoteWork}
        onChange={handleChange}
        className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
        transition-all duration-300 hover:border-blue-400"
        placeholder="Open to Remote Work"
        required
      />
      {/* <button
        type="button"
        onClick={() => togglePasswordVisibility('password')}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
      >
        {passwordVisible.password ? <Eye size={20} /> : <EyeOff size={20} />}
      </button> */}
    </div>
  </div>

  <div className="relative w-full">
    <label className="flex items-center text-md font-medium text-gray-700 mb-2">
      {/* <User className="mr-2 text-blue-500" size={18} /> */}
      Job Preference<span className="text-red-500 ml-1">*</span>
    </label>
    <div className="relative">
      <input
        type="text"
        name="job_preference"
        value={formData.job_preference}
        onChange={handleChange}
        className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
        transition-all duration-300 hover:border-blue-400"
        placeholder="Enter Job Preference "
        required
      />
      {/* <button
        type="button"
        onClick={() => togglePasswordVisibility('confirmPassword')}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
      >
        {passwordVisible.confirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
      </button> */}
    </div>
  </div>

  {/* <button type="submit" className="col-span-1 md:col-span-2 bg-blue-600 text-white p-4 rounded-md text-lg font-medium">Next</button> */}
</form>
              )}
              {currentSection === 4 && (
                <form className="w-full grid grid-cols-1 gap-6">
  <div className="flex flex-col w-full">
    <label className="flex items-center text-md font-medium text-gray-700 mb-2">
    <MapPin className="mr-2 text-blue-500" size={18} />

      Country <span className="text-red-500 ml-1">*</span>
    </label>
    <input
      type="text"
      name="candidate_country"
      value={formData.candidate_country}
      onChange={handleChange}
      className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
        transition-all duration-300 hover:border-blue-400"
      placeholder="Enter Native Country"
      required
    />
  </div>
  
  <div className="flex flex-col w-full">
    <label className="flex items-center text-md font-medium text-gray-700 mb-2">
    <MapPin className="mr-2 text-blue-500" size={18} />

      Nationality <span className="text-red-500 ml-1">*</span>
    </label>
    <input
      type="text"
      name="candidate_nationality"
      value={formData.candidate_nationality}
      onChange={handleChange}
      className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
        transition-all duration-300 hover:border-blue-400"
      placeholder="Enter Nationality"
      required
    />
  </div>

  <div className="flex flex-col w-full">
    <label className="flex items-center text-md font-medium text-gray-700 mb-2">
      {/* <Mail className="mr-2 text-blue-500" size={18} /> */}
      Gender <span className="text-red-500 ml-1">*</span>
    </label>
    <input
      type="text"
      name="candidate_gender"
      value={formData.candidate_gender}
      onChange={handleChange}
      className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
        transition-all duration-300 hover:border-blue-400"
      placeholder="Enter your Gender"
      required
    />
  </div>
  
  <div className="flex flex-col w-full">
    <label className="flex items-center text-md font-medium text-gray-700 mb-2">
      {/* <Phone className="mr-2 text-blue-500" size={18} /> */}
      Date of Birth
    </label>
    <input
      type="date"
      name="candidate_date_of_birth"
      value={formData.candidate_date_of_birth}
      onChange={handleChange}
      className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
        transition-all duration-300 hover:border-blue-400"
      placeholder="Enter Date of Birth"
    />
  </div>

  <div className="flex flex-col w-full">
    <label className="flex items-center text-md font-medium text-gray-700 mb-2">
      {/* <User className="mr-2 text-blue-500" size={18} /> */}
      LinkedIn URL <span className="text-red-500 ml-1">*</span>
    </label>
    <input
      type="url"
      name="candidate_linkedin_link"
      value={formData.candidate_linkedin_link}
      onChange={handleChange}
      className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
        transition-all duration-300 hover:border-blue-400"
      placeholder="Enter your LinkedIn URL"
      required
    />
  </div>

  <div className="flex flex-col w-full">
    <label className="text-md font-medium text-gray-700 mb-2">
      GitHub URL <span className="text-red-500 ml-1">*</span>
    </label>
    <input
      type="url"
      name="candidate_github_link"
      value={formData.candidate_github_link}
      onChange={handleChange}
      className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
        transition-all duration-300 hover:border-blue-400"
      placeholder="Enter your GitHub URL"
      required
    />
  </div>

  <div className="relative w-full">
    <label className="flex items-center text-md font-medium text-gray-700 mb-2">
      {/* <User className="mr-2 text-blue-500" size={18} /> */}
      Physically Disabled <span className="text-red-500 ml-1">*</span>
    </label>
    <div className="relative">
      <input
        type='text'
        name="pwd"
        value={formData.pwd}
        onChange={handleChange}
        className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
        transition-all duration-300 hover:border-blue-400"
        placeholder="Yes/No"
        required
      />
      {/* <button
        type="button"
        onClick={() => togglePasswordVisibility('password')}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
      >
        {passwordVisible.password ? <Eye size={20} /> : <EyeOff size={20} />}
      </button> */}
    </div>
  </div>

  <div className="relative w-full">
    <label className="flex items-center text-md font-medium text-gray-700 mb-2">
      <User className="mr-2 text-blue-500" size={18} />
      Veteran Status <span className="text-red-500 ml-1">*</span>
    </label>
    <div className="relative">
      <input
        type='text'
        name="veteran_status"
        value={formData.veteran_status}
        onChange={handleChange}
        className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900  
        transition-all duration-300 hover:border-blue-400"
        placeholder="Yes/No"
        required
      />
      {/* <button
        type="button"
        onClick={() => togglePasswordVisibility('confirmPassword')}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
      >
        {passwordVisible.confirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
      </button> */}
    </div>
  </div>

  {/* <button type="submit" className="col-span-1 md:col-span-2 bg-blue-600 text-white p-4 rounded-md text-lg font-medium">Next</button> */}
</form>
              )}
            </div>
            <div className="flex justify-between mt-8">
              {currentSection > 1 && (
                <button type="button" onClick={previousSection} className="flex items-center px-6 py-2.5 text-white font-medium rounded-lg
                hover:bg-blue-700 bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300
                transition-colors duration-300">
                  Previous
                </button>
              )}
              {currentSection < 4 ? (
                <button 
  type="button" // Ensure it's not a submit button
  onClick={nextSection} 
  className="flex items-center ml-auto px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg
  hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300
  transition-colors duration-300">
  Next
</button>

              ) : (
                <button type="submit" className="flex items-center ml-auto px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg
                hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300
                transition-colors duration-300">
                  Create Account
                  
                </button>
                
              )}
             
            </div>

            <div className="text-center mt-4">
              <p className="text-xs sm:text-sm text-black">
                Already have an account?{' '}
                <Link to="/candidate/login" onClick={navigateToLogin} className="text-blue-600 font-semibold hover:text-blue-600 transition-colors">
                  Login
                </Link>
              </p>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>

  )
}

export default CandidateSignUp;

