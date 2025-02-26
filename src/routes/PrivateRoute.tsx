import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import ClipLoader from "react-spinners/ClipLoader";

interface PrivateRouteProps {
  requiredRoles?: string[];
}

const PrivateRoute = ({ requiredRoles = [] }: PrivateRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Show loading indicator while checking auth state
  if (isLoading) {
    return (
      <ClipLoader loading={isLoading} size={150} aria-label="Loading Spinner" />
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If roles are required, check if user has at least one of the required roles
  if (requiredRoles.length > 0) {
    const userRoles = user?.roles.map((role) => role.name) || [];
    const hasRequiredRole = requiredRoles.some((role) =>
      userRoles.includes(role),
    );

    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // If everything is fine, render the Private route
  return <Outlet />;
};

export default PrivateRoute;
