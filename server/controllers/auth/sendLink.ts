import User from "../../models/user";
import { Request, Response } from "express";
import { otpGenerate } from "../../services/otpgenerate";
import { sendEmail } from "../../services/emailService";
import { tokenEncode } from "../../services/token-encode-decode";

const sendLink = async (req: Request, res: Response) => {
  const email = req.query.email as string;

  try {
    if (!email) return res.status(400).json({ message: "Invalid fields" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email is not registered" });

    const token = tokenEncode(email, process.env.JWT_SECRET_KEY || "hjbdcbkhbck", "1h");
    let link = `http://localhost:3000/auth/forgot-password/${token}`;

    

    sendEmail({ email, otp: link });

    res.status(200).json({ message: "Link sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "" });
  }
};

export { sendLink };
