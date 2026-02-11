import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends Document {
    email: string;
    password?: string;
    provider?: "google" | "github";
    providerId?: string;
    createdAt: Date;
    updatedAt: Date;

    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            minlength: 6
        },

        provider: {
            type: String,
            enum: ["google", "github"]
        },

        providerId: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

userSchema.index(
    { provider: 1, providerId: 1 },
    { unique: true, sparse: true }
);

userSchema.pre("save", async function () {
    if (!this.isModified("password") || !this.password) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    if (!this.password) return false;
    return bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = model<UserDocument>("User", userSchema);
