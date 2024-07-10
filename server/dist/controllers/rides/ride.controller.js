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
exports.getRide = exports.addRide = void 0;
const ride_model_js_1 = require("../../models/ride.model.js");
const user_model_1 = require("../../models/user.model");
//TO ADD NEW RIDE
const addRide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rideDetails = req.body;
    try {
        const user = yield user_model_1.default.findOne({ _id: rideDetails.ownerId });
        if (!user)
            return res.status(404).send({ message: "User not found" });
        const ride = new ride_model_js_1.default(rideDetails);
        yield ride.save();
        return res
            .status(201)
            .json({ message: "Your ride is recorded successfully" });
    }
    catch (error) {
        res.status(400).json({ message: "Something went wrong!" });
    }
});
exports.addRide = addRide;
//TO GET ALL RIDES
const getRide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rideDetails = req.body;
    try {
        const ride = yield ride_model_js_1.default.find({
            source: rideDetails.source,
            destination: rideDetails.destination,
        }).populate("ownerId", "firstName lastName rideInfo _id avatar");
        if (!ride) {
            return res.status(404).json({ message: "No rides found" });
        }
        const filterRides = ride.filter((ride) => ride.seatsVacant >= rideDetails.seatsVacant);
        console.log(filterRides);
        return res
            .status(201)
            .json({ message: "All rides fetched successfully", data: filterRides });
    }
    catch (error) {
        res.status(400).json({ message: "Something went wrong!" });
    }
});
exports.getRide = getRide;
