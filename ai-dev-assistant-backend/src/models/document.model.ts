import { Schema, model, Document } from "mongoose";

export interface DocumentFile extends Document {
    readonly repoId: string;
    readonly path: string;
    readonly content: string;
    readonly language: string;
}

const documentSchema = new Schema<DocumentFile>(
    {
        repoId: { type: String, required: true, index: true },
        path: { type: String, required: true },
        content: { type: String, required: true },
        language: { type: String, required: true }
    },
    { timestamps: true }
);

export const DocumentModel = model<DocumentFile>(
    "Document",
    documentSchema
);
