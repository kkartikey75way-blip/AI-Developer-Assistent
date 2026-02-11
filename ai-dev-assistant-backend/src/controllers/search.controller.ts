import { Request, Response } from "express";
import { searchService } from "../services/search.service";
import { catchAsync } from "../utils/catchAsync";
import { SearchInput } from "../schemas/search_review.schema";

export const searchRepo = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
        const { repoId, query } = req.body as SearchInput;

        const results = await searchService.search({
            repoId,
            query
        });

        res.json({ results });
    }
);
