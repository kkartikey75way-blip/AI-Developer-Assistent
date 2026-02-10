import { Router } from "express";
import { reviewRepo } from "../controllers/review.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
router.post("/repo", authMiddleware, reviewRepo);
export default router;
