import express from "express";
const router = express.Router();

import userRoutes from "./user.routes";

router.use("/auth", userRoutes);

export default router;
