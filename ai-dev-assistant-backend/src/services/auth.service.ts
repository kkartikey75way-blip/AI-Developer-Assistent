import { UserRepository } from "../repositories/user.repo";
import { RefreshTokenRepository } from "../repositories/refreshToken.repo";
import { signAccessToken, signRefreshToken } from "../utils/jwt";
import { hashToken } from "../utils/hash";

class AuthService {
    async githubLogin(_code: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }> {
        const user = await UserRepository.findOrCreate(
            "demo@github.com",
            "github_id"
        );

        const userId = user._id.toString();

        const accessToken = signAccessToken({ userId });
        const refreshToken = signRefreshToken({ userId });

        await RefreshTokenRepository.save(
            userId,
            hashToken(refreshToken),
            new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        );

        return { accessToken, refreshToken };
    }

    async refreshTokens(
        userId: string,
        oldRefreshToken: string
    ): Promise<{ accessToken: string; refreshToken: string }> {
        const valid = await RefreshTokenRepository.findValid(
            userId,
            hashToken(oldRefreshToken)
        );

        if (!valid) {
            await RefreshTokenRepository.revokeAll(userId);
            throw new Error("Refresh token reuse detected");
        }

        await RefreshTokenRepository.revokeAll(userId);

        const newAccessToken = signAccessToken({ userId });
        const newRefreshToken = signRefreshToken({ userId });

        await RefreshTokenRepository.save(
            userId,
            hashToken(newRefreshToken),
            new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        );

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        };
    }
}

export const authService = new AuthService();
