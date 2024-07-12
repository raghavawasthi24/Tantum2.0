import { Request, Response } from "express";
import User from "../../models/user.model";
import { sendEmail } from "../../services/emailService";
import { tokenEncode } from "../../services/token-encode-decode";
import { tokenDecode } from "../../services/token-encode-decode";

//TO VERIFY THE LINK SENT TO EMAIL
const verifyLink = async (req: Request, res: Response) => {
  var token = req.query.token as string;

  try {
    if (!token) return res.status(400).json({ message: "Invalid fields" });

    const decode = tokenDecode(
      token,
      process.env.JWT_SECRET_KEY || "hjjhbjhbjhbjh"
    );

    console.log(decode);
    if (!decode)
      return res.status(404).json({ message: "Something went wrong" });

    res.status(200).json({ message: "Success", result: decode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//SENDS A TIME LIMIT LINK TO EMAIL

const sendLink = async (req: Request, res: Response) => {
  const email = req.query.email as string;

  try {
    if (!email) return res.status(400).json({ message: "Invalid fields" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Email is not registered" });

    const token = tokenEncode(
      email,
      process.env.JWT_SECRET_KEY || "hjbdcbkhbck",
      "1h"
    );
    let link = `http://localhost:3000/auth/forgot-password/${token}`;

    sendEmail( email, link );

    res.status(200).json({ message: "Link sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "" });
  }
};

export { verifyLink, sendLink };
