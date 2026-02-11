import type { ReactNode } from "react";
import { useRepo } from "../../features/repo/RepoContext";
import { useChat } from "../../hooks/useChat";
import { ChatMessageBubble } from "../../components/chat/ChatMessageBubble";
import { ChatInput } from "../../components/chat/ChatInput";

const ChatPage = (): ReactNode => {
    const { selectedRepoId } = useRepo();

    const { messages, sendMessage, isStreaming } =
        useChat(selectedRepoId);

    if (!selectedRepoId) {
        return (
            <div className="flex items-center justify-center h-full text-gray-500">
                Select a repository to start chatting.
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((message) => (
                    <ChatMessageBubble
                        key={message.id}
                        {...message}
                    />
                ))}
            </div>

            {/* Input */}
            <ChatInput
                onSend={sendMessage}
                disabled={isStreaming}
            />

        </div>
    );
};

export default ChatPage;
