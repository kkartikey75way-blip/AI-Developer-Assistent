import { RepoModel, RepoDocument } from "../models/repo.model";

export class RepoRepository {
    static async create(data: {
        userId: string;
        name: string;
        url: string;
        defaultBranch: string;
    }): Promise<RepoDocument> {
        return RepoModel.create(data);
    }

    static async findByUser(userId: string): Promise<RepoDocument[]> {
        return RepoModel.find({ userId }).lean();
    }
}
