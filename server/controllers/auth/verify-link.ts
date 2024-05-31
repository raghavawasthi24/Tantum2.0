import { Request, Response } from "express";
import { tokenDecode } from "../../services/token-encode-decode";

const verifyLink = async (req: Request, res: Response) => {

    var token = req.query.token as string;
    
    try {
    if (!token) return res.status(400).json({ message: "Invalid fields" });

    const decode = tokenDecode(token , process.env.JWT_SECRET_KEY || "hjjhbjhbjhbjh");

    console.log(decode);
    if (!decode)
      return res.status(404).json({ message: "Something went wrong" });

    res.status(200).json({ message: "Success", result: decode});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { verifyLink };
