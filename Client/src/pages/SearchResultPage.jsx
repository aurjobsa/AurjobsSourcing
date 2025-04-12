
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Filter, Settings, Search, Briefcase, MapPin, Mail, Phone, Calendar, Award, Clock, DollarSign, CheckCircle, ChevronUp, ChevronDown, Star, StarHalf, IndianRupee } from 'lucide-react';
import CandidateCard from '../components/CandidateCard';
import { BASEURL } from '../utility/config';

const TalentSearchPage = () => {

    const educationSpecialties = [
        // Computer Science & IT
        "Computer Science",
        "Software Engineering",
        "Data Science",
        "Artificial Intelligence",
        "Cybersecurity",
        "Information Technology",
        "Cloud Computing",
        "Full Stack Development",
        "Machine Learning",
        "Game Development",
        "Mobile App Development",
        "Blockchain Technology",
        "Computer Networking",
        "Database Management",
        "Web Development",
        "Embedded Systems",
        "Human-Computer Interaction",
        "Big Data Analytics",
        "DevOps",
        "Data Engineering",
      
        // Engineering Fields
        "Mechanical Engineering",
        "Electrical Engineering",
        "Electronics and Communication Engineering",
        "Civil Engineering",
        "Automobile Engineering",
        "Aerospace Engineering",
        "Biomedical Engineering",
        "Chemical Engineering",
        "Environmental Engineering",
        "Industrial Engineering",
        "Robotics Engineering",
      
        // Business & Management
        "Business Administration",
        "Finance and Accounting",
        "Marketing",
        "Entrepreneurship",
        "Supply Chain Management",
        "Human Resource Management",
        "Operations Management",
        "E-commerce",
      
        // Health & Medicine
        "Medicine",
        "Nursing",
        "Pharmacy",
        "Dentistry",
        "Physiotherapy",
        "Public Health",
        "Nutrition and Dietetics",
        "Biotechnology",
        "Biomedical Sciences",
        "Veterinary Science",
      
        // Arts & Humanities
        "English Literature",
        "History",
        "Philosophy",
        "Linguistics",
        "Psychology",
        "Sociology",
        "Political Science",
        "International Relations",
        "Education and Teaching",
        "Fine Arts",
        "Music",
        "Theater and Performing Arts",
        "Journalism and Mass Communication",
      
        // Science & Research
        "Physics",
        "Chemistry",
        "Biology",
        "Mathematics",
        "Astronomy",
        "Geology",
        "Environmental Science",
        "Agriculture",
        "Forestry",
        "Marine Biology",
        "Genetics",
      
        // Law & Legal Studies
        "Law",
        "Criminology",
        "Forensic Science",
        "Intellectual Property Law",
        "Corporate Law",
        "International Law",
        "Human Rights Law",
      
        // Social Sciences & Others
        "Social Work",
        "Anthropology",
        "Economics",
        "Urban Planning",
        "Library and Information Science",
      
        // Design & Creative Fields
        "Graphic Design",
        "UI/UX Design",
        "Fashion Design",
        "Interior Design",
        "Industrial Design",
        "Film and Television Production",
        "Animation and Visual Effects",
        "Photography",
      
        // Education & Training
        "Primary Education",
        "Secondary Education",
        "Higher Education",
        "Special Education",
        "Educational Psychology",
        "E-learning and Instructional Design"
      ];
      const degreesList = [
        // Undergraduate Degrees
        "Associate of Arts (AA)",
        "Associate of Science (AS)",
        "Associate of Applied Science (AAS)",
        "Bachelor of Arts (BA)",
        "Bachelor of Science (BS)",
        "Bachelor of Business Administration (BBA)",
        "Bachelor of Commerce (BCom)",
        "Bachelor of Engineering (BE)",
        "Bachelor of Technology (BTech)",
        "Bachelor of Computer Applications (BCA)",
        "Bachelor of Fine Arts (BFA)",
        "Bachelor of Architecture (BArch)",
        "Bachelor of Design (BDes)",
        "Bachelor of Pharmacy (BPharm)",
        "Bachelor of Law (LLB)",
        "Bachelor of Education (BEd)",
        "Bachelor of Social Work (BSW)",
        "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
        "Bachelor of Dental Surgery (BDS)",
        "Bachelor of Nursing (BN)",
        "Bachelor of Public Health (BPH)",
      
        // Postgraduate Degrees
        "Master of Arts (MA)",
        "Master of Science (MS/MSc)",
        "Master of Business Administration (MBA)",
        "Master of Commerce (MCom)",
        "Master of Engineering (ME)",
        "Master of Technology (MTech)",
        "Master of Computer Applications (MCA)",
        "Master of Fine Arts (MFA)",
        "Master of Architecture (MArch)",
        "Master of Design (MDes)",
        "Master of Pharmacy (MPharm)",
        "Master of Law (LLM)",
        "Master of Education (MEd)",
        "Master of Social Work (MSW)",
        "Master of Public Administration (MPA)",
        "Master of Public Health (MPH)",
        "Master of Philosophy (MPhil)",
      
        // Doctorate Degrees
        "Doctor of Philosophy (PhD)",
        "Doctor of Science (DSc)",
        "Doctor of Engineering (DEng)",
        "Doctor of Medicine (MD)",
        "Doctor of Dental Medicine (DMD)",
        "Doctor of Pharmacy (PharmD)",
        "Doctor of Public Health (DrPH)",
        "Doctor of Business Administration (DBA)",
        "Doctor of Education (EdD)",
        "Doctor of Laws (LLD)",
        "Doctor of Social Work (DSW)",
      
        // Professional Degrees
        "Juris Doctor (JD)",
        "Doctor of Veterinary Medicine (DVM)",
        "Doctor of Optometry (OD)",
        "Doctor of Physical Therapy (DPT)",
        "Doctor of Chiropractic (DC)",
        "Doctor of Occupational Therapy (OTD)",
      
        // Diplomas & Certificates
        "Diploma in Engineering",
        "Diploma in Nursing",
        "Diploma in Computer Applications",
        "Postgraduate Diploma (PGD)",
        "Advanced Diploma",
        "Certificate Program"
      ];

    const [allCandidates, setAllCandidates] = useState([]);
    
    // Filtered candidates to display
    const [filteredCandidates, setFilteredCandidates] = useState([]);
    console.log(filteredCandidates)
    const [searchTerm, setSearchTerm] = useState('');
    const [filterVisible, setFilterVisible] = useState(false);
    const [showLeftFilters, setShowLeftFilters] = useState(true);
    const [sortOption, setSortOption] = useState('relevance');
    const [expandedFilters, setExpandedFilters] = useState({
        basicInfo: true,
        experience: true,
        skills: true,
        education: true,
        availability: false,
        compensation: false,
        preferences: false,
        activity: false
    });
    const [loading, setLoading] = useState(false);
    

    // Function to get query parameters from URL
    function getQueryParams() {
        const urlParams = new URLSearchParams(window.location.search);

        // Extract each parameter
        const searchQuery = urlParams.get('q') || '';
        const location = urlParams.get('location') || '';
        const jobType = urlParams.get('jobType') || '';
        const industry = urlParams.get('industry') || '';
        const experience = urlParams.get('experience') || '';
        const skills = urlParams.get('skills') || '';

        // Return as an object
        return {
            searchQuery,
            location,
            jobType,
            industry,
            experience,
            skills
        };
    }

    // Get URL parameters
    const params = getQueryParams();

    // Primary search filters (displayed at top) - Initialize from URL params
    // Skills and experience are included here as primary filters
    const [primaryFilters, setPrimaryFilters] = useState({
        jobRole: params.searchQuery || "",
        industry: params.industry || "",
        experience: params.experience || "",
        location: params.location || "",
        skills: params.skills || ""
    });

    // Build dynamic applied filters from URL parameters
    const buildAppliedFiltersFromParams = () => {
        const filters = [];

        if (params.searchQuery) {
            filters.push({ key: "jobRole", value: params.searchQuery });
        }

        if (params.location) {
            filters.push({ key: "location", value: params.location });
        }

        if (params.industry) {
            filters.push({ key: "industry", value: params.industry });
        }

        if (params.experience) {
            filters.push({ key: "experience", value: params.experience });
        }

        if (params.skills) {
            // If skills is comma-separated, split and add each skill
            const skillsList = params.skills.split(',');
            skillsList.forEach(skill => {
                if (skill.trim()) {
                    filters.push({ key: "skills", value: skill.trim() });
                }
            });
        }

        if (params.jobType) {
            filters.push({ key: "jobType", value: params.jobType });
        }

        // Return default filters if no parameters found
        // return filters.length > 0 ? filters : "No Primary filter applied";
        return filters
    };

    // Applied filters to be shown as chips - Initialize from URL params
    const [appliedFilters, setAppliedFilters] = useState(buildAppliedFiltersFromParams());

    // Advanced filters state - Removed skills and experience
    const [advancedFilters, setAdvancedFilters] = useState({
        // Education section
        degree: "Any",
        university: "",
        graduationYear: "Any",
        specialization: "Any",
        educationDegree: "Any",

        // Employment section
        currentTitle: "",
        currentCompany: "",
        industry: params.industry || "Any",

        // Compensation section
        minSalary: "",
        maxSalary: "",

        minSalaryExpected:"",
        maxSalaryExpected:"",

        // Availability
        availableFrom: "Any",

        // Preferences
        workType: 'Any',
        language: 'Any',
        workAuthorization: 'Any',
        companySize: 'Any',
        womenInTech: false,
        veteranStatus: false,
        pwd: false,
        willingToRelocate: false,
        remoteOnly: false,
        openToTravel: false,

        // Activity
        lastActive: "Any",
        responseRate: "Any"
    });

    const fetchCandidates = async () => {
        console.log("API Initiated");
        try {
            const res = await axios.get(
                `${BASEURL}/candidates/search_candidates?job_role=${params.searchQuery || ''}&industry=${params.industry || ''}&job_experience_required=${params.experience || ''}&job_location=${params.location || ''}&job_skills_required=${params.skills || ''}`
            );

            if (res?.data?.data) {
                console.log("Candidates data received:", res.data.data.length);
                setAllCandidates(res.data.data);
                setFilteredCandidates(res.data.data);
            } else {
                console.error("No data received from API");
            }
        } catch (error) {
            console.error("Error fetching candidates:", error);
        }
    };

    // Update URL based on applied filters
    const updateURL = (filters) => {
        const urlParams = new URLSearchParams();

        // Group filters by key
        const filterGroups = {};
        filters.forEach(filter => {
            if (!filterGroups[filter.key]) {
                filterGroups[filter.key] = [];
            }
            filterGroups[filter.key].push(filter.value);
        });

        // Add params to URL
        if (filterGroups.jobRole) {
            urlParams.set('q', filterGroups.jobRole[0]);
        }

        if (filterGroups.location) {
            urlParams.set('location', filterGroups.location[0]);
        }

        if (filterGroups.industry) {
            urlParams.set('industry', filterGroups.industry[0]);
        }

        if (filterGroups.experience) {
            urlParams.set('experience', filterGroups.experience[0]);
        }

        if (filterGroups.skills) {
            urlParams.set('skills', filterGroups.skills.join(','));
        }

        if (filterGroups.jobType) {
            urlParams.set('jobType', filterGroups.jobType[0]);
        }

        if (filterGroups.minSalary) {
            urlParams.set('minSalary', filterGroups.minSalary[0]);
        }

        if (filterGroups.maxSalary) {
            urlParams.set('maxSalary', filterGroups.maxSalary[0]);
        }
        if (filterGroups.minSalaryExpected) {
            urlParams.set('minSalaryExpected', filterGroups.minSalaryExpected[0]);
        }

        if (filterGroups.maxSalaryExpected) {
            urlParams.set('maxSalaryExpected', filterGroups.maxSalaryExpected[0]);
        }
        if (filterGroups.workType) {
            urlParams.set('workType', filterGroups.workType[0]);
        }

        if (filterGroups.language) {
            urlParams.set('language', filterGroups.language[0]);
        }

        if (filterGroups.workAuthorization) {
            urlParams.set('workAuth', filterGroups.workAuthorization[0]);
        }

        // Boolean filters
        if (filterGroups.womenInTech) {
            urlParams.set('womenInTech', 'true');
        }

        if (filterGroups.veteranStatus) {
            urlParams.set('veteran', 'true');
        }

        if (filterGroups.pwd) {
            urlParams.set('pwd', 'true');
        }

        if (filterGroups.willingToRelocate) {
            urlParams.set('relocate', 'true');
        }

        if (filterGroups.openToTravel) {
            urlParams.set('travel', 'true');
        }

        if (filterGroups.remoteOnly) {
            urlParams.set('remote', 'true');
        }


        // Update browser URL without reloading the page
        window.history.pushState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
    };

    const toggleFilter = (filterName) => {
        setExpandedFilters({
            ...expandedFilters,
            [filterName]: !expandedFilters[filterName]
        });
    };

    // Updated to ensure skills uses the correct key
    const applyPrimaryFilters = () => {
        const newFilters = [];

        if (primaryFilters.jobRole) {
            newFilters.push({ key: "jobRole", value: primaryFilters.jobRole });
        }

        if (primaryFilters.industry) {
            newFilters.push({ key: "industry", value: primaryFilters.industry });
        }

        if (primaryFilters.experience) {
            newFilters.push({ key: "experience", value: primaryFilters.experience });
        }

        if (primaryFilters.location) {
            newFilters.push({ key: "location", value: primaryFilters.location });
        }

        // Fixed key for skills filter (was incorrectly "location")
        if (primaryFilters.skills) {
            newFilters.push({ key: "skills", value: primaryFilters.skills });
        }

        setAppliedFilters(newFilters);
        updateURL(newFilters);
        setFilterVisible(false);
    };

    // Modified to handle skills as part of primary filters
    const removeFilter = (filterKey, filterValue) => {
        // Remove specific filter by key and value
        const updatedFilters = appliedFilters.filter(
            filter => !(filter.key === filterKey && filter.value === filterValue)
        );

        setAppliedFilters(updatedFilters);
        updateURL(updatedFilters);



        if (filterKey === 'jobRole') {
            setPrimaryFilters({ ...primaryFilters, jobRole: '' });
        } else if (filterKey === 'industry') {
            setPrimaryFilters({ ...primaryFilters, industry: '' });
        } else if (filterKey === 'experience') {
            setPrimaryFilters({ ...primaryFilters, experience: '' });
        } else if (filterKey === 'location') {
            setPrimaryFilters({ ...primaryFilters, location: '' });
        } else if (filterKey === 'skills') {
            setPrimaryFilters({ ...primaryFilters, skills: '' });
        }
        // Handle advanced filters 
        else if (filterKey === 'degree') {
            setAdvancedFilters({ ...advancedFilters, degree: 'Any' });
        }
        else if (filterKey === 'educationDegree') {
            setAdvancedFilters({ ...advancedFilters, educationDegree: 'Any' });
        }
        else if (filterKey === 'specialization') {
            setAdvancedFilters({ ...advancedFilters, specialization: 'Any' });
        }
        else if (filterKey === 'university') {
            setAdvancedFilters({ ...advancedFilters, university: '' });
        } else if (filterKey === 'graduationYear') {
            setAdvancedFilters({ ...advancedFilters, graduationYear: 'Any' });
        } else if (filterKey === 'currentTitle') {
            setAdvancedFilters({ ...advancedFilters, currentTitle: '' });
        } else if (filterKey === 'employmentType') {
            setAdvancedFilters({ ...advancedFilters, employmentType: 'Any' });
        } else if (filterKey === 'currentCompany') {
            setAdvancedFilters({ ...advancedFilters, currentCompany: '' });
        }
        else if (filterKey === 'minSalary') {
            setAdvancedFilters({ ...advancedFilters, minSalary: '' });
        } else if (filterKey === 'maxSalary') {
            setAdvancedFilters({ ...advancedFilters, maxSalary: '' });
        } else if (filterKey === 'minSalaryExpected') {
            setAdvancedFilters({ ...advancedFilters, minSalaryExpected: '' });
        } else if (filterKey === 'maxSalaryExpected') {
            setAdvancedFilters({ ...advancedFilters, maxSalaryExpected: '' });
        } else if (filterKey === 'workType') {
            setAdvancedFilters({ ...advancedFilters, workType: 'Any' });
        } else if (filterKey === 'language') {
            setAdvancedFilters({ ...advancedFilters, language: 'Any' });
        } else if (filterKey === 'workAuthorization') {
            setAdvancedFilters({ ...advancedFilters, workAuthorization: 'Any' });
        } else if (filterKey === 'companySize') {
            setAdvancedFilters({ ...advancedFilters, companySize: 'Any' });
        } else if (filterKey === 'womenInTech') {
            setAdvancedFilters({ ...advancedFilters, womenInTech: false });
        } else if (filterKey === 'veteranStatus') {
            setAdvancedFilters({ ...advancedFilters, veteranStatus: false });
        } else if (filterKey === 'pwd') {
            setAdvancedFilters({ ...advancedFilters, pwd: false });
        } else if (filterKey === 'willingToRelocate') {
            setAdvancedFilters({ ...advancedFilters, willingToRelocate: false });
        } else if (filterKey === 'openToTravel') {
            setAdvancedFilters({ ...advancedFilters, openToTravel: false });
        } else if (filterKey === 'remoteOnly') {
            setAdvancedFilters({ ...advancedFilters, remoteOnly: false });
        }
    };

    const resetAllFilters = () => {
        setAppliedFilters([]);
        setPrimaryFilters({
            jobRole: "",
            industry: "",
            experience: "",
            location: "",
            skills: ""
        });
        setAdvancedFilters({
            // Education section
            degree: "Any",
            university: "",
            graduationYear: "Any",
            specialization: "Any",
            educationDegree: "Any",

            // Employment section
            currentTitle: "",
            currentCompany: "",
            industry: "Any",
            employmentType: "Any",

            // Compensation section
            // salaryRange: "Any",
            minSalary: "",
            maxSalary: "",
            
            minSalaryExpected:"",
            maxSalaryExpected:"",

            // Availability
            availableFrom: "Any",

            // Preferences
            workType: "Any",
            language: "Any",
            workAuthorization: "Any",
            companySize: "Any",
            womenInTech: false,
            veteranStatus: false,
            pwd: false,
            willingToRelocate: false,
            remoteOnly: false,
            openToTravel: false,

            // Activity
            lastActive: "Any",
            responseRate: "Any"
        });

        // Clear URL parameters
        window.history.pushState({}, '', window.location.pathname);

        // Display all candidates
        setFilteredCandidates(allCandidates);
    };

    // Modified to remove skills handling as it's now in primary filters
    const applyAdvancedFilters = () => {

        const basicFilters = appliedFilters.filter(filter =>
            !['degree', 'university','specialization', 'graduationYear', 'employmentType','educationDegree',
                'currentTitle', 'currentCompany', 'availableFrom', 'remoteOnly',
                'workType', 'language', 'workAuthorization', 'companySize',
                'womenInTech', 'veteranStatus', 'pwd', 'willingToRelocate', 'openToTravel', 'minSalary', 'maxSalary','minSalaryExpected','maxSalaryExpected'].includes(filter.key)
        );

        // Add new advanced filters
        const newFilters = [...basicFilters];

        // Removed skills handling from here as it's now in primary filters

        // Add education filters
        if (advancedFilters.degree !== "Any") {
            newFilters.push({ key: "degree", value: advancedFilters.degree });
        } 
        if (advancedFilters.educationDegree !== "Any") {
            newFilters.push({ key: "educationDegree", value: advancedFilters.educationDegree });
        }
        if (advancedFilters.specialization !== "Any") {
            newFilters.push({ key: "specialization", value: advancedFilters.specialization });
        }

        if (advancedFilters.university) {
            newFilters.push({ key: "university", value: advancedFilters.university });
        }

        if (advancedFilters.graduationYear !== "Any") {
            newFilters.push({ key: "graduationYear", value: advancedFilters.graduationYear });
        }

        // Add employment filters
        if (advancedFilters.currentTitle) {
            newFilters.push({ key: "currentTitle", value: advancedFilters.currentTitle });
        }

        if (advancedFilters.currentCompany) {
            newFilters.push({ key: "currentCompany", value: advancedFilters.currentCompany });
        }
        if (advancedFilters.employmentType) {
            newFilters.push({ key: "employmentType", value: advancedFilters.employmentType });
        }

        if (advancedFilters.minSalary) {
            newFilters.push({ key: "minSalary", value: advancedFilters.minSalary });
        }

        if (advancedFilters.maxSalary) {
            newFilters.push({ key: "maxSalary", value: advancedFilters.maxSalary });
        }

        
        if (advancedFilters.minSalaryExpected) {
            newFilters.push({ key: "minSalaryExpected", value: advancedFilters.minSalaryExpected });
        }

        if (advancedFilters.maxSalaryExpected) {
            newFilters.push({ key: "maxSalaryExpected", value: advancedFilters.maxSalaryExpected });
        }

        // Add availability filter
        if (advancedFilters.availableFrom !== "Any") {
            newFilters.push({ key: "availableFrom", value: advancedFilters.availableFrom });
        }

        // Add Work mode preference filter
        if (advancedFilters.workType !== "Any") {
            newFilters.push({ key: "workType", value: advancedFilters.workType });
        }

        // Add language preference filter
        if (advancedFilters.language !== "Any") {
            newFilters.push({ key: "language", value: advancedFilters.language });
        }

        // Add work authorization filter
        if (advancedFilters.workAuthorization !== "Any") {
            newFilters.push({ key: "workAuthorization", value: advancedFilters.workAuthorization });
        }

        // Add company size preference filter
        if (advancedFilters.companySize !== "Any") {
            newFilters.push({ key: "companySize", value: advancedFilters.companySize });
        }

        // Add boolean preference filters
        if (advancedFilters.womenInTech) {
            newFilters.push({ key: "womenInTech", value: true });
        }

        if (advancedFilters.veteranStatus) {
            newFilters.push({ key: "veteranStatus", value: true });
        }

        if (advancedFilters.pwd) {
            newFilters.push({ key: "pwd", value: true });
        }

        // Add remote work preference
        if (advancedFilters.remoteOnly) {
            newFilters.push({ key: "remoteOnly", value: "Remote" });
        }

        // Add willing to relocate preference
        if (advancedFilters.willingToRelocate) {
            newFilters.push({ key: "willingToRelocate", value: true });
        }

        // Add open to travel preference
        if (advancedFilters.openToTravel) {
            newFilters.push({ key: "openToTravel", value: true });
        }

        setAppliedFilters(newFilters);
        updateURL(newFilters);
    };

    const filterCandidatesLocally = () => {
        console.log("Starting local filtering with applied filters:", appliedFilters);

        // Always start with all candidates for each filtering operation
        let results = [...allCandidates];
        console.log(`Starting with ${results.length} total candidates`);

        // Track filters applied for debugging
        const appliedFilterTracker = {};

        // Apply each filter one by one
        appliedFilters.forEach(filter => {
            const { key, value } = filter;
            const beforeCount = results.length;

            if (key === "name" && value) {
                results = results.filter(candidate => {
                    const firstName = (candidate.candidate_first_name || '').toLowerCase();
                    const lastName = (candidate.candidate_last_name || '').toLowerCase();
                    const fullName = `${firstName} ${lastName}`.toLowerCase();
                    return fullName.includes(value.toLowerCase()) ||
                        firstName.includes(value.toLowerCase()) ||
                        lastName.includes(value.toLowerCase());
                });
                appliedFilterTracker["name"] = `${beforeCount} → ${results.length}`;
            }

            // Add email filter
            else if (key === "email" && value) {
                results = results.filter(candidate => {
                    const email = (candidate.candidate_email || '').toLowerCase();
                    return email.includes(value.toLowerCase());
                });
                appliedFilterTracker["email"] = `${beforeCount} → ${results.length}`;
            }
            else if (key === "phone" && value) {
                results = results.filter(candidate => {
                    // Normalize phone numbers by removing all non-digit characters for comparison
                    const normalizedSearchPhone = value.replace(/\D/g, '');
                    const candidatePhone = (candidate.candidate_phone || '').replace(/\D/g, '');
                    const candidateMobile = (candidate.candidate_mobile || '').replace(/\D/g, '');

                    // Check if the normalized search phone is contained in either phone or mobile
                    return candidatePhone.includes(normalizedSearchPhone) ||
                        candidateMobile.includes(normalizedSearchPhone);
                });
                appliedFilterTracker["phone"] = `${beforeCount} → ${results.length}`;
            }
            else if (key === "degree" && value && value !== "Any") {
                console.log("Degree filter value:", value);

                results = results.filter(candidate => {
                    // Log the education data for each candidate
                    console.log("Candidate ID:", candidate.id, "Education:", candidate.candidate_education);

                    if (!candidate.candidate_education || !Array.isArray(candidate.candidate_education)) {
                        console.log("-> Candidate has no education array");
                        return false;
                    }

                    const matchFound = candidate.candidate_education.some(edu => {
                        const educationLevel = (edu.candidate_education_level || '').toLowerCase();
                        console.log("-> Checking education level:", educationLevel, "against filter:", value.toLowerCase());
                        return educationLevel.includes(value.toLowerCase());
                    });

                    console.log("-> Match found:", matchFound);
                    return matchFound;
                });
                appliedFilterTracker["degree"] = `${beforeCount} → ${results.length}`;

                console.log("Results count after degree filter:", results.length);
            } 
            else if (key === "educationDegree" && value && value !== "Any") {
                

                results = results.filter(candidate => {
                    // Log the education data for each candidate
                    

                    if (!candidate.candidate_education || !Array.isArray(candidate.candidate_education)) {
                        console.log("-> Candidate has no education array");
                        return false;
                    }

                    const matchFound = candidate.candidate_education.some(edu => {
                        const educationLevel = (edu.candidate_degree || '').toLowerCase();
                        console.log("-> Checking education level:", educationLevel, "against filter:", value.toLowerCase());
                        return educationLevel.includes(value.toLowerCase());
                    });

                    console.log("-> Match found:", matchFound);
                    return matchFound;
                });
                appliedFilterTracker["educationDegree"] = `${beforeCount} → ${results.length}`;

                console.log("Results count after degree filter:", results.length);
            }

            // University filter
            else if (key === "university" && value) {
                results = results.filter(candidate => {
                    if (!candidate.candidate_education || !Array.isArray(candidate.candidate_education)) {
                        return false;
                    }

                    return candidate.candidate_education.some(edu => {
                        const institute = (edu.candidate_institute || '').toLowerCase();
                        return institute.includes(value.toLowerCase());
                    });
                });
                appliedFilterTracker["university"] = `${beforeCount} → ${results.length}`;
            } 
            else if (key === "specialization" && value) {
                results = results.filter(candidate => {
                    if (!candidate.candidate_education || !Array.isArray(candidate.candidate_education)) {
                        return false;
                    }

                    return candidate.candidate_education.some(edu => {
                        const specializationDegree = (edu.candidate_degree_specialization || '').toLowerCase();
                        return specializationDegree.includes(value.toLowerCase());
                    });
                });
                appliedFilterTracker["specialization"] = `${beforeCount} → ${results.length}`;
            }

            // Graduation Year filter
            else if (key === "graduationYear" && value && value !== "Any") {
                results = results.filter(candidate => {
                    if (!candidate.candidate_education || !Array.isArray(candidate.candidate_education)) {
                        return false;
                    }

                    if (value.includes('+')) {
                        // Format: "2015+" means 2015 or later
                        const minYear = parseInt(value.replace('+', ''), 10);
                        return candidate.candidate_education.some(edu => {
                            const endYear = parseInt(edu.candidate_end_year, 10);
                            return !isNaN(endYear) && endYear >= minYear;
                        });
                    } else {
                        // Exact year match
                        const exactYear = parseInt(value, 10);
                        return candidate.candidate_education.some(edu => {
                            const endYear = parseInt(edu.candidate_end_year, 10);
                            return !isNaN(endYear) && endYear === exactYear;
                        });
                    }
                });
                appliedFilterTracker["graduationYear"] = `${beforeCount} → ${results.length}`;
            }
            else if (key === "minSalary" && value) {
                results = results.filter(candidate => {
                    const candidateSalary = parseInt(candidate.candidate_current_salary || 0, 10);
                    const minSalary = parseInt(value, 10);
                    return !isNaN(candidateSalary) && !isNaN(minSalary) && candidateSalary >= minSalary;
                });
                appliedFilterTracker["minSalary"] = `${beforeCount} → ${results.length}`;
            }

            // Maximum Salary filter
            else if (key === "maxSalary" && value) {
                results = results.filter(candidate => {
                    const candidateSalary = parseInt(candidate.candidate_current_salary || 0, 10);
                    const maxSalary = parseInt(value, 10);
                    return !isNaN(candidateSalary) && !isNaN(maxSalary) && candidateSalary <= maxSalary;
                });
                appliedFilterTracker["maxSalary"] = `${beforeCount} → ${results.length}`;
            }

            else if (key === "minSalaryExpected" && value) {
                results = results.filter(candidate => {
                    const candidateSalary = parseInt(candidate?.candidate_preference[0]?.expected_salary || 0, 10);
                    const minSalary = parseInt(value, 10);
                    return !isNaN(candidateSalary) && !isNaN(minSalary) && candidateSalary >= minSalary;
                });
                appliedFilterTracker["minSalaryExpected"] = `${beforeCount} → ${results.length}`;
            }

            // Maximum Salary filter
            else if (key === "maxSalaryExpected" && value) {
                results = results.filter(candidate => {
                    const candidateSalary = parseInt(candidate?.candidate_preference[0]?.expected_salary || 0, 10);
                    const maxSalary = parseInt(value, 10);
                    return !isNaN(candidateSalary) && !isNaN(maxSalary) && candidateSalary <= maxSalary;
                });
                appliedFilterTracker["maxSalary"] = `${beforeCount} → ${results.length}`;
            }

            // Current Title filter
            else if (key === "currentTitle" && value) {
                results = results.filter(candidate => {
                    const title = candidate.candidate_current_role || '';
                    return title.toLowerCase().includes(value.toLowerCase());
                });
                appliedFilterTracker["currentTitle"] = `${beforeCount} → ${results.length}`;
            }

            // Current Company filter
            else if (key === "currentCompany" && value) {
                results = results.filter(candidate => {
                    const company = candidate.candidate_current_company || '';
                    return company.toLowerCase().includes(value.toLowerCase());
                });
                appliedFilterTracker["currentCompany"] = `${beforeCount} → ${results.length}`;
            }

            // Availability filter
            else if (key === "availableFrom" && value && value !== "Any") {
                results = results.filter(candidate => {
                    const availability = candidate.candidate_availability || '';
                    return availability.toLowerCase().includes(value.toLowerCase());
                });
                appliedFilterTracker["availableFrom"] = `${beforeCount} → ${results.length}`;
            }
            // Employment Type
            else if (key === "employmentType" && value && value !== "Any") {
                results = results.filter(candidate => {
                    // Check if preference array exists and has items
                    if (!candidate.candidate_preference || !Array.isArray(candidate.candidate_preference) || candidate.candidate_preference.length === 0) {
                        return false;
                    }
                    // Use the first preference object in the array
                    const authorization = candidate.candidate_preference[0].employment_type || '';
                    return authorization.toLowerCase().includes(value.toLowerCase());
                });
                appliedFilterTracker["employmentType"] = `${beforeCount} → ${results.length}`;
            }

            // Work type filter
            else if (key === "workType" && value && value !== "Any") {
                results = results.filter(candidate => {
                    const workPreference = candidate.candidate_work_preference || '';
                    return workPreference.toLowerCase().includes(value.toLowerCase());
                });
                appliedFilterTracker["workType"] = `${beforeCount} → ${results.length}`;
            }

            // Language filter
            else if (key === "language" && value && value !== "Any") {
                results = results.filter(candidate => {
                    const candidateLanguages = candidate.candidate_languages || [];
                    if (Array.isArray(candidateLanguages)) {
                        return candidateLanguages.some(lang =>
                            (lang.candidate_language || '').toLowerCase().includes(value.toLowerCase())
                        );
                    }
                    return false;
                });
                appliedFilterTracker["language"] = `${beforeCount} → ${results.length}`;
            }

            // Work Authorization filter
            else if (key === "workAuthorization" && value && value !== "Any") {
                results = results.filter(candidate => {
                    // Check if preference array exists and has items
                    if (!candidate.candidate_preference || !Array.isArray(candidate.candidate_preference) || candidate.candidate_preference.length === 0) {
                        return false;
                    }
                    // Use the first preference object in the array
                    const authorization = candidate.candidate_preference[0].work_authorization || '';
                    return authorization.toLowerCase().includes(value.toLowerCase());
                });
                appliedFilterTracker["workAuthorization"] = `${beforeCount} → ${results.length}`;
            }

            // Company Size preference filter
            else if (key === "companySize" && value && value !== "Any") {
                console.log(value);

                results = results.filter(candidate => {
                    // Check if preference array exists and has items
                    if (!candidate.candidate_preference || !Array.isArray(candidate.candidate_preference) || candidate.candidate_preference.length === 0) {
                        return false;
                    }
                    const sizePreference = candidate.candidate_preference[0].company_size || '';
                    console.log(sizePreference)
                    return sizePreference.toLowerCase().includes(value.toLowerCase());
                });
                appliedFilterTracker["companySize"] = `${beforeCount} → ${results.length}`;
            }

            // Women in Tech filter
            else if (key === "womenInTech" && value === true) {
                results = results.filter(candidate => {
                    // Check if candidate has identified as female in their profile
                    const gender = candidate.candidate_gender || '';
                    return gender.toLowerCase() === 'female' || gender.toLowerCase() === 'woman';
                });
                appliedFilterTracker["womenInTech"] = `${beforeCount} → ${results.length}`;
            }

            // Veteran Status filter
            else if (key === "veteranStatus" && value === true) {
                results = results.filter(candidate => {
                    // Check if preference array exists and has items
                    if (!candidate.candidate_preference || !Array.isArray(candidate.candidate_preference) || candidate.candidate_preference.length === 0) {
                        return false;
                    }
                    const isVeteran = candidate.candidate_preference[0].veteran_status || false;
                    return isVeteran === true || isVeteran === 'true' || isVeteran === 'yes';
                });
                appliedFilterTracker["veteranStatus"] = `${beforeCount} → ${results.length}`;
            }

            // Person with Disability filter
            else if (key === "pwd" && value === true) {
                results = results.filter(candidate => {
                    const hasPwd = candidate.candidate_preference[0].pwd || false;
                    return hasPwd === true || hasPwd === 'true' || hasPwd === 'yes';
                });
                appliedFilterTracker["pwd"] = `${beforeCount} → ${results.length}`;
            }

           

            // Willing to Relocate filter
            else if (key === "willingToRelocate" && value === true) {
                // results = results.filter(candidate => {
                //     const willRelocate = candidate.candidate_willing_to_relocate || false;
                //     return willRelocate === true || willRelocate === 'true' || willRelocate === 'yes';
                // });
                // appliedFilterTracker["willingToRelocate"] = `${beforeCount} → ${results.length}`;

                results = results.filter(candidate => {
                    // Check if preference array exists and has items
                    if (!candidate.candidate_preference || !Array.isArray(candidate.candidate_preference) || candidate.candidate_preference.length === 0) {
                        return false;
                    }
                    const willRelocate = candidate.candidate_preference[0].willing_to_relocate || false;
                    return willRelocate === true || willRelocate === 'true' || willRelocate === 'yes';
                });
                appliedFilterTracker["willingToRelocate"] = `${beforeCount} → ${results.length}`;
            }

            // Open to Travel filter
            else if (key === "openToTravel" && value === true) {
                // results = results.filter(candidate => {
                //     const openToTravel = candidate.candidate_open_to_travel || false;
                //     return openToTravel === true || openToTravel === 'true' || openToTravel === 'yes';
                // });
                // appliedFilterTracker["openToTravel"] = `${beforeCount} → ${results.length}`;

                results = results.filter(candidate => {
                    // Check if preference array exists and has items
                    if (!candidate.candidate_preference || !Array.isArray(candidate.candidate_preference) || candidate.candidate_preference.length === 0) {
                        return false;
                    }
                    const openToTravel = candidate.candidate_preference[0].open_to_travel || false;
                    return openToTravel === true || openToTravel === 'true' || openToTravel === 'yes';
                });
                appliedFilterTracker["openToTravel"] = `${beforeCount} → ${results.length}`;
            }

            // Primary filters - Add these back in to ensure they work
            else if (key === "jobRole" && value) {
                results = results.filter(candidate => {
                    const role = candidate.candidate_current_role || '';
                    return role.toLowerCase().includes(value.toLowerCase());
                });
                appliedFilterTracker["jobRole"] = `${beforeCount} → ${results.length}`;
            }

            else if (key === "location" && value) {
                results = results.filter(candidate => {
                    const location = candidate.candidate_location || '';
                    const city = candidate.candidate_address?.[0]?.candidate_city || '';
                    return location.toLowerCase().includes(value.toLowerCase()) ||
                        city.toLowerCase().includes(value.toLowerCase());
                });
                appliedFilterTracker["location"] = `${beforeCount} → ${results.length}`;
            }

            else if (key === "industry" && value) {
                results = results.filter(candidate => {
                    const role = candidate.candidate_current_role || '';
                    const industry = candidate.candidate_industry || '';
                    return role.toLowerCase().includes(value.toLowerCase()) ||
                        industry.toLowerCase().includes(value.toLowerCase());
                });
                appliedFilterTracker["industry"] = `${beforeCount} → ${results.length}`;
            }

            else if (key === "experience" && value && value !== "Any") {
                results = results.filter(candidate => {
                    // Parse experience range like "5-10 years"
                    let minYears = 0, maxYears = 100;

                    if (value.includes('-')) {
                        const parts = value.split('-');
                        minYears = parseInt(parts[0], 10) || 0;
                        maxYears = parseInt(parts[1], 10) || 100;
                    } else if (value.includes('+')) {
                        minYears = parseInt(value, 10) || 0;
                    } else {
                        minYears = parseInt(value, 10) || 0;
                        maxYears = minYears + 1;
                    }

                    // Calculate candidate's total experience
                    let totalExp = 0;
                    if (candidate.candidate_experience && Array.isArray(candidate.candidate_experience)) {
                        totalExp = candidate.candidate_experience.reduce((sum, exp) => {
                            // Calculate duration for each experience
                            let startDate = new Date(exp.candidate_start_date);
                            let endDate = exp.candidate_end_date ? new Date(exp.candidate_end_date) : new Date();

                            if (isNaN(startDate.getTime())) return sum;

                            // Calculate years difference
                            const years = (endDate - startDate) / (1000 * 60 * 60 * 24 * 365);
                            return sum + years;
                        }, 0);
                    }

                    return totalExp >= minYears && totalExp <= maxYears;
                });
                appliedFilterTracker["experience"] = `${beforeCount} → ${results.length}`;
            }

            else if (key === "skills" && value) {
                results = results.filter(candidate => {
                    if (!candidate.candidate_skills || !Array.isArray(candidate.candidate_skills)) {
                        return false;
                    }

                    return candidate.candidate_skills.some(skillObj => {
                        const skill = skillObj.candidate_skill || '';
                        return skill.toLowerCase().includes(value.toLowerCase());
                    });
                });
                appliedFilterTracker["skills"] = `${beforeCount} → ${results.length}`;
            }
        });

        console.log("Filter results by step:", appliedFilterTracker);
        console.log(`Final filtered candidates: ${results.length}`);

        // Update state with filtered results
        setFilteredCandidates(results);
    };


    const handleSearch = () => {
        // Determine if search term looks like an email
        const isEmail = searchTerm.includes('@');
        const isPhone = /^[\d()\-+\s]+$/.test(searchTerm);

        // Determine search type (name, email, role, or location)
        let searchType = "jobRole"; // Default search type

        if (isEmail) {
            searchType = "email";
        } else if (isPhone) {
            searchType = "phone";
        } else if (searchTerm.match(/^[a-zA-Z\s]+$/)) {
            // If contains only letters and spaces, could be a name
            searchType = "name";
        }

        // Clear any existing search-related filters
        const updatedFilters = appliedFilters.filter(
            filter => !["jobRole", "name", "email", "phone"].includes(filter.key)
        );

        // Add the new search filter
        if (searchTerm) {
            updatedFilters.push({ key: searchType, value: searchTerm });
        }

        setAppliedFilters(updatedFilters);
        updateURL(updatedFilters);
    };


    const sortCandidates = (candidates, sortBy) => {
        if (!candidates || candidates.length === 0) return [];

        const sortedCandidates = [...candidates];

        switch (sortBy) {
            case 'relevance':
                // Relevance is the default sorting from the API
                return sortedCandidates;

            case 'lastActive':
                // Sort by last active timestamp (most recent first)
                return sortedCandidates.sort((a, b) => {
                    const dateA = a.candidate_last_active ? new Date(a.candidate_last_active) : new Date(0);
                    const dateB = b.candidate_last_active ? new Date(b.candidate_last_active) : new Date(0);
                    return dateB - dateA;
                });

            case 'experience':
                // Sort by total years of experience (highest first)
                return sortedCandidates.sort((a, b) => {
                    const getExperienceYears = (candidate) => {
                        if (!candidate.candidate_experience || !Array.isArray(candidate.candidate_experience)) {
                            return 0;
                        }

                        return candidate.candidate_experience.reduce((sum, exp) => {
                            let startDate = new Date(exp.candidate_start_date);
                            let endDate = exp.candidate_end_date ? new Date(exp.candidate_end_date) : new Date();

                            if (isNaN(startDate.getTime())) return sum;

                            const years = (endDate - startDate) / (1000 * 60 * 60 * 24 * 365);
                            return sum + years;
                        }, 0);
                    };

                    return getExperienceYears(b) - getExperienceYears(a);
                });

            case 'education':
                // Sort by education level (prioritizing higher degrees)
                return sortedCandidates.sort((a, b) => {
                    const educationRank = {
                        'phd': 5,
                        'doctorate': 5,
                        'master': 4,
                        'bachelor': 3,
                        'associate': 2,
                        'diploma': 1,
                        'certificate': 0
                    };

                    const getHighestEducation = (candidate) => {
                        if (!candidate.candidate_education || !Array.isArray(candidate.candidate_education)) {
                            return -1;
                        }

                        let highestRank = -1;

                        candidate.candidate_education.forEach(edu => {
                            const level = (edu.candidate_education_level || '').toLowerCase();

                            // Check each possible education keyword
                            for (const [key, rank] of Object.entries(educationRank)) {
                                if (level.includes(key) && rank > highestRank) {
                                    highestRank = rank;
                                }
                            }
                        });

                        return highestRank;
                    };

                    return getHighestEducation(b) - getHighestEducation(a);
                });

            case 'skillsMatch':
                // Sort by number of matching skills with the required skills
                return sortedCandidates.sort((a, b) => {
                    // Get skills from primaryFilters instead of advancedFilters
                    const requiredSkills = primaryFilters.skills ?
                        primaryFilters.skills.split(',').map(skill => skill.trim().toLowerCase()) : [];

                    const getSkillMatchCount = (candidate) => {
                        if (!candidate.candidate_skills || !Array.isArray(candidate.candidate_skills)) {
                            return 0;
                        }

                        let matchCount = 0;

                        candidate.candidate_skills.forEach(skillObj => {
                            const skill = (skillObj.candidate_skill || '').toLowerCase();

                            // Check if this skill matches any of the required skills
                            requiredSkills.forEach(requiredSkill => {
                                if (skill.includes(requiredSkill) || requiredSkill.includes(skill)) {
                                    matchCount++;
                                }
                            });
                        });

                        return matchCount;
                    };

                    return getSkillMatchCount(b) - getSkillMatchCount(a);
                });

            case 'availability':
                // Sort by availability date (soonest first)
                return sortedCandidates.sort((a, b) => {
                    const getAvailabilityDate = (candidate) => {
                        const availability = candidate.candidate_availability || '';

                        // Try to extract a date from the availability text
                        const dateMatch = availability.match(/\b(\d{1,2}[-/]\d{1,2}[-/]\d{2,4}|\d{2,4}[-/]\d{1,2}[-/]\d{1,2})\b/);
                        if (dateMatch) {
                            const date = new Date(dateMatch[0]);
                            if (!isNaN(date.getTime())) {
                                return date;
                            }
                        }

                        // Look for keywords like "immediate" or "now"
                        if (/immediate|now|asap/i.test(availability)) {
                            return new Date(); // Today
                        }

                        // Default to a far future date for candidates without clear availability
                        return new Date('2099-12-31');
                    };

                    return getAvailabilityDate(a) - getAvailabilityDate(b);
                });

            case 'location':
                // Sort by location (matching the filter location first)
                const locationFilter = appliedFilters.find(filter => filter.key === 'location');
                const targetLocation = locationFilter ? locationFilter.value.toLowerCase() : '';

                return sortedCandidates.sort((a, b) => {
                    if (!targetLocation) return 0;

                    const locA = (a.candidate_location || '').toLowerCase();
                    const locB = (b.candidate_location || '').toLowerCase();

                    const cityA = a.candidate_address?.[0]?.candidate_city || '';
                    const cityB = b.candidate_address?.[0]?.candidate_city || '';

                    // Check exact matches first
                    const aExactMatch = locA === targetLocation || cityA === targetLocation;
                    const bExactMatch = locB === targetLocation || cityB === targetLocation;

                    if (aExactMatch && !bExactMatch) return -1;
                    if (!aExactMatch && bExactMatch) return 1;

                    // Then check partial matches
                    const aPartialMatch = locA.includes(targetLocation) || cityA.includes(targetLocation);
                    const bPartialMatch = locB.includes(targetLocation) || cityB.includes(targetLocation);

                    if (aPartialMatch && !bPartialMatch) return -1;
                    if (!aPartialMatch && bPartialMatch) return 1;

                    return 0;
                });

            case 'nameAZ':
                // Sort alphabetically by name
                return sortedCandidates.sort((a, b) => {
                    const nameA = (a.candidate_first_name || '').toLowerCase();
                    const nameB = (b.candidate_first_name || '').toLowerCase();
                    return nameA.localeCompare(nameB);
                });

            case 'nameZA':
                // Sort reverse alphabetically by name
                return sortedCandidates.sort((a, b) => {
                    const nameA = (a.candidate_first_name || '').toLowerCase();
                    const nameB = (b.candidate_first_name || '').toLowerCase();
                    return nameB.localeCompare(nameA);
                });

            case 'applicationDate':
                // Sort by application date (most recent first)
                return sortedCandidates.sort((a, b) => {
                    const dateA = a.candidate_application_date ? new Date(a.candidate_application_date) : new Date(0);
                    const dateB = b.candidate_application_date ? new Date(b.candidate_application_date) : new Date(0);
                    return dateB - dateA;
                });

            case 'portfolioStrength':
                // Sort by portfolio strength if available
                return sortedCandidates.sort((a, b) => {
                    const portfolioA = a.candidate_portfolio_links ? a.candidate_portfolio_links.length : 0;
                    const portfolioB = b.candidate_portfolio_links ? b.candidate_portfolio_links.length : 0;
                    return portfolioB - portfolioA;
                });

            default:
                return sortedCandidates;
        }
    };

    // Add this handler for the sorting dropdown
    const handleSortChange = (e) => {
        const newSortOption = e.target.value;
        setSortOption(newSortOption);

        // Apply sorting to the filtered candidates
        const sortedResults = sortCandidates(filteredCandidates, newSortOption);
        setFilteredCandidates(sortedResults);
    };

    // Initial data fetch
    useEffect(() => {
        // Initialize search term from URL params
        if (params.searchQuery) {
            setSearchTerm(params.searchQuery);
        }
        fetchCandidates();
    }, []);

    // Trigger filtering whenever applied filters change
    useEffect(() => {
        if (allCandidates.length > 0) {
            filterCandidatesLocally();
            setFilteredCandidates(prev => sortCandidates(prev, sortOption));
        }
    }, [appliedFilters, sortOption]);

    



    return (
        <div className="flex h-screen bg-gray-50 p-8 mt-20">
            {/* Left sidebar with advanced filters */}
            {showLeftFilters && (
                <div className="w-80 min-h-full h-auto bg-white border-r border-gray-200 p-5">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-gray-800">Advanced Filters</h2>
                        <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => setShowLeftFilters(false)}
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>


                    {/* Education */}
                    <div className="mb-4 pb-4 border-b border-gray-200">
                        <button
                            className="flex justify-between items-center w-full text-left font-medium text-gray-800 mb-2 hover:text-indigo-600 transition-colors"
                            onClick={() => toggleFilter('education')}
                        >
                            <span>Education</span>
                            {expandedFilters.education ?
                                <ChevronUp className="h-4 w-4 text-indigo-500" /> :
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                            }
                        </button>

                        {expandedFilters.education && (
                            <div className="space-y-3 mt-2">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Education Level</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        value={advancedFilters.degree}
                                        onChange={(e) => setAdvancedFilters({ ...advancedFilters, degree: e.target.value })}
                                    >
                                        <option>Any</option>
                                        <option>Bachelor's</option>
                                        <option>Master's</option>
                                        <option>PhD</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Degree</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        value={advancedFilters.educationDegree}
                                        onChange={(e) => setAdvancedFilters({ ...advancedFilters, educationDegree: e.target.value })}
                                    >
                                        <option>Any</option>
                                        {
                                            degreesList.map((e)=>(
                                                <option>{e}</option>
                                            ))
                                        }
                                        {/* <option>Bachelor's</option>
                                        <option>Master's</option>
                                        <option>PhD</option> */}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Specialization</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        value={advancedFilters.specialization}
                                        onChange={(e) => setAdvancedFilters({ ...advancedFilters, specialization: e.target.value })}
                                    >
                                        <option>Any</option>
                                        {
                                            educationSpecialties?.map((e)=>(
                                                <option>{e}</option>
                                            ))
                                        }
                                        {/* <option>Bachelor's</option>
                                        <option>Master's</option>
                                        <option>PhD</option> */}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">University</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        placeholder="University name"
                                        value={advancedFilters.university}
                                        onChange={(e) => setAdvancedFilters({ ...advancedFilters, university: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Graduation Year</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        value={advancedFilters.graduationYear}
                                        onChange={(e) => setAdvancedFilters({ ...advancedFilters, graduationYear: e.target.value })}
                                    >
                                        <option>Any</option>
                                        <option>2023+</option>
                                        <option>2020+</option>
                                        <option>2015+</option>
                                        <option>2010+</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Employment */}
                    <div className="mb-4 pb-4 border-b border-gray-200">
                        <button
                            className="flex justify-between items-center w-full text-left font-medium text-gray-800 mb-2 hover:text-indigo-600 transition-colors"
                            onClick={() => toggleFilter('employment')}
                        >
                            <span>Employment</span>
                            {expandedFilters.employment ?
                                <ChevronUp className="h-4 w-4 text-indigo-500" /> :
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                            }
                        </button>

                        {expandedFilters.employment && (
                            <div className="space-y-3 mt-2">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Current Title</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        placeholder="Job title"
                                        value={advancedFilters.currentTitle}
                                        onChange={(e) => setAdvancedFilters({ ...advancedFilters, currentTitle: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Current Company</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        placeholder="Company name"
                                        value={advancedFilters.currentCompany}
                                        onChange={(e) => setAdvancedFilters({ ...advancedFilters, currentCompany: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Industry</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        value={advancedFilters.industry}
                                        onChange={(e) => setAdvancedFilters({ ...advancedFilters, industry: e.target.value })}
                                    >
                                        <option>Any</option>
                                        <option>Technology</option>
                                        <option>Healthcare</option>
                                        <option>Finance</option>
                                        <option>Education</option>
                                        <option>Retail</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Employment Type</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        value={advancedFilters.employmentType}
                                        onChange={(e) => setAdvancedFilters({ ...advancedFilters, employmentType: e.target.value })}
                                    >
                                        <option>Any</option>
                                        <option>Full-time</option>
                                        <option>Internship</option>
                                        <option>Contract</option>

                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Compensation */}
                    
                    <div className="mb-4 pb-4 border-b border-gray-200">
                        <button
                            className="flex justify-between items-center w-full text-left font-medium text-gray-800 mb-2 hover:text-indigo-600 transition-colors"
                            onClick={() => toggleFilter('compensation')}
                        >
                            <span>Compensation</span>
                            {expandedFilters.compensation ?
                                <ChevronUp className="h-4 w-4 text-indigo-500" /> :
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                            }
                        </button>

                        {expandedFilters.compensation && (
                            <div className="space-y-3 mt-2">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Current Salary Range</label>
                                    <div className="flex items-center space-x-2">
                                        <div className="relative flex-1">
                                            <span className="absolute left-1 top-2 text-gray-500"><IndianRupee /></span>
                                            <input
                                                type="number"
                                                placeholder="Min"
                                                className="w-full p-2 pl-6 border border-gray-300 rounded-md text-sm"
                                                value={advancedFilters.minSalary || ''}
                                                onChange={(e) => setAdvancedFilters({
                                                    ...advancedFilters,
                                                    minSalary: e.target.value
                                                })}
                                            />
                                        </div>
                                        <span className="text-gray-400">–</span>
                                        <div className="relative flex-1">
                                            <span className="absolute left-1 top-2 text-gray-500"><IndianRupee /></span>
                                            <input
                                                type="number"
                                                placeholder="Max"
                                                className="w-full p-2 pl-6 border border-gray-300 rounded-md text-sm"
                                                value={advancedFilters.maxSalary || ''}
                                                onChange={(e) => setAdvancedFilters({
                                                    ...advancedFilters,
                                                    maxSalary: e.target.value
                                                })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Expected Salary Range</label>
                                    <div className="flex items-center space-x-2">
                                        <div className="relative flex-1">
                                            <span className="absolute left-1 top-2 text-gray-500"><IndianRupee /></span>
                                            <input
                                                type="number"
                                                placeholder="Min"
                                                className="w-full p-2 pl-6 border border-gray-300 rounded-md text-sm"
                                                value={advancedFilters.minSalaryExpected || ''}
                                                onChange={(e) => setAdvancedFilters({
                                                    ...advancedFilters,
                                                    minSalaryExpected: e.target.value
                                                })}
                                            />
                                        </div>
                                        <span className="text-gray-400">–</span>
                                        <div className="relative flex-1">
                                            <span className="absolute left-1 top-2 text-gray-500"><IndianRupee /></span>
                                            <input
                                                type="number"
                                                placeholder="Max"
                                                className="w-full p-2 pl-6 border border-gray-300 rounded-md text-sm"
                                                value={advancedFilters.maxSalaryExpected || ''}
                                                onChange={(e) => setAdvancedFilters({
                                                    ...advancedFilters,
                                                    maxSalaryExpected: e.target.value
                                                })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Availability */}
                    <div className="mb-4 pb-4 border-b border-gray-200">
                        <button
                            className="flex justify-between items-center w-full text-left font-medium text-gray-800 mb-2 hover:text-indigo-600 transition-colors"
                            onClick={() => toggleFilter('availability')}
                        >
                            <span>Availability</span>
                            {expandedFilters.availability ?
                                <ChevronUp className="h-4 w-4 text-indigo-500" /> :
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                            }
                        </button>

                        {expandedFilters.availability && (
                            <div className="space-y-3 mt-2">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Available From</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        value={advancedFilters.availableFrom}
                                        onChange={(e) => setAdvancedFilters({ ...advancedFilters, availableFrom: e.target.value })}
                                    >
                                        <option>Any</option>
                                        <option>Immediate</option>
                                        <option>1 week</option>
                                        <option>2 weeks</option>
                                        <option>1 month</option>
                                        <option>2+ months</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Preferences */}
                    <div className="mb-4 pb-4 border-b border-gray-200">
                        <button
                            className="flex justify-between items-center w-full text-left font-medium text-gray-800 mb-2 hover:text-indigo-600 transition-colors"
                            onClick={() => toggleFilter('preferences')}
                        >
                            <span>Preferences</span>
                            {expandedFilters.preferences ?
                                <ChevronUp className="h-4 w-4 text-indigo-500" /> :
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                            }
                        </button>

                        {expandedFilters.preferences && (
                            <div className="space-y-4 border-t pt-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Work Type</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        value={advancedFilters.workType}
                                        onChange={(e) => setAdvancedFilters({ ...advancedFilters, workType: e.target.value })}
                                    >
                                        <option>Any</option>
                                        <option>Remote</option>
                                        <option>Hybrid</option>
                                        <option>On-site</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Language</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        value={advancedFilters.language}
                                        onChange={(e) => setAdvancedFilters({ ...advancedFilters, language: e.target.value })}
                                    >
                                        <option>Any</option>
                                        <option>English</option>
                                        <option>Hindi</option>
                                        <option>French</option>
                                        <option>German</option>
                                        <option>Chinese</option>
                                        <option>Japanese</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Work Authorization</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        value={advancedFilters.workAuthorization}
                                        onChange={(e) => setAdvancedFilters({ ...advancedFilters, workAuthorization: e.target.value })}
                                    >
                                        <option>Any</option>
                                        <option>US Citizen</option>
                                        <option>Green Card</option>
                                        <option>H1-B Visa</option>
                                        <option>Other Visa</option>
                                        <option>Require Sponsorship</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Company Size</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        value={advancedFilters.companySize}
                                        onChange={(e) => setAdvancedFilters({ ...advancedFilters, companySize: e.target.value })}
                                    >
                                        {/* <option>Any</option>
                                        <option>Startup (1-50)</option>
                                        <option>Small (51-200)</option>
                                        <option>Medium (201-1000)</option>
                                        <option>Large (1001-5000)</option>
                                        <option>Enterprise (5000+)</option> */}
                                        <option value="">Select company size</option>
                                        <option value="Startup (1-50)">Startup (1-50)</option>
                                        <option value="Small (51-200)">Small (51-200)</option>
                                        <option value="Medium (201-1000)">Medium (201-1000)</option>
                                        <option value="Large (1000+)">Large (1000+)</option>
                                    </select>
                                </div>

                                <div className="space-y-3 mt-2">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="willingToRelocate"
                                            className="rounded border-gray-300 text-indigo-600"
                                            checked={advancedFilters.willingToRelocate}
                                            onChange={(e) => setAdvancedFilters({ ...advancedFilters, willingToRelocate: e.target.checked })}
                                        />
                                        <label htmlFor="willingToRelocate" className="ml-2 block text-sm text-gray-600">
                                            Willing to Relocate
                                        </label>
                                    </div>
                                    {/* <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="remoteOnly"
                                            className="rounded border-gray-300 text-indigo-600"
                                            checked={advancedFilters.remoteOnly}
                                            onChange={(e) => setAdvancedFilters({ ...advancedFilters, remoteOnly: e.target.checked })}
                                        />
                                        <label htmlFor="remoteOnly" className="ml-2 block text-sm text-gray-600">
                                            Remote Only
                                        </label>
                                    </div> */}
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="openToTravel"
                                            className="rounded border-gray-300 text-indigo-600"
                                            checked={advancedFilters.openToTravel}
                                            onChange={(e) => setAdvancedFilters({ ...advancedFilters, openToTravel: e.target.checked })}
                                        />
                                        <label htmlFor="openToTravel" className="ml-2 block text-sm text-gray-600">
                                            Open to Travel
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="womenInTech"
                                            className="rounded border-gray-300 text-indigo-600"
                                            checked={advancedFilters.womenInTech}
                                            onChange={(e) => setAdvancedFilters({ ...advancedFilters, womenInTech: e.target.checked })}
                                        />
                                        <label htmlFor="womenInTech" className="ml-2 block text-sm text-gray-600">
                                            Women in Tech
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="veteranStatus"
                                            className="rounded border-gray-300 text-indigo-600"
                                            checked={advancedFilters.veteranStatus}
                                            onChange={(e) => setAdvancedFilters({ ...advancedFilters, veteranStatus: e.target.checked })}
                                        />
                                        <label htmlFor="veteranStatus" className="ml-2 block text-sm text-gray-600">
                                            Veteran Status
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="pwd"
                                            className="rounded border-gray-300 text-indigo-600"
                                            checked={advancedFilters.pwd}
                                            onChange={(e) => setAdvancedFilters({ ...advancedFilters, pwd: e.target.checked })}
                                        />
                                        <label htmlFor="pwd" className="ml-2 block text-sm text-gray-600">
                                            Person with Disability (PwD)
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Activity */}
                    <div className="mb-4">
                        <button
                            className="flex justify-between items-center w-full text-left font-medium text-gray-800 mb-2 hover:text-indigo-600 transition-colors"
                            onClick={() => toggleFilter('activity')}
                        >
                            <span>Activity</span>
                            {expandedFilters.activity ?
                                <ChevronUp className="h-4 w-4 text-indigo-500" /> :
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                            }
                        </button>

                        {expandedFilters.activity && (
                            <div className="space-y-3 mt-2">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Last Active</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        value={advancedFilters.lastActive}
                                        onChange={(e) => setAdvancedFilters({ ...advancedFilters, lastActive: e.target.value })}
                                    >
                                        <option>Any</option>
                                        <option>Today</option>
                                        <option>This week</option>
                                        <option>This month</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Response Rate</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                        value={advancedFilters.responseRate}
                                        onChange={(e) => setAdvancedFilters({ ...advancedFilters, responseRate: e.target.value })}
                                    >
                                        <option>Any</option>
                                        <option>70%+</option>
                                        <option>80%+</option>
                                        <option>90%+</option></select>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Apply filters button */}
                    <div className="mt-6">
                        <button
                            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors"
                            onClick={applyAdvancedFilters}
                        >
                            Apply Filters
                        </button>
                        <button
                            className="w-full mt-2 py-2 px-4 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
                            onClick={resetAllFilters}
                        >
                            Reset All
                        </button>
                    </div>
                </div>
            )}

            {/* Main content */}
            <div className={`flex-1 ${showLeftFilters ? 'ml-4' : ''}`}>
                {/* Top search bar and filters */}
                <div className="bg-white rounded-lg shadow-sm p-5 mb-4">
                    <div className="mb-4">
                        <div className="flex items-center gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search by job roles, email, phone and name ....."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                />
                            </div>
                            <button
                                className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                onClick={() => setFilterVisible(!filterVisible)}
                            >
                                <Filter className="text-gray-600" size={18} />
                            </button>
                            {!showLeftFilters && (
                                <button
                                    className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                    onClick={() => setShowLeftFilters(true)}
                                >
                                    <Settings className="text-gray-600" size={18} />
                                </button>
                            )}
                            <button
                                className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                onClick={handleSearch}
                            >
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Primary filters dropdown */}
                    {filterVisible && (
                        <div className="bg-gray-50 rounded-md p-4 my-3 border border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Role</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        placeholder="e.g., Software Engineer"
                                        value={primaryFilters.jobRole}
                                        onChange={(e) => setPrimaryFilters({ ...primaryFilters, jobRole: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        value={primaryFilters.industry}
                                        onChange={(e) => setPrimaryFilters({ ...primaryFilters, industry: e.target.value })}
                                    >
                                        <option value="">Any</option>
                                        <option>Technology</option>
                                        <option>Healthcare</option>
                                        <option>Finance</option>
                                        <option>Education</option>
                                        <option>Retail</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        value={primaryFilters.experience}
                                        onChange={(e) => setPrimaryFilters({ ...primaryFilters, experience: e.target.value })}
                                    >
                                        <option value="">Any</option>
                                        <option>0-1 years</option>
                                        <option>1-3 years</option>
                                        <option>3-5 years</option>
                                        <option>5-10 years</option>
                                        <option>10+ years</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        placeholder="e.g., New York, NY"
                                        value={primaryFilters.location}
                                        onChange={(e) => setPrimaryFilters({ ...primaryFilters, location: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <button
                                    className="py-2 px-4 border border-gray-300 text-gray-700 rounded-md mr-2 hover:bg-gray-50"
                                    onClick={() => setFilterVisible(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                    onClick={applyPrimaryFilters}
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Applied filters chips */}
                    {appliedFilters.length > 0 && (
                        <div className="flex flex-wrap items-center mt-3 gap-2">
                            <span className="text-sm text-gray-600">Filters:</span>
                            {appliedFilters?.map((filter, index) => (
                                <div
                                    key={`${filter.key}-${index}`}
                                    className="flex items-center bg-indigo-50 text-indigo-700 rounded-full py-1 px-3 text-sm"
                                >
                                    <span className="mr-1 font-medium">{filter.key === 'jobRole' ? 'Role' : filter.key}:</span>
                                    <span>{filter.value}</span>
                                    <button
                                        className="ml-1 focus:outline-none"
                                        onClick={() => removeFilter(filter.key, filter.value)}
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                            <button
                                className="text-sm text-indigo-600 hover:text-indigo-800"
                                onClick={resetAllFilters}
                            >
                                Clear all
                            </button>
                        </div>
                    )}
                </div>

                {/* Results count */}
                <div className="bg-white rounded-lg shadow-sm p-5 mb-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-800">
                            {filteredCandidates.length} Candidates
                        </h3>
                       
                        <div className="mb-1 flex items-center">
                            <label htmlFor="sortOptions" className="mr-2 font-medium text-gray-700">Sort by:</label>
                            <select
                                id="sortOptions"
                                className="border border-gray-300 rounded-md p-2 text-sm"
                                value={sortOption}
                                onChange={handleSortChange}
                            >
                                <option value="relevance">Relevance</option>
                                <option value="lastActive">Last Active</option>
                                <option value="experience">Experience (Most to Least)</option>
                                <option value="education">Education Level</option>
                                <option value="skillsMatch">Skills Match</option>
                                <option value="availability">Earliest Availability</option>
                                <option value="location">Location Proximity</option>
                                <option value="nameAZ">Name (A-Z)</option>
                                <option value="nameZA">Name (Z-A)</option>
                                <option value="applicationDate">Application Date</option>
                                <option value="portfolioStrength">Portfolio Strength</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Candidate cards */}
                <div className="space-y-4">
                    {filteredCandidates.length > 0 ? (

                        filteredCandidates?.map(candidate => (
                            
                            <CandidateCard candidate={candidate} />
                        ))
                    ) : (
                        <div className="bg-white rounded-lg shadow-sm p-10 text-center">
                            <p className="text-gray-600">No candidates found matching your criteria.</p>
                            <button
                                className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
                                onClick={resetAllFilters}
                            >
                                Clear filters and try again
                            </button>
                        </div>
                    )}
                    
                </div>
            </div>
        </div>
    );
};

export default TalentSearchPage;



// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { X, Filter, Settings, Search, Briefcase, MapPin, Mail, Phone, Calendar, Award, Clock, DollarSign, CheckCircle, ChevronUp, ChevronDown, Star, StarHalf, IndianRupee, Upload, FileText, Trash2 } from 'lucide-react';
// import CandidateCard from '../components/CandidateCard';
// import { BASEURL } from '../utility/config';

// const TalentSearchPage = () => {

//     const educationSpecialties = [
//         // Computer Science & IT
//         "Computer Science",
//         "Software Engineering",
//         "Data Science",
//         "Artificial Intelligence",
//         "Cybersecurity",
//         "Information Technology",
//         "Cloud Computing",
//         "Full Stack Development",
//         "Machine Learning",
//         "Game Development",
//         "Mobile App Development",
//         "Blockchain Technology",
//         "Computer Networking",
//         "Database Management",
//         "Web Development",
//         "Embedded Systems",
//         "Human-Computer Interaction",
//         "Big Data Analytics",
//         "DevOps",
//         "Data Engineering",
      
//         // Engineering Fields
//         "Mechanical Engineering",
//         "Electrical Engineering",
//         "Electronics and Communication Engineering",
//         "Civil Engineering",
//         "Automobile Engineering",
//         "Aerospace Engineering",
//         "Biomedical Engineering",
//         "Chemical Engineering",
//         "Environmental Engineering",
//         "Industrial Engineering",
//         "Robotics Engineering",
      
//         // Business & Management
//         "Business Administration",
//         "Finance and Accounting",
//         "Marketing",
//         "Entrepreneurship",
//         "Supply Chain Management",
//         "Human Resource Management",
//         "Operations Management",
//         "E-commerce",
      
//         // Health & Medicine
//         "Medicine",
//         "Nursing",
//         "Pharmacy",
//         "Dentistry",
//         "Physiotherapy",
//         "Public Health",
//         "Nutrition and Dietetics",
//         "Biotechnology",
//         "Biomedical Sciences",
//         "Veterinary Science",
      
//         // Arts & Humanities
//         "English Literature",
//         "History",
//         "Philosophy",
//         "Linguistics",
//         "Psychology",
//         "Sociology",
//         "Political Science",
//         "International Relations",
//         "Education and Teaching",
//         "Fine Arts",
//         "Music",
//         "Theater and Performing Arts",
//         "Journalism and Mass Communication",
      
//         // Science & Research
//         "Physics",
//         "Chemistry",
//         "Biology",
//         "Mathematics",
//         "Astronomy",
//         "Geology",
//         "Environmental Science",
//         "Agriculture",
//         "Forestry",
//         "Marine Biology",
//         "Genetics",
      
//         // Law & Legal Studies
//         "Law",
//         "Criminology",
//         "Forensic Science",
//         "Intellectual Property Law",
//         "Corporate Law",
//         "International Law",
//         "Human Rights Law",
      
//         // Social Sciences & Others
//         "Social Work",
//         "Anthropology",
//         "Economics",
//         "Urban Planning",
//         "Library and Information Science",
      
//         // Design & Creative Fields
//         "Graphic Design",
//         "UI/UX Design",
//         "Fashion Design",
//         "Interior Design",
//         "Industrial Design",
//         "Film and Television Production",
//         "Animation and Visual Effects",
//         "Photography",
      
//         // Education & Training
//         "Primary Education",
//         "Secondary Education",
//         "Higher Education",
//         "Special Education",
//         "Educational Psychology",
//         "E-learning and Instructional Design"
//       ];
//       const degreesList = [
//         // Undergraduate Degrees
//         "Associate of Arts (AA)",
//         "Associate of Science (AS)",
//         "Associate of Applied Science (AAS)",
//         "Bachelor of Arts (BA)",
//         "Bachelor of Science (BS)",
//         "Bachelor of Business Administration (BBA)",
//         "Bachelor of Commerce (BCom)",
//         "Bachelor of Engineering (BE)",
//         "Bachelor of Technology (BTech)",
//         "Bachelor of Computer Applications (BCA)",
//         "Bachelor of Fine Arts (BFA)",
//         "Bachelor of Architecture (BArch)",
//         "Bachelor of Design (BDes)",
//         "Bachelor of Pharmacy (BPharm)",
//         "Bachelor of Law (LLB)",
//         "Bachelor of Education (BEd)",
//         "Bachelor of Social Work (BSW)",
//         "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
//         "Bachelor of Dental Surgery (BDS)",
//         "Bachelor of Nursing (BN)",
//         "Bachelor of Public Health (BPH)",
      
//         // Postgraduate Degrees
//         "Master of Arts (MA)",
//         "Master of Science (MS/MSc)",
//         "Master of Business Administration (MBA)",
//         "Master of Commerce (MCom)",
//         "Master of Engineering (ME)",
//         "Master of Technology (MTech)",
//         "Master of Computer Applications (MCA)",
//         "Master of Fine Arts (MFA)",
//         "Master of Architecture (MArch)",
//         "Master of Design (MDes)",
//         "Master of Pharmacy (MPharm)",
//         "Master of Law (LLM)",
//         "Master of Education (MEd)",
//         "Master of Social Work (MSW)",
//         "Master of Public Administration (MPA)",
//         "Master of Public Health (MPH)",
//         "Master of Philosophy (MPhil)",
      
//         // Doctorate Degrees
//         "Doctor of Philosophy (PhD)",
//         "Doctor of Science (DSc)",
//         "Doctor of Engineering (DEng)",
//         "Doctor of Medicine (MD)",
//         "Doctor of Dental Medicine (DMD)",
//         "Doctor of Pharmacy (PharmD)",
//         "Doctor of Public Health (DrPH)",
//         "Doctor of Business Administration (DBA)",
//         "Doctor of Education (EdD)",
//         "Doctor of Laws (LLD)",
//         "Doctor of Social Work (DSW)",
      
//         // Professional Degrees
//         "Juris Doctor (JD)",
//         "Doctor of Veterinary Medicine (DVM)",
//         "Doctor of Optometry (OD)",
//         "Doctor of Physical Therapy (DPT)",
//         "Doctor of Chiropractic (DC)",
//         "Doctor of Occupational Therapy (OTD)",
      
//         // Diplomas & Certificates
//         "Diploma in Engineering",
//         "Diploma in Nursing",
//         "Diploma in Computer Applications",
//         "Postgraduate Diploma (PGD)",
//         "Advanced Diploma",
//         "Certificate Program"
//       ];

//     const [allCandidates, setAllCandidates] = useState([]);
    
//     // Filtered candidates to display
//     const [filteredCandidates, setFilteredCandidates] = useState([]);
//     console.log(filteredCandidates)
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filterVisible, setFilterVisible] = useState(false);
//     const [showLeftFilters, setShowLeftFilters] = useState(true);
//     const [sortOption, setSortOption] = useState('relevance');
//     const [expandedFilters, setExpandedFilters] = useState({
//         basicInfo: true,
//         experience: true,
//         skills: true,
//         education: true,
//         availability: false,
//         compensation: false,
//         preferences: false,
//         activity: false
//     });
//     const [loading, setLoading] = useState(false);
//      // New state variables for job description upload
//      const [jobDescription, setJobDescription] = useState('');
//      const [isUploading, setIsUploading] = useState(false);
//      const [uploadedFile, setUploadedFile] = useState(null);
//      const [matchScoreEnabled, setMatchScoreEnabled] = useState(false);
//      const fileInputRef = useRef(null);
 
//      const handleFileUpload = (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         setIsUploading(true);
        
//         // Simulate file reading
//         const reader = new FileReader();
//         reader.onload = (event) => {
//             const content = event.target.result;
//             setJobDescription(content);
//             setUploadedFile(file);
//             setIsUploading(false);
//             setMatchScoreEnabled(true);
            
//             // After uploading job description, automatically analyze and score candidates
//             analyzeAndScoreCandidates(content);
//         };
        
//         reader.readAsText(file);
//     };

//     // Handle manual job description input
//     const handleJobDescriptionChange = (e) => {
//         setJobDescription(e.target.value);
//     };

//     // Handle apply job description button
//     const applyJobDescription = () => {
//         if (jobDescription.trim().length === 0) return;
//         setMatchScoreEnabled(true);
//         analyzeAndScoreCandidates(jobDescription);
//     };

//     // Function to analyze job description and score candidates
//     const analyzeAndScoreCandidates = (description) => {
//         // This would be connected to your actual candidate matching algorithm
//         // For demonstration, we'll create a simple scoring function
        
//         const scoredCandidates = filteredCandidates.map(candidate => {
//             // Calculate a match score based on skills, experience, etc.
//             // This is a simplified example - you'd want a more sophisticated algorithm
//             let score = 0;
            
//             // Check for key terms in job description that match candidate profile
//             const keyTerms = description.toLowerCase().split(/\s+/);
            
//             // Match job title/role
//             if (candidate.jobRole && keyTerms.some(term => 
//                 candidate.jobRole.toLowerCase().includes(term))) {
//                 score += 20;
//             }
            
//             // Match skills
//             if (candidate.skills) {
//                 candidate.skills.forEach(skill => {
//                     if (keyTerms.some(term => skill.toLowerCase().includes(term))) {
//                         score += 10;
//                     }
//                 });
//             }
            
//             // Match experience level
//             if (candidate.experience && keyTerms.some(term => 
//                 candidate.experience.toLowerCase().includes(term))) {
//                 score += 15;
//             }
            
//             // Match industry
//             if (candidate.industry && keyTerms.some(term => 
//                 candidate.industry.toLowerCase().includes(term))) {
//                 score += 15;
//             }
            
//             // Normalize score to 0-100
//             score = Math.min(Math.round(score), 100);
            
//             return {
//                 ...candidate,
//                 matchScore: score
//             };
//         });
        
//         // Sort candidates by match score
//         scoredCandidates.sort((a, b) => b.matchScore - a.matchScore);
        
//         // Update filtered candidates with scores
//         setFilteredCandidates(scoredCandidates);
//         setSortOption('matchScore');
//     };

//     // Remove uploaded job description
//     const removeJobDescription = () => {
//         setJobDescription('');
//         setUploadedFile(null);
//         setMatchScoreEnabled(false);
        
//         // Reset candidate ordering to default
//         handleSortChange({ target: { value: 'relevance' } });
//     };

//     // Trigger file input click
//     const triggerFileUpload = () => {
//         fileInputRef.current.click();
//     };

//     // Function to get query parameters from URL
//     function getQueryParams() {
//         const urlParams = new URLSearchParams(window.location.search);

//         // Extract each parameter
//         const searchQuery = urlParams.get('q') || '';
//         const location = urlParams.get('location') || '';
//         const jobType = urlParams.get('jobType') || '';
//         const industry = urlParams.get('industry') || '';
//         const experience = urlParams.get('experience') || '';
//         const skills = urlParams.get('skills') || '';

//         // Return as an object
//         return {
//             searchQuery,
//             location,
//             jobType,
//             industry,
//             experience,
//             skills
//         };
//     }

//     // Get URL parameters
//     const params = getQueryParams();

//     // Primary search filters (displayed at top) - Initialize from URL params
//     // Skills and experience are included here as primary filters
//     const [primaryFilters, setPrimaryFilters] = useState({
//         jobRole: params.searchQuery || "",
//         industry: params.industry || "",
//         experience: params.experience || "",
//         location: params.location || "",
//         skills: params.skills || ""
//     });

//     // Build dynamic applied filters from URL parameters
//     const buildAppliedFiltersFromParams = () => {
//         const filters = [];

//         if (params.searchQuery) {
//             filters.push({ key: "jobRole", value: params.searchQuery });
//         }

//         if (params.location) {
//             filters.push({ key: "location", value: params.location });
//         }

//         if (params.industry) {
//             filters.push({ key: "industry", value: params.industry });
//         }

//         if (params.experience) {
//             filters.push({ key: "experience", value: params.experience });
//         }

//         if (params.skills) {
//             // If skills is comma-separated, split and add each skill
//             const skillsList = params.skills.split(',');
//             skillsList.forEach(skill => {
//                 if (skill.trim()) {
//                     filters.push({ key: "skills", value: skill.trim() });
//                 }
//             });
//         }

//         if (params.jobType) {
//             filters.push({ key: "jobType", value: params.jobType });
//         }

//         // Return default filters if no parameters found
//         // return filters.length > 0 ? filters : "No Primary filter applied";
//         return filters
//     };

//     // Applied filters to be shown as chips - Initialize from URL params
//     const [appliedFilters, setAppliedFilters] = useState(buildAppliedFiltersFromParams());

//     // Advanced filters state - Removed skills and experience
//     const [advancedFilters, setAdvancedFilters] = useState({
//         // Education section
//         degree: "Any",
//         university: "",
//         graduationYear: "Any",
//         specialization: "Any",
//         educationDegree: "Any",

//         // Employment section
//         currentTitle: "",
//         currentCompany: "",
//         industry: params.industry || "Any",

//         // Compensation section
//         minSalary: "",
//         maxSalary: "",

//         minSalaryExpected:"",
//         maxSalaryExpected:"",

//         // Availability
//         availableFrom: "Any",

//         // Preferences
//         workType: 'Any',
//         language: 'Any',
//         workAuthorization: 'Any',
//         companySize: 'Any',
//         womenInTech: false,
//         veteranStatus: false,
//         pwd: false,
//         willingToRelocate: false,
//         remoteOnly: false,
//         openToTravel: false,

//         // Activity
//         lastActive: "Any",
//         responseRate: "Any"
//     });

//     const fetchCandidates = async () => {
//         console.log("API Initiated");
//         try {
//             const res = await axios.get(
//                 `${BASEURL}/candidates/search_candidates?job_role=${params.searchQuery || ''}&industry=${params.industry || ''}&job_experience_required=${params.experience || ''}&job_location=${params.location || ''}&job_skills_required=${params.skills || ''}`
//             );

//             if (res?.data?.data) {
//                 console.log("Candidates data received:", res.data.data.length);
//                 setAllCandidates(res.data.data);
//                 setFilteredCandidates(res.data.data);
//             } else {
//                 console.error("No data received from API");
//             }
//         } catch (error) {
//             console.error("Error fetching candidates:", error);
//         }
//     };

//     // Update URL based on applied filters
//     const updateURL = (filters) => {
//         const urlParams = new URLSearchParams();

//         // Group filters by key
//         const filterGroups = {};
//         filters.forEach(filter => {
//             if (!filterGroups[filter.key]) {
//                 filterGroups[filter.key] = [];
//             }
//             filterGroups[filter.key].push(filter.value);
//         });

//         // Add params to URL
//         if (filterGroups.jobRole) {
//             urlParams.set('q', filterGroups.jobRole[0]);
//         }

//         if (filterGroups.location) {
//             urlParams.set('location', filterGroups.location[0]);
//         }

//         if (filterGroups.industry) {
//             urlParams.set('industry', filterGroups.industry[0]);
//         }

//         if (filterGroups.experience) {
//             urlParams.set('experience', filterGroups.experience[0]);
//         }

//         if (filterGroups.skills) {
//             urlParams.set('skills', filterGroups.skills.join(','));
//         }

//         if (filterGroups.jobType) {
//             urlParams.set('jobType', filterGroups.jobType[0]);
//         }

//         if (filterGroups.minSalary) {
//             urlParams.set('minSalary', filterGroups.minSalary[0]);
//         }

//         if (filterGroups.maxSalary) {
//             urlParams.set('maxSalary', filterGroups.maxSalary[0]);
//         }
//         if (filterGroups.minSalaryExpected) {
//             urlParams.set('minSalaryExpected', filterGroups.minSalaryExpected[0]);
//         }

//         if (filterGroups.maxSalaryExpected) {
//             urlParams.set('maxSalaryExpected', filterGroups.maxSalaryExpected[0]);
//         }
//         if (filterGroups.workType) {
//             urlParams.set('workType', filterGroups.workType[0]);
//         }

//         if (filterGroups.language) {
//             urlParams.set('language', filterGroups.language[0]);
//         }

//         if (filterGroups.workAuthorization) {
//             urlParams.set('workAuth', filterGroups.workAuthorization[0]);
//         }

//         // Boolean filters
//         if (filterGroups.womenInTech) {
//             urlParams.set('womenInTech', 'true');
//         }

//         if (filterGroups.veteranStatus) {
//             urlParams.set('veteran', 'true');
//         }

//         if (filterGroups.pwd) {
//             urlParams.set('pwd', 'true');
//         }

//         if (filterGroups.willingToRelocate) {
//             urlParams.set('relocate', 'true');
//         }

//         if (filterGroups.openToTravel) {
//             urlParams.set('travel', 'true');
//         }

//         if (filterGroups.remoteOnly) {
//             urlParams.set('remote', 'true');
//         }


//         // Update browser URL without reloading the page
//         window.history.pushState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
//     };

//     const toggleFilter = (filterName) => {
//         setExpandedFilters({
//             ...expandedFilters,
//             [filterName]: !expandedFilters[filterName]
//         });
//     };

//     // Updated to ensure skills uses the correct key
//     const applyPrimaryFilters = () => {
//         const newFilters = [];

//         if (primaryFilters.jobRole) {
//             newFilters.push({ key: "jobRole", value: primaryFilters.jobRole });
//         }

//         if (primaryFilters.industry) {
//             newFilters.push({ key: "industry", value: primaryFilters.industry });
//         }

//         if (primaryFilters.experience) {
//             newFilters.push({ key: "experience", value: primaryFilters.experience });
//         }

//         if (primaryFilters.location) {
//             newFilters.push({ key: "location", value: primaryFilters.location });
//         }

//         // Fixed key for skills filter (was incorrectly "location")
//         if (primaryFilters.skills) {
//             newFilters.push({ key: "skills", value: primaryFilters.skills });
//         }

//         setAppliedFilters(newFilters);
//         updateURL(newFilters);
//         setFilterVisible(false);
//     };

//     // Modified to handle skills as part of primary filters
//     const removeFilter = (filterKey, filterValue) => {
//         // Remove specific filter by key and value
//         const updatedFilters = appliedFilters.filter(
//             filter => !(filter.key === filterKey && filter.value === filterValue)
//         );

//         setAppliedFilters(updatedFilters);
//         updateURL(updatedFilters);



//         if (filterKey === 'jobRole') {
//             setPrimaryFilters({ ...primaryFilters, jobRole: '' });
//         } else if (filterKey === 'industry') {
//             setPrimaryFilters({ ...primaryFilters, industry: '' });
//         } else if (filterKey === 'experience') {
//             setPrimaryFilters({ ...primaryFilters, experience: '' });
//         } else if (filterKey === 'location') {
//             setPrimaryFilters({ ...primaryFilters, location: '' });
//         } else if (filterKey === 'skills') {
//             setPrimaryFilters({ ...primaryFilters, skills: '' });
//         }
//         // Handle advanced filters 
//         else if (filterKey === 'degree') {
//             setAdvancedFilters({ ...advancedFilters, degree: 'Any' });
//         }
//         else if (filterKey === 'educationDegree') {
//             setAdvancedFilters({ ...advancedFilters, educationDegree: 'Any' });
//         }
//         else if (filterKey === 'specialization') {
//             setAdvancedFilters({ ...advancedFilters, specialization: 'Any' });
//         }
//         else if (filterKey === 'university') {
//             setAdvancedFilters({ ...advancedFilters, university: '' });
//         } else if (filterKey === 'graduationYear') {
//             setAdvancedFilters({ ...advancedFilters, graduationYear: 'Any' });
//         } else if (filterKey === 'currentTitle') {
//             setAdvancedFilters({ ...advancedFilters, currentTitle: '' });
//         } else if (filterKey === 'employmentType') {
//             setAdvancedFilters({ ...advancedFilters, employmentType: 'Any' });
//         } else if (filterKey === 'currentCompany') {
//             setAdvancedFilters({ ...advancedFilters, currentCompany: '' });
//         }
//         else if (filterKey === 'minSalary') {
//             setAdvancedFilters({ ...advancedFilters, minSalary: '' });
//         } else if (filterKey === 'maxSalary') {
//             setAdvancedFilters({ ...advancedFilters, maxSalary: '' });
//         } else if (filterKey === 'minSalaryExpected') {
//             setAdvancedFilters({ ...advancedFilters, minSalaryExpected: '' });
//         } else if (filterKey === 'maxSalaryExpected') {
//             setAdvancedFilters({ ...advancedFilters, maxSalaryExpected: '' });
//         } else if (filterKey === 'workType') {
//             setAdvancedFilters({ ...advancedFilters, workType: 'Any' });
//         } else if (filterKey === 'language') {
//             setAdvancedFilters({ ...advancedFilters, language: 'Any' });
//         } else if (filterKey === 'workAuthorization') {
//             setAdvancedFilters({ ...advancedFilters, workAuthorization: 'Any' });
//         } else if (filterKey === 'companySize') {
//             setAdvancedFilters({ ...advancedFilters, companySize: 'Any' });
//         } else if (filterKey === 'womenInTech') {
//             setAdvancedFilters({ ...advancedFilters, womenInTech: false });
//         } else if (filterKey === 'veteranStatus') {
//             setAdvancedFilters({ ...advancedFilters, veteranStatus: false });
//         } else if (filterKey === 'pwd') {
//             setAdvancedFilters({ ...advancedFilters, pwd: false });
//         } else if (filterKey === 'willingToRelocate') {
//             setAdvancedFilters({ ...advancedFilters, willingToRelocate: false });
//         } else if (filterKey === 'openToTravel') {
//             setAdvancedFilters({ ...advancedFilters, openToTravel: false });
//         } else if (filterKey === 'remoteOnly') {
//             setAdvancedFilters({ ...advancedFilters, remoteOnly: false });
//         }
//     };

//     const resetAllFilters = () => {
//         setAppliedFilters([]);
//         setPrimaryFilters({
//             jobRole: "",
//             industry: "",
//             experience: "",
//             location: "",
//             skills: ""
//         });
//         setAdvancedFilters({
//             // Education section
//             degree: "Any",
//             university: "",
//             graduationYear: "Any",
//             specialization: "Any",
//             educationDegree: "Any",

//             // Employment section
//             currentTitle: "",
//             currentCompany: "",
//             industry: "Any",
//             employmentType: "Any",

//             // Compensation section
//             // salaryRange: "Any",
//             minSalary: "",
//             maxSalary: "",
            
//             minSalaryExpected:"",
//             maxSalaryExpected:"",

//             // Availability
//             availableFrom: "Any",

//             // Preferences
//             workType: "Any",
//             language: "Any",
//             workAuthorization: "Any",
//             companySize: "Any",
//             womenInTech: false,
//             veteranStatus: false,
//             pwd: false,
//             willingToRelocate: false,
//             remoteOnly: false,
//             openToTravel: false,

//             // Activity
//             lastActive: "Any",
//             responseRate: "Any"
//         });

//         // Clear URL parameters
//         window.history.pushState({}, '', window.location.pathname);

//         // Display all candidates
//         setFilteredCandidates(allCandidates);
//     };

//     // Modified to remove skills handling as it's now in primary filters
//     const applyAdvancedFilters = () => {

//         const basicFilters = appliedFilters.filter(filter =>
//             !['degree', 'university','specialization', 'graduationYear', 'employmentType','educationDegree',
//                 'currentTitle', 'currentCompany', 'availableFrom', 'remoteOnly',
//                 'workType', 'language', 'workAuthorization', 'companySize',
//                 'womenInTech', 'veteranStatus', 'pwd', 'willingToRelocate', 'openToTravel', 'minSalary', 'maxSalary','minSalaryExpected','maxSalaryExpected'].includes(filter.key)
//         );

//         // Add new advanced filters
//         const newFilters = [...basicFilters];

//         // Removed skills handling from here as it's now in primary filters

//         // Add education filters
//         if (advancedFilters.degree !== "Any") {
//             newFilters.push({ key: "degree", value: advancedFilters.degree });
//         } 
//         if (advancedFilters.educationDegree !== "Any") {
//             newFilters.push({ key: "educationDegree", value: advancedFilters.educationDegree });
//         }
//         if (advancedFilters.specialization !== "Any") {
//             newFilters.push({ key: "specialization", value: advancedFilters.specialization });
//         }

//         if (advancedFilters.university) {
//             newFilters.push({ key: "university", value: advancedFilters.university });
//         }

//         if (advancedFilters.graduationYear !== "Any") {
//             newFilters.push({ key: "graduationYear", value: advancedFilters.graduationYear });
//         }

//         // Add employment filters
//         if (advancedFilters.currentTitle) {
//             newFilters.push({ key: "currentTitle", value: advancedFilters.currentTitle });
//         }

//         if (advancedFilters.currentCompany) {
//             newFilters.push({ key: "currentCompany", value: advancedFilters.currentCompany });
//         }
//         if (advancedFilters.employmentType) {
//             newFilters.push({ key: "employmentType", value: advancedFilters.employmentType });
//         }

//         if (advancedFilters.minSalary) {
//             newFilters.push({ key: "minSalary", value: advancedFilters.minSalary });
//         }

//         if (advancedFilters.maxSalary) {
//             newFilters.push({ key: "maxSalary", value: advancedFilters.maxSalary });
//         }

        
//         if (advancedFilters.minSalaryExpected) {
//             newFilters.push({ key: "minSalaryExpected", value: advancedFilters.minSalaryExpected });
//         }

//         if (advancedFilters.maxSalaryExpected) {
//             newFilters.push({ key: "maxSalaryExpected", value: advancedFilters.maxSalaryExpected });
//         }

//         // Add availability filter
//         if (advancedFilters.availableFrom !== "Any") {
//             newFilters.push({ key: "availableFrom", value: advancedFilters.availableFrom });
//         }

//         // Add Work mode preference filter
//         if (advancedFilters.workType !== "Any") {
//             newFilters.push({ key: "workType", value: advancedFilters.workType });
//         }

//         // Add language preference filter
//         if (advancedFilters.language !== "Any") {
//             newFilters.push({ key: "language", value: advancedFilters.language });
//         }

//         // Add work authorization filter
//         if (advancedFilters.workAuthorization !== "Any") {
//             newFilters.push({ key: "workAuthorization", value: advancedFilters.workAuthorization });
//         }

//         // Add company size preference filter
//         if (advancedFilters.companySize !== "Any") {
//             newFilters.push({ key: "companySize", value: advancedFilters.companySize });
//         }

//         // Add boolean preference filters
//         if (advancedFilters.womenInTech) {
//             newFilters.push({ key: "womenInTech", value: true });
//         }

//         if (advancedFilters.veteranStatus) {
//             newFilters.push({ key: "veteranStatus", value: true });
//         }

//         if (advancedFilters.pwd) {
//             newFilters.push({ key: "pwd", value: true });
//         }

//         // Add remote work preference
//         if (advancedFilters.remoteOnly) {
//             newFilters.push({ key: "remoteOnly", value: "Remote" });
//         }

//         // Add willing to relocate preference
//         if (advancedFilters.willingToRelocate) {
//             newFilters.push({ key: "willingToRelocate", value: true });
//         }

//         // Add open to travel preference
//         if (advancedFilters.openToTravel) {
//             newFilters.push({ key: "openToTravel", value: true });
//         }

//         setAppliedFilters(newFilters);
//         updateURL(newFilters);
//     };

//     const filterCandidatesLocally = () => {
//         console.log("Starting local filtering with applied filters:", appliedFilters);

//         // Always start with all candidates for each filtering operation
//         let results = [...allCandidates];
//         console.log(`Starting with ${results.length} total candidates`);

//         // Track filters applied for debugging
//         const appliedFilterTracker = {};

//         // Apply each filter one by one
//         appliedFilters.forEach(filter => {
//             const { key, value } = filter;
//             const beforeCount = results.length;

//             if (key === "name" && value) {
//                 results = results.filter(candidate => {
//                     const firstName = (candidate.candidate_first_name || '').toLowerCase();
//                     const lastName = (candidate.candidate_last_name || '').toLowerCase();
//                     const fullName = `${firstName} ${lastName}`.toLowerCase();
//                     return fullName.includes(value.toLowerCase()) ||
//                         firstName.includes(value.toLowerCase()) ||
//                         lastName.includes(value.toLowerCase());
//                 });
//                 appliedFilterTracker["name"] = `${beforeCount} → ${results.length}`;
//             }

//             // Add email filter
//             else if (key === "email" && value) {
//                 results = results.filter(candidate => {
//                     const email = (candidate.candidate_email || '').toLowerCase();
//                     return email.includes(value.toLowerCase());
//                 });
//                 appliedFilterTracker["email"] = `${beforeCount} → ${results.length}`;
//             }
//             else if (key === "phone" && value) {
//                 results = results.filter(candidate => {
//                     // Normalize phone numbers by removing all non-digit characters for comparison
//                     const normalizedSearchPhone = value.replace(/\D/g, '');
//                     const candidatePhone = (candidate.candidate_phone || '').replace(/\D/g, '');
//                     const candidateMobile = (candidate.candidate_mobile || '').replace(/\D/g, '');

//                     // Check if the normalized search phone is contained in either phone or mobile
//                     return candidatePhone.includes(normalizedSearchPhone) ||
//                         candidateMobile.includes(normalizedSearchPhone);
//                 });
//                 appliedFilterTracker["phone"] = `${beforeCount} → ${results.length}`;
//             }
//             else if (key === "degree" && value && value !== "Any") {
//                 console.log("Degree filter value:", value);

//                 results = results.filter(candidate => {
//                     // Log the education data for each candidate
//                     console.log("Candidate ID:", candidate.id, "Education:", candidate.candidate_education);

//                     if (!candidate.candidate_education || !Array.isArray(candidate.candidate_education)) {
//                         console.log("-> Candidate has no education array");
//                         return false;
//                     }

//                     const matchFound = candidate.candidate_education.some(edu => {
//                         const educationLevel = (edu.candidate_education_level || '').toLowerCase();
//                         console.log("-> Checking education level:", educationLevel, "against filter:", value.toLowerCase());
//                         return educationLevel.includes(value.toLowerCase());
//                     });

//                     console.log("-> Match found:", matchFound);
//                     return matchFound;
//                 });
//                 appliedFilterTracker["degree"] = `${beforeCount} → ${results.length}`;

//                 console.log("Results count after degree filter:", results.length);
//             } 
//             else if (key === "educationDegree" && value && value !== "Any") {
                

//                 results = results.filter(candidate => {
//                     // Log the education data for each candidate
                    

//                     if (!candidate.candidate_education || !Array.isArray(candidate.candidate_education)) {
//                         console.log("-> Candidate has no education array");
//                         return false;
//                     }

//                     const matchFound = candidate.candidate_education.some(edu => {
//                         const educationLevel = (edu.candidate_degree || '').toLowerCase();
//                         console.log("-> Checking education level:", educationLevel, "against filter:", value.toLowerCase());
//                         return educationLevel.includes(value.toLowerCase());
//                     });

//                     console.log("-> Match found:", matchFound);
//                     return matchFound;
//                 });
//                 appliedFilterTracker["educationDegree"] = `${beforeCount} → ${results.length}`;

//                 console.log("Results count after degree filter:", results.length);
//             }

//             // University filter
//             else if (key === "university" && value) {
//                 results = results.filter(candidate => {
//                     if (!candidate.candidate_education || !Array.isArray(candidate.candidate_education)) {
//                         return false;
//                     }

//                     return candidate.candidate_education.some(edu => {
//                         const institute = (edu.candidate_institute || '').toLowerCase();
//                         return institute.includes(value.toLowerCase());
//                     });
//                 });
//                 appliedFilterTracker["university"] = `${beforeCount} → ${results.length}`;
//             } 
//             else if (key === "specialization" && value) {
//                 results = results.filter(candidate => {
//                     if (!candidate.candidate_education || !Array.isArray(candidate.candidate_education)) {
//                         return false;
//                     }

//                     return candidate.candidate_education.some(edu => {
//                         const specializationDegree = (edu.candidate_degree_specialization || '').toLowerCase();
//                         return specializationDegree.includes(value.toLowerCase());
//                     });
//                 });
//                 appliedFilterTracker["specialization"] = `${beforeCount} → ${results.length}`;
//             }

//             // Graduation Year filter
//             else if (key === "graduationYear" && value && value !== "Any") {
//                 results = results.filter(candidate => {
//                     if (!candidate.candidate_education || !Array.isArray(candidate.candidate_education)) {
//                         return false;
//                     }

//                     if (value.includes('+')) {
//                         // Format: "2015+" means 2015 or later
//                         const minYear = parseInt(value.replace('+', ''), 10);
//                         return candidate.candidate_education.some(edu => {
//                             const endYear = parseInt(edu.candidate_end_year, 10);
//                             return !isNaN(endYear) && endYear >= minYear;
//                         });
//                     } else {
//                         // Exact year match
//                         const exactYear = parseInt(value, 10);
//                         return candidate.candidate_education.some(edu => {
//                             const endYear = parseInt(edu.candidate_end_year, 10);
//                             return !isNaN(endYear) && endYear === exactYear;
//                         });
//                     }
//                 });
//                 appliedFilterTracker["graduationYear"] = `${beforeCount} → ${results.length}`;
//             }
//             else if (key === "minSalary" && value) {
//                 results = results.filter(candidate => {
//                     const candidateSalary = parseInt(candidate.candidate_current_salary || 0, 10);
//                     const minSalary = parseInt(value, 10);
//                     return !isNaN(candidateSalary) && !isNaN(minSalary) && candidateSalary >= minSalary;
//                 });
//                 appliedFilterTracker["minSalary"] = `${beforeCount} → ${results.length}`;
//             }

//             // Maximum Salary filter
//             else if (key === "maxSalary" && value) {
//                 results = results.filter(candidate => {
//                     const candidateSalary = parseInt(candidate.candidate_current_salary || 0, 10);
//                     const maxSalary = parseInt(value, 10);
//                     return !isNaN(candidateSalary) && !isNaN(maxSalary) && candidateSalary <= maxSalary;
//                 });
//                 appliedFilterTracker["maxSalary"] = `${beforeCount} → ${results.length}`;
//             }

//             else if (key === "minSalaryExpected" && value) {
//                 results = results.filter(candidate => {
//                     const candidateSalary = parseInt(candidate?.candidate_preference[0]?.expected_salary || 0, 10);
//                     const minSalary = parseInt(value, 10);
//                     return !isNaN(candidateSalary) && !isNaN(minSalary) && candidateSalary >= minSalary;
//                 });
//                 appliedFilterTracker["minSalaryExpected"] = `${beforeCount} → ${results.length}`;
//             }

//             // Maximum Salary filter
//             else if (key === "maxSalaryExpected" && value) {
//                 results = results.filter(candidate => {
//                     const candidateSalary = parseInt(candidate?.candidate_preference[0]?.expected_salary || 0, 10);
//                     const maxSalary = parseInt(value, 10);
//                     return !isNaN(candidateSalary) && !isNaN(maxSalary) && candidateSalary <= maxSalary;
//                 });
//                 appliedFilterTracker["maxSalary"] = `${beforeCount} → ${results.length}`;
//             }

//             // Current Title filter
//             else if (key === "currentTitle" && value) {
//                 results = results.filter(candidate => {
//                     const title = candidate.candidate_current_role || '';
//                     return title.toLowerCase().includes(value.toLowerCase());
//                 });
//                 appliedFilterTracker["currentTitle"] = `${beforeCount} → ${results.length}`;
//             }

//             // Current Company filter
//             else if (key === "currentCompany" && value) {
//                 results = results.filter(candidate => {
//                     const company = candidate.candidate_current_company || '';
//                     return company.toLowerCase().includes(value.toLowerCase());
//                 });
//                 appliedFilterTracker["currentCompany"] = `${beforeCount} → ${results.length}`;
//             }

//             // Availability filter
//             else if (key === "availableFrom" && value && value !== "Any") {
//                 results = results.filter(candidate => {
//                     const availability = candidate.candidate_availability || '';
//                     return availability.toLowerCase().includes(value.toLowerCase());
//                 });
//                 appliedFilterTracker["availableFrom"] = `${beforeCount} → ${results.length}`;
//             }
//             // Employment Type
//             else if (key === "employmentType" && value && value !== "Any") {
//                 results = results.filter(candidate => {
//                     // Check if preference array exists and has items
//                     if (!candidate.candidate_preference || !Array.isArray(candidate.candidate_preference) || candidate.candidate_preference.length === 0) {
//                         return false;
//                     }
//                     // Use the first preference object in the array
//                     const authorization = candidate.candidate_preference[0].employment_type || '';
//                     return authorization.toLowerCase().includes(value.toLowerCase());
//                 });
//                 appliedFilterTracker["employmentType"] = `${beforeCount} → ${results.length}`;
//             }

//             // Work type filter
//             else if (key === "workType" && value && value !== "Any") {
//                 results = results.filter(candidate => {
//                     const workPreference = candidate.candidate_work_preference || '';
//                     return workPreference.toLowerCase().includes(value.toLowerCase());
//                 });
//                 appliedFilterTracker["workType"] = `${beforeCount} → ${results.length}`;
//             }

//             // Language filter
//             else if (key === "language" && value && value !== "Any") {
//                 results = results.filter(candidate => {
//                     const candidateLanguages = candidate.candidate_languages || [];
//                     if (Array.isArray(candidateLanguages)) {
//                         return candidateLanguages.some(lang =>
//                             (lang.candidate_language || '').toLowerCase().includes(value.toLowerCase())
//                         );
//                     }
//                     return false;
//                 });
//                 appliedFilterTracker["language"] = `${beforeCount} → ${results.length}`;
//             }

//             // Work Authorization filter
//             else if (key === "workAuthorization" && value && value !== "Any") {
//                 results = results.filter(candidate => {
//                     // Check if preference array exists and has items
//                     if (!candidate.candidate_preference || !Array.isArray(candidate.candidate_preference) || candidate.candidate_preference.length === 0) {
//                         return false;
//                     }
//                     // Use the first preference object in the array
//                     const authorization = candidate.candidate_preference[0].work_authorization || '';
//                     return authorization.toLowerCase().includes(value.toLowerCase());
//                 });
//                 appliedFilterTracker["workAuthorization"] = `${beforeCount} → ${results.length}`;
//             }

//             // Company Size preference filter
//             else if (key === "companySize" && value && value !== "Any") {
//                 console.log(value);

//                 results = results.filter(candidate => {
//                     // Check if preference array exists and has items
//                     if (!candidate.candidate_preference || !Array.isArray(candidate.candidate_preference) || candidate.candidate_preference.length === 0) {
//                         return false;
//                     }
//                     const sizePreference = candidate.candidate_preference[0].company_size || '';
//                     console.log(sizePreference)
//                     return sizePreference.toLowerCase().includes(value.toLowerCase());
//                 });
//                 appliedFilterTracker["companySize"] = `${beforeCount} → ${results.length}`;
//             }

//             // Women in Tech filter
//             else if (key === "womenInTech" && value === true) {
//                 results = results.filter(candidate => {
//                     // Check if candidate has identified as female in their profile
//                     const gender = candidate.candidate_gender || '';
//                     return gender.toLowerCase() === 'female' || gender.toLowerCase() === 'woman';
//                 });
//                 appliedFilterTracker["womenInTech"] = `${beforeCount} → ${results.length}`;
//             }

//             // Veteran Status filter
//             else if (key === "veteranStatus" && value === true) {
//                 results = results.filter(candidate => {
//                     // Check if preference array exists and has items
//                     if (!candidate.candidate_preference || !Array.isArray(candidate.candidate_preference) || candidate.candidate_preference.length === 0) {
//                         return false;
//                     }
//                     const isVeteran = candidate.candidate_preference[0].veteran_status || false;
//                     return isVeteran === true || isVeteran === 'true' || isVeteran === 'yes';
//                 });
//                 appliedFilterTracker["veteranStatus"] = `${beforeCount} → ${results.length}`;
//             }

//             // Person with Disability filter
//             else if (key === "pwd" && value === true) {
//                 results = results.filter(candidate => {
//                     const hasPwd = candidate.candidate_preference[0].pwd || false;
//                     return hasPwd === true || hasPwd === 'true' || hasPwd === 'yes';
//                 });
//                 appliedFilterTracker["pwd"] = `${beforeCount} → ${results.length}`;
//             }

           

//             // Willing to Relocate filter
//             else if (key === "willingToRelocate" && value === true) {
//                 // results = results.filter(candidate => {
//                 //     const willRelocate = candidate.candidate_willing_to_relocate || false;
//                 //     return willRelocate === true || willRelocate === 'true' || willRelocate === 'yes';
//                 // });
//                 // appliedFilterTracker["willingToRelocate"] = `${beforeCount} → ${results.length}`;

//                 results = results.filter(candidate => {
//                     // Check if preference array exists and has items
//                     if (!candidate.candidate_preference || !Array.isArray(candidate.candidate_preference) || candidate.candidate_preference.length === 0) {
//                         return false;
//                     }
//                     const willRelocate = candidate.candidate_preference[0].willing_to_relocate || false;
//                     return willRelocate === true || willRelocate === 'true' || willRelocate === 'yes';
//                 });
//                 appliedFilterTracker["willingToRelocate"] = `${beforeCount} → ${results.length}`;
//             }

//             // Open to Travel filter
//             else if (key === "openToTravel" && value === true) {
//                 // results = results.filter(candidate => {
//                 //     const openToTravel = candidate.candidate_open_to_travel || false;
//                 //     return openToTravel === true || openToTravel === 'true' || openToTravel === 'yes';
//                 // });
//                 // appliedFilterTracker["openToTravel"] = `${beforeCount} → ${results.length}`;

//                 results = results.filter(candidate => {
//                     // Check if preference array exists and has items
//                     if (!candidate.candidate_preference || !Array.isArray(candidate.candidate_preference) || candidate.candidate_preference.length === 0) {
//                         return false;
//                     }
//                     const openToTravel = candidate.candidate_preference[0].open_to_travel || false;
//                     return openToTravel === true || openToTravel === 'true' || openToTravel === 'yes';
//                 });
//                 appliedFilterTracker["openToTravel"] = `${beforeCount} → ${results.length}`;
//             }

//             // Primary filters - Add these back in to ensure they work
//             else if (key === "jobRole" && value) {
//                 results = results.filter(candidate => {
//                     const role = candidate.candidate_current_role || '';
//                     return role.toLowerCase().includes(value.toLowerCase());
//                 });
//                 appliedFilterTracker["jobRole"] = `${beforeCount} → ${results.length}`;
//             }

//             else if (key === "location" && value) {
//                 results = results.filter(candidate => {
//                     const location = candidate.candidate_location || '';
//                     const city = candidate.candidate_address?.[0]?.candidate_city || '';
//                     return location.toLowerCase().includes(value.toLowerCase()) ||
//                         city.toLowerCase().includes(value.toLowerCase());
//                 });
//                 appliedFilterTracker["location"] = `${beforeCount} → ${results.length}`;
//             }

//             else if (key === "industry" && value) {
//                 results = results.filter(candidate => {
//                     const role = candidate.candidate_current_role || '';
//                     const industry = candidate.candidate_industry || '';
//                     return role.toLowerCase().includes(value.toLowerCase()) ||
//                         industry.toLowerCase().includes(value.toLowerCase());
//                 });
//                 appliedFilterTracker["industry"] = `${beforeCount} → ${results.length}`;
//             }

//             else if (key === "experience" && value && value !== "Any") {
//                 results = results.filter(candidate => {
//                     // Parse experience range like "5-10 years"
//                     let minYears = 0, maxYears = 100;

//                     if (value.includes('-')) {
//                         const parts = value.split('-');
//                         minYears = parseInt(parts[0], 10) || 0;
//                         maxYears = parseInt(parts[1], 10) || 100;
//                     } else if (value.includes('+')) {
//                         minYears = parseInt(value, 10) || 0;
//                     } else {
//                         minYears = parseInt(value, 10) || 0;
//                         maxYears = minYears + 1;
//                     }

//                     // Calculate candidate's total experience
//                     let totalExp = 0;
//                     if (candidate.candidate_experience && Array.isArray(candidate.candidate_experience)) {
//                         totalExp = candidate.candidate_experience.reduce((sum, exp) => {
//                             // Calculate duration for each experience
//                             let startDate = new Date(exp.candidate_start_date);
//                             let endDate = exp.candidate_end_date ? new Date(exp.candidate_end_date) : new Date();

//                             if (isNaN(startDate.getTime())) return sum;

//                             // Calculate years difference
//                             const years = (endDate - startDate) / (1000 * 60 * 60 * 24 * 365);
//                             return sum + years;
//                         }, 0);
//                     }

//                     return totalExp >= minYears && totalExp <= maxYears;
//                 });
//                 appliedFilterTracker["experience"] = `${beforeCount} → ${results.length}`;
//             }

//             else if (key === "skills" && value) {
//                 results = results.filter(candidate => {
//                     if (!candidate.candidate_skills || !Array.isArray(candidate.candidate_skills)) {
//                         return false;
//                     }

//                     return candidate.candidate_skills.some(skillObj => {
//                         const skill = skillObj.candidate_skill || '';
//                         return skill.toLowerCase().includes(value.toLowerCase());
//                     });
//                 });
//                 appliedFilterTracker["skills"] = `${beforeCount} → ${results.length}`;
//             }
//         });

//         console.log("Filter results by step:", appliedFilterTracker);
//         console.log(`Final filtered candidates: ${results.length}`);

//         // Update state with filtered results
//         setFilteredCandidates(results);
//     };


//     const handleSearch = () => {
//         // Determine if search term looks like an email
//         const isEmail = searchTerm.includes('@');
//         const isPhone = /^[\d()\-+\s]+$/.test(searchTerm);

//         // Determine search type (name, email, role, or location)
//         let searchType = "jobRole"; // Default search type

//         if (isEmail) {
//             searchType = "email";
//         } else if (isPhone) {
//             searchType = "phone";
//         } else if (searchTerm.match(/^[a-zA-Z\s]+$/)) {
//             // If contains only letters and spaces, could be a name
//             searchType = "name";
//         }

//         // Clear any existing search-related filters
//         const updatedFilters = appliedFilters.filter(
//             filter => !["jobRole", "name", "email", "phone"].includes(filter.key)
//         );

//         // Add the new search filter
//         if (searchTerm) {
//             updatedFilters.push({ key: searchType, value: searchTerm });
//         }

//         setAppliedFilters(updatedFilters);
//         updateURL(updatedFilters);
//     };


//     const sortCandidates = (candidates, sortBy) => {
//         if (!candidates || candidates.length === 0) return [];

//         const sortedCandidates = [...candidates];

//         switch (sortBy) {
//             case 'relevance':
//                 // Relevance is the default sorting from the API
//                 return sortedCandidates;

//             case 'lastActive':
//                 // Sort by last active timestamp (most recent first)
//                 return sortedCandidates.sort((a, b) => {
//                     const dateA = a.candidate_last_active ? new Date(a.candidate_last_active) : new Date(0);
//                     const dateB = b.candidate_last_active ? new Date(b.candidate_last_active) : new Date(0);
//                     return dateB - dateA;
//                 });

//             case 'experience':
//                 // Sort by total years of experience (highest first)
//                 return sortedCandidates.sort((a, b) => {
//                     const getExperienceYears = (candidate) => {
//                         if (!candidate.candidate_experience || !Array.isArray(candidate.candidate_experience)) {
//                             return 0;
//                         }

//                         return candidate.candidate_experience.reduce((sum, exp) => {
//                             let startDate = new Date(exp.candidate_start_date);
//                             let endDate = exp.candidate_end_date ? new Date(exp.candidate_end_date) : new Date();

//                             if (isNaN(startDate.getTime())) return sum;

//                             const years = (endDate - startDate) / (1000 * 60 * 60 * 24 * 365);
//                             return sum + years;
//                         }, 0);
//                     };

//                     return getExperienceYears(b) - getExperienceYears(a);
//                 });

//             case 'education':
//                 // Sort by education level (prioritizing higher degrees)
//                 return sortedCandidates.sort((a, b) => {
//                     const educationRank = {
//                         'phd': 5,
//                         'doctorate': 5,
//                         'master': 4,
//                         'bachelor': 3,
//                         'associate': 2,
//                         'diploma': 1,
//                         'certificate': 0
//                     };

//                     const getHighestEducation = (candidate) => {
//                         if (!candidate.candidate_education || !Array.isArray(candidate.candidate_education)) {
//                             return -1;
//                         }

//                         let highestRank = -1;

//                         candidate.candidate_education.forEach(edu => {
//                             const level = (edu.candidate_education_level || '').toLowerCase();

//                             // Check each possible education keyword
//                             for (const [key, rank] of Object.entries(educationRank)) {
//                                 if (level.includes(key) && rank > highestRank) {
//                                     highestRank = rank;
//                                 }
//                             }
//                         });

//                         return highestRank;
//                     };

//                     return getHighestEducation(b) - getHighestEducation(a);
//                 });

//             case 'skillsMatch':
//                 // Sort by number of matching skills with the required skills
//                 return sortedCandidates.sort((a, b) => {
//                     // Get skills from primaryFilters instead of advancedFilters
//                     const requiredSkills = primaryFilters.skills ?
//                         primaryFilters.skills.split(',').map(skill => skill.trim().toLowerCase()) : [];

//                     const getSkillMatchCount = (candidate) => {
//                         if (!candidate.candidate_skills || !Array.isArray(candidate.candidate_skills)) {
//                             return 0;
//                         }

//                         let matchCount = 0;

//                         candidate.candidate_skills.forEach(skillObj => {
//                             const skill = (skillObj.candidate_skill || '').toLowerCase();

//                             // Check if this skill matches any of the required skills
//                             requiredSkills.forEach(requiredSkill => {
//                                 if (skill.includes(requiredSkill) || requiredSkill.includes(skill)) {
//                                     matchCount++;
//                                 }
//                             });
//                         });

//                         return matchCount;
//                     };

//                     return getSkillMatchCount(b) - getSkillMatchCount(a);
//                 });

//             case 'availability':
//                 // Sort by availability date (soonest first)
//                 return sortedCandidates.sort((a, b) => {
//                     const getAvailabilityDate = (candidate) => {
//                         const availability = candidate.candidate_availability || '';

//                         // Try to extract a date from the availability text
//                         const dateMatch = availability.match(/\b(\d{1,2}[-/]\d{1,2}[-/]\d{2,4}|\d{2,4}[-/]\d{1,2}[-/]\d{1,2})\b/);
//                         if (dateMatch) {
//                             const date = new Date(dateMatch[0]);
//                             if (!isNaN(date.getTime())) {
//                                 return date;
//                             }
//                         }

//                         // Look for keywords like "immediate" or "now"
//                         if (/immediate|now|asap/i.test(availability)) {
//                             return new Date(); // Today
//                         }

//                         // Default to a far future date for candidates without clear availability
//                         return new Date('2099-12-31');
//                     };

//                     return getAvailabilityDate(a) - getAvailabilityDate(b);
//                 });

//             case 'location':
//                 // Sort by location (matching the filter location first)
//                 const locationFilter = appliedFilters.find(filter => filter.key === 'location');
//                 const targetLocation = locationFilter ? locationFilter.value.toLowerCase() : '';

//                 return sortedCandidates.sort((a, b) => {
//                     if (!targetLocation) return 0;

//                     const locA = (a.candidate_location || '').toLowerCase();
//                     const locB = (b.candidate_location || '').toLowerCase();

//                     const cityA = a.candidate_address?.[0]?.candidate_city || '';
//                     const cityB = b.candidate_address?.[0]?.candidate_city || '';

//                     // Check exact matches first
//                     const aExactMatch = locA === targetLocation || cityA === targetLocation;
//                     const bExactMatch = locB === targetLocation || cityB === targetLocation;

//                     if (aExactMatch && !bExactMatch) return -1;
//                     if (!aExactMatch && bExactMatch) return 1;

//                     // Then check partial matches
//                     const aPartialMatch = locA.includes(targetLocation) || cityA.includes(targetLocation);
//                     const bPartialMatch = locB.includes(targetLocation) || cityB.includes(targetLocation);

//                     if (aPartialMatch && !bPartialMatch) return -1;
//                     if (!aPartialMatch && bPartialMatch) return 1;

//                     return 0;
//                 });

//             case 'nameAZ':
//                 // Sort alphabetically by name
//                 return sortedCandidates.sort((a, b) => {
//                     const nameA = (a.candidate_first_name || '').toLowerCase();
//                     const nameB = (b.candidate_first_name || '').toLowerCase();
//                     return nameA.localeCompare(nameB);
//                 });

//             case 'nameZA':
//                 // Sort reverse alphabetically by name
//                 return sortedCandidates.sort((a, b) => {
//                     const nameA = (a.candidate_first_name || '').toLowerCase();
//                     const nameB = (b.candidate_first_name || '').toLowerCase();
//                     return nameB.localeCompare(nameA);
//                 });

//             case 'applicationDate':
//                 // Sort by application date (most recent first)
//                 return sortedCandidates.sort((a, b) => {
//                     const dateA = a.candidate_application_date ? new Date(a.candidate_application_date) : new Date(0);
//                     const dateB = b.candidate_application_date ? new Date(b.candidate_application_date) : new Date(0);
//                     return dateB - dateA;
//                 });

//             case 'portfolioStrength':
//                 // Sort by portfolio strength if available
//                 return sortedCandidates.sort((a, b) => {
//                     const portfolioA = a.candidate_portfolio_links ? a.candidate_portfolio_links.length : 0;
//                     const portfolioB = b.candidate_portfolio_links ? b.candidate_portfolio_links.length : 0;
//                     return portfolioB - portfolioA;
//                 });

//             default:
//                 return sortedCandidates;
//         }
//     };

//     // Add this handler for the sorting dropdown
//     const handleSortChange = (e) => {
//         const newSortOption = e.target.value;
//         setSortOption(newSortOption);

//         // Apply sorting to the filtered candidates
//         const sortedResults = sortCandidates(filteredCandidates, newSortOption);
//         setFilteredCandidates(sortedResults);
//     };

//     // Initial data fetch
//     useEffect(() => {
//         // Initialize search term from URL params
//         if (params.searchQuery) {
//             setSearchTerm(params.searchQuery);
//         }
//         fetchCandidates();
//     }, []);

//     // Trigger filtering whenever applied filters change
//     useEffect(() => {
//         if (allCandidates.length > 0) {
//             filterCandidatesLocally();
//             setFilteredCandidates(prev => sortCandidates(prev, sortOption));
//         }
//     }, [appliedFilters, sortOption]);


//     return (
//         <div className="flex h-screen bg-gray-50 p-8">
//             {/* Left sidebar with advanced filters */}
//             {showLeftFilters && (
//                 <div className="w-80 min-h-full h-auto bg-white border-r border-gray-200 p-5">
//                     <div className="flex justify-between items-center mb-4">
//                         <h2 className="text-lg font-bold text-gray-800">Advanced Filters</h2>
//                         <button
//                             className="text-gray-500 hover:text-gray-700"
//                             onClick={() => setShowLeftFilters(false)}
//                         >
//                             <X className="w-4 h-4" />
//                         </button>
//                     </div>


//                     {/* Education */}
//                     <div className="mb-4 pb-4 border-b border-gray-200">
//                         <button
//                             className="flex justify-between items-center w-full text-left font-medium text-gray-800 mb-2 hover:text-indigo-600 transition-colors"
//                             onClick={() => toggleFilter('education')}
//                         >
//                             <span>Education</span>
//                             {expandedFilters.education ?
//                                 <ChevronUp className="h-4 w-4 text-indigo-500" /> :
//                                 <ChevronDown className="h-4 w-4 text-gray-500" />
//                             }
//                         </button>

//                         {expandedFilters.education && (
//                             <div className="space-y-3 mt-2">
//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Education Level</label>
//                                     <select
//                                         className="w-full p-2 border border-gray-300 rounded-md text-sm"
//                                         value={advancedFilters.degree}
//                                         onChange={(e) => setAdvancedFilters({ ...advancedFilters, degree: e.target.value })}
//                                     >
//                                         <option>Any</option>
//                                         <option>Bachelor's</option>
//                                         <option>Master's</option>
//                                         <option>PhD</option>
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Degree</label>
//                                     <select
//                                         className="w-full p-2 border border-gray-300 rounded-md text-sm"
//                                         value={advancedFilters.educationDegree}
//                                         onChange={(e) => setAdvancedFilters({ ...advancedFilters, educationDegree: e.target.value })}
//                                     >
//                                         <option>Any</option>
//                                         {
//                                             degreesList.map((e)=>(
//                                                 <option>{e}</option>
//                                             ))
//                                         }
//                                         {/* <option>Bachelor's</option>
//                                         <option>Master's</option>
//                                         <option>PhD</option> */}
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Specialization</label>
//                                     <select
//                                         className="w-full p-2 border border-gray-300 rounded-md text-sm"
//                                         value={advancedFilters.specialization}
//                                         onChange={(e) => setAdvancedFilters({ ...advancedFilters, specialization: e.target.value })}
//                                     >
//                                         <option>Any</option>
//                                         {
//                                             educationSpecialties?.map((e)=>(
//                                                 <option>{e}</option>
//                                             ))
//                                         }
//                                         {/* <option>Bachelor's</option>
//                                         <option>Master's</option>
//                                         <option>PhD</option> */}
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">University</label>
//                                     <input
//                                         type="text"
//                                         className="w-full p-2 border border-gray-300 rounded-md text-sm"
//                                         placeholder="University name"
//                                         value={advancedFilters.university}
//                                         onChange={(e) => setAdvancedFilters({ ...advancedFilters, university: e.target.value })}
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Graduation Year</label>
//                                     <select
//                                         className="w-full p-2 border border-gray-300 rounded-md text-sm"
//                                         value={advancedFilters.graduationYear}
//                                         onChange={(e) => setAdvancedFilters({ ...advancedFilters, graduationYear: e.target.value })}
//                                     >
//                                         <option>Any</option>
//                                         <option>2023+</option>
//                                         <option>2020+</option>
//                                         <option>2015+</option>
//                                         <option>2010+</option>
//                                     </select>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Employment */}
//                     <div className="mb-4 pb-4 border-b border-gray-200">
//                         <button
//                             className="flex justify-between items-center w-full text-left font-medium text-gray-800 mb-2 hover:text-indigo-600 transition-colors"
//                             onClick={() => toggleFilter('employment')}
//                         >
//                             <span>Employment</span>
//                             {expandedFilters.employment ?
//                                 <ChevronUp className="h-4 w-4 text-indigo-500" /> :
//                                 <ChevronDown className="h-4 w-4 text-gray-500" />
//                             }
//                         </button>

//                         {expandedFilters.employment && (
//                             <div className="space-y-3 mt-2">
//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Current Title</label>
//                                     <input
//                                         type="text"
//                                         className="w-full p-2 border border-gray-300 rounded-md text-sm"
//                                         placeholder="Job title"
//                                         value={advancedFilters.currentTitle}
//                                         onChange={(e) => setAdvancedFilters({ ...advancedFilters, currentTitle: e.target.value })}
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Current Company</label>
//                                     <input
//                                         type="text"
//                                         className="w-full p-2 border border-gray-300 rounded-md text-sm"
//                                         placeholder="Company name"
//                                         value={advancedFilters.currentCompany}
//                                         onChange={(e) => setAdvancedFilters({ ...advancedFilters, currentCompany: e.target.value })}
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Industry</label>
//                                     <select
//                                         className="w-full p-2 border border-gray-300 rounded-md text-sm"
//                                         value={advancedFilters.industry}
//                                         onChange={(e) => setAdvancedFilters({ ...advancedFilters, industry: e.target.value })}
//                                     >
//                                         <option>Any</option>
//                                         <option>Technology</option>
//                                         <option>Healthcare</option>
//                                         <option>Finance</option>
//                                         <option>Education</option>
//                                         <option>Retail</option>
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Employment Type</label>
//                                     <select
//                                         className="w-full p-2 border border-gray-300 rounded-md text-sm"
//                                         value={advancedFilters.employmentType}
//                                         onChange={(e) => setAdvancedFilters({ ...advancedFilters, employmentType: e.target.value })}
//                                     >
//                                         <option>Any</option>
//                                         <option>Full-time</option>
//                                         <option>Internship</option>
//                                         <option>Contract</option>

//                                     </select>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Compensation */}
                    
//                     <div className="mb-4 pb-4 border-b border-gray-200">
//                         <button
//                             className="flex justify-between items-center w-full text-left font-medium text-gray-800 mb-2 hover:text-indigo-600 transition-colors"
//                             onClick={() => toggleFilter('compensation')}
//                         >
//                             <span>Compensation</span>
//                             {expandedFilters.compensation ?
//                                 <ChevronUp className="h-4 w-4 text-indigo-500" /> :
//                                 <ChevronDown className="h-4 w-4 text-gray-500" />
//                             }
//                         </button>

//                         {expandedFilters.compensation && (
//                             <div className="space-y-3 mt-2">
//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Current Salary Range</label>
//                                     <div className="flex items-center space-x-2">
//                                         <div className="relative flex-1">
//                                             <span className="absolute left-1 top-2 text-gray-500"><IndianRupee /></span>
//                                             <input
//                                                 type="number"
//                                                 placeholder="Min"
//                                                 className="w-full p-2 pl-6 border border-gray-300 rounded-md text-sm"
//                                                 value={advancedFilters.minSalary || ''}
//                                                 onChange={(e) => setAdvancedFilters({
//                                                     ...advancedFilters,
//                                                     minSalary: e.target.value
//                                                 })}
//                                             />
//                                         </div>
//                                         <span className="text-gray-400">–</span>
//                                         <div className="relative flex-1">
//                                             <span className="absolute left-1 top-2 text-gray-500"><IndianRupee /></span>
//                                             <input
//                                                 type="number"
//                                                 placeholder="Max"
//                                                 className="w-full p-2 pl-6 border border-gray-300 rounded-md text-sm"
//                                                 value={advancedFilters.maxSalary || ''}
//                                                 onChange={(e) => setAdvancedFilters({
//                                                     ...advancedFilters,
//                                                     maxSalary: e.target.value
//                                                 })}
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Expected Salary Range</label>
//                                     <div className="flex items-center space-x-2">
//                                         <div className="relative flex-1">
//                                             <span className="absolute left-1 top-2 text-gray-500"><IndianRupee /></span>
//                                             <input
//                                                 type="number"
//                                                 placeholder="Min"
//                                                 className="w-full p-2 pl-6 border border-gray-300 rounded-md text-sm"
//                                                 value={advancedFilters.minSalaryExpected || ''}
//                                                 onChange={(e) => setAdvancedFilters({
//                                                     ...advancedFilters,
//                                                     minSalaryExpected: e.target.value
//                                                 })}
//                                             />
//                                         </div>
//                                         <span className="text-gray-400">–</span>
//                                         <div className="relative flex-1">
//                                             <span className="absolute left-1 top-2 text-gray-500"><IndianRupee /></span>
//                                             <input
//                                                 type="number"
//                                                 placeholder="Max"
//                                                 className="w-full p-2 pl-6 border border-gray-300 rounded-md text-sm"
//                                                 value={advancedFilters.maxSalaryExpected || ''}
//                                                 onChange={(e) => setAdvancedFilters({
//                                                     ...advancedFilters,
//                                                     maxSalaryExpected: e.target.value
//                                                 })}
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Availability */}
//                     <div className="mb-4 pb-4 border-b border-gray-200">
//                         <button
//                             className="flex justify-between items-center w-full text-left font-medium text-gray-800 mb-2 hover:text-indigo-600 transition-colors"
//                             onClick={() => toggleFilter('availability')}
//                         >
//                             <span>Availability</span>
//                             {expandedFilters.availability ?
//                                 <ChevronUp className="h-4 w-4 text-indigo-500" /> :
//                                 <ChevronDown className="h-4 w-4 text-gray-500" />
//                             }
//                         </button>

//                         {expandedFilters.availability && (
//                             <div className="space-y-3 mt-2">
//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Available From</label>
//                                     <select
//                                         className="w-full p-2 border border-gray-300 rounded-md text-sm"
//                                         value={advancedFilters.availableFrom}
//                                         onChange={(e) => setAdvancedFilters({ ...advancedFilters, availableFrom: e.target.value })}
//                                     >
//                                         <option>Any</option>
//                                         <option>Immediate</option>
//                                         <option>1 week</option>
//                                         <option>2 weeks</option>
//                                         <option>1 month</option>
//                                         <option>2+ months</option>
//                                     </select>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Preferences */}
//                     <div className="mb-4 pb-4 border-b border-gray-200">
//                         <button
//                             className="flex justify-between items-center w-full text-left font-medium text-gray-800 mb-2 hover:text-indigo-600 transition-colors"
//                             onClick={() => toggleFilter('preferences')}
//                         >
//                             <span>Preferences</span>
//                             {expandedFilters.preferences ?
//                                 <ChevronUp className="h-4 w-4 text-indigo-500" /> :
//                                 <ChevronDown className="h-4 w-4 text-gray-500" />
//                             }
//                         </button>

//                         {expandedFilters.preferences && (
//                             <div className="space-y-4 border-t pt-4">
//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Work Type</label>
//                                     <select
//                                         className="w-full p-2 border border-gray-300 rounded-md text-sm"
//                                         value={advancedFilters.workType}
//                                         onChange={(e) => setAdvancedFilters({ ...advancedFilters, workType: e.target.value })}
//                                     >
//                                         <option>Any</option>
//                                         <option>Remote</option>
//                                         <option>Hybrid</option>
//                                         <option>On-site</option>
//                                     </select>
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Language</label>
//                                     <select
//                                         className="w-full p-2 border border-gray-300 rounded-md text-sm"
//                                         value={advancedFilters.language}
//                                         onChange={(e) => setAdvancedFilters({ ...advancedFilters, language: e.target.value })}
//                                     >
//                                         <option>Any</option>
//                                         <option>English</option>
//                                         <option>Hindi</option>
//                                         <option>French</option>
//                                         <option>German</option>
//                                         <option>Chinese</option>
//                                         <option>Japanese</option>
//                                     </select>
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Work Authorization</label>
//                                     <select
//                                         className="w-full p-2 border border-gray-300 rounded-md text-sm"
//                                         value={advancedFilters.workAuthorization}
//                                         onChange={(e) => setAdvancedFilters({ ...advancedFilters, workAuthorization: e.target.value })}
//                                     >
//                                         <option>Any</option>
//                                         <option>US Citizen</option>
//                                         <option>Green Card</option>
//                                         <option>H1-B Visa</option>
//                                         <option>Other Visa</option>
//                                         <option>Require Sponsorship</option>
//                                     </select>
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Company Size</label>
//                                     <select
//                                         className="w-full p-2 border border-gray-300 rounded-md text-sm"
//                                         value={advancedFilters.companySize}
//                                         onChange={(e) => setAdvancedFilters({ ...advancedFilters, companySize: e.target.value })}
//                                     >
//                                         {/* <option>Any</option>
//                                         <option>Startup (1-50)</option>
//                                         <option>Small (51-200)</option>
//                                         <option>Medium (201-1000)</option>
//                                         <option>Large (1001-5000)</option>
//                                         <option>Enterprise (5000+)</option> */}
//                                         <option value="">Select company size</option>
//                                         <option value="Startup (1-50)">Startup (1-50)</option>
//                                         <option value="Small (51-200)">Small (51-200)</option>
//                                         <option value="Medium (201-1000)">Medium (201-1000)</option>
//                                         <option value="Large (1000+)">Large (1000+)</option>
//                                     </select>
//                                 </div>

//                                 <div className="space-y-3 mt-2">
//                                     <div className="flex items-center">
//                                         <input
//                                             type="checkbox"
//                                             id="willingToRelocate"
//                                             className="rounded border-gray-300 text-indigo-600"
//                                             checked={advancedFilters.willingToRelocate}
//                                             onChange={(e) => setAdvancedFilters({ ...advancedFilters, willingToRelocate: e.target.checked })}
//                                         />
//                                         <label htmlFor="willingToRelocate" className="ml-2 block text-sm text-gray-600">
//                                             Willing to Relocate
//                                         </label>
//                                     </div>
//                                     {/* <div className="flex items-center">
//                                         <input
//                                             type="checkbox"
//                                             id="remoteOnly"
//                                             className="rounded border-gray-300 text-indigo-600"
//                                             checked={advancedFilters.remoteOnly}
//                                             onChange={(e) => setAdvancedFilters({ ...advancedFilters, remoteOnly: e.target.checked })}
//                                         />
//                                         <label htmlFor="remoteOnly" className="ml-2 block text-sm text-gray-600">
//                                             Remote Only
//                                         </label>
//                                     </div> */}
//                                     <div className="flex items-center">
//                                         <input
//                                             type="checkbox"
//                                             id="openToTravel"
//                                             className="rounded border-gray-300 text-indigo-600"
//                                             checked={advancedFilters.openToTravel}
//                                             onChange={(e) => setAdvancedFilters({ ...advancedFilters, openToTravel: e.target.checked })}
//                                         />
//                                         <label htmlFor="openToTravel" className="ml-2 block text-sm text-gray-600">
//                                             Open to Travel
//                                         </label>
//                                     </div>
//                                     <div className="flex items-center">
//                                         <input
//                                             type="checkbox"
//                                             id="womenInTech"
//                                             className="rounded border-gray-300 text-indigo-600"
//                                             checked={advancedFilters.womenInTech}
//                                             onChange={(e) => setAdvancedFilters({ ...advancedFilters, womenInTech: e.target.checked })}
//                                         />
//                                         <label htmlFor="womenInTech" className="ml-2 block text-sm text-gray-600">
//                                             Women in Tech
//                                         </label>
//                                     </div>
//                                     <div className="flex items-center">
//                                         <input
//                                             type="checkbox"
//                                             id="veteranStatus"
//                                             className="rounded border-gray-300 text-indigo-600"
//                                             checked={advancedFilters.veteranStatus}
//                                             onChange={(e) => setAdvancedFilters({ ...advancedFilters, veteranStatus: e.target.checked })}
//                                         />
//                                         <label htmlFor="veteranStatus" className="ml-2 block text-sm text-gray-600">
//                                             Veteran Status
//                                         </label>
//                                     </div>
//                                     <div className="flex items-center">
//                                         <input
//                                             type="checkbox"
//                                             id="pwd"
//                                             className="rounded border-gray-300 text-indigo-600"
//                                             checked={advancedFilters.pwd}
//                                             onChange={(e) => setAdvancedFilters({ ...advancedFilters, pwd: e.target.checked })}
//                                         />
//                                         <label htmlFor="pwd" className="ml-2 block text-sm text-gray-600">
//                                             Person with Disability (PwD)
//                                         </label>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Activity */}
//                     <div className="mb-4">
//                         <button
//                             className="flex justify-between items-center w-full text-left font-medium text-gray-800 mb-2 hover:text-indigo-600 transition-colors"
//                             onClick={() => toggleFilter('activity')}
//                         >
//                             <span>Activity</span>
//                             {expandedFilters.activity ?
//                                 <ChevronUp className="h-4 w-4 text-indigo-500" /> :
//                                 <ChevronDown className="h-4 w-4 text-gray-500" />
//                             }
//                         </button>

//                         {expandedFilters.activity && (
//                             <div className="space-y-3 mt-2">
//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Last Active</label>
//                                     <select
//                                         className="w-full p-2 border border-gray-300 rounded-md text-sm"
//                                         value={advancedFilters.lastActive}
//                                         onChange={(e) => setAdvancedFilters({ ...advancedFilters, lastActive: e.target.value })}
//                                     >
//                                         <option>Any</option>
//                                         <option>Today</option>
//                                         <option>This week</option>
//                                         <option>This month</option>
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm text-gray-600 mb-1">Response Rate</label>
//                                     <select
//                                         className="w-full p-2 border border-gray-300 rounded-md text-sm"
//                                         value={advancedFilters.responseRate}
//                                         onChange={(e) => setAdvancedFilters({ ...advancedFilters, responseRate: e.target.value })}
//                                     >
//                                         <option>Any</option>
//                                         <option>70%+</option>
//                                         <option>80%+</option>
//                                         <option>90%+</option></select>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Apply filters button */}
//                     <div className="mt-6">
//                         <button
//                             className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors"
//                             onClick={applyAdvancedFilters}
//                         >
//                             Apply Filters
//                         </button>
//                         <button
//                             className="w-full mt-2 py-2 px-4 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
//                             onClick={resetAllFilters}
//                         >
//                             Reset All
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {/* Main content */}
//             <div className={`flex-1 ${showLeftFilters ? 'ml-4' : ''}`}>
//             {/* Job description upload section */}
//             <div className="bg-white rounded-lg shadow-sm p-5 mb-4">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-3">Job Description Matching</h3>
                
//                 {!uploadedFile ? (
//                     <div className="space-y-4">
//                         <div className="flex flex-col gap-2">
//                             <label className="block text-sm font-medium text-gray-700">
//                                 Upload or paste a job description to find matching candidates
//                             </label>
                            
//                             <div className="flex gap-2">
//                                 <button
//                                     onClick={triggerFileUpload}
//                                     className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2"
//                                 >
//                                     <Upload size={16} />
//                                     <span>Upload JD</span>
//                                 </button>
//                                 <input
//                                     ref={fileInputRef}
//                                     type="file"
//                                     accept=".txt,.pdf,.docx"
//                                     className="hidden"
//                                     onChange={handleFileUpload}
//                                 />
                                
//                                 <button
//                                     onClick={applyJobDescription}
//                                     disabled={!jobDescription}
//                                     className={`py-2 px-4 rounded-md flex items-center gap-2 ${
//                                         jobDescription 
//                                             ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
//                                             : 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                                     }`}
//                                 >
//                                     <FileText size={16} />
//                                     <span>Apply JD</span>
//                                 </button>
//                             </div>
                            
//                             <textarea
//                                 className="w-full p-3 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                 placeholder="Paste job description here..."
//                                 value={jobDescription}
//                                 onChange={handleJobDescriptionChange}
//                             ></textarea>
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="bg-indigo-50 rounded-md p-4 border border-indigo-100">
//                         <div className="flex justify-between items-start">
//                             <div className="flex items-start gap-3">
//                                 <FileText className="text-indigo-600 mt-1" size={20} />
//                                 <div>
//                                     <p className="font-medium text-indigo-800">{uploadedFile.name}</p>
//                                     <p className="text-sm text-indigo-600 mt-1">
//                                         Job description applied - candidates are now ranked by match score
//                                     </p>
//                                 </div>
//                             </div>
//                             <button 
//                                 onClick={removeJobDescription}
//                                 className="text-gray-500 hover:text-red-500"
//                             >
//                                 <Trash2 size={18} />
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {/* Top search bar and filters (your existing code) */}
//             <div className="bg-white rounded-lg shadow-sm p-5 mb-4">
//                 <div className="mb-4">
//                     <div className="flex items-center gap-2">
//                         <div className="relative flex-1">
//                             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                             <input
//                                 type="text"
//                                 placeholder="Search by job roles, email, phone and name ....."
//                                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
//                             />
//                         </div>
//                         <button
//                             className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
//                             onClick={() => setFilterVisible(!filterVisible)}
//                         >
//                             <Filter className="text-gray-600" size={18} />
//                         </button>
//                         {!showLeftFilters && (
//                             <button
//                                 className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
//                                 onClick={() => setShowLeftFilters(true)}
//                             >
//                                 <Settings className="text-gray-600" size={18} />
//                             </button>
//                         )}
//                         <button
//                             className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//                             onClick={handleSearch}
//                         >
//                             Search
//                         </button>
//                     </div>
//                 </div>

//                 {/* Primary filters dropdown (your existing code) */}
//                 {filterVisible && (
//                     <div className="bg-gray-50 rounded-md p-4 my-3 border border-gray-200">
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Job Role</label>
//                                 <input
//                                     type="text"
//                                     className="w-full p-2 border border-gray-300 rounded-md"
//                                     placeholder="e.g., Software Engineer"
//                                     value={primaryFilters.jobRole}
//                                     onChange={(e) => setPrimaryFilters({ ...primaryFilters, jobRole: e.target.value })}
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
//                                 <select
//                                     className="w-full p-2 border border-gray-300 rounded-md"
//                                     value={primaryFilters.industry}
//                                     onChange={(e) => setPrimaryFilters({ ...primaryFilters, industry: e.target.value })}
//                                 >
//                                     <option value="">Any</option>
//                                     <option>Technology</option>
//                                     <option>Healthcare</option>
//                                     <option>Finance</option>
//                                     <option>Education</option>
//                                     <option>Retail</option>
//                                 </select>
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
//                                 <select
//                                     className="w-full p-2 border border-gray-300 rounded-md"
//                                     value={primaryFilters.experience}
//                                     onChange={(e) => setPrimaryFilters({ ...primaryFilters, experience: e.target.value })}
//                                 >
//                                     <option value="">Any</option>
//                                     <option>0-1 years</option>
//                                     <option>1-3 years</option>
//                                     <option>3-5 years</option>
//                                     <option>5-10 years</option>
//                                     <option>10+ years</option>
//                                 </select>
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
//                                 <input
//                                     type="text"
//                                     className="w-full p-2 border border-gray-300 rounded-md"
//                                     placeholder="e.g., New York, NY"
//                                     value={primaryFilters.location}
//                                     onChange={(e) => setPrimaryFilters({ ...primaryFilters, location: e.target.value })}
//                                 />
//                             </div>
//                         </div>
//                         <div className="flex justify-end mt-4">
//                             <button
//                                 className="py-2 px-4 border border-gray-300 text-gray-700 rounded-md mr-2 hover:bg-gray-50"
//                                 onClick={() => setFilterVisible(false)}
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//                                 onClick={applyPrimaryFilters}
//                             >
//                                 Apply
//                             </button>
//                         </div>
//                     </div>
//                 )}

//                 {/* Applied filters chips (your existing code) */}
//                 {appliedFilters.length > 0 && (
//                     <div className="flex flex-wrap items-center mt-3 gap-2">
//                         <span className="text-sm text-gray-600">Filters:</span>
//                         {appliedFilters?.map((filter, index) => (
//                             <div
//                                 key={`${filter.key}-${index}`}
//                                 className="flex items-center bg-indigo-50 text-indigo-700 rounded-full py-1 px-3 text-sm"
//                             >
//                                 <span className="mr-1 font-medium">{filter.key === 'jobRole' ? 'Role' : filter.key}:</span>
//                                 <span>{filter.value}</span>
//                                 <button
//                                     className="ml-1 focus:outline-none"
//                                     onClick={() => removeFilter(filter.key, filter.value)}
//                                 >
//                                     <X className="w-3 h-3" />
//                                 </button>
//                             </div>
//                         ))}
//                         <button
//                             className="text-sm text-indigo-600 hover:text-indigo-800"
//                             onClick={resetAllFilters}
//                         >
//                             Clear all
//                         </button>
//                     </div>
//                 )}
//             </div>

//             {/* Results count and sorting (modified to include match score) */}
//             <div className="bg-white rounded-lg shadow-sm p-5 mb-4">
//                 <div className="flex justify-between items-center">
//                     <h3 className="text-lg font-semibold text-gray-800">
//                         {filteredCandidates.length} Candidates
//                     </h3>
//                     <div className="mb-1 flex items-center">
//                         <label htmlFor="sortOptions" className="mr-2 font-medium text-gray-700">Sort by:</label>
//                         <select
//                             id="sortOptions"
//                             className="border border-gray-300 rounded-md p-2 text-sm"
//                             value={sortOption}
//                             onChange={handleSortChange}
//                         >
//                             {matchScoreEnabled && (
//                                 <option value="matchScore">Match Score</option>
//                             )}
//                             <option value="relevance">Relevance</option>
//                             <option value="lastActive">Last Active</option>
//                             <option value="experience">Experience (Most to Least)</option>
//                             <option value="education">Education Level</option>
//                             <option value="skillsMatch">Skills Match</option>
//                             <option value="availability">Earliest Availability</option>
//                             <option value="location">Location Proximity</option>
//                             <option value="nameAZ">Name (A-Z)</option>
//                             <option value="nameZA">Name (Z-A)</option>
//                             <option value="applicationDate">Application Date</option>
//                             <option value="portfolioStrength">Portfolio Strength</option>
//                         </select>
//                     </div>
//                 </div>
//             </div>

//             {/* Candidate cards */}
//             <div className="space-y-4">
//                 {filteredCandidates.length > 0 ? (
//                     filteredCandidates?.map(candidate => (
//                         <div key={candidate.id} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition">
//                             <div className="flex justify-between">
//                                 {/* Candidate info - would be your CandidateCard component */}
//                                 <CandidateCard candidate={candidate} />
                                
//                                 {/* Match score display (only when enabled) */}
//                                 {matchScoreEnabled && candidate.matchScore !== undefined && (
//                                     <div className="flex flex-col items-center justify-center ml-4">
//                                         <div className={`flex items-center justify-center h-16 w-16 rounded-full ${
//                                             candidate.matchScore >= 80 ? 'bg-green-100 text-green-800' :
//                                             candidate.matchScore >= 60 ? 'bg-blue-100 text-blue-800' :
//                                             candidate.matchScore >= 40 ? 'bg-yellow-100 text-yellow-800' :
//                                             'bg-gray-100 text-gray-800'
//                                         }`}>
//                                             <div className="text-center">
//                                                 <div className="font-bold text-xl">{candidate.matchScore}%</div>
//                                             </div>
//                                         </div>
//                                         <span className="text-xs font-medium mt-1 text-gray-600">Match Score</span>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <div className="bg-white rounded-lg shadow-sm p-10 text-center">
//                         <p className="text-gray-600">No candidates found matching your criteria.</p>
//                         <button
//                             className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
//                             onClick={resetAllFilters}
//                         >
//                             Clear filters and try again
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//         </div>
//     );
// };

// export default TalentSearchPage;