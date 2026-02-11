import { RefreshTokenModel } from "../models/refreshToken.model";

export class RefreshTokenRepository {

    static async create(data: {
        userId: string;
        token: string;
        expiresAt: Date;
    }) {
        return RefreshTokenModel.create(data);
    }

    static async save(data: {
        userId: string;
        token: string;
        expiresAt: Date;
    }) {
        return RefreshTokenModel.create(data);
    }

    static async findValid(token: string) {
        return RefreshTokenModel.findOne({
            token,
            expiresAt: { $gt: new Date() }
        });
    }

    static async revokeAll(userId: string) {
        return RefreshTokenModel.deleteMany({ userId });
    }

    static async delete(token: string) {
        return RefreshTokenModel.deleteOne({ token });
    }
}
