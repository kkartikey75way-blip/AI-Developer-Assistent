import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { walkFiles } from "../utils/fileWalker";
import { detectLanguage } from "../utils/language";
import { RepoRepository } from "../repositories/repo.repo";
import { DocumentModel } from "../models/document.model";
import { VectorService } from "./vector.service";
import { chunkText } from "../utils/chunker";

class RepoIngestService {
    async ingestRepo(
        userId: string,
        repoUrl: string
    ): Promise<void> {
        const repoName =
            repoUrl.split("/").pop()?.replace(".git", "") ?? "repo";

        const tempId = crypto.randomUUID();
        const localPath = path.join("/tmp", `${repoName}-${tempId}`);

        execSync(`git clone ${repoUrl} ${localPath}`, {
            stdio: "ignore"
        });

        const repo = await RepoRepository.create({
            userId,
            name: repoName,
            url: repoUrl,
            defaultBranch: "main"
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
            await VectorService.upsert({
                repoId: repo._id.toString(),
                documents: vectorDocs
            });
        }

        fs.rmSync(localPath, { recursive: true, force: true });
    }
}

export const repoIngestService = new RepoIngestService();
