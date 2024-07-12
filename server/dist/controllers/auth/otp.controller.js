"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = exports.sendOtp = void 0;
const user_model_1 = require("../../models/user.model");
const otpgenerate_1 = require("../../services/otpgenerate");
const emailService_1 = require("../../services/emailService");
const otpVerification_1 = require("../../services/otpVerification");
const sendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        if (!email)
            return res.status(400).json({ message: "Invalid fields" });
        const user = yield user_model_1.default.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        const newotp = (0, otpgenerate_1.otpGenerate)();
        const otp = {
            otp: newotp,
            expiresIn: new Date(new Date().getTime() + 60000),
        };
        let text = `Your OTP for verification is ${newotp}`;
        (0, emailService_1.sendEmail)(email, text, newotp);
        user.otp = otp;
        yield user.save();
        res.status(200).json({ message: "OTP sent successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Verification failed" });
    }
});
exports.sendOtp = sendOtp;
const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    // console.log(req.body);
    try {
        if (!email || !otp)
            return res.status(400).json({ message: "Invalid fields" });
        const user = yield user_model_1.default.findOne({ email });
        console.log("user", user);
        if (!user)
            return res.status(400).json({ message: "User not found" });
        let otpResult = (0, otpVerification_1.otpVerification)(user, otp);
        console.log("otpres", otpResult);
        if (otpResult === "Email verified") {
            return res.status(200).json({ message: "Email verified" });
        }
        else {
            return res.status(400).json({ message: otpResult });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Verification failed" });
    }
});
exports.verifyOtp = verifyOtp;
