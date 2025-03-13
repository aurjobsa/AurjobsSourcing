import { getCandidates } from "../controller/candidate_controller.js";
import { Router } from "express";


const router = Router();


// Define the route to fetch candidates based on filters
router.get("/search_candidates", getCandidates);

export default router;