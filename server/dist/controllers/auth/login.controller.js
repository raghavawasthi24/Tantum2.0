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
exports.login = void 0;
const user_model_js_1 = require("../../models/user.model.js");
const tokengenerate_js_1 = require("../../services/tokengenerate.js");
const bcrypt = require("bcrypt");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password)
            return res.status(400).json({ message: "Invalid fields" });
        const user = yield user_model_js_1.default.findOne({ email });
        if (!user || !user.isVerified) {
            return res.status(400).send({ message: "Email is not registered" });
        }
        const isPasswordMatched = yield bcrypt.compare(password, user.password);
        if (!isPasswordMatched)
            return res
                .status(400)
                .send({ message: "Password or email is incorrect" });
        const token = (0, tokengenerate_js_1.tokengenerate)(email, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXPIRY, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_EXPIRY);
        return res.status(200).json({
            message: "Logged in",
            id: user._id,
            // token,
            basicDetailsCompleted: user.basicDetailsCompleted,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Login failed" });
    }
});
exports.login = login;
