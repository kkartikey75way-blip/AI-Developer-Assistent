import type { ReactNode } from "react";

interface BadgeProps {
    status: "waiting" | "active" | "completed" | "failed";
}

export const StatusBadge = ({
    status
}: BadgeProps): ReactNode => {
    const base =
        "px-3 py-1 rounded-full text-xs font-medium inline-block";

    const colorMap: Record<
        BadgeProps["status"],
        string
    > = {
        waiting: "bg-gray-200 text-gray-700",
        active: "bg-yellow-200 text-yellow-800",
        completed: "bg-green-200 text-green-800",
        failed: "bg-red-200 text-red-800"
    };

    return (
        <span className={`${base} ${colorMap[status]}`}>
            {status.toUpperCase()}
        </span>
    );
};
