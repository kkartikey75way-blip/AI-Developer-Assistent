import {
    RepoModel,
    RepoDocument,
    RepoStatus
} from "../models/repo.model";

export class RepoRepository {

    static async create(data: {
        userId: string;
        name: string;
        url: string;
        defaultBranch: string;
    }): Promise<RepoDocument> {
        return RepoModel.create({
            ...data,
            status: "waiting"
        });
    }

    static async updateStatus(
        repoId: string,
        status: RepoStatus
    ): Promise<void> {
        await RepoModel.findByIdAndUpdate(repoId, { status });
    }

    static async findByUser(
        userId: string
    ): Promise<RepoDocument[]> {
        return RepoModel.find({ userId }).sort({ createdAt: -1 });
    }

    static async findById(
        repoId: string
    ): Promise<RepoDocument | null> {
        return RepoModel.findById(repoId);
    }

    static async delete(
        repoId: string
    ): Promise<void> {
        await RepoModel.findByIdAndDelete(repoId);
    }
}
