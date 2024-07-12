"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const register_controller_1 = require("../controllers/auth/register.controller");
const otp_controller_1 = require("../controllers/auth/otp.controller");
const link_controller_1 = require("../controllers/auth/link.controller");
const password_controller_1 = require("../controllers/auth/password.controller");
const ride_controller_1 = require("../controllers/rides/ride.controller");
const update_detaills_controller_1 = require("../controllers/user/update-detaills.controller");
const login_controller_1 = require("../controllers/auth/login.controller");
const book_ride_controller_1 = require("../controllers/rides/book-ride.controller");
const router = express.Router();
// Routes for user
router.post("/login", login_controller_1.login);
router.post("/register", register_controller_1.signup);
router.post("/verify-otp", otp_controller_1.verifyOtp);
router.post("/send-otp", otp_controller_1.sendOtp);
router.post("/verify-login-email", register_controller_1.verifyEmail);
router.get("/send-link", link_controller_1.sendLink);
router.get("/verify-link", link_controller_1.verifyLink);
router.post("/change-password", password_controller_1.changePassword);
// Routes for rides
router.post("/ride", ride_controller_1.addRide);
router.post("/findride", ride_controller_1.getRide);
router.post("/book-ride", book_ride_controller_1.bookRide);
// Update user details
router.patch("/update-details", update_detaills_controller_1.updateDetails);
module.exports = router;
