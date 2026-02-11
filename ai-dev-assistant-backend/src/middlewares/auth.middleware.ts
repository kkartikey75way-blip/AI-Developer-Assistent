import { Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { AuthenticatedRequest } from "../types/request";

export const authMiddleware = (
    req: any,
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

        // attach userId safely
        (req as AuthenticatedRequest).userId = payload.userId;

        next();
    } catch {
        res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};
