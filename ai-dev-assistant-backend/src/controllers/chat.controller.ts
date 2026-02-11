import { Request, Response } from "express";
import { ChatService } from "../services/chat.service";
import { catchAsync } from "../utils/catchAsync";
import { StreamChatInput } from "../schemas/chat.schema";
import { initSSE, sendSSE, endSSE } from "../utils/sse";

export const streamChat = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
        const { repoId, question } = req.body as StreamChatInput;

        initSSE(res);

        const stream = await ChatService.streamChat({
            repoId,
            question
        });

        for await (const chunk of stream) {
            const token = chunk.choices[0]?.delta?.content ?? "";

            if (token) {
                sendSSE(res, { token });
            }
        }

        endSSE(res);
    }
);
