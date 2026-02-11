import { Request, Response } from "express";
import { repoIngestService } from "../services/repo.service";
import { RepoRepository } from "../repositories/repo.repo";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/appError";
import { AuthenticatedRequest } from "../types/request";

export const createRepo = catchAsync(
    async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        const { repoUrl } = req.body;
        const userId = req.userId;

        if (!repoUrl) {
            throw new AppError("Repo URL required", 400);
        }

        console.log("Repo request received");

        // Ingestion is non-blocking in this implementation
        repoIngestService.ingestRepo(userId, repoUrl).catch((err) => {
            console.error("Ingestion failed:", err);
        });

        res.json({
            message: "Repo ingestion started"
        });
    }
);

export const getUserRepos = catchAsync(
    async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        const repos = await RepoRepository.findByUser(req.userId);
        res.json(repos);
    }
);
