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

    if (!user || !user.isVerified) {
      return res.status(400).send({ message: "Email is not registered" });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched)
      return res
        .status(400)
        .send({ message: "Password or email is incorrect" });

    if (!user.basicDetailsCompleted)
      return res
        .status(201)
        .send({ message: "Login Successfully!", id: user._id });

    const token = tokengenerate(
      email,
      process.env.ACCESS_TOKEN_SECRET as string,
      process.env.ACCESS_TOKEN_EXPIRY as string,
      process.env.REFRESH_TOKEN_SECRET as string,
      process.env.REFRESH_TOKEN_EXPIRY as string
    );

    return res.status(201).json({
      message: "Logged in",
      id: user._id,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};

export { login };
