import type { ReactNode } from "react";
import { useRepo } from "../../features/repo/RepoContext";
import { useChat } from "../../hooks/useChat";
import { ChatMessageBubble } from "../../components/chat/ChatMessageBubble";
import { ChatInput } from "../../components/chat/ChatInput";
import { RepoIngestCard } from "../../components/repo/RepoIngestCard";
import { RepoList } from "../../components/repo/RepoList";

const DashboardPage = (): ReactNode => {
    const { selectedRepoId } = useRepo();

    const { messages, sendMessage, isStreaming } =
        useChat(selectedRepoId);

    return (
        <div className="flex flex-col h-full p-4 max-w-5xl mx-auto">

            {/* Repo Ingest */}
            <div className="mb-6">
                <RepoIngestCard />
            </div>

            {/* Repo List */}
            <RepoList />

            {/* Divider */}
            <div className="my-6 border-t" />

            {/* If no repo selected */}
            {!selectedRepoId && (
                <div className="text-center text-gray-500">
                    Select a repository to start chatting.
                </div>
            )}

            {/* Chat Section */}
            {selectedRepoId && (
                <>
                    <div className="flex-1 overflow-y-auto flex flex-col gap-3 mb-4">
                        {messages.map((m) => (
                            <ChatMessageBubble key={m.id} {...m} />
                        ))}
                    </div>

                    <ChatInput
                        onSend={sendMessage}
                        disabled={isStreaming}
                    />
                </>
            )}
        </div>
    );
};

export default DashboardPage;
