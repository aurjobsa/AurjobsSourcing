import { getCandidates, getCandidateProfile, rateCandidate } from "../controller/candidate_controller.js";
import { Router } from "express";


const router = Router();


// Define the route to fetch candidates based on filters
router.get("/search_candidates", getCandidates);
router.get("/candidate_profile/:id", getCandidateProfile);
router.post("/candidate_rating", rateCandidate);

export default router;