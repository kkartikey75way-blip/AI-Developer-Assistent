import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense, type ReactNode } from "react";
import { AuthLayout } from "../layouts/AuthLayout";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Loader } from "../components/ui/Loader";
import { useAuth } from "../features/auth/useAuth";


const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const DashboardPage = lazy(
    () => import("../pages/dashboard/DashboardPage")
);

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({
    children
}: ProtectedRouteProps): ReactNode => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export const router = createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            {
                path: "/login",
                element: (
                    <Suspense fallback={<Loader />}>
                        <LoginPage />
                    </Suspense>
                )
            }
        ]
    },
    {
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "/",
                element: (
                    <Suspense fallback={<Loader />}>
                        <DashboardPage />
                    </Suspense>
                )
            }
        ]
    }
]);
