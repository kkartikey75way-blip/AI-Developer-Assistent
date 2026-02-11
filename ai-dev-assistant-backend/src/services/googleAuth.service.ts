import { OAuth2Client } from "google-auth-library";
import axios from "axios";
import { env } from "../config/env";
import { UserModel } from "../models/user.model";
import { generateTokens } from "../utils/jwt";
import { RefreshTokenRepository } from "../repositories/refreshToken.repo";

const client = new OAuth2Client(
    env.GOOGLE_CLIENT_ID,
    env.GOOGLE_CLIENT_SECRET,
    env.GOOGLE_REDIRECT_URI
);

export class GoogleAuthService {

    static getAuthUrl(): string {
        return client.generateAuthUrl({
            access_type: "offline",
            scope: ["openid", "email", "profile"],
            prompt: "consent"
        });
    }

    static async handleCallback(code: string) {
        console.log("Processing Google Auth callback with code:", code.substring(0, 10) + "...");

        const { tokens } = await client.getToken(code);
        console.log("Successfully retrieved Google tokens");
        client.setCredentials(tokens);

        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token!,
            audience: env.GOOGLE_CLIENT_ID
        });
        console.log("Verified ID token");

        const payload = ticket.getPayload();
        console.log("Payload email:", payload?.email);

        if (!payload?.email || !payload.sub) {
            throw new Error("Invalid Google payload");
        }

        // Check if user exists
        let user = await UserModel.findOne({
            provider: "google",
            providerId: payload.sub
        });
        console.log("User found:", !!user);

        if (!user) {
            user = await UserModel.create({
                email: payload.email,
                provider: "google",
                providerId: payload.sub
            });
        }

        const jwtTokens = generateTokens(user._id.toString());
        console.log("Generated JWT tokens");

        await RefreshTokenRepository.create({
            userId: user._id.toString(),
            token: jwtTokens.refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });
        console.log("Created refresh token in repository");

        return jwtTokens;
    }
}
