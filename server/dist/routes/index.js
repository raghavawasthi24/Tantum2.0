"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const login_controller_js_1 = require("../controllers/auth/login.controller.js");
const register_controller_js_1 = require("../controllers/auth/register.controller.js");
const otp_controller_js_1 = require("../controllers/auth/otp.controller.js");
const link_controller_js_1 = require("../controllers/auth/link.controller.js");
const password_controller_js_1 = require("../controllers/auth/password.controller.js");
const ride_controller_js_1 = require("../controllers/rides/ride.controller.js");
const update_detaills_controller_js_1 = require("../controllers/user/update-detaills.controller.js");
const router = express.Router();
// Routes for user
router.post("/login", login_controller_js_1.login);
router.post("/register", register_controller_js_1.signup);
router.post("/verify-otp", otp_controller_js_1.verifyOtp);
router.post("/send-otp", otp_controller_js_1.sendOtp);
router.post("/verify-login-email", register_controller_js_1.verifyEmail);
router.get("/send-link", link_controller_js_1.sendLink);
router.get("/verify-link", link_controller_js_1.verifyLink);
router.post("/change-password", password_controller_js_1.changePassword);
// Routes for rides
router.post("/ride", ride_controller_js_1.addRide);
router.post("/findride", ride_controller_js_1.getRide);
// Update user details
router.patch("/update-details", update_detaills_controller_js_1.updateDetails);
module.exports = router;
