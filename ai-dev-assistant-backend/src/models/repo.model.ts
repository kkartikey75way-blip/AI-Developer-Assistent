import { Schema, model, Document } from "mongoose";

export interface RepoDocument extends Document {
    readonly userId: string;
    readonly name: string;
    readonly url: string;
    readonly defaultBranch: string;
}

const repoSchema = new Schema<RepoDocument>(
    {
        userId: { type: String, required: true, index: true },
        name: { type: String, required: true },
        url: { type: String, required: true },
        defaultBranch: { type: String, required: true }
    },
    { timestamps: true }
);

export const RepoModel = model<RepoDocument>("Repo", repoSchema);
