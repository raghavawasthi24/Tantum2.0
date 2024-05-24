import { Document } from "mongoose";

interface OtpSchema {
  otp: String;
  expiresIn: Date;
}

interface tokenSchema {
  accessToken: string;
  refreshToken: string;
  expiryDate: Date;
}

interface UserRideInfo {
  rating: string;
  peopleRated: number;
  comments: string[];
  offered: string[];
  booked: string[];
}

export interface UserSchema extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isVerified: boolean;
  otp: OtpSchema;
  gender: string;
  dob: Date;
  avatar: string;
  rideInfo: UserRideInfo;
  tokens: tokenSchema;
}
