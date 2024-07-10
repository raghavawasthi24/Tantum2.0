"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpGenerate = otpGenerate;
const otpGenerator = require("otp-generator");
function otpGenerate() {
    return otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        specialChars: false,
    });
}
