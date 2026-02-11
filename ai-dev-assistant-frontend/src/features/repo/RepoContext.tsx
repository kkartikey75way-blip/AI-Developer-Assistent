import {
    createContext,
    useContext,
    useState,
    type ReactNode
} from "react";

interface RepoContextType {
    selectedRepoId: string | null;
    setSelectedRepoId: (repoId: string | null) => void;
}

const RepoContext = createContext<RepoContextType | null>(
    null
);

interface RepoProviderProps {
    children: ReactNode;
}

export const RepoProvider = ({
    children
}: RepoProviderProps): ReactNode => {
    const [selectedRepoId, setSelectedRepoId] =
        useState<string | null>(null);

    return (
        <RepoContext.Provider
            value={{ selectedRepoId, setSelectedRepoId }}
        >
            {children}
        </RepoContext.Provider>
    );
};

export const useRepo = (): RepoContextType => {
    const context = useContext(RepoContext);

    if (!context) {
        throw new Error(
            "useRepo must be used within RepoProvider"
        );
    }

    return context;
};
