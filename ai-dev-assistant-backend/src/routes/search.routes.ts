import { Router } from "express";
import { searchRepo } from "../controllers/search.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/search", authMiddleware, searchRepo);

export default router;
