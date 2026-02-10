import { UserModel, UserDocument } from "../models/user.model";

export class UserRepository {
    static async findOrCreate(
        email: string,
        githubId: string
    ): Promise<UserDocument> {
        return UserModel.findOneAndUpdate(
            { githubId },
            { email, githubId },
            { upsert: true, new: true }
        );
    }
}
