import { Request, Response } from "express";
import { githubAuthSchema } from "../schemas/auth.schema";
import { authService } from "../services/auth.service";
import { GoogleAuthService } from "../services/googleAuth.service";

export const githubAuth = async (req: Request, res: Response): Promise<void> => {
    const dto = githubAuthSchema.parse(req.body);
    const result = await authService.githubLogin(dto.code);

    res.json(result);
};
export const refreshToken = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { userId, refreshToken } = req.body as {
        userId: string;
        refreshToken: string;
    };

    const tokens = await authService.refreshTokens(
        userId,
        refreshToken
    );

    res.json(tokens);
};
export const googleAuthRedirect = (
    _req: Request,
    res: Response
): void => {
    const url = GoogleAuthService.getAuthUrl();
    res.redirect(url);
};

export const googleAuthCallback = async (
    req: Request,
    res: Response
): Promise<void> => {
    const code = req.query.code as string;

    const tokens = await GoogleAuthService.handleCallback(code);

    // for now return JSON (frontend can store tokens)
    res.json(tokens);
};