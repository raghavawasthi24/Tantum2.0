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
exports.getRideDetails = void 0;
const user_model_1 = require("../../models/user.model");
const getRideDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    try {
        // Exclude fields you don't want to return
        const user = yield user_model_1.default.findOne({ _id })
            .select("rideInfo")
            .populate({
            path: "rideInfo.offered rideInfo.booked",
            populate: {
                path: "passengers",
                model: "User",
                select: "firstName lastName _id avatar", // Select the fields you need from the User model
            },
        });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to get user details" });
    }
});
exports.getRideDetails = getRideDetails;
