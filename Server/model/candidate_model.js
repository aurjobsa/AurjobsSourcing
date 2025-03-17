import supabase from "../config/supabase_config.js";

// ✅ Move this to the top before calling `getCandidateIdsByExperience`
const calculateTotalExperience = (experiences) => {
    let totalDays = 0;
    if (!experiences || experiences.length === 0) return 0;

    experiences.forEach((exp) => {
        const startDate = new Date(exp.candidate_start_date);
        // console.log(exp.candidate_id);
        const endDate = new Date(exp.candidate_end_date);
        if (isNaN(startDate) || isNaN(endDate)) return;
        totalDays += Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    });

    return Math.floor(totalDays / 365); // Convert days to years
};


// ✅ Function to get candidate IDs based on filters
const getCandidateIdsByRole = async(job_role) => {
    if (!job_role) return new Set();
    let { data, error } = await supabase
        .from("candidates")
        .select("candidate_id")
        .ilike("candidate_current_role", `%${job_role}%`);
    if (error) {
        console.error("Error fetching candidates by role:", error.message);
        return new Set();
    }
    return new Set(data.map(c => c.candidate_id));
};

const getCandidateIdsByIndustry = async(industry) => {
    if (!industry) return new Set();
    let { data, error } = await supabase
        .from("candidate_experience")
        .select("candidate_id")
        .eq("candidate_industry", industry);
    if (error) {
        console.error("Error fetching candidates by industry:", error.message);
        return new Set();
    }
    return new Set(data.map(c => c.candidate_id));
};

const getCandidateIdsByExperience = async(job_experience_required) => {
    if (!job_experience_required) return new Set();
    let { data, error } = await supabase
        .from("candidate_experience")
        .select("candidate_id, candidate_start_date, candidate_end_date");
    if (error) {
        console.error("Error fetching candidates by experience:", error.message);
        return new Set();
    }
    let filteredIds = new Set();
    data.forEach(exp => {
        let totalExperience = calculateTotalExperience([exp]);
        console.log(exp.candidate_id, "ka experience = ", totalExperience);
        if (totalExperience >= job_experience_required) {
            filteredIds.add(exp.candidate_id);
        }
    });
    return filteredIds;
};

const getCandidateIdsByLocation = async(job_location) => {
    if (!job_location) return new Set();
    console.log(job_location);
    let { data, error } = await supabase
        .from("candidates")
        .select("candidate_id")
        .eq("candidate_location", job_location);
    if (error) {
        console.error("Error fetching candidates by location:", error.message);
        return new Set();
    }
    return new Set(data.map(c => c.candidate_id));
};

const getCandidateIdsBySkills = async(job_skills_required) => {
    if (!job_skills_required || job_skills_required.length === 0) return new Set();
    console.log(job_skills_required);
    let { data, error } = await supabase
        .from("candidate_skills")
        .select("candidate_id, candidate_skill")
        .in("candidate_skill", job_skills_required);
    if (error) {
        console.error("Error fetching candidates by skills:", error.message);
        return new Set();
    }

    let candidateSkillMap = new Map();
    data.forEach(({ candidate_id, candidate_skill }) => {
        if (!candidateSkillMap.has(candidate_id)) {
            candidateSkillMap.set(candidate_id, new Set());
        }
        candidateSkillMap.get(candidate_id).add(candidate_skill);
    });

    let filteredIds = new Set();
    candidateSkillMap.forEach((skills, candidate_id) => {
        if (job_skills_required.every(skill => skills.has(skill))) {
            filteredIds.add(candidate_id);
        }
    });

    return filteredIds;
};

// ✅ Function to fetch full candidate details
const getCandidateDetailsByIds = async(candidateIds) => {
    if (candidateIds.size === 0) return [];
    let { data, error } = await supabase
        .from("candidates")
        .select(`
            *,
            candidate_experience:candidate_experience_candidate_id_fkey(candidate_start_date, candidate_end_date, candidate_industry),
            candidate_skills:candidate_skills_candidate_id_fkey(candidate_skill),
            candidate_languages:candidate_languages_candidate_id_fkey(*),
            candidate_education:candidate_education_candidate_id_fkey(*),
            candidate_certifications:candidate_certifications_candidate_id_fkey(*),
            candidate_address:candidate_address_candidate_id_fkey(*)
        `)
        .in("candidate_id", Array.from(candidateIds));
    if (error) {
        console.error("Error fetching candidate details:", error.message);
        return [];
    }
    return data;
};

// ✅ Fetch all candidate IDs when no filters are provided
const getAllCandidatesIds = async() => {
    let { data, error } = await supabase
        .from("candidates")
        .select("candidate_id");
    if (error) {
        console.error("Error fetching all candidate IDs:", error.message);
        return new Set();
    }
    return new Set(data.map(c => c.candidate_id));
};

// ✅ Main function to apply filters
export const findCandidatesByFilters = async(job_role, industry, job_experience_required, job_location, job_skills_required) => {
    try {
        // If all filters are undefined, return all candidates
        // console.log(job_experience_required);
        if (!job_role && !industry && !job_experience_required && !job_location && ((!job_skills_required || job_skills_required.length === 0))) {
            const allCandidateIds = await getAllCandidatesIds();
            console.log("---------------", allCandidateIds);
            return { success: true, data: await getCandidateDetailsByIds(allCandidateIds) };
        }


        let roleIds = job_role ? await getCandidateIdsByRole(job_role) : null;
        let industryIds = industry ? await getCandidateIdsByIndustry(industry) : null;
        let experienceIds = job_experience_required ? await getCandidateIdsByExperience(job_experience_required) : null;
        let locationIds = job_location ? await getCandidateIdsByLocation(job_location) : null;
        let skillsIds = job_skills_required ? await getCandidateIdsBySkills(job_skills_required) : null;
        console.log("roleIds:", roleIds);
        console.log("industryIds:", industryIds);
        console.log("experienceIds:", experienceIds);
        console.log("locationIds:", locationIds);
        console.log("skillsIds:", skillsIds);


        // Filter out null values
        const nonEmptySets = [roleIds, industryIds, experienceIds, locationIds, skillsIds].filter(set => set !== null);

        let allCandidateIds;
        // const nonEmptySets = [roleIds, industryIds, experienceIds, locationIds, skillsIds].filter(set => set.size > 0);

        if (nonEmptySets.length > 0) {
            // Convert first Set to an Array before reducing
            allCandidateIds = [...nonEmptySets[0]].filter(id =>
                nonEmptySets.every(set => set.has(id))
            );
        } else {
            // If no filters are applied, return all candidate IDs
            allCandidateIds = await getAllCandidatesIds();
        }


        // Fetch full candidate details
        let candidates = await getCandidateDetailsByIds(new Set(allCandidateIds));

        return { success: true, data: candidates };
    } catch (error) {
        console.error("Error fetching candidate details:ss", error);
        return { success: false, error: "Internal server error" };
    }
};

// import supabase from "../config/supabase_config.js";


// // ✅ Fetch candidate IDs based on job_role (candidate_current_role)
// const getCandidateIdsByRole = async(job_role) => {
//     if (!job_role) return new Set();

//     let { data, error } = await supabase
//         .from("candidates")
//         .select("candidate_id")
//         .ilike("candidate_current_role", `%${job_role}%`);

//     if (error) {
//         console.error("Error fetching candidates by role:", error.message);
//         return new Set();
//     }

//     return new Set(data.map((c) => c.candidate_id));
// };

// // ✅ Fetch candidate IDs based on industry (candidate_industry in candidate_experience)
// const getCandidateIdsByIndustry = async(industry) => {
//     if (!industry) return new Set();

//     let { data, error } = await supabase
//         .from("candidate_experience")
//         .select("candidate_id")
//         .eq("candidate_industry", industry);

//     if (error) {
//         console.error("Error fetching candidates by industry:", error.message);
//         return new Set();
//     }

//     return new Set(data.map((c) => c.candidate_id));
// };

// // ✅ Fetch candidate IDs based on experience (total years calculation)
// const getCandidateIdsByExperience = async(job_experience_required) => {
//     if (!job_experience_required) return new Set();

//     let { data, error } = await supabase
//         .from("candidate_experience")
//         .select("candidate_id, candidate_start_date, candidate_end_date");

//     if (error) {
//         console.error("Error fetching candidates by experience:", error.message);
//         return new Set();
//     }

//     let filteredIds = new Set();

//     data.forEach((exp) => {
//         let totalExperience = calculateTotalExperience([exp]); // Convert single exp object into array
//         if (totalExperience >= job_experience_required) {
//             filteredIds.add(exp.candidate_id);
//         }
//     });

//     return filteredIds;
// };

// // ✅ Fetch candidate IDs based on location (candidate_location in candidates)
// const getCandidateIdsByLocation = async(job_location) => {
//     if (!job_location) return new Set();

//     let { data, error } = await supabase
//         .from("candidates")
//         .select("candidate_id")
//         .eq("candidate_location", job_location);

//     if (error) {
//         console.error("Error fetching candidates by location:", error.message);
//         return new Set();
//     }

//     return new Set(data.map((c) => c.candidate_id));
// };

// // ✅ Fetch candidate IDs based on skills (candidate_skills table)
// const getCandidateIdsBySkills = async(job_skills_required) => {
//     if (!job_skills_required || job_skills_required.length === 0) return new Set();

//     let { data, error } = await supabase
//         .from("candidate_skills")
//         .select("candidate_id, candidate_skill")
//         .in("candidate_skill", job_skills_required);

//     if (error) {
//         console.error("Error fetching candidates by skills:", error.message);
//         return new Set();
//     }

//     let candidateSkillMap = new Map();

//     // Group candidates by their candidate_id
//     data.forEach(({ candidate_id, candidate_skill }) => {
//         if (!candidateSkillMap.has(candidate_id)) {
//             candidateSkillMap.set(candidate_id, new Set());
//         }
//         candidateSkillMap.get(candidate_id).add(candidate_skill);
//     });

//     // Filter candidates who match all required skills
//     let filteredIds = new Set();
//     candidateSkillMap.forEach((skills, candidate_id) => {
//         if (job_skills_required.every((skill) => skills.has(skill))) {
//             filteredIds.add(candidate_id);
//         }
//     });

//     return filteredIds;
// };

// ✅ Function to calculate total experience
// const calculateTotalExperience = (experiences) => {
//     let totalDays = 0;
//     if (!experiences || experiences.length === 0) return 0;

//     experiences.forEach((exp) => {
//         const startDate = new Date(exp.candidate_start_date);
//         const endDate = new Date(exp.candidate_end_date);
//         if (isNaN(startDate) || isNaN(endDate)) return;
//         totalDays += Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
//     });

//     return Math.floor(totalDays / 365); // Convert days to years
// };

// // ✅ Fetch full candidate details using filtered candidate IDs
// const getCandidateDetailsByIds = async(candidateIds) => {
//     if (candidateIds.size === 0) return [];

//     let { data, error } = await supabase
//         .from("candidates")
//         .select(`
//             *,
//             candidate_experience:candidate_experience_candidate_id_fkey(candidate_start_date, candidate_end_date, candidate_industry),
//             candidate_skills:candidate_skills_candidate_id_fkey(candidate_skill),
//             candidate_languages:candidate_languages_candidate_id_fkey(*),
//             candidate_education:candidate_education_candidate_id_fkey(*),
//             candidate_certifications:candidate_certifications_candidate_id_fkey(*),
//             candidate_address:candidate_address_candidate_id_fkey(*)
//         `)
//         .in("candidate_id", Array.from(candidateIds));

//     if (error) {
//         console.error("Error fetching candidate details:", error.message);
//         return [];
//     }

//     return data;
// };

// // ✅ Main function to apply filters and return results
// export const findCandidatesByFilters = async(job_role, industry, job_experience_required, job_location, job_skills_required) => {
//     try {
//         console.log(job_role);
//         if (job_role == undefined)
//             console.log("hurray");
//         //logic for undefined values , if anyone of the filters are undefined , leave it and serach for others ,
//         let roleIds;
//         if(job_role==undefined)
//          roleIds = await getCandidateIdsByRole(job_role);
//         const industryIds = await getCandidateIdsByIndustry(industry);
//         const experienceIds = await getCandidateIdsByExperience(job_experience_required);
//         const locationIds = await getCandidateIdsByLocation(job_location);
//         const skillsIds = await getCandidateIdsBySkills(job_skills_required);

//         // ✅ Merge all candidate IDs (Intersection of all sets)
//         let allCandidateIds = new Set([
//             ...roleIds,
//             ...industryIds,
//             ...experienceIds,
//             ...locationIds,
//             ...skillsIds
//         ]);

//         // ✅ Fetch full candidate details
//         let candidates = await getCandidateDetailsByIds(allCandidateIds);

//         return { success: true, data: candidates };
//     } catch (error) {
//         console.error("Error fetching candidate details:", error.message);
//         return { success: false, error: "Internal server error" };
//     }
// };