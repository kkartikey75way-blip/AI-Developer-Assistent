import axios from "axios";
import { env } from "../config/env";
import { embeddingService } from "./embedding.service";

class VectorService {
    private readonly collectionName = "repo_documents";
    private collectionId?: string;

    private get baseUrl() {
        return `${env.CHROMA_URL}/api/v2/tenants/default_tenant/databases/default_database`;
    }

    async ensureCollection(): Promise<void> {
        if (this.collectionId) return;

        const res = await axios.get<any>(`${this.baseUrl}/collections`);
        const collections = res.data.collections || res.data;

        const existing = (collections as any[]).find(
            (c: any) => c.name === this.collectionName
        );

        if (existing) {
            this.collectionId = existing.id;
            return;
        }

        const createRes = await axios.post<any>(
            `${this.baseUrl}/collections`,
            { name: this.collectionName }
        );

        this.collectionId = createRes.data.id;
    }

    async upsert(params: {
        repoId: string;
        documents: { id: string; content: string }[];
    }): Promise<void> {

        await this.ensureCollection();

        const embeddings = await Promise.all(
            params.documents.map(doc =>
                embeddingService.createEmbedding(doc.content)
            )
        );

        await axios.post(
            `${this.baseUrl}/collections/${this.collectionId}/add`,
            {
                ids: params.documents.map(d => d.id),
                embeddings,
                documents: params.documents.map(d => d.content),
                metadatas: params.documents.map(() => ({
                    repoId: params.repoId
                }))
            }
        );
    }

    async query(
        embedding: number[],
        repoId: string,
        topK = 5
    ): Promise<string[]> {

        await this.ensureCollection();

        const response = await axios.post<any>(
            `${this.baseUrl}/collections/${this.collectionId}/query`,
            {
                query_embeddings: [embedding],
                n_results: topK,
                where: { repoId }
            }
        );

        return response.data?.documents?.[0] ?? [];
    }

    async deleteByRepo(repoId: string): Promise<void> {

        await this.ensureCollection();

        await axios.post(
            `${this.baseUrl}/collections/${this.collectionId}/delete`,
            {
                where: { repoId }
            }
        );
    }
}

export const vectorService = new VectorService();
