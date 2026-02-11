import { apiClient } from "./apiClient";

export interface IngestResponse {
    queued: boolean;
    jobId: string;
}

export interface JobStatusResponse {
    status: "waiting" | "active" | "completed" | "failed";
}

export const ingestRepo = async (
    repoUrl: string
): Promise<IngestResponse> => {
    const response = await apiClient.post<IngestResponse>(
        "/repo/ingest",
        { repoUrl }
    );
    return response.data;
};

export const getJobStatus = async (
    jobId: string
): Promise<JobStatusResponse> => {
    const response = await apiClient.get<JobStatusResponse>(
        `/jobs/${jobId}`
    );
    return response.data;
};

export interface Repo {
    _id: string;
    name: string;
    url: string;
    status: "waiting" | "active" | "completed" | "failed";
}

export const getRepos = async (): Promise<Repo[]> => {
    const response = await apiClient.get<Repo[]>("/repo");
    return response.data;
};
