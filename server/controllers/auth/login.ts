import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../../models/user";
import { tokengenerate } from "../../services/tokengenerate";
// import multer from "multer";
// import { v4 as uuidv4 } from "uuid";
// import path from "path";

dotenv.config();

const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res.status(400).json({ msg: "Please enter all fields" });

    const user = await User.findOne({ email });

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
        return res.status(200).json({ msg: "Logged in", id: user._id, token });
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

export { login };
