import { Request, Response } from "express";
import User from "../../models/user.model";

const getUserDetails = async (req: Request, res: Response): Promise<void> => {
  const { _id } = req.params;

  try {
    // Exclude fields you don't want to return
    const user = await User.findOne({ _id }).select(
      "-password -isVerified -otp -tokens -rideInfo -basicDetailsCompleted"
    );

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get user details" });
  }
};

export { getUserDetails };
