import { Request, Response } from "express";
import { VectorService } from "../services/vector.service";

export const searchRepo = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { repoId, query } = req.body as {
        repoId: string;
        query: string;
    };

    const results = await VectorService.search({
        repoId,
        query
    });

    res.json({ results });
};
