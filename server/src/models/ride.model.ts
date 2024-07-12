import mongoose from "mongoose";
import { RideSchema } from "../types/ride";

const rideSchema = new mongoose.Schema<RideSchema>(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
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
    passengers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const RideModel = mongoose.model<RideSchema>("Ride", rideSchema);

export default RideModel;
