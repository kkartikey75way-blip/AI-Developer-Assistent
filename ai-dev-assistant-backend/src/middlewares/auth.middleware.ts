import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const header = req.headers.authorization;
        if (!header?.startsWith("Bearer ")) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const token = header.replace("Bearer ", "");
        const payload = verifyAccessToken(token);

        (req as Request & { userId: string }).userId = payload.userId;
        next();
    } catch {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
