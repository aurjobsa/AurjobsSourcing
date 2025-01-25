import React, { useState } from 'react'
// import {  } from 'lucide-react';
import { Check, User, Upload, GraduationCap, Briefcase, Info ,ArrowRight, ArrowLeft, LogIn} from 'lucide-react';
import { Link } from 'react-router-dom';
import PersonalDetails from './CandidateRegister/PersonalDetails';
import MediaUpload from './CandidateRegister/MediaUpload';
import EducationDetails from './CandidateRegister/EducationDetails';
import ExperienceDetails from './CandidateRegister/ExperienceDetails';
import AdditionalDetails from './CandidateRegister/AdditionalDetails';
import SignupProgressSteps from './CandidateRegister/SignupProgressSteps';

const CandidateSignUp = ({ navigateToLogin }) => {

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Section 1: Personal Details
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',

        // Section 2: Upload & Location
        profileImage: null,
        resumeFile: null,
        location: '',

        // Section 3: Education Details
        educationDetails: [{
            educationLevel: '',
            collegeName: '',
            specialisation: '',
            graduationYear: '',
            graduationScore: '',
            twelfthDetails: {
                school: '',
                score: ''
            },
            tenthDetails: {
                school: '',
                score: ''
            }
        }],

        // Section 4: Experience Details
        experienceDetails: [{
            companyName: '',
            currentSalary: '',
            industry: '',
            designation: '',
            startDate: '',
            endDate: '',
            isCurrentRole: false
        }],

        // Section 5: Additional Details
        skills: [],
        certifications: [],
        extraCurricular: [],
        preferredWorkMode: ''
    });

    const [passwordVisible, setPasswordVisible] = useState({
        password: false,
        confirmPassword: false
    });

    const nextStep = () => setCurrentStep(curr => Math.min(curr + 1, 5));
    const prevStep = () => setCurrentStep(curr => Math.max(curr - 1, 1));

    const handleChange = (e, section = null, index = null) => {
        const { name, value, files } = e.target;

        if (section === 'education') {
            const updatedEducation = [...formData.educationDetails];
            updatedEducation[index] = {
                ...updatedEducation[index],
                [name]: value
            };
            setFormData(prev => ({
                ...prev,
                educationDetails: updatedEducation
            }));
            return;
        }

        if (section === 'experience') {
            const updatedExperience = [...formData.experienceDetails];
            updatedExperience[index] = {
                ...updatedExperience[index],
                [name]: value
            };
            setFormData(prev => ({
                ...prev,
                experienceDetails: updatedExperience
            }));
            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const togglePasswordVisibility = (field) => {
        setPasswordVisible(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const addEducationEntry = () => {
        setFormData(prev => ({
            ...prev,
            educationDetails: [...prev.educationDetails, {
                id:Date.now(),
                educationLevel: '',
                collegeName: '',
                specialisation: '',
                graduationYear: '',
                graduationScore: '',
                twelfthDetails: { school: '', score: '' },
                tenthDetails: { school: '', score: '' }
            }]
        }));
    };

    const addExperienceEntry = () => {
        setFormData(prev => ({
            ...prev,
            experienceDetails: [...prev.experienceDetails, {
                id:Date.now(),
                companyName: '',
                currentSalary: '',
                industry: '',
                designation: '',
                startDate: '',
                endDate: '',
                isCurrentRole: false
            }]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add form submission logic
        console.log(formData);

    };

    const removeEducationEntry = (idToRemove) => {
        // Prevent removal if only one entry exists
        if (formData.educationDetails.length > 1) {
          setFormData(prev => ({
            ...prev,
            educationDetails: prev.educationDetails.filter(entry => entry.id !== idToRemove)
          }));
        } else {
          // Optional: Show a toast or alert that at least one education entry is required
          alert("At least one education entry is required.");
        }
      };
      const removeExperienceEntry = (idToRemove) => {
        // Prevent removal if only one entry exists
        if (formData.experienceDetails.length > 1) {
          setFormData(prev => ({
            ...prev,
            experienceDetails: prev.experienceDetails.filter(entry => entry.id !== idToRemove)
          }));
        } else {
          // Optional: Show a toast or alert that at least one education entry is required
          alert("At least one education entry is required.");
        }
      };

      const progressSteps = [
        { icon: User, label: 'Personal Details' },
        { icon: Upload, label: 'Media Upload' },
        { icon: GraduationCap, label: 'Education Details' },
        { icon: Briefcase, label: 'Experience Details' },
        { icon: Info, label: 'Additional Details' }
      ];

    return (



        <div className="min-h-screen font-sans bg-white flex items-center justify-center py-12 px-4">
            <div className="w-[95%] max-w-lg bg-white rounded-lg shadow-lg p-8 overflow-x-hidden max-h-[90vh] scrollbar-hide">
                 <SignupProgressSteps currentStep={currentStep} 
                    progressSteps={progressSteps} />
                
                <div className="space-y-2">
                    <h2 className="text-3xl font-sans font-bold text-black mb-6 text-center">Create a new Account</h2>
                    <p className='text-center'>Join us today!</p>

                    <form autoComplete='off' onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        {/* Section 1: Personal Details */}
                        {currentStep === 1 && (
                            <PersonalDetails
                                formData={formData}
                                handleChange={handleChange}
                                togglePasswordVisibility={togglePasswordVisibility}
                                passwordVisible={passwordVisible}
                                setFormData={setFormData}
                            />
                        )}

                        {/* Section 2: Media Upload */}
                        {currentStep === 2 && (
                            <MediaUpload
                                formData={formData}
                                handleChange={handleChange}
                                togglePasswordVisibility={togglePasswordVisibility}
                                passwordVisible={passwordVisible}
                            />
                        )}

                        {/* Section 3: Education Details */}
                        {currentStep === 3 && (
                            <EducationDetails
                                addEducationEntry={addEducationEntry}
                                formData={formData}
                                handleChange={handleChange}
                                removeEducationEntry={removeEducationEntry}
                            />
                        )}

                        {/* Section 4: Experience Details */}
                        {currentStep === 4 && (
                            <ExperienceDetails
                                formData={formData}
                                handleChange={handleChange}
                                addExperienceEntry={addExperienceEntry}
                                removeExperienceEntry={removeExperienceEntry}
                            />
                        )}

                        {/* Section 5: Additional Details */}
                        {currentStep === 5 && (
                            <AdditionalDetails
                                formData={formData}
                                handleChange={handleChange}
                                setFormData={setFormData}
                            />
                        )}

                        <div className="space-y-4 sm:space-y-6">
                            <div className="flex flex-col md:flex-row sm:flex-row justify-between items-center space-y-3 sm:space-y-0 sm:space-x-4">
                                {currentStep > 1 && (
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="w-full sm:w-auto md:w-auto flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-800 rounded-md shadow-sm hover:bg-gray-200 transition-colors"
                                    >
                                        <ArrowLeft className="mr-2" size={18} />
                                        Previous
                                    </button>
                                )}

                                {currentStep < 5 ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-colors sm:ml-auto"
                                    >
                                        Next
                                        <ArrowRight className="ml-2" size={18} />
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        onClick={handleSubmit}
                                        className="w-full md:w-auto flex items-center justify-center px-4 py-3 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition-colors"
                                    >
                                        <LogIn className="mr-2" size={18} />
                                        Create Account
                                    </button>
                                )}
                            </div>

                            <div className="text-center">
                                <p className="text-xs sm:text-sm text-gray-600">
                                    Already have an account?{' '}
                                    <Link
                                        // to="/candidate_login"
                                        onClick={navigateToLogin}
                                        className="text-blue-500 font-semibold hover:text-blue-600 transition-colors"
                                    >
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default CandidateSignUp
