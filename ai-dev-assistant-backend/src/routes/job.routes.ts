import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getJobStatus } from "../controllers/job.controller";

const router = Router();


router.get("/:jobId", authMiddleware, getJobStatus);

export default router;
