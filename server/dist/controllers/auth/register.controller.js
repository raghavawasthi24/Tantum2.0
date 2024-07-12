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
exports.verifyEmail = exports.signup = void 0;
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const user_model_1 = require("../../models/user.model");
const otpgenerate_1 = require("../../services/otpgenerate");
const emailService_1 = require("../../services/emailService");
const otpVerification_1 = require("../../services/otpVerification");
dotenv.config();
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const existingUser = yield user_model_1.default.findOne({ email });
        if (existingUser && existingUser.isVerified) {
            res.status(400).json({ error: "User is already registered" });
            return;
        }
        const hashedPassword = yield bcrypt.hash(password, 15);
        const newotp = (0, otpgenerate_1.otpGenerate)();
        const otp = {
            otp: newotp,
            expiresIn: new Date(new Date().getTime() + 60000),
        };
        const text = `Your OTP for verification is ${newotp}`;
        if (!existingUser) {
            const newUser = new user_model_1.default({
                email,
                password: hashedPassword,
                otp,
            });
            yield newUser.save();
            (0, emailService_1.sendEmail)(email, text, newotp);
            res.status(201).json({ message: "OTP is sent to your email" });
        }
        else {
            (0, emailService_1.sendEmail)(email, text, newotp);
            yield user_model_1.default.findOneAndUpdate({ email }, { password: hashedPassword, otp }, { new: true });
            res.status(201).json({ message: "OTP is sent to your email" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Registration failed" });
    }
});
exports.signup = signup;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    try {
        if (!email || !otp)
            return res.status(400).json({ message: "Invalid fields" });
        const user = yield user_model_1.default.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "User not found" });
        let otpResult = (0, otpVerification_1.otpVerification)(user, otp);
        if (otpResult === "Email verified") {
            // const token = tokengenerate(
            //   email,
            //   process.env.ACCESS_TOKEN_SECRET as string,
            //   process.env.ACCESS_TOKEN_EXPIRY as string,
            //   process.env.REFRESH_TOKEN_SECRET as string,
            //   process.env.REFRESH_TOKEN_EXPIRY as string
            // );
            user.isVerified = true;
            // user.tokens = token;
            yield user.save();
            return res.status(200).json({ message: "Email verified", id: user._id });
        }
        else {
            return res.status(400).json({ message: otpResult });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Verification failed" });
    }
});
exports.verifyEmail = verifyEmail;
