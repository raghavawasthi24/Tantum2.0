import express from "express";
const router = express.Router();
import verifyToken from "../middleware/index";
import { login } from "../controllers/auth/login";
import { dummy, signup } from "../controllers/auth/register";

//Routes for user
router.post("/login", login);
router.post("/register", signup);
router.get("/dummy",verifyToken, dummy);


module.exports = router;
