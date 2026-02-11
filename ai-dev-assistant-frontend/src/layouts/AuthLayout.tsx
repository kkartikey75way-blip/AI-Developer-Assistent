import { Outlet } from "react-router-dom";
import type { ReactNode } from "react";

export const AuthLayout = (): ReactNode => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Outlet />
        </div>
    );
};
