import type { ChatMessage } from "../../types/chat";
import type { ReactNode } from "react";

export const ChatMessageBubble = ({
    role,
    content
}: ChatMessage): ReactNode => {
    const isUser = role === "user";

    return (
        <div
            className={`max-w-xl px-4 py-2 rounded-lg text-sm ${isUser
                    ? "bg-black text-white self-end"
                    : "bg-gray-100 text-gray-900 self-start"
                }`}
        >
            {content}
        </div>
    );
};
