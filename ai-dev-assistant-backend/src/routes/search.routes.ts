import { Router } from "express";
import { searchRepo } from "../controllers/search.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { searchSchema } from "../schemas/search_review.schema";

const router = Router();

router.post("/search", authMiddleware, validate(searchSchema), searchRepo);

export default router;
