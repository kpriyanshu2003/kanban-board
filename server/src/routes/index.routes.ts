import express from "express";
const router = express.Router();

import userRoutes from "./user.routes";
import taskRoutes from "./task.routes";
import auth from "../middlewares/auth.middleware";

router.use("/auth", userRoutes);
router.use("/tasks", auth, taskRoutes);

export default router;
