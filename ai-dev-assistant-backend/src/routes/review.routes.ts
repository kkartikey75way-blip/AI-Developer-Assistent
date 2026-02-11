import { Router } from "express";
import { reviewRepo } from "../controllers/review.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { reviewSchema } from "../schemas/search_review.schema";

const router = Router();
router.post("/repo", authMiddleware, validate(reviewSchema), reviewRepo);
export default router;
