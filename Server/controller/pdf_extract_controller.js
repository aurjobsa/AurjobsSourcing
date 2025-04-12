import multer from 'multer';
import path from 'path';
import fs from 'fs';
import pdfParse from 'pdf-parse';

const uploadDir = './uploads';

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter to allow only PDFs
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed!'), false);
    }
};

// Multer upload instance
export const upload = multer({ storage, fileFilter });

export const pdfExtract = async(req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const pdfPath = req.file.path;

        if (!fs.existsSync(pdfPath)) {
            return res.status(500).json({ message: 'File not found after upload' });
        }

        const dataBuffer = fs.readFileSync(pdfPath);
        const data = await pdfParse(dataBuffer);
        console.log(data.text);
        res.status(200).json({
            message: 'File uploaded and extracted successfully',
            file: req.file,
            extractedText: data.text
        });
    } catch (error) {
        console.error('Error in pdfExtract:', error);
        res.status(500).json({ message: 'Error extracting text', error: error.message });
    }
};








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