import { Request, Response } from "express";
import { ingestQueue } from "../queues/ingest.queue";

export const ingestRepo = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { repoUrl } = req.body as { repoUrl: string };
    const userId = (req as Request & { userId: string }).userId;

    const job = await ingestQueue.add(
        "ingest",
        { userId, repoUrl },
        {
            attempts: 3,
            backoff: { type: "exponential", delay: 2000 }
        }
    );

    res.json({ queued: true, jobId: job.id });
};
