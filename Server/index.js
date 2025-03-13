import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import candidateRoutes from "./routes/candidate_route.js";



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



// Use the candidate routes
app.use("/candidates", candidateRoutes);


// Start server
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});