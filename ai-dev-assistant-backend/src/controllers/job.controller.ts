import { Request, Response } from "express";
import { ingestQueue } from "../queues/ingest.queue";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/appError";
import { JobStatusInput } from "../schemas/repo_job.schema";

export const getJobStatus = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
        const { jobId } = req.params as unknown as JobStatusInput;

        const job = await ingestQueue.getJob(jobId);
        if (!job) {
            throw new AppError("Job not found", 404);
        }

        const state = await job.getState();
        res.json({ status: state });
    }
);
