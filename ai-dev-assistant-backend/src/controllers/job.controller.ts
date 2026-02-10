import { Request, Response } from "express";
import { ingestQueue } from "../queues/ingest.queue";

export const getJobStatus = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { jobId } = req.params;

    const job = await ingestQueue.getJob(jobId as string);
    if (!job) {
        res.status(404).json({ status: "not_found" });
        return;
    }

    const state = await job.getState();
    res.json({ status: state });
};
