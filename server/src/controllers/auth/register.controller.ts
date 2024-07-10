import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import User from "../../models/user.model.js";
import { UserSchema } from "../../types/user.js";
import { otpGenerate } from "../../services/otpgenerate.js";
import { sendEmail } from "../../services/emailService.js";
import { otpVerification } from "../../services/otpVerification.js";

dotenv.config();

const signup = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser && existingUser.isVerified) {
      res.status(400).json({ error: "User is already registered" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 15);
    const newotp = otpGenerate();
    const otp = {
      otp: newotp,
      expiresIn: new Date(new Date().getTime() + 60000),
    };

    if (!existingUser) {
      const newUser: UserSchema = new User({
        email,
        password: hashedPassword,
        otp,
      });

      await newUser.save();

      sendEmail({ email, otp: newotp });

      res.status(201).json({ message: "OTP is sent to your email" });
    } else {
      sendEmail({ email, otp: newotp });
      await User.findOneAndUpdate(
        { email },
        { password: hashedPassword, otp },
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
      // const token = tokengenerate(
      //   email,
      //   process.env.ACCESS_TOKEN_SECRET as string,
      //   process.env.ACCESS_TOKEN_EXPIRY as string,
      //   process.env.REFRESH_TOKEN_SECRET as string,
      //   process.env.REFRESH_TOKEN_EXPIRY as string
      // );

      user.isVerified = true;
      // user.tokens = token;

      await user.save();
      return res.status(200).json({ message: "Email verified", id: user._id });
    } else {
      return res.status(400).json({ message: otpResult });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Verification failed" });
  }
};

export { signup, verifyEmail };