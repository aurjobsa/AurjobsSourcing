import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import JobCard from './JobCard';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BASEURL, BASEURL1 } from '../../../utility/config';
import { Search, Filter, RefreshCw, Briefcase, X, ChevronDown, ChevronUp } from 'lucide-react';

// const ActiveJobs = memo(() => {
//     const [jobs, setJobs] = useState([]);
//     console.log(jobs)
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     // Memoize employerProfile and employerId
//     const employerProfile = useSelector((state) => state.employer.employerProfile);
//     const employerId = employerProfile?.employer_id;

//     const fetchJobs = useCallback(async () => {
//         if (!employerId) return; // Prevent API call if employerId is undefined

//         setLoading(true);
//         try {
//             const response = await axios.get(`${BASEURL1}/jobs_post/employer_jobs/${employerId}`, {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 withCredentials: true,
//             });

//             if (response.status === 200) {
//                 setJobs(response.data?.data);
//             } else {
//                 throw new Error(response.data.error || 'Failed to fetch jobs');
//             }
//         } catch (error) {
//             setError(error.message);
//         } finally {
//             setLoading(false);
//         }
//     }, [employerId]); // fetchJobs depends on employerId

//     useEffect(() => {
//         if (employerId) {
//             fetchJobs(); // Fetch jobs only when employerId is available
//         }
//     }, [employerId, fetchJobs]); // Add fetchJobs and employerId as dependencies

//     if (!employerId) {
//         return <div>Loading employer data...</div>; // Show loading state if employerId is not available
//     }

//     if (loading) {
//         return <div>Loading jobs...</div>; // Show loading state while fetching jobs
//     }

//     if (error) {
//         return <div>Error: {error}</div>; // Show error message if something goes wrong
//     }

//     return (
//         <div className="space-y-4">
//             {jobs.length > 0 ? (
//                 jobs.map((job) => <JobCard key={job.job_id} job={job} />)
//             ) : (
//                 <div>No active jobs found.</div>
//             )}
//         </div>
//     );
// });

// export default ActiveJobs;


const ActiveJobs = memo(() => {
    const [jobs, setJobs] = useState([]);
    // console.log(jobs)
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        status: 'all', // 'all', 'active', 'inactive'
        sortBy: 'newest', // 'newest', 'oldest', 'applicants'
    });
    const [stats, setStats] = useState({
        totalJobs: 0,
        activeJobs: 0,
        totalViews: 0,
        totalApplicants: 0,
    });
    const [showFilters, setShowFilters] = useState(false);

    // Memoize employerProfile and employerId
    const employerProfile = useSelector((state) => state.employer.employerProfile);
    const employerId = employerProfile?.employer_id;

    const fetchJobs = useCallback(async () => {
                if (!employerId) return; // Prevent API call if employerId is undefined
        
                setLoading(true);
                try {
                    const response = await axios.get(`${BASEURL1}/jobs_post/employer_jobs/${employerId}`, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    });
        
                    if (response.status === 200) {
                        setJobs(response.data?.data);
                    } else {
                        throw new Error(response.data.error || 'Failed to fetch jobs');
                    }
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            }, [employerId]); // fetchJobs depends on employerId

    // Apply filters and search
    useEffect(() => {
        
        if (!jobs.length) return;

        let result = [...jobs];

        // Apply status filter
        if (filters.status !== 'all') {
            result = result.filter(job => job.status === filters.status);
        }

        // Apply search
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(job => 
                job.job_title.toLowerCase().includes(term) || 
                job.job_location.toLowerCase().includes(term) ||
                job.job_skills_required.some(skill => skill.toLowerCase().includes(term))
            );
        }

        // Apply sorting
        if (filters.sortBy === 'newest') {
            result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        } else if (filters.sortBy === 'oldest') {
            result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        } else if (filters.sortBy === 'applicants') {
            result.sort((a, b) => (b.applicants?.length || 0) - (a.applicants?.length || 0));
        }

        setFilteredJobs(result);
    }, [jobs, searchTerm, filters,]);

    useEffect(() => {
        
        if (employerId) {
            fetchJobs(); // Fetch jobs only when employerId is available
        }
        
    }, [employerId ]);

    const handleRefresh = () => {
        fetchJobs();
    };
    if (!employerId) {
                return <div>Loading employer data...</div>; // Show loading state if employerId is not available
            }
        
            if (loading) {
                return <div>Loading jobs...</div>; // Show loading state while fetching jobs
            }
        
            if (error) {
                return <div>Error: {error}</div>; // Show error message if something goes wrong
            }

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const resetFilters = () => {
        setFilters({
            status: 'all',
            sortBy: 'newest'
        });
        setSearchTerm('');
    };

    // Stats Card Component
    const StatsCard = ({ icon: Icon, title, value, className }) => (
        <div className={`bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-3 ${className}`}>
            <div className="p-3 rounded-full bg-blue-50">
                <Icon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-xl font-semibold">{value}</p>
            </div>
        </div>
    );

   
    if (loading && jobs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <RefreshCw className="w-8 h-8 animate-spin mb-2" />
                <p>Loading jobs...</p>
            </div>
        );
    }

    if (error && jobs.length === 0) {
        return (
            <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-red-700">
                <p className="font-medium">Error: {error}</p>
                <button 
                    onClick={handleRefresh}
                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                >
                    <RefreshCw className="w-4 h-4" />
                    <span>Try Again</span>
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Stats Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard icon={Briefcase} title="Total Jobs" value={jobs.length} className="border-l-4 border-l-blue-500" />
                {/* <StatsCard icon={Briefcase} title="Active Jobs" value={stats.activeJobs} className="border-l-4 border-l-green-500" /> */}
                {/* <StatsCard icon={Briefcase} title="Total Views" value={stats.totalViews} className="border-l-4 border-l-purple-500" /> */}
                <StatsCard icon={Briefcase} title="Total Applicants" value={stats.totalApplicants} className="border-l-4 border-l-yellow-500" /> 
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    {/* Search */}
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by job title, location, or skills..."
                            className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Filter Toggle Button */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
                    >
                        <Filter className="h-5 w-5 mr-2" />
                        Filters
                        {showFilters ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                    </button>

                    {/* Refresh Button */}
                    <button
                        onClick={handleRefresh}
                        className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
                        disabled={loading}
                    >
                        <RefreshCw className={`h-5 w-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                </div>

                {/* Expanded Filters */}
                {showFilters && (
                    <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Status Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                value={filters.status}
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                                className="block w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Jobs</option>
                                <option value="active">Active Jobs</option>
                                <option value="inactive">Inactive Jobs</option>
                            </select>
                        </div>

                        {/* Sort Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                            <select
                                value={filters.sortBy}
                                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                className="block w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="applicants">Most Applicants</option>
                            </select>
                        </div>

                        {/* Reset Filters */}
                        <div className="flex items-end">
                            <button
                                onClick={resetFilters}
                                className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
                            >
                                <X className="h-4 w-4 mr-2" />
                                Reset Filters
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Results Summary */}
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                    {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
                </h2>
                {loading && jobs.length > 0 && (
                    <div className="flex items-center text-gray-500">
                        <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                        <span>Refreshing...</span>
                    </div>
                )}
            </div>

            {/* Jobs List */}
            <div className="space-y-4">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => <JobCard key={job.job_id} job={job} onRefresh={handleRefresh} />)
                ) : (
                    <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 text-center">
                        <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No jobs found</h3>
                        <p className="text-gray-500 mb-4">
                            {jobs.length > 0 
                                ? "Try adjusting your filters or search term."
                                : "You haven't posted any jobs yet."}
                        </p>
                        {jobs.length > 0 && (
                            <button
                                onClick={resetFilters}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
});

export default ActiveJobs;