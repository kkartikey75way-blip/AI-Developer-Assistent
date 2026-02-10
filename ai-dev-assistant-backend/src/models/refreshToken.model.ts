import { Schema, model, Document } from "mongoose";

export interface RefreshTokenDocument extends Document {
    readonly userId: string;
    readonly tokenHash: string;
    readonly expiresAt: Date;
    readonly revoked: boolean;
}

const refreshTokenSchema = new Schema<RefreshTokenDocument>(
    {
        userId: { type: String, required: true, index: true },
        tokenHash: { type: String, required: true },
        expiresAt: { type: Date, required: true },
        revoked: { type: Boolean, default: false }
    },
    { timestamps: true }
);

export const RefreshTokenModel = model<RefreshTokenDocument>(
    "RefreshToken",
    refreshTokenSchema
);
