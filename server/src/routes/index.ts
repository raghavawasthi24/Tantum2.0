import * as express from "express";
import {
  signup,
  verifyEmail,
} from "../controllers/auth/register.controller";
import { sendOtp, verifyOtp } from "../controllers/auth/otp.controller";
import {
  sendLink,
  verifyLink,
} from "../controllers/auth/link.controller";
import { changePassword } from "../controllers/auth/password.controller";
import { addRide, getRide } from "../controllers/rides/ride.controller";
import { updateDetails } from "../controllers/user/update-detaills.controller";
import { login } from "../controllers/auth/login.controller";

const router = express.Router();

// Routes for user
router.post("/login", login);
router.post("/register", signup);
router.post("/verify-otp", verifyOtp);
router.post("/send-otp", sendOtp);
router.post("/verify-login-email", verifyEmail);
router.get("/send-link", sendLink);
router.get("/verify-link", verifyLink);
router.post("/change-password", changePassword);

// Routes for rides
router.post("/ride", addRide);
router.post("/findride", getRide);

// Update user details
router.patch("/update-details", updateDetails);

module.exports = router;
