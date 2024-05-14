import mongoose from "mongoose";
import { UserSchema } from "../types/user";

const userSchema = new mongoose.Schema<UserSchema>({
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  otp: {
    otp: { type: Number, default: null },
    expiresIn: { type: Date, default: null },
  },
  gender: { type: String, default: "" },
  dob: { type: Date, default: null },
  avatar: { type: String, default: null },
  rideInfo: {
    rating: { type: Number, default: 0},
    peopleRated: { type: Number, default: 0},
    comments: { type: [String] },
    offered: { type: [String] },
    booked: { type: [String] },
  },
},{
  timestamps: true,

}
);

const UserModel = mongoose.model<UserSchema>("User", userSchema);

export default UserModel;