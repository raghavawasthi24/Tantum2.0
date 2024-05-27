import express from "express";
const router = express.Router();
import verifyToken from "../middleware/index";
import { login } from "../controllers/auth/login";
import { dummy, signup } from "../controllers/auth/register";
import { verifyEmail } from "../controllers/auth/verifyEmail";
import { sendOtp } from "../controllers/auth/sendOtp";
import { verifyOtp } from "../controllers/auth/verifyOtp";
import { forgotPassword } from "../controllers/auth/forgot-password";
import { changePassword } from "../controllers/auth/change-password";


//Routes for user
router.post("/login", login);
router.post("/register", signup);
router.post('/verify-otp', verifyOtp);
router.post('/send-otp', sendOtp);
router.post('/verify-email', verifyEmail);
router.get("/forgot-password", forgotPassword);
router.post('/change-password',changePassword);
router.get("/dummy",verifyToken, dummy);


module.exports = router;
