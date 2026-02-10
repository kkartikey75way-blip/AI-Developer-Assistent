import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";

export const DashboardLayout = (): ReactNode => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="h-14 border-b flex items-center px-4">
                <h1 className="font-semibold">AI Dev Assistant</h1>
            </header>

            <main className="flex-1 p-4">
                <Outlet />
            </main>
        </div>
    );
};
