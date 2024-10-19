"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiterMiddleware = void 0;
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
const maxWordsPerDay = 80000;
const rateLimiter = new rate_limiter_flexible_1.RateLimiterMemory({
    points: maxWordsPerDay,
    duration: 86400, // 24 hours
});
const rateLimiterMiddleware = (req, res, next) => {
    var _a, _b;
    // Ensure the token exists and is properly formatted
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res.status(401).send("Authorization token is missing");
    }
    // Ensure req.body is a valid string
    const text = ((_b = req.body) === null || _b === void 0 ? void 0 : _b.text) || ""; // Adjust according to your structure
    if (typeof text !== "string") {
        return res.status(400).send("Invalid request body");
    }
    const wordCount = text.split(/\s+/).length;
    rateLimiter
        .consume(token, wordCount)
        .then(() => {
        next();
    })
        .catch(() => {
        res.status(402).send("Payment Required");
    });
};
exports.rateLimiterMiddleware = rateLimiterMiddleware;
