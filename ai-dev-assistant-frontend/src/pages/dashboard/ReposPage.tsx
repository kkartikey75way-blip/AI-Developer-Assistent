import type { ReactNode } from "react";
import { RepoIngestCard } from "../../components/repo/RepoIngestCard";
import { RepoList } from "../../components/repo/RepoList";

const ReposPage = (): ReactNode => {
    return (
        <div className="max-w-4xl mx-auto">

            <h2 className="text-xl font-semibold mb-6">
                Your Repositories
            </h2>

            <RepoIngestCard />

            <RepoList />

        </div>
    );
};

export default ReposPage;
