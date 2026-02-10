import { Router, Request, Response } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/me", authMiddleware, (_req: Request, res: Response) => {
    res.json({ success: true });
});

export default router;
