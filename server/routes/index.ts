import express from "express";
import { loginUser, registerUser, dummy } from "../controllers/authController";
import { verify } from "jsonwebtoken";
const router = express.Router();
import verifyToken from "../middleware/index";
// const auth = require("../middleware/auth");

//Routes for user
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/dummy",verifyToken, dummy);


module.exports = router;
