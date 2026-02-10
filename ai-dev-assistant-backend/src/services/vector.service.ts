import { chroma } from "../config/vector";
import { EmbeddingService } from "./embedding.service";

export class VectorService {
    static async upsert(params: {
        repoId: string;
        documents: { id: string; content: string }[];
    }): Promise<void> {
        const collection = await chroma.getOrCreateCollection({
            name: `repo-${params.repoId}`
        });

        for (const doc of params.documents) {
            const embedding = await EmbeddingService.embed(doc.content);

            await collection.upsert({
                ids: [doc.id],
                embeddings: [embedding],
                documents: [doc.content]
            });
        }
    }

    static async search(params: {
        repoId: string;
        query: string;
        topK?: number;
    }): Promise<string[]> {
        const collection = await chroma.getCollection({
            name: `repo-${params.repoId}`
        });

        const queryEmbedding = await EmbeddingService.embed(params.query);

        const result = await collection.query({
            queryEmbeddings: [queryEmbedding],
            nResults: params.topK ?? 5
        });

        return result.documents.flat().map((doc) => doc as string);
    }
}
