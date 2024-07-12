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
exports.bookRide = void 0;
const ride_model_1 = require("../../models/ride.model");
const user_model_1 = require("../../models/user.model");
const emailService_1 = require("../../services/emailService");
const bookRide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rideId, ownerId, userId, seatsBooked } = req.body;
    try {
        const ride = yield ride_model_1.default.findById(rideId);
        if (!ride) {
            return res.status(404).json({ message: "No ride found" });
        }
        const owner = yield user_model_1.default.findById(ownerId);
        if (!owner) {
            return res.status(404).json({ message: "Owner not found" });
        }
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (ride.seatsVacant < seatsBooked) {
            return res.status(400).json({ message: "No seats available" });
        }
        ride.seatsVacant -= seatsBooked;
        ride.passengers.push(userId);
        user.rideInfo.booked.push(ride._id);
        yield Promise.all([ride.save(), user.save()]);
        const emailText = `
      You have successfully booked a ride. Here are your details:
      From: ${ride.source}
      To: ${ride.destination}
      Time: ${ride.departure_time} to ${ride.reaching_time}
      Seats booked: ${seatsBooked}
      Price: ${ride.price}

      Details of rider are:
      Rider Name: ${owner.firstName} ${owner.lastName}
      Email: ${owner.email}
      Phone: ${"N/A"}
      Gender: ${owner.gender}
    `;
        yield (0, emailService_1.sendEmail)(user.email, emailText);
        res.status(201).json({ message: "Ride booked successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
});
exports.bookRide = bookRide;
