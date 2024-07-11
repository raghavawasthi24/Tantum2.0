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
exports.updateDetails = void 0;
const dotenv = require("dotenv");
const user_model_1 = require("../../models/user.model");
const tokengenerate_1 = require("../../services/tokengenerate");
dotenv.config();
const updateDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const user = yield user_model_1.default.findOneAndUpdate({ email: body.email }, body, {
            new: true,
        });
        console.log(user);
        if (!user) {
            res.status(404).json({ error: "Can't update details" });
            return;
        }
        if (!user.basicDetailsCompleted) {
            const token = (0, tokengenerate_1.tokengenerate)(body.email, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXPIRY, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_EXPIRY);
            user.basicDetailsCompleted = true;
            yield user.save();
            res.status(200).json({ message: "Details updated successfully", token });
        }
        res.status(200).json({ message: "Details updated successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Registration failed" });
    }
});
exports.updateDetails = updateDetails;
