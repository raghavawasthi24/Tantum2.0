import User from "../../models/user.model";
import { Request, Response } from "express";
import { otpGenerate } from "../../services/otpgenerate";
import { sendEmail } from "../../services/emailService";
import { otpVerification } from "../../services/otpVerification";

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

const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  console.log(req.body);

  try {
    if (!email || !otp)
      return res.status(400).json({ message: "Invalid fields" });

    const user = await User.findOne({ email });
    console.log("user",user);

    if (!user) return res.status(400).json({ message: "User not found" });

    let otpResult = otpVerification(user, otp);
    console.log("otpres", otpResult);
    if (otpResult === "Email verified") {
      return res.status(200).json({ message: "Email verified" });
    } else {
      return res.status(400).json({ message: otpResult });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Verification failed" });
  }
};

export { sendOtp, verifyOtp };
