"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.justifyText = void 0;
const justifyText = (text) => {
    const maxLineLength = 80;
    const words = text.split(/\s+/);
    let lines = [];
    let currentLine = [];
    words.forEach((word) => {
        let currentLineLength = currentLine.join(" ").length;
        if (currentLineLength + word.length + 1 <= maxLineLength) {
            currentLine.push(word);
        }
        else {
            lines.push(justifyLine(currentLine, maxLineLength));
            currentLine = [word];
        }
    });
    if (currentLine.length > 0) {
        lines.push(currentLine.join(" ")); // Last line does not need justification
    }
    return lines.join("\n");
};
exports.justifyText = justifyText;
const justifyLine = (words, maxLength) => {
    if (words.length === 1)
        return words[0];
    let spacesToAdd = maxLength - words.join(" ").length;
    let gaps = words.length - 1;
    while (spacesToAdd > 0) {
        for (let i = 0; i < gaps && spacesToAdd > 0; i++) {
            words[i] += " ";
            spacesToAdd--;
        }
    }
    return words.join(" ");
};
