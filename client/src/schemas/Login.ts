import { z } from "zod";

export const LoginSchema = z.object({
  email:  z.string()
    .min(1, { message: "Email can't be empty" })
    .email("This is not a valid email"),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" }),
});


export const VerifyOtpSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email",
  }),
  otp: z.string().min(6, {
    message: "Enter correct OTP",
  }),
});
