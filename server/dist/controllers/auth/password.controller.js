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
exports.changePassword = void 0;
const user_model_js_1 = require("../../models/user.model.js");
const bcrypt = require("bcrypt");
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password)
            return res.status(400).json({ message: "Invalid fields" });
        const user = yield user_model_js_1.default.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "User not found" });
        const hashedPassword = yield bcrypt.hash(password, 15);
        user.password = hashedPassword;
        yield user.save();
        res.status(200).json({ message: "Password changed successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Verification failed" });
    }
});
exports.changePassword = changePassword;
