import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface AccessTokenPayload {
    readonly userId: string;
}

export const signAccessToken = (payload: AccessTokenPayload): string => {
    return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
        expiresIn: "15m"
    });
};

export const signRefreshToken = (payload: AccessTokenPayload): string => {
    return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
        expiresIn: "7d"
    });
};

export const verifyAccessToken = (token: string): AccessTokenPayload => {
    return jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessTokenPayload;
};
