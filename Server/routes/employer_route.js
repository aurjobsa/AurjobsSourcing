import { Router } from "express";
import { SignUpEmployer, loginEmployer } from "../controller/employer_controller.js";
// import { verifyToken } from "../middleware/candidate-auth.js";

const router = Router();

router.post("/Employer_Signup", SignUpEmployer); // Handle Employer signup
router.post("/Employer_Login", loginEmployer); // Handle Employer login
// router.post("/Employer_Update_Profile/:id",  updateEmployer); // Handle Employer login

// console.log("hey im in employer- route.js file")
export default router;