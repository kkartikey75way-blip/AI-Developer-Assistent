import { useChat } from "../../hooks/useChat";
import { ChatMessageBubble } from "../../components/chat/ChatMessageBubble";
import { ChatInput } from "../../components/chat/ChatInput";
import type { ReactNode } from "react";

const DashboardPage = (): ReactNode => {
    const repoId = "REPLACE_WITH_SELECTED_REPO_ID";
    const { messages, sendMessage, isStreaming } = useChat(repoId);

    return (
        <div className="flex flex-col h-full p-4">
            <div className="flex-1 overflow-y-auto flex flex-col gap-3 mb-4">
                {messages.map((m) => (
                    <ChatMessageBubble key={m.id} {...m} />
                ))}
            </div>

            <ChatInput
                onSend={sendMessage}
                disabled={isStreaming}
            />
        </div>
    );
};

export default DashboardPage;
