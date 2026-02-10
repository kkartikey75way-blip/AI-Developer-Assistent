import type { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    loading?: boolean;
}

export const Button = ({
    children,
    onClick,
    type = "button",
    disabled = false,
    loading = false
}: ButtonProps): ReactNode => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`w-full flex items-center justify-center rounded px-4 py-2 text-sm font-medium transition
        ${disabled || loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
        >
            {loading ? "Loading..." : children}
        </button>
    );
};
