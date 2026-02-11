import { embeddingService } from "./embedding.service";
import { vectorService } from "./vector.service";

class RAGService {
    async retrieveContext(
        question: string,
        repoId: string
    ): Promise<string> {
        const embedding =
            await embeddingService.createEmbedding(
                question
            );

        const documents =
            await vectorService.query(
                embedding,
                repoId,
                5
            );

        return documents.join("\n\n");
    }
}

export const ragService =
    new RAGService();
