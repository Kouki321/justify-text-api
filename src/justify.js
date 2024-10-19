"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.justifyText = void 0;
const justifyText = (text) => {
    const lines = text.split("\n");
    const justifiedLines = [];
    for (const line of lines) {
        const words = line.split(" ");
        let currentLine = "";
        for (const word of words) {
            // Check if adding the word exceeds the 80-character limit
            if (currentLine.length + word.length + 1 <= 80) {
                currentLine += (currentLine ? " " : "") + word;
            }
            else {
                // Add the current line to justifiedLines if it does not exceed 80 characters
                if (currentLine.length > 0) {
                    justifiedLines.push(currentLine);
                }
                // Start a new line with the current word
                currentLine = word;
            }
        }
        // Push the last line if it exists and is 80 characters or fewer
        if (currentLine.length > 0) {
            justifiedLines.push(currentLine);
        }
    }
    // Filter out any lines that exceed 80 characters
    return justifiedLines.filter((line) => line.length <= 80).join("\n");
};
exports.justifyText = justifyText;
