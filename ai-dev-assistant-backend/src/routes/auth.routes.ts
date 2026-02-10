import { Router } from "express";
import { githubAuth, refreshToken, googleAuthRedirect, googleAuthCallback } from "../controllers/auth.controller";

const router = Router();

router.post("/github", githubAuth);
router.post("/refresh", refreshToken);

router.get("/google", googleAuthRedirect);
router.get("/google/callback", googleAuthCallback);


export default router;
