import { UserRepository } from "../repositories/user.repo";
import { RefreshTokenRepository } from "../repositories/refreshToken.repo";
import {
    signAccessToken,
    signRefreshToken
} from "../utils/jwt";
import { hashToken } from "../utils/hash";

interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

const REFRESH_TOKEN_EXPIRY_MS =
    7 * 24 * 60 * 60 * 1000;

class AuthService {

    async githubLogin(
        _code: string
    ): Promise<{
        accessToken: string;
        refreshToken: string;
    }> {
        // TODO: exchange _code with GitHub later
        const email = "demo@github.com";
        const provider: "github" = "github";
        const providerId = "github_mock_id";

        const user = await UserRepository.findOrCreate(
            email,
            provider,
            providerId
        );

        const userId = user._id.toString();

        const accessToken = signAccessToken({ userId });
        const refreshToken = signRefreshToken({ userId });

        await RefreshTokenRepository.save({
            userId,
            token: hashToken(refreshToken),
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });

        return { accessToken, refreshToken };
    }


    async refreshTokens(
        userId: string,
        oldRefreshToken: string
    ): Promise<AuthTokens> {
        if (!userId || !oldRefreshToken) {
            throw new Error("Invalid refresh request");
        }

        const hashedToken = hashToken(oldRefreshToken);

        const validToken =
            await RefreshTokenRepository.findValid(hashedToken);


        if (!validToken) {
            // Possible token reuse attack
            await RefreshTokenRepository.revokeAll(userId);
            throw new Error(
                "Refresh token reuse detected"
            );
        }

        // Rotate tokens
        await RefreshTokenRepository.revokeAll(userId);

        const newAccessToken = signAccessToken({
            userId
        });

        const newRefreshToken = signRefreshToken({
            userId
        });

        await RefreshTokenRepository.save({
            userId,
            token: hashToken(newRefreshToken),
            expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS)
        });

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        };
    }
}

export const authService = new AuthService();
