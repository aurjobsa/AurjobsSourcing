import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASEURL } from '../../../utility/config';

const useFetchJobData = (jobId) => {
  const [job, setJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const jobResponse = await axios.get(`${BASEURL}/jobs_post/job_application/${jobId}`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        setJob(jobResponse.data || null);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    const fetchJobApplicants = async () => {
      try {
        const applicantsResponse = await axios.get(`${BASEURL}/jobs_post/job_applicants/${jobId}`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        setApplicants(applicantsResponse.data.job || []);
      } catch (error) {
        console.error("Error fetching job applicants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
    fetchJobApplicants();
  }, [jobId]);

  return { job, applicants, loading };
};

export default useFetchJobData;
