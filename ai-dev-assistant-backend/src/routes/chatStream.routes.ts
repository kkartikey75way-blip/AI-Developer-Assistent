import { Router } from "express";
import { streamAskRepo } from "../controllers/chatStream.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { streamChatSchema } from "../schemas/chat.schema";

const router = Router();
router.post(
    "/ask-stream",
    authMiddleware,
    validate(streamChatSchema),
    streamAskRepo
);
export default router;
