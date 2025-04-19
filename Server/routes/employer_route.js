import { Router } from "express";
import { SignUpEmployer, loginEmployer, updateEmployer } from "../controller/employer_controller.js";
import { pdfExtract, uploadMiddleware } from "../controller/pdf_extract_controller.js";
// import { verifyToken } from "../middleware/candidate-auth.js";

const router = Router();

router.post("/Employer_Signup", SignUpEmployer); // Handle Employer signup
router.post("/Employer_Login", loginEmployer); // Handle Employer login
router.post("/Employer_Update_Profile/:id", updateEmployer); // Handle Employer login
// router.post("/Job_Filters", uploadMiddleware.array("pdfFiles", 10), pdfExtract); // handles job description filters
router.post(
    "/Job_Filters",
    uploadMiddleware.fields([
        { name: "resumes", maxCount: 10 },
        { name: "job_desc", maxCount: 1 }
    ]),
    pdfExtract
);

// console.log("hey im in employer- route.js file")
export default router;