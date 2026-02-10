import { Schema, model, Document } from "mongoose";

export interface UserDocument extends Document {
    email: string;
    githubId: string;
}

const userSchema = new Schema<UserDocument>(
    {
        email: { type: String, required: true, index: true },
        githubId: { type: String, required: true, unique: true }
    },
    { timestamps: true }
);

export const UserModel = model<UserDocument>("User", userSchema);
