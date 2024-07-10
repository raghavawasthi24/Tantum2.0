"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const rideSchema = new mongoose_1.default.Schema({
    ownerId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    vehicleType: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    departure_time: {
        type: String,
        required: true,
    },
    reaching_time: {
        type: String,
        required: true,
    },
    seatsVacant: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
const RideModel = mongoose_1.default.model("Ride", rideSchema);
exports.default = RideModel;
