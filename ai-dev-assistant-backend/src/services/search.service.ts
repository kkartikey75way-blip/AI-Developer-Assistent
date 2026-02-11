import { embeddingService } from "./embedding.service";
import { vectorService } from "./vector.service";

class SearchService {
    async search(params: {
        repoId: string;
        query: string;
        topK?: number;
    }): Promise<string[]> {
        const { repoId, query, topK = 5 } = params;

        const embedding = await embeddingService.createEmbedding(query);


        const documents = await vectorService.query(
            embedding,
            repoId,
            topK
        );

        return documents;
    }
}

export const searchService = new SearchService();
