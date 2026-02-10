import { Request, Response, NextFunction } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { redis } from "../config/redis";

const limiter = new RateLimiterRedis({
    storeClient: redis,
    keyPrefix: "rl",
    points: 60,        // requests
    duration: 60,      // per 60 seconds
    blockDuration: 60  // block for 60s if exceeded
});

export const rateLimit = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const key =
        (req as Request & { userId?: string }).userId ??
        req.ip ??
        "anonymous";

    try {
        await limiter.consume(key);
        next();
    } catch {
        res.status(429).json({
            message: "Too many requests. Please slow down."
        });
    }
};
