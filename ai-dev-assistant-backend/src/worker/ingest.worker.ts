import { Worker } from "bullmq";
import { redis } from "../config/redis";
import { repoIngestService } from "../services/repoIngest.service";

export const ingestWorker = new Worker(
    "repo-ingest",
    async (job) => {
        const { userId, repoUrl } = job.data as {
            userId: string;
            repoUrl: string;
        };

        await repoIngestService.ingestRepo(userId, repoUrl);
    },
    { connection: redis }
);

ingestWorker.on("completed", (job) => {
    console.log(`Ingest completed: ${job.id}`);
});

ingestWorker.on("failed", (job, err) => {
    console.error(`Ingest failed: ${job?.id}`, err);
});
