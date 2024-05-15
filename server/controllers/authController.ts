import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";
import dotenv from "dotenv";
import { UserSchema } from "../types/user";
import { tokengenerate } from "../services/tokengenerate";
// import multer from "multer";
// import { v4 as uuidv4 } from "uuid";
// import path from "path";

dotenv.config();

const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    if(!email || !password) 
     return res.status(400).json({ msg: "Please enter all fields" });

    const user = (await User.findOne({ email }));

    if (user) {
       const token = tokengenerate(
         email,
         process.env.ACCESS_TOKEN_SECRET as string,
         process.env.ACCESS_TOKEN_EXPIRY as string,
         process.env.REFRESH_TOKEN_SECRET as string,
         process.env.REFRESH_TOKEN_EXPIRY as string
       );

      const isPasswordMatched = await bcrypt.compare(password, user.password);

      if (isPasswordMatched) {
        return res.status(200).json({ msg: "Logged in",id:user._id, token });
      } else {
        return res.status(200).json({ msg: "Password not matched" });
      }
    } else {
      return res.status(200).json({ msg: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
};


const registerUser = async (req: Request, res: Response): Promise<void> => {
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
      token
    });

    await newUser.save();

    res.status(201).json({ message: "Registration successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

const dummy = (req: Request, res: Response): void => {
  res.status(200).json({ message: "Dummy route" });
}

export {loginUser, registerUser, dummy };
