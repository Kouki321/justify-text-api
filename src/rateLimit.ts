import { Request, Response, NextFunction } from "express";

const wordLimit = 80000; // Daily word limit
const dailyLimits = new Map<string, { count: number; date: Date }>();

export const rateLimiterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send("Authorization token is missing");
  }

  const currentDate = new Date().setHours(0, 0, 0, 0);
  const userData = dailyLimits.get(token) || { count: 0, date: new Date() };

  // Reset count if the date has changed
  if (userData.date.getTime() !== currentDate) {
    userData.count = 0;
    userData.date = new Date();
  }

  const text = req.body.text || "";

  const wordCount = text.split(/\s+/).filter(Boolean).length; // Count only non-empty words

  userData.count += wordCount; // Increment count by number of words sent

  // Check if the user has exceeded the word limit
  if (userData.count > wordLimit) {
    return res.status(402).send("Payment Required");
  }

  dailyLimits.set(token, userData); // Update user data in the map
  next(); // Proceed to the next middleware/route handler
};
