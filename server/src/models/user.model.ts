import mongoose from "mongoose";
import { UserSchema } from "../types/user";

const userSchema = new mongoose.Schema<UserSchema>(
  {
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
          type: mongoose.Schema.Types.ObjectId,
          ref: "Ride",
        },
      ],
      booked: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Ride",
        },
      ],
    },
    basicDetailsCompleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<UserSchema>("User", userSchema);

export default UserModel;
