import { Request, Response } from "express";
import { initSSE, sendSSE, endSSE } from "../utils/sse";
import { ChatStreamService } from "../services/chatStream.service";
import { catchAsync } from "../utils/catchAsync";
import { StreamChatInput } from "../schemas/chat.schema";

export const streamAskRepo = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
        const { repoId, question } = req.body as StreamChatInput;

        initSSE(res);

        await ChatStreamService.streamRepo({
            repoId,
            question,
            onToken: (token) => sendSSE(res, { token })
        });

        endSSE(res);
    }
);
