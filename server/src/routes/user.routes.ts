import express from "express";
const router = express.Router();
import { registerUser, loginUser } from "../controllers/user.controller";

// POST /api/auth/register
// @desc Register a user
router.post("/register", registerUser);

// @route POST /api/auth/login
// @desc Log in a user
router.post("/login", loginUser);

export default router;
