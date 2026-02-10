import { Queue } from "bullmq";
import { redis } from "../config/redis";

export const ingestQueue = new Queue("repo-ingest", {
    connection: redis
});
