import { createContext, useEffect, useState, ReactNode } from "react";
import apiClient from "@/lib/apiClient";
import {
  AuthContextType,
  AuthResponse,
  AuthState,
  ChangePasswordData,
  LoginCredentials,
  MessageResponse,
  PasswordResetData,
  PasswordResetRequestData,
  RegistrationData,
  User,
  ApiError,
} from "@/types/auth";

// Create initial auth state
const initialAuthState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Create the Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider props interface
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  // Initialize auth state
  const [authState, setAuthState] = useState<AuthState>(() => {
    // Try to get auth data from localStorage
    const storedToken = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("auth_user");

    if (storedToken && storedUser) {
      try {
        const user = JSON.parse(storedUser) as User;
        
        return {
          ...initialAuthState,
          user,
          token: storedToken,
          isAuthenticated: true,
        };
      } catch (error) {
        // If JSON parsing fails, clear localStorage
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
        console.log(error);
      }
    }

    return initialAuthState;
  });

  // Update localStorage when auth state changes
  useEffect(() => {
    if (authState.token && authState.user) {
      localStorage.setItem("auth_token", authState.token);
      localStorage.setItem("auth_user", JSON.stringify(authState.user));
    } else {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    }
  }, [authState.token, authState.user]);

  // Listen for logout events from other tabs/windows
  useEffect(() => {
    const handleLogout = () => {
      setAuthState(initialAuthState);
    };

    window.addEventListener("auth_logout", handleLogout);

    return () => {
      window.removeEventListener("auth_logout", handleLogout);
    };
  }, []);

  // Login handler
  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      const response = await apiClient.post<AuthResponse>(
        "/auth/login",
        credentials,
      );

      setAuthState({
        user: response.data.user,
        token: response.data.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const apiError = error as ApiError;

      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: apiError.message || "Failed to login. Please try again.",
      }));

      throw error;
    }
  };

  // Register handler
  const register = async (data: RegistrationData): Promise<void> => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      const response = await apiClient.post<AuthResponse>(
        "/auth/register",
        data,
      );

      setAuthState({
        user: response.data.user,
        token: response.data.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const apiError = error as ApiError;
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: apiError.message || "Failed to register. Please try again.",
      }));
      throw error;
    }
  };

  // Logout handler
  const logout = (): void => {
    setAuthState(initialAuthState);
    // Dispatch logout event to notify other tabs/windows
    window.dispatchEvent(new Event("auth_logout"));
  };

  // Request password reset handler
  const requestPasswordReset = async (
    data: PasswordResetRequestData,
  ): Promise<void> => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      await apiClient.post<MessageResponse>(
        "/auth/request-password-reset",
        data,
      );

      setAuthState((prev) => ({ ...prev, isLoading: false }));
    } catch (error) {
      const apiError = error as ApiError;
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error:
          apiError.message ||
          "Failed to request password reset. Please try again.",
      }));
      throw error;
    }
  };

  // Reset password handler
  const resetPassword = async (data: PasswordResetData): Promise<void> => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      await apiClient.post<MessageResponse>("/auth/reset-password", data);

      setAuthState((prev) => ({ ...prev, isLoading: false }));
    } catch (error) {
      const apiError = error as ApiError;
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error:
          apiError.message || "Failed to reset password. Please try again.",
      }));
      throw error;
    }
  };

  // Change password handler
  const changePassword = async (data: ChangePasswordData): Promise<void> => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      await apiClient.post<MessageResponse>("/auth/change-password", data);

      setAuthState((prev) => ({ ...prev, isLoading: false }));
    } catch (error) {
      const apiError = error as ApiError;
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error:
          apiError.message || "Failed to change password. Please try again.",
      }));
      throw error;
    }
  };

  // Clear error handler
  const clearError = (): void => {
    setAuthState((prev) => ({ ...prev, error: null }));
  };

  // Compile all auth context values
  const authContextValue: AuthContextType = {
    ...authState,
    login,
    register,
    logout,
    requestPasswordReset,
    resetPassword,
    changePassword,
    clearError,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
