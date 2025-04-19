import React from "react";

// const Register = () => {
//   return (
//     <div>
//       <div className="min-h-screen flex items-center justify-center">
//         <h1 className="text-4xl font-bold text-gray-800">Candidates Dashboard</h1>
//       </div>
//     </div>
//   );
// };

// export default Register;

import { useState } from 'react';
import { Upload, File, Briefcase, X, Check, AlertCircle, ChevronRight, ChevronLeft, Search, Users, Award, Star, Clock, Laptop, Shield, FileText, CheckCircle2, BarChart, User } from 'lucide-react';
import axios from 'axios';
// import { BASEURL1 } from '../../../utility/config';

export default function Register() {
  // State for wizard steps
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeFiles, setResumeFiles] = useState([]);
  const [jobDescriptionFile, setJobDescriptionFile] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // null, 'success', 'error'
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleResumeUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    const pdfFiles = newFiles.filter(file => file.type === 'application/pdf');

    setResumeFiles([...resumeFiles, ...pdfFiles]);
  };

  const handleJobDescriptionUpload = (e) => {
    // if (e.target.files.length > 0 && e.target.files[0].type === 'application/pdf') {
    //   setJobDescriptionFile(e.target.files[0]);
    // }
    const newFiles = Array.from(e.target.files);
    const pdfFiles = newFiles.filter(file => file.type === 'application/pdf');

    setJobDescriptionFile([...jobDescriptionFile, ...pdfFiles])
  };

  const removeResumeFile = (indexToRemove) => {
    setResumeFiles(resumeFiles.filter((_, index) => index !== indexToRemove));
  };

  const removeJobDescriptionFile = (indexToRemove) => {
    setJobDescriptionFile(jobDescriptionFile.filter((_, index) => index !== indexToRemove));
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (resumeFiles.length === 0 || jobDescriptionFile.length === 0) {
      setUploadStatus('error');
      return;
    }
  
    const formData = new FormData();
    resumeFiles.forEach(file => {
      formData.append('resumes', file);
    });
    jobDescriptionFile.forEach(file => {
      formData.append('job_desc', file);
    });
  
    try {
      setProcessing(true);
  
      // Start timer
      const startTime = performance.now();
  
      const res = await axios.post(`http://localhost:3000/employers/Job_Filters`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
  
      // End timer
      const endTime = performance.now();
      const durationInSeconds = ((endTime - startTime) / 1000).toFixed(2);
      console.log(`Response received in ${durationInSeconds} seconds`);
      console.log(res?.data);
  
      setIsUploading(false);
      setProcessing(false);
      setCompleted(true);
      setUploadStatus('success');
    } catch (err) {
      console.log(err);
      setIsUploading(false);
      setProcessing(false);
      setCompleted(false);
      setUploadStatus('error');
    }
  };
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   if (resumeFiles.length === 0 || jobDescriptionFile.length === 0) {
  //     setUploadStatus('error');
  //     return;
  //   }
  
  //   // Create a FormData object
  //   const formData = new FormData();
    
  //   // Append each resume file to the FormData object
  //   resumeFiles.forEach(file => {
  //     formData.append('resumes', file);
  //   });
    
  //   // Append each job description file to the FormData object
  //   jobDescriptionFile.forEach(file => {
  //     formData.append('job_desc', file);
  //   });
  
  //   console.log(formData)
  //   try {
  //     setProcessing(true);
  //     const res = await axios.post(`http://localhost:3000/employers/Job_Filters`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //       withCredentials: true,
  //     });
  
  //     console.log(res?.data);
  
  //     setIsUploading(false);
  //     setProcessing(false);
  //     setCompleted(true);
  //     setUploadStatus('success');
  //   } catch (err) {
  //     console.log(err);
  //     setIsUploading(false);
  //     setProcessing(false);
  //     setCompleted(false);
  //     setUploadStatus('error');
  //   }
  // };
  
  const renderStepIndicator = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-center">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-12 h-12 rounded-full shadow-md transition-all duration-300 ${currentStep >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              1
            </div>
            <div className={`w-16 h-1 sm:w-32 transition-all duration-300 ${currentStep >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-12 h-12 rounded-full shadow-md transition-all duration-300 ${currentStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              2
            </div>
            <div className={`w-16 h-1 sm:w-32 transition-all duration-300 ${currentStep >= 3 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-12 h-12 rounded-full shadow-md transition-all duration-300 ${currentStep >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              3
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-3">
          <div className="flex text-sm text-gray-500 space-x-20 sm:space-x-40">
            <span className={currentStep === 1 ? 'font-semibold text-indigo-600' : ''}>Upload Resumes</span>
            <span className={currentStep === 2 ? 'font-semibold text-indigo-600' : ''}>Job Description</span>
            <span className={currentStep === 3 ? 'font-semibold text-indigo-600' : ''}>Process</span>
          </div>
        </div>
      </div>
    );
  };

  const renderStep1 = () => {
    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 mb-5 shadow-lg">
            <Users className="text-white" size={36} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Upload Candidate Resumes</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Select all candidate resumes for evaluation. Our AI system will analyze each resume for relevant skills and experience.</p>
        </div>

        <div className="border-2 border-dashed border-indigo-200 rounded-xl p-10 flex flex-col items-center justify-center bg-gradient-to-b from-white to-indigo-50 shadow-sm hover:shadow-md transition-all duration-300">
          <Upload className="text-indigo-500 mb-4" size={48} />
          <p className="text-base text-gray-600 mb-2">Drag and drop PDF files here or click to browse</p>
          <p className="text-sm text-gray-400 mb-5">Accepted file types: PDF only</p>

          <label className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg">
            <span className="font-medium">Select Resume Files</span>
            <input
              type="file"
              multiple
              accept=".pdf"
              className="hidden"
              onChange={handleResumeUpload}
            />
          </label>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <FileText className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Resume Analysis</h3>
                <p className="text-sm text-gray-500">Extract skills, experience & education</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
                <CheckCircle2 className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Smart Matching</h3>
                <p className="text-sm text-gray-500">AI-powered job fit assessment</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg mr-4">
                <BarChart className="text-purple-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Ranking System</h3>
                <p className="text-sm text-gray-500">Objective candidate comparison</p>
              </div>
            </div>
          </div>
        </div>

        {/* File List */}
        {resumeFiles.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg text-gray-800">Selected Resumes ({resumeFiles.length})</h3>
              {resumeFiles.length > 0 && (
                <button
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                  onClick={() => setResumeFiles([])}
                >
                  Clear all
                </button>
              )}
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md">
              <ul className="space-y-3 max-h-64 overflow-y-auto">
                {resumeFiles.map((file, index) => (
                  <li key={index} className="flex items-center justify-between bg-indigo-50 px-5 py-4 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-colors">
                    <div className="flex items-center">
                      <File className="text-indigo-500 mr-3" size={20} />
                      <span className="text-sm font-medium text-gray-800 truncate max-w-xs">{file.name}</span>
                      <span className="ml-2 text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeResumeFile(index)}
                      className="text-gray-500 hover:text-red-500 p-1.5 bg-white rounded-full hover:bg-red-50 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="flex justify-end mt-10">
          <button
            type="button"
            onClick={nextStep}
            disabled={resumeFiles.length === 0}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg font-medium"
          >
            Next Step
            <ChevronRight className="ml-2" size={20} />
          </button>
        </div>
      </div>
    );
  };

  const renderStep2 = () => {
    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 mb-5 shadow-lg">
            <Briefcase className="text-white" size={36} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Upload Job Description</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Provide the job description to match against candidate resumes. Our AI will extract key requirements and skills automatically.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="border-2 border-dashed border-indigo-200 rounded-xl p-10 flex flex-col items-center justify-center bg-gradient-to-b from-white to-indigo-50 shadow-sm hover:shadow-md transition-all duration-300">
            <Upload className="text-indigo-500 mb-4" size={48} />
            <p className="text-base text-gray-600 mb-2">Upload job description as PDF</p>
            <p className="text-sm text-gray-400 mb-5">We'll extract requirements and skills automatically</p>

            <label className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg">
              <span className="font-medium">Select Job Description File</span>
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleJobDescriptionUpload}
              />
            </label>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <h3 className="font-semibold text-lg text-gray-800 mb-4">How It Works</h3>

            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 p-1 bg-indigo-100 rounded-full mt-1">
                  <Check className="text-indigo-600" size={16} />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-800">NLP Analysis</p>
                  <p className="text-sm text-gray-500">Our AI extracts key skills, experience levels, and qualifications from your job posting</p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="flex-shrink-0 p-1 bg-indigo-100 rounded-full mt-1">
                  <Check className="text-indigo-600" size={16} />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-800">Requirement Mapping</p>
                  <p className="text-sm text-gray-500">Job requirements are categorized and weighted based on importance</p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="flex-shrink-0 p-1 bg-indigo-100 rounded-full mt-1">
                  <Check className="text-indigo-600" size={16} />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-800">Intelligent Matching</p>
                  <p className="text-sm text-gray-500">Resumes are analyzed against these requirements using our proprietary algorithm</p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="flex-shrink-0 p-1 bg-indigo-100 rounded-full mt-1">
                  <Check className="text-indigo-600" size={16} />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-800">Ranked Results</p>
                  <p className="text-sm text-gray-500">Candidates are scored and ranked by match percentage to your job needs</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Show uploaded job description file */}
        {jobDescriptionFile && (
          jobDescriptionFile?.map((file, index) => (
            <div className="mt-8">
              <h3 className="font-semibold text-lg text-gray-800 mb-4">Selected Job Description</h3>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md">
                <div className="flex items-center justify-between bg-green-50 px-5 py-4 rounded-lg border border-green-100">
                  <div className="flex items-center">
                    <File className="text-green-500 mr-3" size={20} />
                    <span className="text-sm font-medium text-gray-800 truncate max-w-xs">{file.name}</span>
                    <span className="ml-2 text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeJobDescriptionFile(index)}
                    className="text-gray-500 hover:text-red-500 p-1.5 bg-white rounded-full hover:bg-red-50 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}

        <div className="flex justify-between mt-10">
          <button
            type="button"
            onClick={prevStep}
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-300 shadow-sm hover:shadow"
          >
            <ChevronLeft className="mr-2" size={20} />
            Previous
          </button>

          <button
            type="button"
            onClick={nextStep}
            disabled={!jobDescriptionFile}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg font-medium"
          >
            Next Step
            <ChevronRight className="ml-2" size={20} />
          </button>
        </div>
      </div>
    );
  };

  const renderStep3 = () => {
    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 mb-5 shadow-lg">
            <Search className="text-white" size={36} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Process Files</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Review your uploads and start the AI-powered screening process to find your ideal candidates</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-md">
            <h3 className="font-semibold text-xl text-gray-800 mb-6">Summary</h3>

            <div className="space-y-5">
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 bg-indigo-100 rounded-lg mr-4">
                    <Users className="text-indigo-600" size={24} />
                  </div>
                  <span className="font-medium text-lg">Candidate Resumes</span>
                </div>
                <span className="bg-indigo-100 text-indigo-800 px-4 py-1.5 rounded-full text-sm font-medium">{resumeFiles.length} files</span>
              </div>

              <div className="flex items-center justify-between py-4">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg mr-4">
                    <Briefcase className="text-purple-600" size={24} />
                  </div>
                  <span className="font-medium text-lg">Job Description</span>
                </div>
                <span className="bg-purple-100 text-purple-800 px-4 py-1.5 rounded-full text-sm font-medium">1 file</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <h4 className="font-medium text-gray-700 mb-3">Processing Time</h4>
              <div className="flex items-center">
                <Clock className="text-gray-400 mr-2" size={18} />
                <span className="text-gray-600">Estimated Time: <span className="font-medium text-gray-800">~1-2 minutes</span></span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 p-8 shadow-md">
            <h3 className="font-semibold text-xl text-gray-800 mb-6">Benefits of AI Screening</h3>

            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 p-2 bg-green-100 rounded-full mt-1">
                  <Clock className="text-green-600" size={18} />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-800">Save 80% of Time</p>
                  <p className="text-sm text-gray-600">Reduce resume screening time from hours to minutes</p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full mt-1">
                  <Star className="text-blue-600" size={18} />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-800">Eliminate Bias</p>
                  <p className="text-sm text-gray-600">AI focuses only on skills and qualifications</p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="flex-shrink-0 p-2 bg-purple-100 rounded-full mt-1">
                  <Laptop className="text-purple-600" size={18} />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-800">Smart Analysis</p>
                  <p className="text-sm text-gray-600">Uncover hidden talent and overlooked skills</p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="flex-shrink-0 p-2 bg-indigo-100 rounded-full mt-1">
                  <Shield className="text-indigo-600" size={18} />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-800">Secure & Private</p>
                  <p className="text-sm text-gray-600">All data encrypted and processed securely</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-between mt-10">
          <button
            type="button"
            onClick={prevStep}
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-300 shadow-sm hover:shadow"
          >
            <ChevronLeft className="mr-2" size={20} />
            Previous
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isUploading || processing}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg font-medium"
          >
            {isUploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading Files...
              </>
            ) : processing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Running AI Analysis...
              </>
            ) : "Start Candidate Screening"}
          </button>
        </div>
      </div>
    );
  };

  const renderCompletedScreen = () => {
    return (
      <div className="text-center space-y-8 py-8">
        <div className="mx-auto flex items-center justify-center h-28 w-28 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg">
          <Check className="h-14 w-14 text-white" />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800">Screening Completed!</h2>
          <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
            We've successfully processed {resumeFiles.length} resumes against your job description and identified top matches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mx-auto mb-4">
              <User className="text-blue-600" size={24} />
            </div>
            <h3 className="font-semibold text-lg mb-2">75 Skills</h3>
            <p className="text-gray-600 text-sm">Total unique skills identified across all candidates</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 mx-auto mb-4">
              <Award className="text-purple-600" size={24} />
            </div>
            <h3 className="font-semibold text-lg mb-2">3 Top Matches</h3>
            <p className="text-gray-600 text-sm">Candidates with 90%+ match to job requirements</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mx-auto mb-4">
              <CheckCircle2 className="text-green-600" size={24} />
            </div>
            <h3 className="font-semibold text-lg mb-2">100% Complete</h3>
            <p className="text-gray-600 text-sm">All resumes successfully processed</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-4xl mx-auto shadow-lg">
          <h3 className="font-semibold text-xl text-gray-800 mb-6 flex items-center justify-center">
            <Award className="text-indigo-500 mr-3" size={24} />
            Top Candidates
          </h3>

          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center mr-4 shadow-md">
                    <span className="font-semibold text-white">{index + 1}</span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">Jane Smith {index + 1}</p>
                    <div className="flex items-center mt-1">
                      <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-2">
                        <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${100 - index * 7}%` }}></div>
                      </div>
                      <span className="text-sm text-indigo-700 font-medium">{100 - index * 7}%</span>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg transition-colors font-medium">
                  View Profile
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg font-medium">
              View Complete Results
            </button>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => {
              setCurrentStep(1);
              setResumeFiles([]);
              setJobDescriptionFile(null);
              setUploadStatus(null);
              setCompleted(false);
            }}
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-300 shadow-sm hover:shadow"
          >
            Start New Screening
          </button>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (completed) {
      return renderCompletedScreen();
    }

    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return renderStep1();
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {!completed && renderStepIndicator()}

      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-gray-100">
        {uploadStatus === 'error' && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <AlertCircle className="text-red-500 mr-3" size={20} />
            <p className="text-red-700">Please upload at least one resume and a job description to continue.</p>
          </div>
        )}

        {renderContent()}
      </div>
    </div>
  );
}