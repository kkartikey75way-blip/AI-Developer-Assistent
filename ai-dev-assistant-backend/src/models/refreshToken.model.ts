import { Schema, model, Document } from "mongoose";

export interface RefreshTokenDocument extends Document {
    userId: string;
    token: string;
    expiresAt: Date;
}

const refreshTokenSchema = new Schema<RefreshTokenDocument>({
    userId: {
        type: String,
        required: true,
        index: true
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 } // auto-delete when expired
    }
});

export const RefreshTokenModel = model<RefreshTokenDocument>(
    "RefreshToken",
    refreshTokenSchema
);
