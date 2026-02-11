import type { ReactNode } from "react";
import { useAuth } from "../../features/auth/AuthContext";

const SettingsPage = (): ReactNode => {
    const { logout } = useAuth();

    return (
        <div className="max-w-3xl mx-auto">

            <h2 className="text-xl font-semibold mb-6">
                Settings
            </h2>

            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">

                <div>
                    <h3 className="font-medium mb-2">
                        Account
                    </h3>
                    <button
                        onClick={logout}
                        className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition"
                    >
                        Logout
                    </button>
                </div>

            </div>

        </div>
    );
};

export default SettingsPage;
