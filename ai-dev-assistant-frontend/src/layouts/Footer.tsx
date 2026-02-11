import type { ReactNode } from "react";

export const Footer = (): ReactNode => {
    return (
        <footer className="h-12 bg-white border-t border-gray-200 flex items-center justify-center text-xs text-gray-500">
            © {new Date().getFullYear()} AI Dev Assistant. Built with AI & TypeScript.
        </footer>
    );
};
