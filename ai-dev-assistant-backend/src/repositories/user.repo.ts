import { UserModel, UserDocument } from "../models/user.model";

export class UserRepository {

    static async findOrCreate(
        email: string,
        provider: "github" | "google",
        providerId: string
    ): Promise<UserDocument> {
        const existing = await UserModel.findOne({
            provider,
            providerId
        });

        if (existing) {
            return existing;
        }

        const user = await UserModel.create({
            email,
            provider,
            providerId
        });

        return user;
    }

    static async findById(
        userId: string
    ): Promise<UserDocument | null> {
        return UserModel.findById(userId);
    }
}
