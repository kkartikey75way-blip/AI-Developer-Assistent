import { Request, Response } from "express";
import { initSSE, sendSSE, endSSE } from "../utils/sse";
import { ChatStreamService } from "../services/chatStream.service";

export const streamAskRepo = async (
    req: Request,
    res: Response
): Promise<void> => {
    initSSE(res);

    const { repoId, question } = req.body as {
        repoId: string;
        question: string;
    };

    await ChatStreamService.streamRepo({
        repoId,
        question,
        onToken: (token) => sendSSE(res, { token })
    });

    endSSE(res);
};
