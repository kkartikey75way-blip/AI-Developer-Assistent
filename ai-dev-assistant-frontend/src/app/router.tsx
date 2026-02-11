import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense, type ReactNode } from "react";
import { AuthLayout } from "../layouts/AuthLayout";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Loader } from "../components/ui/Loader";
import { useAuth } from "../features/auth/AuthContext";

const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const SignupPage = lazy(() => import("../pages/auth/SignupPage"));
const DashboardPage = lazy(() => import("../pages/dashboard/DashboardPage"));
const OAuthSuccessPage = lazy(() => import("../pages/auth/OAuthSuccessPage"));
const HomePage = lazy(() => import("../pages/home/HomePage"));
const ReposPage = lazy(() => import("../pages/dashboard/ReposPage"));
const ChatPage = lazy(() => import("../pages/dashboard/ChatPage"));
const SettingsPage = lazy(() => import("../pages/dashboard/SettingsPage"));

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({
    children
}: ProtectedRouteProps): ReactNode => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <Loader />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};


export const router = createBrowserRouter([
    //  Public Home
    {
        path: "/",
        element: (
            <Suspense fallback={<Loader />}>
                <HomePage />
            </Suspense>
        )
    },

    //  Auth Routes
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
            },
            {
                path: "/signup",
                element: (
                    <Suspense fallback={<Loader />}>
                        <SignupPage />
                    </Suspense>
                )
            },
            {
                path: "/oauth-success",
                element: (
                    <Suspense fallback={<Loader />}>
                        <OAuthSuccessPage />
                    </Suspense>
                )
            }
        ]
    },

    //  Protected Dashboard
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <DashboardPage />
            },
            {
                path: "repos",
                element: <ReposPage />
            },
            {
                path: "chat",
                element: <ChatPage />
            },
            {
                path: "settings",
                element: <SettingsPage />
            }
        ]
    }
    ,

    // Fallback
    {
        path: "*",
        element: <Navigate to="/" replace />
    }
]);
