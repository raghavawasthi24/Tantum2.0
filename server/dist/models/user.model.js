"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.default.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    otp: {
        otp: { type: String, default: null },
        expiresIn: { type: Date, default: null },
    },
    tokens: {
        accessToken: { type: String, default: null },
        refreshToken: { type: String, default: null },
        expiryDate: { type: Date, default: null },
    },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
    avatar: { type: String, default: null },
    rideInfo: {
        rating: { type: Number, default: 0 },
        peopleRated: { type: Number, default: 0 },
        comments: { type: [String] },
        offered: [
            {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Ride",
            },
        ],
        booked: [
            {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Ride",
            },
        ],
    },
    basicDetailsCompleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
const UserModel = mongoose_1.default.model("User", userSchema);
exports.default = UserModel;
