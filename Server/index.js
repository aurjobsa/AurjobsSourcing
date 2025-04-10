import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import candidateRoutes from "./routes/candidate_route.js";
import employerRoutes from "./routes/employer_route.js";




dotenv.config();



const app = express();
const port = process.env.PORT || 3000; // Default to 3000 if not set

const corsOptions = {
    origin: true,
    credentials: true
};

app.use(cors(corsOptions));
app.use(cookieParser());

// Middleware
app.use(bodyParser.json()); // Allow JSON requests



// ✅ Serve the uploads folder as a static directory
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

// Use the candidate routes
app.use("/candidates", candidateRoutes);
app.use("/employers", employerRoutes);


// Start server
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});