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
export default router;
