import { Request, Response } from "express";

export const createRepo = async (
    req: Request,
    res: Response
): Promise<void> => {

    const { repoUrl } = req.body;
    const userId = req.userId;

};
