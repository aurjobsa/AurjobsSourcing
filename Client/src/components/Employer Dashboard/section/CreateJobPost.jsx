import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Blocks,
  FileText,
  GraduationCap,
  Send,
  Building,
  Globe,
  X,
  CheckCircle,
  IndianRupee,
} from "lucide-react";
import { BASEURL, BASEURL1 } from "../../../utility/config";

const CreateJobPost = () => {
  const { employerProfile } = useSelector((state) => state.employer);
  const [formData, setFormData] = useState({
    job_title: "",
    job_description: "",
    employment_type: "",
    work_mode: "",
    job_location: "",
    remote: false,
    salary_range: "",
    job_experience_required: "",
    job_skills_required: [],
    industry: "",
    status: "Open",
    posted_at: new Date().toISOString().split("T")[0],
    employer_id: employerProfile?.employer_id,
  });

  const [skillInput, setSkillInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Manufacturing",
    "Retail",
    "Marketing",
    "Media & Entertainment",
    "Real Estate",
    "Transportation",
    "Energy",
    "Construction",
    "Agriculture",
    "Hospitality",
    "Telecommunications",
    "Consulting",
    "Aerospace",
    "Automotive",
    "Biotechnology",
    "E-commerce",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSkillInputChange = (e) => {
    setSkillInput(e.target.value);
  };

  const handleSkillAdd = () => {
    if (skillInput.trim() && !formData.job_skills_required.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        job_skills_required: [...prev.job_skills_required, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && skillInput.trim()) {
      e.preventDefault();
      handleSkillAdd();
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      job_skills_required: prev.job_skills_required.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.job_skills_required.length === 0) {
      setError("Please add at least one skill.");
      return;
    }

    try {
      const response = await axios.post(`${BASEURL1}/jobs_post/create_Job_Post`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status === 201) {
        setShowModal(true);
        setFormData({
          job_title: "",
          job_description: "",
          employment_type: "",
          work_mode: "",
          job_location: "",
          remote: false,
          salary_range: "",
          job_experience_required: "",
          job_skills_required: [],
          industry: "",
          status: "Open",
          posted_at: new Date().toISOString().split("T")[0],
        });
        setSkillInput("");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to create job post. Please try again.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-blue-200" strokeWidth={2} />
              Create Job Post
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
                {error}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Job Title */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-600">
                    <Briefcase className="w-5 h-5 text-emerald-500" />
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="job_title"
                    value={formData.job_title}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>

                {/* Job Description */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <FileText className="w-5 h-5 text-purple-500" />
                    Job Description
                  </label>
                  <textarea
                    name="job_description"
                    value={formData.job_description}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 h-32"
                    required
                  />
                </div>

                {/* Employment Type */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Clock className="w-5 h-5 text-amber-500" />
                    Employment Type
                  </label>
                  <select
                    name="employment_type"
                    value={formData.employment_type}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>

                {/* Work Mode */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Globe className="w-5 h-5 text-cyan-500" />
                    Work Mode
                  </label>
                  <select
                    name="work_mode"
                    value={formData.work_mode}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  >
                    <option value="">Select Work Mode</option>
                    <option value="On-site">On-site</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Location */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <MapPin className="w-5 h-5 text-red-500" />
                    Location
                  </label>
                  <input
                    type="text"
                    name="job_location"
                    value={formData.job_location}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>

                {/* Industry */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Building className="w-5 h-5 text-indigo-500" />
                    Industry
                  </label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  >
                    <option value="">Select Industry</option>
                    {industries.map((industry, index) => (
                      <option key={index} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Salary Range */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <IndianRupee className="w-5 h-5 text-green-500" />
                    Salary Range
                  </label>
                  <input
                    type="text"
                    name="salary_range"
                    value={formData.salary_range}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>

                {/* Experience Required */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <GraduationCap className="w-5 h-5 text-orange-500" />
                    Experience Required
                  </label>
                  <input
                    type="text"
                    name="job_experience_required"
                    value={formData.job_experience_required}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>

                {/* Skills Required */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Blocks className="w-5 h-5 text-teal-500" />
                    Skills Required
                  </label>
                  <div className="border border-gray-300 rounded-lg p-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.job_skills_required.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2 hover:bg-blue-100 transition-colors duration-200"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="text-blue-600 hover:text-blue-800 font-bold"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={skillInput}
                      onChange={handleSkillInputChange}
                      onKeyDown={handleKeyDown}
                      className="w-full border-none focus:outline-none p-1 bg-transparent placeholder-gray-400"
                      placeholder="Type skill and press Enter or comma to add"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg flex items-center justify-center gap-2 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5" />
                Create Job Post
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 scale-100">
            <div className="p-6">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 rounded-full p-3">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Job Posted Successfully!
                </h3>
                <p className="text-gray-600 mb-6">
                  Your job post has been created and is now live for candidates to view.
                </p>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg flex items-center justify-center gap-2 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateJobPost;