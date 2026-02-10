import { Router } from "express";
import { askRepo } from "../controllers/chat.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/ask", authMiddleware, askRepo);

export default router;
