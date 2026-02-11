import { exec } from "child_process";
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

        console.log("Starting ingestion");

        const repoName =
            repoUrl.split("/").pop()?.replace(".git", "") ?? "repo";

        const tempId = crypto.randomUUID();
        const localPath = path.join("/tmp", `${repoName}-${tempId}`);

        const repo = await RepoRepository.create({
            userId,
            name: repoName,
            url: repoUrl,
            defaultBranch: "main"
        });

        try {

            await RepoRepository.updateStatus(
                repo._id.toString(),
                "active"
            );

            await new Promise<void>((resolve, reject) => {
                exec(
                    `git clone ${repoUrl} ${localPath}`,
                    (error) => {
                        if (error) reject(error);
                        else resolve();
                    }
                );
            });

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

            if (vectorDocs.length > 0) {
                await vectorService.upsert({
                    repoId: repo._id.toString(),
                    documents: vectorDocs
                });
            }

            await RepoRepository.updateStatus(
                repo._id.toString(),
                "completed"
            );

            console.log("Ingestion completed");

        } catch (error) {

            console.error("Ingestion error:", error);

            await RepoRepository.updateStatus(
                repo._id.toString(),
                "failed"
            );
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
