import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const chatSchema = z.object({
    message: z.string().min(1, "Message required")
});

type ChatFormData = z.infer<typeof chatSchema>;

export const ChatInput = ({
    onSend,
    disabled
}: {
    onSend: (message: string) => void;
    disabled: boolean;
}): ReactNode => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ChatFormData>({
        resolver: zodResolver(chatSchema)
    });

    const submit = (data: ChatFormData) => {
        onSend(data.message);
        reset();
    };

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="flex gap-2"
        >
            <input
                {...register("message")}
                className="flex-1 border rounded px-3 py-2"
                placeholder="Ask about the repo..."
            />
            <button
                type="submit"
                disabled={disabled}
                className="bg-black text-white px-4 rounded"
            >
                Send
            </button>
            {errors.message && (
                <p className="text-red-500 text-xs">
                    {errors.message.message}
                </p>
            )}
        </form>
    );
};
