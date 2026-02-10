import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";

export const AuthLayout = (): ReactNode => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
                <Outlet />
            </div>
        </div>
    );
};
