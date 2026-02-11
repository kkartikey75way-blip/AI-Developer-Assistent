import { z } from "zod";

export const ingestRepoSchema = z.object({
    body: z.object({
        repoUrl: z.string().url("Invalid repository URL")
    })
});

export const jobStatusSchema = z.object({
    params: z.object({
        jobId: z.string().min(1, "Job ID is required")
    })
});

export type IngestRepoInput = z.infer<typeof ingestRepoSchema>["body"];
export type JobStatusInput = z.infer<typeof jobStatusSchema>["params"];
