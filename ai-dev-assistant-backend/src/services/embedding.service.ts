import { openrouter } from "../config/openrouter";

export class EmbeddingService {
    static async embed(text: string): Promise<number[]> {
        const res = await openrouter.embeddings.create({
            model: "text-embedding-3-small",
            input: text
        });

        return res.data[0].embedding;
    }
}
