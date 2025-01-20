import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Define the secret key for signing JWT tokens
const SECRET_KEY =  "your_secret_key";

// Interface for the JWT payload
interface TokenPayload {
  id: number;
  role: "admin" | "user";
  iat?: number;
  exp?: number;
}

// Middleware to authenticate users based on a JWT token
export const authenticate = (req: any, res: any, next: any) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided or invalid format" });
    }

    const token = authHeader.split(" ")[1];

    // Verify and decode the token
    const decoded = jwt.verify(token, SECRET_KEY) as TokenPayload;

    // Attach the decoded user information to the request object
    req.user = decoded;
    next();
  } catch (err) {
    // Handle specific JWT errors
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Token expired" });
    }
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Fallback for unexpected errors
    res.status(500).json({ error: "Authentication error" });
  }
};

// Middleware to authorize admin-only access
export const authorizeAdmin = (req: any, res: any, next: any) => {
  try {
    // Ensure the user object exists
    if (!req.user) {
      return res.status(403).json({ error: "User not authenticated" });
    }

    // Check if the user has the "admin" role
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: "Authorization error" });
  }
};

// Export both middleware functions from the file
export default { authenticate, authorizeAdmin };
