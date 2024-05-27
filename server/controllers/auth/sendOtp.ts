import User from "../../models/user";
import { Request, Response } from "express";
import { otpGenerate } from "../../services/otpgenerate";
import { sendEmail } from "../../services/emailService";

const sendOtp = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    if (!email) return res.status(400).json({ message: "Invalid fields" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const newotp = otpGenerate();

    const otp = {
      otp: newotp,
      expiresIn: new Date(new Date().getTime() + 60000),
    };

    sendEmail({ email, otp: newotp });

    user.otp = otp;
    await user.save();

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Verification failed" });
  }
};

export { sendOtp };
