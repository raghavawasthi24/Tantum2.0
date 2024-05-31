import express from "express";
const router = express.Router();
import verifyToken from "../middleware/index";
import { login } from "../controllers/auth/login";
import { dummy, signup } from "../controllers/auth/register";
import { verifyEmail } from "../controllers/auth/verifyEmail";
import { sendOtp } from "../controllers/auth/sendOtp";
import { verifyOtp } from "../controllers/auth/verifyOtp";
import { sendLink } from "../controllers/auth/sendLink";
import { changePassword } from "../controllers/auth/change-password";
import { verifyLink } from "../controllers/auth/verify-link";


//Routes for user
router.post("/login", login);
router.post("/register", signup);
router.post('/verify-otp', verifyOtp);
router.post('/send-otp', sendOtp);
router.post('/verify-login-email', verifyEmail);
router.get("/send-link", sendLink);
router.get("/verify-link", verifyLink);
router.post('/change-password',changePassword);
router.get("/dummy",verifyToken, dummy);


module.exports = router;
