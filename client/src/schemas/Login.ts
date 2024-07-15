import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email can't be empty" })
    .email("This is not a valid email"),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" }),
});

export const RegisterSchema = z.object({
  email: z
    .string()
    .email(),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" }),
  firstName: z.string().min(1, { message: "" }),
  lastName: z.string().min(1, { message: "" }),
  dob: z
    .date()
    .min(new Date(1900, 1, 1)).nullable(),
  gender: z.string(),
});

export const VerifyOtpSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email",
  }),
  otp: z.string().min(6, {
    message: "Enter correct OTP",
  }),
});
