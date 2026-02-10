import { Router } from "express";
import { streamAskRepo } from "../controllers/chatStream.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
router.post("/ask-stream", authMiddleware, streamAskRepo);
export default router;
