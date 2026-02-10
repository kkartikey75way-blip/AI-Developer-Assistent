import { Request, Response } from "express";
import { ChatService } from "../services/chat.service";

export const askRepo = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { repoId, question } = req.body as {
        repoId: string;
        question: string;
    };

    const answer = await ChatService.askRepo({
        repoId,
        question
    });

    res.json({ answer });
};
