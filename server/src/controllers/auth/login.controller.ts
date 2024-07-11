import { Request, Response } from "express";
import User from "../../models/user.model";
import { tokengenerate } from "../../services/tokengenerate";
import * as bcrypt from "bcrypt";


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

    // const token = tokengenerate(
    //   email,
    //   process.env.ACCESS_TOKEN_SECRET as string,
    //   process.env.ACCESS_TOKEN_EXPIRY as string,
    //   process.env.REFRESH_TOKEN_SECRET as string,
    //   process.env.REFRESH_TOKEN_EXPIRY as string
    // );

    return res.status(200).json({
      message: "Logged in",
      id: user._id,
      basicDetailsCompleted: user.basicDetailsCompleted,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};

export { login };
