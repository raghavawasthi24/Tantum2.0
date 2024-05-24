import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../../models/user";
import { UserSchema } from "../../types/user";
import { otpGenerate } from "../../services/otpgenerate";
import { sendEmail } from "../../services/emailService";

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
      expiresIn: new Date().getTime() + 60000,
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

const dummy = (res: Response): void => {
  res.status(200).json({ message: "Dummy route" });
};

export { signup, dummy };
