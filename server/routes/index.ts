import express from "express";
const router = express.Router();
// const auth = require("../middleware/auth");
const {  registerUser } = require("../controllers/authController");
// const { bookSlot, allSlot, pendingSlot } = require("../controllers/slots");

//Routes for user
// router.post("/login", loginUser);
router.post("/register", registerUser);

//Routes for slots
// router.post("/bookSlot", bookSlot);
// router.post("/allSlots", allSlot);
// router.post("/pendingSlots", pendingSlot);

module.exports = router;
