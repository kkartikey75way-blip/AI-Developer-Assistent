import { Request, Response } from "express";
import { GoogleAuthService } from "../services/googleAuth.service";
import { verifyRefreshToken } from "../utils/jwt";
import { authService } from "../services/auth.service";
import { RefreshTokenRepository } from "../repositories/refreshToken.repo";
import { env } from "../config/env";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/appError";
import { RefreshTokenInput } from "../schemas/auth.schema";
import { AuthenticatedRequest } from "../types/request";

export const googleAuthRedirect = (
    _req: Request,
    res: Response
): void => {
    const url = GoogleAuthService.getAuthUrl();
    res.redirect(url);
};

export const googleAuthCallback = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
        console.log("googleAuthCallback reached");
        const code = req.query.code as string;

        const tokens = await GoogleAuthService.handleCallback(code);

        res.redirect(
            `${env.FRONTEND_URL}/oauth-success?accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`
        );
    }
);

export const refreshToken = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
        const { refreshToken } = req.body as RefreshTokenInput;

        try {
            const payload = verifyRefreshToken(refreshToken);

            const tokens = await authService.refreshTokens(
                payload.userId,
                refreshToken
            );

            res.json(tokens);
        } catch {
            throw new AppError(
                "Invalid or expired refresh token",
                401
            );
        }
    }
);

export const logout = catchAsync(
    async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        const userId = req.userId;

        await RefreshTokenRepository.revokeAll(userId);

        res.json({ message: "Logged out successfully" });
    }
);
