import { Schema, model, Document } from "mongoose";

export interface ChatMessageDocument extends Document {
    repoId: string;
    role: "user" | "assistant";
    content: string;
}

const chatMessageSchema = new Schema<ChatMessageDocument>(
    {
        repoId: { type: String, required: true, index: true },
        role: { type: String, enum: ["user", "assistant"], required: true },
        content: { type: String, required: true }
    },
    { timestamps: true }
);

export const ChatMessageModel = model<ChatMessageDocument>(
    "ChatMessage",
    chatMessageSchema
);
