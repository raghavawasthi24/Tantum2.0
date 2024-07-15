import { Request, Response } from "express";
import * as dotenv from "dotenv";
import User from "../../models/user.model";
import { UserSchema } from "../../types/user";
import { otpGenerate } from "../../services/otpgenerate";
import { sendEmail } from "../../services/emailService";
import { otpVerification } from "../../services/otpVerification";
import { tokengenerate } from "../../services/tokengenerate";

dotenv.config();

const signup = async (req: Request, res: Response): Promise<void> => {
  const { email, password, firstName, lastName, dob, gender } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser && existingUser.isVerified) {
      res.status(400).json({ error: "User is already registered" });
      return;
    }

    const newotp = otpGenerate();
    const otp = {
      otp: newotp,
      expiresIn: new Date(new Date().getTime() + 60000),
    };

    const text = `Your OTP for verification is ${newotp}`;

    if (!existingUser) {
      const newUser: UserSchema = new User({
        email,
        password,
        firstName,
        lastName,
        dob,
        gender,
        otp,
      });

      await newUser.save();

      sendEmail(email, text, newotp);

      res.status(201).json({ message: "OTP is sent to your email" });
    } else {
      sendEmail(email, text, newotp);
      await User.findOneAndUpdate(
        { email },
        { password, otp, firstName, lastName, dob, gender },
        { new: true }
      );

      res.status(201).json({ message: "OTP is sent to your email" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

const verifyEmail = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  try {
    if (!email || !otp)
      return res.status(400).json({ message: "Invalid fields" });

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    let otpResult = otpVerification(user, otp);
    if (otpResult === "Email verified") {
      const token = tokengenerate(
        email,
        process.env.ACCESS_TOKEN_SECRET as string,
        process.env.ACCESS_TOKEN_EXPIRY as string,
        process.env.REFRESH_TOKEN_SECRET as string,
        process.env.REFRESH_TOKEN_EXPIRY as string
      );

      user.isVerified = true;
      user.tokens = token;

      await user.save();
      return res
        .status(200)
        .json({ message: "Email verified", _id: user._id, token });
    } else {
      return res.status(400).json({ message: otpResult });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Verification failed" });
  }
};

export { signup, verifyEmail };
