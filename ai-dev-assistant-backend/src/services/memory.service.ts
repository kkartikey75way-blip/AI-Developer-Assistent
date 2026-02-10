import { ChatMessageModel } from "../models/chatMessage.model";

export class MemoryService {
    static async getRecent(repoId: string, limit = 6): Promise<string[]> {
        const messages = await ChatMessageModel.find({ repoId })
            .sort({ createdAt: -1 })
            .limit(limit)
            .lean();

        return messages
            .reverse()
            .map(m => `${m.role.toUpperCase()}: ${m.content}`);
    }

    static async save(repoId: string, role: "user" | "assistant", content: string): Promise<void> {
        await ChatMessageModel.create({ repoId, role, content });
    }
}
