import express from "express";
const router = express.Router();
import verifyToken from "../middleware/index";
import { login } from "../controllers/auth/login";
import { dummy, signup } from "../controllers/auth/register";
import { verifyEmail } from "../controllers/auth/verifyEmail";
import { sendOtp } from "../controllers/auth/sendOtp";

//Routes for user
router.post("/login", login);
router.post("/register", signup);
router.post('/verify-otp', verifyEmail);
router.post('/send-otp', sendOtp);
router.get("/dummy",verifyToken, dummy);


module.exports = router;
