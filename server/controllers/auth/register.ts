import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../../models/user";
import { tokengenerate } from "../../services/tokengenerate";
import { UserSchema } from "../../types/user";

dotenv.config();

const signup = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ error: "User is already registered" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 15);

    const token = tokengenerate(
      email,
      process.env.ACCESS_TOKEN_SECRET as string,
      process.env.ACCESS_TOKEN_EXPIRY as string,
      process.env.REFRESH_TOKEN_SECRET as string,
      process.env.REFRESH_TOKEN_EXPIRY as string
    );

    console.log(token);

    const newUser: UserSchema = new User({
      email,
      password: hashedPassword,
      token,
    });

    await newUser.save();

    res.status(201).json({ message: "Registration successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

const dummy = (res: Response): void => {
  res.status(200).json({ message: "Dummy route" });
};

export { signup, dummy };