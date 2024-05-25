import User from "../../models/user";
import { Request, Response } from "express";
import { otpVerification } from "../../services/otpVerification";

const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  try {
    if (!email || !otp) return res.status(400).json({ msg: "Invalid fields" });

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: "User not found" });

    let otpResult = otpVerification(user, otp);
    if (otpResult === "Email verified") {
      return res.status(200).json({ msg: "Email verified" })
    } else {
      return res.status(400).json({ msg: otpResult });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Verification failed" });
  }
};

export { verifyOtp };
