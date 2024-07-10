"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpVerification = void 0;
const otpVerification = (user, otp) => {
    if (user.otp.otp == otp) {
        if (user.otp.expiresIn < new Date()) {
            return "OTP expired";
        }
        else {
            return "Email verified";
        }
    }
    else {
        return "Wrong OTP";
    }
};
exports.otpVerification = otpVerification;
