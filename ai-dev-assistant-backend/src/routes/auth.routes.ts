import { Router } from "express";
import {
    googleAuthRedirect,
    googleAuthCallback,
    refreshToken,
    logout
} from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { googleAuthSchema, refreshTokenSchema } from "../schemas/auth.schema";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/google", googleAuthRedirect);
router.get("/google/callback", validate(googleAuthSchema), googleAuthCallback);
router.post("/refresh", validate(refreshTokenSchema), refreshToken);
router.post("/logout", authMiddleware, logout);

export default router;
