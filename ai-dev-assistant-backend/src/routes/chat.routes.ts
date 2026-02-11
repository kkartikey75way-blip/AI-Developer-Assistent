import { Router } from "express";
import { streamChat } from "../controllers/chat.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { streamChatSchema } from "../schemas/chat.schema";

const router = Router();

router.post(
    "/ask",
    authMiddleware,
    validate(streamChatSchema),
    streamChat
);

export default router;
