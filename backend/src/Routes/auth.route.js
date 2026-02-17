import express from "express";
const router = express.Router();
import {
  SignupController,
  LoginController,
  LogoutController,
  onboard,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

// Signup Route
router.post("/signup", SignupController);

//Login Route
router.post("/login", LoginController);

//Logout Route
router.post("/logout", LogoutController);

//Onboarding
router.post("/onboarding", protectRoute, onboard);

//TODO: Add route for forgot password and reset password

router.get("/me", protectRoute, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});
export default router;
