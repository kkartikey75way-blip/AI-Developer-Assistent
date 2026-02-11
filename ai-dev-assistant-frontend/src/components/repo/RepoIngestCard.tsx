import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ingestRepo, getJobStatus } from "../../services/repo.service";
import { StatusBadge } from "./StatusBadge";


interface FormData {
    repoUrl: string;
}

type JobStatus = "waiting" | "active" | "completed" | "failed" | null;

export const RepoIngestCard = (): React.ReactNode => {
    const { register, handleSubmit, reset } = useForm<FormData>();
    const [jobId, setJobId] = useState<string | null>(null);
    const [status, setStatus] = useState<JobStatus>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = async (data: FormData): Promise<void> => {
        setLoading(true);
        const response = await ingestRepo(data.repoUrl);
        setJobId(response.jobId);
        setStatus("waiting");
        setLoading(false);
        reset();
    };

    // Poll job status
    useEffect(() => {
        if (!jobId) return;

        const interval = setInterval(async () => {
            const res = await getJobStatus(jobId);
            setStatus(res.status);

            if (res.status === "completed" || res.status === "failed") {
                clearInterval(interval);
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [jobId]);

    return (
        <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-xl">
            <h2 className="text-lg font-semibold mb-4">
                Add GitHub Repository
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3">
                <input
                    {...register("repoUrl", { required: true })}
                    type="text"
                    placeholder="https://github.com/user/repo"
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
                >
                    {loading ? "Adding..." : "Ingest"}
                </button>
            </form>

            {status && (
                <div className="mt-4">
                    <StatusBadge status={status} />
                </div>
            )}
        </div>
    );
};
