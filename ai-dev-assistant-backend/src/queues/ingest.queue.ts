import { Queue } from "bullmq";
import { redisClient } from "../config/redis";

export const ingestQueue = new Queue("repo-ingest", {
    connection: redisClient
});
