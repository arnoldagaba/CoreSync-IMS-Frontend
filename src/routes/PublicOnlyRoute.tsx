import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "@/hooks/useAuth";

interface PublicOnlyRouteProps {
    children: ReactNode;
}

// Component to restrict authenticated users from accessing public routes (like login)
const PublicOnlyRoute = ({ children }: PublicOnlyRouteProps) => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    // Get the redirect path from location state or default to dashboard
    const from = location.state?.from?.pathname || "/dashboard";

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    // Redirect to dashboard or intended route if already authenticated
    if (isAuthenticated) {
        return <Navigate to={from} replace />;
    }

    // If not authenticated, render the public content
    return <>{children}</>;
};

export default PublicOnlyRoute;
