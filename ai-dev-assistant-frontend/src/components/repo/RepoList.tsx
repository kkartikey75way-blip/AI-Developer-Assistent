import { useEffect, useState } from "react";
import { getRepos, type Repo } from "../../services/repo.service";
import { StatusBadge } from "./StatusBadge";
import { useRepo } from "../../features/repo/RepoContext";
import type { ReactNode } from "react";

export const RepoList = (): ReactNode => {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const { selectedRepoId, setSelectedRepoId } = useRepo();

    useEffect(() => {
        const loadRepos = async (): Promise<void> => {
            try {
                const data = await getRepos();
                setRepos(data);
            } finally {
                setLoading(false);
            }
        };

        loadRepos();
    }, []);

    if (loading) {
        return (
            <div className="mt-4 text-gray-500 text-sm">
                Loading repositories...
            </div>
        );
    }

    if (repos.length === 0) {
        return (
            <div className="mt-6 text-gray-500 text-sm">
                No repositories found. Add one to get started.
            </div>
        );
    }

    return (
        <div className="mt-6 space-y-3">
            {repos.map((repo) => {
                const isActive = repo._id === selectedRepoId;

                return (
                    <div
                        key={repo._id}
                        onClick={() => setSelectedRepoId(repo._id)}
                        className={`p-4 border rounded-lg bg-white cursor-pointer transition ${isActive
                                ? "border-black"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                    >
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-sm">
                                {repo.name}
                            </span>

                            <StatusBadge status={repo.status} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
