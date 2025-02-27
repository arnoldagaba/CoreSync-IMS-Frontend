import { lazy, Suspense } from "react";
import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import ProtectedRoute from "@/routes/ProtectedRoute";
import PublicOnlyRoute from "@/routes/PublicOnlyRoute";
import NotFound from "@/pages/NotFound";
import PageLoader from "@/components/PageLoader";
import MainLayout from "@/components/layout/Mainlayout";
import ErrorFallback from "@/components/ErrorFallback";

// Lazy load auth pages for better performance
const Login = lazy(() => import("@/pages/Auth/Login"));
const Register = lazy(() => import("@/pages/Auth/Register"));
const ForgotPassword = lazy(() => import("@/pages/Auth/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/Auth/ResetPassword"));
const ChangePassword = lazy(() => import("@/pages/Auth/ChangePassword"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));

const AppRoutes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* Public only routes */}
        <Route element={<PublicOnlyRoute />}>
          <Route
            path="/login"
            element={
              <Suspense fallback={<PageLoader />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<PageLoader />}>
                <Register />
              </Suspense>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <Suspense fallback={<PageLoader />}>
                <ForgotPassword />
              </Suspense>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <Suspense fallback={<PageLoader />}>
                <ResetPassword />
              </Suspense>
            }
          />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/change-password"
            element={
              <Suspense fallback={<PageLoader />}>
                <ChangePassword />
              </Suspense>
            }
          />

          {/* Page routes */}
          <Route element={<MainLayout />}>
            <Route
              path="/dashboard"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Dashboard />
                </Suspense>
              }
            />
          </Route>
        </Route>

        {/* Redirect root to dashboard or login */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />
      </Route>,
    ),
  );

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default AppRoutes;
