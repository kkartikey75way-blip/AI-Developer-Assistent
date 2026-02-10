import { Response } from "express";

export const initSSE = (res: Response): void => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders?.();
};

export const sendSSE = (res: Response, data: unknown): void => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
};

export const endSSE = (res: Response): void => {
    res.write("event: end\n\n");
    res.end();
};
