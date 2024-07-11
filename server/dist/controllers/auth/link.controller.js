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
exports.sendLink = exports.verifyLink = void 0;
const user_model_1 = require("../../models/user.model");
const emailService_1 = require("../../services/emailService");
const token_encode_decode_1 = require("../../services/token-encode-decode");
const token_encode_decode_2 = require("../../services/token-encode-decode");
//TO VERIFY THE LINK SENT TO EMAIL
const verifyLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var token = req.query.token;
    try {
        if (!token)
            return res.status(400).json({ message: "Invalid fields" });
        const decode = (0, token_encode_decode_2.tokenDecode)(token, process.env.JWT_SECRET_KEY || "hjjhbjhbjhbjh");
        console.log(decode);
        if (!decode)
            return res.status(404).json({ message: "Something went wrong" });
        res.status(200).json({ message: "Success", result: decode });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.verifyLink = verifyLink;
//SENDS A TIME LIMIT LINK TO EMAIL
const sendLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    try {
        if (!email)
            return res.status(400).json({ message: "Invalid fields" });
        const user = yield user_model_1.default.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "Email is not registered" });
        const token = (0, token_encode_decode_1.tokenEncode)(email, process.env.JWT_SECRET_KEY || "hjbdcbkhbck", "1h");
        let link = `http://localhost:3000/auth/forgot-password/${token}`;
        (0, emailService_1.sendEmail)({ email, otp: link });
        res.status(200).json({ message: "Link sent to your email" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "" });
    }
});
exports.sendLink = sendLink;
