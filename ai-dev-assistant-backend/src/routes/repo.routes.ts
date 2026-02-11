import { Router } from "express";
import { createRepo, getUserRepos } from "../controllers/repo.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { ingestRepoSchema } from "../schemas/repo_job.schema";

const router = Router();

router.post(
    "/ingest",
    authMiddleware,
    validate(ingestRepoSchema),
    createRepo
);
router.get("/", authMiddleware, getUserRepos);

export default router;
