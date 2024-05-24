import User from "../../models/user";
import { Request, Response } from "express";
import { otpVerification } from "../../services/otpVerification";
import { tokengenerate } from "../../services/tokengenerate";


const verifyEmail= async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    
    try {
        if (!email || !otp)
        return res.status(400).json({ msg: "Invalid fields" });
    
        const user = await User.findOne({ email });
        
        if(!user)
        return res.status(400).json({ msg: "User not found" });

        let otpResult = otpVerification(user, otp);
        if(otpResult === "Email verified"){
          const token = tokengenerate(
            email,
            process.env.ACCESS_TOKEN_SECRET as string,
            process.env.ACCESS_TOKEN_EXPIRY as string,
            process.env.REFRESH_TOKEN_SECRET as string,
            process.env.REFRESH_TOKEN_EXPIRY as string
          );

          user.isVerified = true;
          user.tokens= token;

          await user.save();
          return res.status(200).json({ msg: "Email verified",id:user.id, token});
        }
        else {
            return res.status(400).json({ msg: otpResult });
        }

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Verification failed" });
    }
}

export { verifyEmail };