import { NavLink, Outlet } from "react-router-dom";
import type { ReactNode } from "react";
import { Header } from "./Header";

export const DashboardLayout = (): ReactNode => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <div className="flex flex-1">

                {/* Sidebar */}
                <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:block">
                    <nav className="space-y-2 text-sm">

                        <NavLink
                            to="/dashboard"
                            end
                            className={({ isActive }) =>
                                `block px-3 py-2 rounded-lg transition ${isActive
                                    ? "bg-black text-white"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`
                            }
                        >
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/dashboard/repos"
                            className={({ isActive }) =>
                                `block px-3 py-2 rounded-lg transition ${isActive
                                    ? "bg-black text-white"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`
                            }
                        >
                            Repositories
                        </NavLink>

                        <NavLink
                            to="/dashboard/chat"
                            className={({ isActive }) =>
                                `block px-3 py-2 rounded-lg transition ${isActive
                                    ? "bg-black text-white"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`
                            }
                        >
                            Chat
                        </NavLink>

                        <NavLink
                            to="/dashboard/settings"
                            className={({ isActive }) =>
                                `block px-3 py-2 rounded-lg transition ${isActive
                                    ? "bg-black text-white"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`
                            }
                        >
                            Settings
                        </NavLink>

                    </nav>
                </aside>

                {/* Main */}
                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>

            </div>
        </div>
    );
};
