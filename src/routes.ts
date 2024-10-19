import express, { Request, Response, NextFunction } from "express";
import { justifyText } from "./justify";
import { generateToken, verifyToken } from "./auth";
import { rateLimiterMiddleware } from "./rateLimit";

const router = express.Router();



// Token generation route
router.post("/api/token", (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  const token = generateToken(email);
  res.json({ token });
});




// Justification route with rate limiter middleware
router.post(
  "/api/justify",
  rateLimiterMiddleware,
  (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1]; // Extract the token from "Bearer <token>"


    
    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }

    try {
      verifyToken(token); // Verify the token
      const text = req.body.text; // Get text from request body

      if (!text) {
        return res
          .status(400)
          .json({ message: "Text is required for justification" });
      }

      const justifiedText = justifyText(text); // Justify the text
      res.type("text/plain").send(justifiedText); // Send the justified text in plain text format
    } catch (error) {
      return res.status(403).json({ message: "Invalid token" });
    }
  }
);

export default router;
