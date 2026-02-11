import axios from "axios";
import { env } from "../config/env";

interface EmbeddingResponse {
    data: Array<{
        embedding: number[];
    }>;
}

class EmbeddingService {
    async createEmbedding(
        text: string
    ): Promise<number[]> {
        const response =
            await axios.post<EmbeddingResponse>(
                "https://openrouter.ai/api/v1/embeddings",
                {
                    model: "text-embedding-3-small",
                    input: text
                },
                {
                    headers: {
                        Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
                        "Content-Type": "application/json"
                    }
                }
            );

        return response.data.data[0].embedding;
    }
}

export const embeddingService =
    new EmbeddingService();
