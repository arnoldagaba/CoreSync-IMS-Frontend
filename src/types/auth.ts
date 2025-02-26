// User Roles type
export interface Role {
    id: number;
    name: string;
    description?: string;
}

// Department type
export interface Department {
    id: number;
    name: string;
    description?: string;
}

// User type
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: Role[];
    department?: Department;
    createdAt: string;
    updatedAt: string;
}

// Login request payload
export interface LoginCredentials {
    email: string;
    password: string;
}

// Registration request payload
export interface RegistrationData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    department?: string;
    roles: string[];
}

// Password reset request payload
export interface PasswordResetRequestData {
    email: string;
}

// Password reset completion payload
export interface PasswordResetData {
    email: string;
    token: string;
    newPassword: string;
}

// Change password payload
export interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
}

// Auth state interface
export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

// Auth context interface
export interface AuthContextType extends AuthState {
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (data: RegistrationData) => Promise<void>;
    logout: () => void;
    requestPasswordReset: (data: PasswordResetRequestData) => Promise<void>;
    resetPassword: (data: PasswordResetData) => Promise<void>;
    changePassword: (data: ChangePasswordData) => Promise<void>;
    clearError: () => void;
}

// API response interfaces
export interface AuthResponse {
    user: User;
    token: string;
}

export interface MessageResponse {
    message: string;
}

// API error response
export interface ApiError {
    message: string;
    error?: Error;
}
