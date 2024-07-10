import { UserSchema } from "../types/user.js";

export const otpVerification = (user: UserSchema, otp: any): string => {
  if (user.otp.otp == otp) {
    if (user.otp.expiresIn < new Date()) {
      return "OTP expired";
    } else {
      return "Email verified";
    }
  } else {
    return "Wrong OTP";
  }
};
