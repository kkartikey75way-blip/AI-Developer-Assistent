import type { ReactNode } from "react";

interface ErrorMessageProps {
    text: string;
}

export const ErrorMessage = ({
    text
}: ErrorMessageProps): ReactNode => {
    return <p className="mt-1 text-sm text-red-600">{text}</p>;
};
