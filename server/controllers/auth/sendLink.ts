import User from "../../models/user";
import { Request, Response } from "express";
import { otpGenerate } from "../../services/otpgenerate";
import { sendEmail } from "../../services/emailService";

const sendLink = async (req: Request, res: Response) => {
  const email = req.query.email as string;

  try {
    if (!email) return res.status(400).json({ msg: "Invalid fields" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const newotp = otpGenerate();
    let link = `http://localhost:3000/auth/forgot-password/${newotp}`;

    const otp = {
      otp: newotp,
      expiresIn: new Date(new Date().getTime() + 60000),
    };

    sendEmail({ email, otp: link });

    user.otp = otp;
    await user.save();

    res.status(200).json({ msg: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Verification failed" });
  }
};

export { sendLink };
