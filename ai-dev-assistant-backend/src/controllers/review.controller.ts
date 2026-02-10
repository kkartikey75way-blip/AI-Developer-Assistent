import { Request, Response } from "express";
import { ReviewService } from "../services/review.service";

export const reviewRepo = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { repoId, focus } = req.body as {
        repoId: string;
        focus?: "security" | "performance" | "style" | "general";
    };

    const result = await ReviewService.reviewRepo({ repoId, focus });
    res.json(result);
};
