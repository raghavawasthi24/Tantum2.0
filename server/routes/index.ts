import express from "express";
import { login } from "../controllers/auth/login.controller";
import { signup, verifyEmail } from "../controllers/auth/register.controller";
import { sendOtp, verifyOtp } from "../controllers/auth/otp.controller";
import { sendLink, verifyLink } from "../controllers/auth/link.controller";
import { changePassword } from "../controllers/auth/password.controller";
import { addRide, getRide } from "../controllers/rides/ride.controller";
const router = express.Router();


//Routes for user
router.post("/login", login);
router.post("/register", signup);
router.post("/verify-otp", verifyOtp);
router.post("/send-otp", sendOtp);
router.post("/verify-login-email", verifyEmail);
router.get("/send-link", sendLink);
router.get("/verify-link", verifyLink);
router.post("/change-password", changePassword);

//Routes for rides
router.post("/ride", addRide);
router.post("/findride", getRide);

module.exports = router;
