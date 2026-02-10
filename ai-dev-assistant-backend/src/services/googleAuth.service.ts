import { OAuth2Client } from "google-auth-library";
import { UserRepository } from "../repositories/user.repo";
import { signAccessToken, signRefreshToken } from "../utils/jwt";

const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_CALLBACK_URL
);

export class GoogleAuthService {
    static getAuthUrl(): string {
        return client.generateAuthUrl({
            access_type: "offline",
            scope: ["profile", "email"],
            prompt: "consent"
        });
    }

    static async handleCallback(code: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }> {
        const { tokens } = await client.getToken(code);
        client.setCredentials(tokens);

        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token as string,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        if (!payload?.email) {
            throw new Error("Google authentication failed");
        }

        const user = await UserRepository.findOrCreate(
            payload.email,
            `google_${payload.sub}`
        );

        const userId = user._id.toString();

        return {
            accessToken: signAccessToken({ userId }),
            refreshToken: signRefreshToken({ userId })
        };
    }
}
