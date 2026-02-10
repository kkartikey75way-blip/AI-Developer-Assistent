import { Router } from "express";
import { ingestRepo } from "../controllers/repo.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/ingest", authMiddleware, ingestRepo);

export default router;
