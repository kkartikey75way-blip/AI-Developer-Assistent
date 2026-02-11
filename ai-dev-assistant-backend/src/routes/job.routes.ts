import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getJobStatus } from "../controllers/job.controller";
import { validate } from "../middlewares/validate.middleware";
import { jobStatusSchema } from "../schemas/repo_job.schema";

const router = Router();


router.get("/:jobId", authMiddleware, validate(jobStatusSchema), getJobStatus);

export default router;
