import { Schema, model, Document } from "mongoose";

export type RepoStatus =
    | "waiting"
    | "active"
    | "completed"
    | "failed";

export interface RepoDocument extends Document {
    userId: string;
    name: string;
    url: string;
    defaultBranch: string;
    status: RepoStatus;
    createdAt: Date;
    updatedAt: Date;
}

const repoSchema = new Schema<RepoDocument>(
    {
        userId: {
            type: String,
            required: true,
            index: true
        },
        name: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        defaultBranch: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["waiting", "active", "completed", "failed"],
            default: "waiting",
            index: true
        }
    },
    {
        timestamps: true
    }
);

export const RepoModel = model<RepoDocument>(
    "Repo",
    repoSchema
);
