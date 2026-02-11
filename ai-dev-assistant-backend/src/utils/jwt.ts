import jwt, {
    JwtPayload,
    JsonWebTokenError,
    TokenExpiredError
} from "jsonwebtoken";
import { env } from "../config/env";

export interface AccessTokenPayload {
    readonly userId: string;
}

const ACCESS_EXPIRES_IN = "15m";
const REFRESH_EXPIRES_IN = "7d";

export const signAccessToken = (
    payload: AccessTokenPayload
): string => {
    return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
        expiresIn: ACCESS_EXPIRES_IN,
        algorithm: "HS256"
    });
};

export const signRefreshToken = (
    payload: AccessTokenPayload
): string => {
    return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
        expiresIn: REFRESH_EXPIRES_IN,
        algorithm: "HS256"
    });
};

export const generateTokens = (userId: string) => {
    const payload: AccessTokenPayload = { userId };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    return {
        accessToken,
        refreshToken
    };
};

const extractPayload = (
    decoded: string | JwtPayload
): AccessTokenPayload => {
    if (
        typeof decoded === "object" &&
        decoded !== null &&
        typeof decoded.userId === "string"
    ) {
        return { userId: decoded.userId };
    }

    throw new Error("Invalid token payload");
};

export const verifyAccessToken = (
    token: string
): AccessTokenPayload => {
    try {
        const decoded = jwt.verify(
            token,
            env.JWT_ACCESS_SECRET,
            { algorithms: ["HS256"] }
        );

        return extractPayload(decoded);
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            throw new Error("Access token expired");
        }

        if (error instanceof JsonWebTokenError) {
            throw new Error("Invalid access token");
        }

        throw new Error("Access token verification failed");
    }
};

export const verifyRefreshToken = (
    token: string
): AccessTokenPayload => {
    try {
        const decoded = jwt.verify(
            token,
            env.JWT_REFRESH_SECRET,
            { algorithms: ["HS256"] }
        );

        return extractPayload(decoded);
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            throw new Error("Refresh token expired");
        }

        if (error instanceof JsonWebTokenError) {
            throw new Error("Invalid refresh token");
        }

        throw new Error("Refresh token verification failed");
    }
};
