import User from "../../models/user.model";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";

const changePassword = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res.status(400).json({ message: "Invalid fields" });

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(password, 15);

    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Verification failed" });
  }
};

export { changePassword };
