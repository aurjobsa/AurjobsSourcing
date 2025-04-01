import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import JobCard from './JobCard';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BASEURL } from '../../../utility/config';

const ActiveJobs = memo(() => {
    const [jobs, setJobs] = useState([]);
    console.log(jobs)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Memoize employerProfile and employerId
    const employerProfile = useSelector((state) => state.employer.employerProfile);
    const employerId = employerProfile?.employer_id;

    const fetchJobs = useCallback(async () => {
        if (!employerId) return; // Prevent API call if employerId is undefined

        setLoading(true);
        try {
            const response = await axios.get(`${BASEURL}/jobs_post/employer_jobs/${employerId}`, {
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

    useEffect(() => {
        if (employerId) {
            fetchJobs(); // Fetch jobs only when employerId is available
        }
    }, [employerId, fetchJobs]); // Add fetchJobs and employerId as dependencies

    if (!employerId) {
        return <div>Loading employer data...</div>; // Show loading state if employerId is not available
    }

    if (loading) {
        return <div>Loading jobs...</div>; // Show loading state while fetching jobs
    }

    if (error) {
        return <div>Error: {error}</div>; // Show error message if something goes wrong
    }

    return (
        <div className="space-y-4">
            {jobs.length > 0 ? (
                jobs.map((job) => <JobCard key={job.job_id} job={job} />)
            ) : (
                <div>No active jobs found.</div>
            )}
        </div>
    );
});

export default ActiveJobs;


