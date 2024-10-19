"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const justify_1 = require("./justify");
const auth_1 = require("./auth");
const rateLimit_1 = require("./rateLimit");
const router = express_1.default.Router();
// Token generation route
router.post("/api/token", (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    const token = (0, auth_1.generateToken)(email);
    res.json({ token });
});
// Justification route with rate limiter middleware
router.post("/api/justify", rateLimit_1.rateLimiterMiddleware, (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1]; // Extract the token from "Bearer <token>"
    if (!token) {
        return res.status(401).json({ message: "Token is required" });
    }
    try {
        (0, auth_1.verifyToken)(token); // Verify the token
        const text = req.body.text; // Get text from request body
        if (!text) {
            return res
                .status(400)
                .json({ message: "Text is required for justification" });
        }
        const justifiedText = (0, justify_1.justifyText)(text); // Justify the text
        res.type("text/plain").send(justifiedText); // Send the justified text in plain text format
    }
    catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
});
exports.default = router;
