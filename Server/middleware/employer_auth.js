import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    // Extract token from cookies
    const token = req.cookies && req.cookies.authToken ? req.cookies.authToken : null;


    if (!token) {
        console.error("No token found in cookies.");
        return res.status(401).json({ error: "Unauthorized: No token provided", success: false });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the candidate ID to the request object
        console.log(req.employerId);
        req.employerId = decoded.id;
        console.log(req.employerId);

        next(); // Pass control to the next middleware or route handler
    } catch (error) {
        console.error("JWT verification failed:", error);
        return res.status(403).json({ error: "Unauthorized: Invalid or expired token", success: false });
    }
};