import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getTeamList,
  getNotificationList,
} from "../controllers/userControllers.js";
import { protectRoute,isAdminRoute } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/teamlist",protectRoute,isAdminRoute, getTeamList);
export default router;
