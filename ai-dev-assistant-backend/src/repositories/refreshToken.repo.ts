import { RefreshTokenModel } from "../models/refreshToken.model";

export class RefreshTokenRepository {
    static async save(
        userId: string,
        tokenHash: string,
        expiresAt: Date
    ): Promise<void> {
        await RefreshTokenModel.create({
            userId,
            tokenHash,
            expiresAt
        });
    }

    static async findValid(
        userId: string,
        tokenHash: string
    ): Promise<boolean> {
        const token = await RefreshTokenModel.findOne({
            userId,
            tokenHash,
            revoked: false,
            expiresAt: { $gt: new Date() }
        });

        return Boolean(token);
    }

    static async revokeAll(userId: string): Promise<void> {
        await RefreshTokenModel.updateMany(
            { userId },
            { revoked: true }
        );
    }
}
