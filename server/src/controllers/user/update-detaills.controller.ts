import { Request, Response } from "express";
import * as dotenv from "dotenv";
import User from "../../models/user.model";
import { tokengenerate } from "../../services/tokengenerate";

dotenv.config();

const updateDetails = async (req: Request, res: Response): Promise<void> => {
  const body = req.body;

  try {
    const user = await User.findOneAndUpdate({ email: body.email }, body, {
      new: true,
    });

    console.log(user);

    if (!user) {
      res.status(404).json({ error: "Can't update details" });
      return;
    }

    if (!user.basicDetailsCompleted) {
      const token = tokengenerate(
        body.email,
        process.env.ACCESS_TOKEN_SECRET as string,
        process.env.ACCESS_TOKEN_EXPIRY as string,
        process.env.REFRESH_TOKEN_SECRET as string,
        process.env.REFRESH_TOKEN_EXPIRY as string
      );

      user.tokens = token;
      user.basicDetailsCompleted = true;
      await user.save();

      res.status(200).json({ message: "Details updated successfully", token });
    }

    res.status(200).json({ message: "Details updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

export { updateDetails };
