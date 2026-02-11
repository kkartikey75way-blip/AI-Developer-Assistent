import { Request, Response } from "express";
import { ReviewService } from "../services/review.service";
import { catchAsync } from "../utils/catchAsync";
import { ReviewInput } from "../schemas/search_review.schema";

export const reviewRepo = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
        const { repoId, focus } = req.body as ReviewInput;

        const result = await ReviewService.reviewRepo({
            repoId,
            focus
        });
        res.json(result);
    }
);
