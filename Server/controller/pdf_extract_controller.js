import { s3 } from "../config/aws_s3_config.js"; // Adjust the path as necessary
import dotenv from "dotenv";
import multer from "multer";
import multerS3 from "multer-s3";
import pdfParse from 'pdf-parse/lib/pdf-parse.js';

import { GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import axios from "axios";

// Load environment variables
dotenv.config();
console.log("jai mata di")
    // Multer S3 setup for file upload
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: "private", // or 'private'
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            // Generate unique file names using timestamp and original name
            cb(null, `${Date.now()}_${file.originalname}`);
        },
    }),
    fileFilter: (req, file, cb) => {
        // Allow only PDFs
        if (file.mimetype !== "application/pdf") {
            return cb(new Error("Only PDF files are allowed"), false);
        }
        cb(null, true);
    },
    limits: {
        fileSize: 5 * 1024 * 1024, // Max 5MB per file
        files: 10, // Max 10 files per request
    },
});


const deleteFileFromS3 = async(bucket, key) => {
    try {
        const deleteCommand = new DeleteObjectCommand({
            Bucket: bucket,
            Key: key,
        });
        await s3.send(deleteCommand);
        console.log(`Deleted ${key} from bucket ${bucket}`);
    } catch (error) {
        console.error(`Error deleting file ${key}:`, error.message);
    }
};



export const pdfExtract = async(req, res) => {
    try {
        const resumeFiles = req.files.resumes || [];
        const jobDescFiles = req.files.job_desc || [];

        // console.log(resumeFiles, jobDescFiles);

        if (resumeFiles.length === 0 || jobDescFiles.length === 0) {
            return res.status(400).json({ error: "Both resumes and job description PDFs are required" });
        }

        // 1. Extract job description text
        const jobDescFile = jobDescFiles[0];
        const jobDescCommand = new GetObjectCommand({
            Bucket: jobDescFile.bucket,
            Key: jobDescFile.key,
        });
        const jobDescResponse = await s3.send(jobDescCommand);
        const jobDescStream = jobDescResponse.Body;
        const jobChunks = [];
        for await (const chunk of jobDescStream) {
            jobChunks.push(chunk);
        }
        const jobDescBuffer = Buffer.concat(jobChunks);
        const jobDescText = (await pdfParse(jobDescBuffer)).text;
        // console.log(jobDescText);
        // 2. Extract resumes and compare
        const finalResults = [];
        const filesToDelete = [];

        for (const file of resumeFiles) {
            const command = new GetObjectCommand({
                Bucket: file.bucket,
                Key: file.key,
            });
            const s3Response = await s3.send(command);
            const stream = s3Response.Body;
            const chunks = [];
            for await (const chunk of stream) {
                chunks.push(chunk);
            }
            const pdfBuffer = Buffer.concat(chunks);
            const pdfData = await pdfParse(pdfBuffer);
            const extractedText = pdfData.text;
            // console.log(extractedText);
            // Send to FastAPI
            const matchResponse = await axios.post(
                "https://resumebuilder-rp4z.onrender.com/match/", {
                    resume: extractedText,
                    job_desc: jobDescText,
                    prompt: `You are a recruiter evaluating a candidate's resume against a job description.
  
  Job Description: {job_desc}
  
  Candidate Resume: {resume}
  
  Please assess both the technical skills (programming languages, tools, frameworks, relevant experience) and soft skills (design thinking, communication, adaptability, eagerness to learn, empathy, employee engagement). Take into account their education, certifications, and project experience.
  
  Provide a match score from 0 to 100 based on how well the candidate fits the role, giving realistic weight to key technical requirements and some consideration to soft skills and learning potential.
  
  First, return both the match score and a brief review.
  
  Then, extract the following fields from the resume and include them as key-value pairs directly in the same root-level object (do not nest them under any sub-object):
  
  - match_score
  - review
  - name
  - location
  - gender (male or female)
  - mobile
  - email
  - education (only the last university attended, the degree obtained, and the year of graduation — only the year, not the month)
  - last_company_worked_in
  - years_of_job_experience_after_graduation_in_months
  - current role of the candidate
  
  Note:
  - Use "years_of_job_experience_after_graduation_in_months" as the total number of full months worked after graduation.
  - If the candidate's graduation was in September 2024 and their first job started in January 2025, and the current month is April 2025, then the correct experience duration is 4 months.
  
  Strictly return a flat JSON object with no nested keys.
  Strictly give the current role of the candidate from the last experience in the JSON response.
  
  Only return a valid JSON response. Do not include any explanations, formatting, or text outside of the JSON.`
                }, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );
            // console.log(matchResponse.data);
            // Push the result to finalResults
            finalResults.push(matchResponse.data);
            // Track files to delete later
            filesToDelete.push({ bucket: file.bucket, key: file.key });
        }
        // Delete all files after processing
        for (const file of filesToDelete) {
            await deleteFileFromS3(file.bucket, file.key);
        }
        await deleteFileFromS3(jobDescFile.bucket, jobDescFile.key);

        res.status(200).json({
            message: "Resumes matched with job description successfully",
            results: finalResults
        });



    } catch (error) {
        console.error("Error processing PDFs:", error);

        // Clean up all files from S3 if there's any error
        const allUploadedFiles = [];

        if (req.files && req.files.resumes) {
            allUploadedFiles.push(...req.files.resumes);
        }
        if (req.files && req.files.job_desc) {
            allUploadedFiles.push(...req.files.job_desc);
        }

        for (const file of allUploadedFiles) {
            if (file.bucket && file.key) {
                try {
                    await deleteFileFromS3(file.bucket, file.key);
                    // console.log(`Deleted ${file.key} from S3 during error cleanup`);
                } catch (err) {
                    console.error(`Failed to delete ${file.key} from S3 during error cleanup:`, err.message);
                }
            }
        }

        res.status(500).json({ error: error });
    }
}





export const uploadMiddleware = upload;

// export const pdfExtract = async(req, res) => {
//     try {
//         const files = req.files;
//         if (!files || files.length === 0) {
//             return res.status(400).json({ error: "No files uploaded" });
//         }

//         const finalResults = [];

//         for (const file of files) {
//             const command = new GetObjectCommand({
//                 Bucket: file.bucket,
//                 Key: file.key,
//             });

//             const s3Response = await s3.send(command);
//             const stream = s3Response.Body;

//             const chunks = [];
//             for await (const chunk of stream) {
//                 chunks.push(chunk);
//             }

//             const pdfBuffer = Buffer.concat(chunks);
//             const pdfData = await pdfParse(pdfBuffer);

//             // Extracted resume text
//             const extractedText = pdfData.text;

//             // Send to FastAPI match endpoint
//             const matchResponse = await axios.post(
//                 "https://resumebuilder-rp4z.onrender.com/match/", {
//                     resume: extractedText,
//                     job_desc: "Looking for an SDE intern with strong skills in Node.js, Express, React, PostgreSQL, and understanding of AI-based job matching algorithms.",
//                     prompt: `You are a recruiter evaluating a candidate's resume against a job description.

//             Job Description: {job_desc}

//             Candidate Resume: {resume}

//             Please assess both the technical skills (programming languages, tools, frameworks, relevant experience) and soft skills (design thinking, communication, adaptability, eagerness to learn, empathy, employee engagement). Take into account their education, certifications, and project experience.

//             Provide a match score from 0 to 100 based on how well the candidate fits the role, giving realistic weight to key technical requirements and some consideration to soft skills and learning potential.

//             First, return both the match score and a brief review.

//             Then, extract the following fields from the resume and include them as key-value pairs directly in the same root-level object (do not nest them under any sub-object):

//             - match_score
//             - review
//             - name
//             - location
//             - gender (male or female)
//             - mobile
//             - email
//             - education (only the last university attended, the degree obtained, and the year of graduation — only the year, not the month)
//             - last_company_worked_in
//             - years_of_job_experience_after_graduation_in_months
//             - current role of the candidate

//             Note:
//             - Use "years_of_job_experience_after_graduation_in_months" as the total number of full months worked after graduation.
//             - If the candidate's graduation was in September 2024 and their first job started in January 2025, and the current month is April 2025, then the correct experience duration is 4 months.

//              Strictly return a flat JSON object with no nested keys.
//              Strictly give the current role of the candidate from the last experience in the JSON response.

//              Only return a valid JSON response. Do not include any explanations, formatting, or text outside of the JSON.`
//                 }, {
//                     headers: { "Content-Type": "application/json" },
//                     withCredentials: true
//                 }
//             );
//             finalResults.push({

//                 match_score: matchResponse.data.match_score,
//                 review: matchResponse.data.review,
//                 name: matchResponse.data.name,
//                 location: matchResponse.data.location,
//                 gender: matchResponse.data.gender,
//                 mobile: matchResponse.data.mobile,
//                 email: matchResponse.data.email,
//                 education: matchResponse.data.education,
//                 last_company_worked_in: matchResponse.data.last_company_worked_in,
//                 years_of_job_experience_after_graduation_in_months: matchResponse.data.years_of_job_experience_after_graduation_in_months,
//                 current_role_of_the_candidate: matchResponse.data.current_role_of_the_candidate,

//             });
//         }

//         res.status(200).json({
//             message: "PDFs processed and matched successfully!",
//             results: finalResults
//         });

//     } catch (error) {
//         console.error("Error processing PDFs:", error);
//         res.status(500).json({ error: "Failed to process and match resumes" });
//     }
// };






// export const pdfExtract = async(req, res) => {
//     try {
//         const files = req.files;
//         if (!files || files.length === 0) {
//             return res.status(400).json({ error: "No files uploaded" });
//         }

//         const extractedTexts = [];

//         for (const file of files) {
//             const command = new GetObjectCommand({
//                 Bucket: file.bucket,
//                 Key: file.key,
//             });

//             const s3Response = await s3.send(command);
//             const stream = s3Response.Body;

//             const chunks = [];
//             for await (const chunk of stream) {
//                 chunks.push(chunk);
//             }

//             const pdfBuffer = Buffer.concat(chunks);

//             const pdfData = await pdfParse(pdfBuffer);

//             extractedTexts.push({
//                 fileName: file.originalname,
//                 extractedText: pdfData.text,
//             });
//         }
//         const data = extractedTexts[0];
//         const matchResponse = await axios.post("https://resumebuilder-rp4z.onrender.com/match/", // ✅ Hardcoded local FastAPI URL
//             {
//                 resume: data.extractedText,
//                 job_desc: "Looking for an SDE intern with strong skills in Node.js, Express, React, PostgreSQL, and understanding of AI-based job matching algorithms.",
//                 prompt: `You are a recruiter evaluating a candidate's resume against a job description.

//       Job Description: {job_desc}

//       Candidate Resume: {resume}

//       Please assess both the technical skills (programming languages, tools, frameworks, relevant experience) and soft skills (design thinking, communication, adaptability, eagerness to learn, empathy, communication, employee engagement). Take into account their education, certifications, and project experience.

//       Provide a match score from 0 to 100 based on how well the candidate fits the role, giving realistic weight to the key technical requirements and some consideration to soft skills and learning potential.

//       Return your response in this exact format:
//       matchscore: X%, review: Y

//       Where:
//       - X is an integer between 0 and 100 representing the overall match
//       - Y is a brief review justifying the score, pointing out both strengths and gaps`
//             }, {
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 withCredentials: true
//             });

//         res.status(200).json({
//             message: "PDFs processed successfully!",
//             data: extractedTexts,
//             matchScore: matchResponse.data.match_score,
//             review: matchResponse.data.review
//         });
//     } catch (error) {
//         console.error("Error processing PDFs:", error);
//         res.status(500).json({ error: "Failed to extract PDF text" });
//     }
// };



// // Controller function to handle PDF file upload and response
// export const pdfExtract = async(req, res) => {
//     try {
//         const files = req.files; // Array of uploaded files
//         console.log(files);
//         if (!files || files.length === 0) {
//             return res.status(400).json({ error: "No files uploaded" });
//         }

//         // Extract S3 URLs from uploaded files
//         const urls = files.map(file => file.location); // S3 URLs

//         // Optional: You can process or extract information from PDFs here...

//         // Send back the S3 URLs as a response
//         res.status(200).json({
//             message: "Files uploaded successfully to S3!",
//             files: urls,
//         });
//     } catch (error) {
//         console.error("Upload error:", error);
//         res.status(500).json({ error: "Upload failed" });
//     }
// };

// Export the multer middleware for use in routes





// async function getObjectURL(key) {
//     const command = new GetObjectCommand({
//         Bucket: process.env.AWS_BUCKET_NAME,
//         Key: key,
//     });

//     const url = await getSignedUrl(s3, command, { expiresIn: 3600 }); // 1 hour
//     return url;
// }

// // getObjectURL("PAN.jpg")
// //     .then((url) => console.log("Presigned URL:", url))
// //     .catch((err) => console.error("Error generating URL:", err));
// console.log("presigned url is ", await getObjectURL("PAN.jpg"));

























// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';
// import pdfParse from 'pdf-parse';

// const uploadDir = './uploads';

// // Create uploads directory if it doesn't exist
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Configure storage
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './uploads');
//     },
//     filename: function(req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//     }
// });

// // File filter to allow only PDFs
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'application/pdf') {
//         cb(null, true);
//     } else {
//         cb(new Error('Only PDF files are allowed!'), false);
//     }
// };

// // Multer upload instance
// export const upload = multer({ storage, fileFilter });

// export const pdfExtract = async(req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: 'No file uploaded' });
//         }

//         const pdfPath = req.file.path;

//         if (!fs.existsSync(pdfPath)) {
//             return res.status(500).json({ message: 'File not found after upload' });
//         }

//         const dataBuffer = fs.readFileSync(pdfPath);
//         const data = await pdfParse(dataBuffer);
//         console.log(data.text);
//         res.status(200).json({
//             message: 'File uploaded and extracted successfully',
//             file: req.file,
//             extractedText: data.text
//         });
//     } catch (error) {
//         console.error('Error in pdfExtract:', error);
//         res.status(500).json({ message: 'Error extracting text', error: error.message });
//     }
// };








// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';
// import PDFParser from 'pdf2json';

// const uploadDir = './uploads';

// // Create uploads directory if it doesn't exist
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Configure storage
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './uploads');
//     },
//     filename: function(req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//     }
// });

// // File filter to allow only PDFs
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'application/pdf') {
//         cb(null, true);
//     } else {
//         cb(new Error('Only PDF files are allowed!'), false);
//     }
// };

// // Multer upload instance
// export const upload = multer({ storage, fileFilter });

// export const pdfExtract = async(req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: 'No file uploaded' });
//         }

//         const pdfPath = req.file.path;

//         if (!fs.existsSync(pdfPath)) {
//             return res.status(500).json({ message: 'File not found after upload' });
//         }

//         const pdfParser = new PDFParser();

//         pdfParser.loadPDF(pdfPath);

//         pdfParser.on('pdfParser_dataError', err => {
//             console.error('Error parsing PDF:', err);
//             res.status(500).json({ message: 'Error extracting text', error: err.message });
//         });

//         pdfParser.on('pdfParser_dataReady', pdfData => {
//             const extractedJSON = pdfData; // Store extracted data in JSON format

//             res.status(200).json({
//                 message: 'File uploaded and extracted successfully',
//                 file: req.file,
//                 extractedData: extractedJSON
//             });
//         });
//     } catch (error) {
//         console.error('Error in pdfExtract:', error);
//         res.status(500).json({ message: 'Error extracting text', error: error.message });
//     }
// };


// import multer from 'multer'

// // import path from 'path';
// import fs from 'fs';
// import pdfParse from 'pdf-parse';
// const uploadDir = './uploads';

// // Create uploads directory if it doesn't exist
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Configure storage
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './uploads'); // Ensure 'uploads' folder exists
//     },
//     filename: function(req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Keep file extension
//     }
// });

// // File filter to allow only PDFs
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'application/pdf') {
//         cb(null, true);
//     } else {
//         cb(new Error('Only PDF files are allowed!'), false);
//     }
// };

// // Multer upload instance
// export const upload = multer({ storage, fileFilter });



// export const pdfExtract = async(req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: 'No file uploaded' });
//         }
//         console.log('errrrr');
//         const pdfPath = req.file.path; // Get uploaded file path
//         console.log("PDF Path:", pdfPath);

//         // Check if file exists
//         if (!fs.existsSync(pdfPath)) {
//             return res.status(500).json({ message: 'File not found after upload' });
//         }
//         console.log('errrrr');
//         // Read and extract text
//         const dataBuffer = fs.readFileSync(pdfPath);
//         const data = await pdfParse(dataBuffer);

//         console.log('Extracted Text:', data.text); // Debug log

//         res.status(200).json({
//             message: 'File uploaded and extracted successfully',
//             file: req.file,
//             extractedText: data.text
//         });
//     } catch (error) {
//         console.error("Error in pdfExtractsss:", error);
//         res.status(500).json({ message: 'Error extracting text', error: error.message });
//     }
// };