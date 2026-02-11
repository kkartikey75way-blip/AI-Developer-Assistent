import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { walkFiles } from "../utils/fileWalker";
import { detectLanguage } from "../utils/language";
import { RepoRepository } from "../repositories/repo.repo";
import { DocumentModel } from "../models/document.model";
import { vectorService } from "./vector.service";
import { chunkText } from "../utils/chunker";

class RepoIngestService {
    async ingestRepo(
        userId: string,
        repoUrl: string
    ): Promise<void> {

        console.log("Starting ingestion...");

        const repoName =
            repoUrl.split("/").pop()?.replace(".git", "") ?? "repo";

        const tempId = crypto.randomUUID();
        const localPath = path.join("/tmp", `${repoName}-${tempId}`);

        let repo;

        try {

            execSync(`git clone ${repoUrl} ${localPath}`, {
                stdio: "ignore"
            });

            console.log("Repo cloned");

            repo = await RepoRepository.create({
                userId,
                name: repoName,
                url: repoUrl,
                defaultBranch: "main"
            });

            await RepoRepository.updateStatus(
                repo._id.toString(),
                "active"
            );

            console.log("Repo status set to active");

            const files = walkFiles(localPath);

            const vectorDocs: { id: string; content: string }[] = [];

            for (const file of files) {

                const language = detectLanguage(file);
                if (language === "unknown") continue;

                const stat = fs.statSync(file);
                if (stat.size > 200_000) continue;

                const content = fs.readFileSync(file, "utf-8");

                const doc = await DocumentModel.create({
                    repoId: repo._id.toString(),
                    path: file.replace(localPath, ""),
                    content,
                    language
                });

                const chunks = chunkText(content);

                chunks.forEach((chunk, index) => {
                    vectorDocs.push({
                        id: `${doc._id.toString()}_${index}`,
                        content: chunk
                    });
                });
            }

            console.log(`Total chunks created: ${vectorDocs.length}`);

            if (vectorDocs.length > 0) {
                await vectorService.upsert({
                    repoId: repo._id.toString(),
                    documents: vectorDocs
                });

                console.log("Vectors stored in Chroma");
            }


            await RepoRepository.updateStatus(
                repo._id.toString(),
                "completed"
            );

            console.log("Ingestion completed successfully");

        } catch (error) {

            console.error("Ingestion failed:", error);

            if (repo) {
                await RepoRepository.updateStatus(
                    repo._id.toString(),
                    "failed"
                );
            }

            throw error;
        } finally {

            if (fs.existsSync(localPath)) {
                fs.rmSync(localPath, {
                    recursive: true,
                    force: true
                });
            }
        }
    }
}

export const repoIngestService = new RepoIngestService();
