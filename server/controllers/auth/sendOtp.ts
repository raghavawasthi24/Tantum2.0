import User from "../../models/user";
import { Request, Response } from "express";
import { otpGenerate } from "../../services/otpgenerate";
import { sendEmail } from "../../services/emailService";

const sendOtp = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    if (!email) return res.status(400).json({ msg: "Invalid fields" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });
    
    const newotp = otpGenerate();

    const otp = {
      otp: newotp,
      expiresIn: new Date(new Date().getTime() + 60000),
    };

    sendEmail({ email, otp: newotp });


    user.otp = otp;
    await user.save();

    res.status(200).json({ msg: "OTP sent successfully" });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Verification failed" });
  }
};

export { sendOtp };
