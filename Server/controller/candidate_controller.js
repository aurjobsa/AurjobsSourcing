import { findCandidatesByFilters, findByCandidateID } from "../model/candidate_model.js"

export const getCandidates = async(req, res) => {
    try {
        const { job_role, industry, job_experience_required, job_location, job_skills_required } = req.query;
        // console.log(job_role);
        // console.log(industry);
        // console.log(job_experience_required);
        // console.log(job_location);
        // console.log(job_skills_required);

        // ✅ Convert `job_experience_required` to number
        const experienceRequired = job_experience_required ? parseInt(job_experience_required, 10) : null;

        // ✅ Convert `job_skills_required` to an array
        const skillsArray = job_skills_required ? job_skills_required.split(",") : [];

        // ✅ Call service function
        const result = await findCandidatesByFilters(job_role, industry, experienceRequired, job_location, skillsArray);

        // ✅ Send response
        if (!result.success) {
            return res.status(404).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error("Error in getCandidates controller:", error.message);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
};

export const getCandidateProfile = async(req, res) => {
    try {
        const { id } = req.params; // Ensure candidateId is set from authentication middleware
        console.log(id)
        if (!id) {
            return res.status(400).json({ error: "Candidate ID is missing", success: false });
        }

        const candidate = await findByCandidateID(id);

        if (!candidate) {
            return res.status(404).json({ error: "Candidate not found", success: false });
        }

        console.log("Candidate Profile:", candidate);
        return res.status(200).json({ success: true, candidate });
    } catch (error) {
        console.error("Error fetching candidate profile:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}