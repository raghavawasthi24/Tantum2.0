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

// const loginUser = async (req: Request, res: Response): Promise<void> => {
//   const { id, password } = req.body;

//   try {
//     const user = (await User.findOne({ id }));

//     if (user) {
//       const payload = { _id: user._id };
//       const cookie_token = jwt.sign(payload, process.env.SECRET_KEY as string);
//       res.cookie("jwt", cookie_token, {
//         secure: true,
//         expires: new Date(Date.now() + 10800),
//         httpOnly: false,
//       });

//       const isPasswordMatched = await bcrypt.compare(password, user.password);

//       if (isPasswordMatched) {
//         res.status(200).json({ msg: "Logged in", jwt_token: cookie_token });
//       } else {
//         res.status(200).json({ msg: "Password not matched" });
//       }
//     } else {
//       res.status(200).json({ msg: "User not found" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Login failed" });
//   }
// };

const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Check if user with the given email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ error: "User is already registered" });
      return;
    }

    // Validate password (e.g., length, complexity)

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 15);

    // Create a new user

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

    // Save the new user to the database
    await newUser.save();

    // Return success response with JWT token
    res.status(201).json({ message: "Registration successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

export { registerUser };
