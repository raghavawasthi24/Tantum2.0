import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../../models/user.model";
import { tokengenerate } from "../../services/tokengenerate";

dotenv.config();

const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res.status(400).json({ message: "Invalid fields" });

    const user = await User.findOne({ email });

    if (user && user.isVerified) {
      const token = tokengenerate(
        email,
        process.env.ACCESS_TOKEN_SECRET as string,
        process.env.ACCESS_TOKEN_EXPIRY as string,
        process.env.REFRESH_TOKEN_SECRET as string,
        process.env.REFRESH_TOKEN_EXPIRY as string
      );

      const isPasswordMatched = await bcrypt.compare(password, user.password);

      if (isPasswordMatched) {
        return res
          .status(200)
          .json({ message: "Logged in", id: user._id, token });
      } else {
        return res
          .status(400)
          .json({ message: "Email or password is incorrect" });
      }
    } else {
      return res.status(404).json({ message: "Email is not registered" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};

export { login };
