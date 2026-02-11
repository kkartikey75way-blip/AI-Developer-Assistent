import Redis from "ioredis";
import { env } from "./env";

const redisClient = new Redis(env.REDIS_URL, {
    maxRetriesPerRequest: null,
    retryStrategy: (times: number): number => {
        const delay = Math.min(times * 100, 2000);
        console.log(`Redis retry attempt: ${times}`);
        return delay;
    }
});

redisClient.on("connect", () => {
    console.log("Redis connected");
});

redisClient.on("error", (error: Error) => {
    console.error("Redis error:", error.message);
});

process.on("SIGINT", async () => {
    await redisClient.quit();
    console.log("Redis connection closed");
    process.exit(0);
});

export { redisClient };
