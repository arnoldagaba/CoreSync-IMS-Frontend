import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
} from "axios";

// Base URL for the API
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Create Axios instance with default configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Get token from localStorage
    const token = localStorage.getItem("auth_token");

    // If token exists, add it to the headers
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  },
);

// Response interceptor for handling token expiration
apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error: AxiosError): Promise<AxiosResponse> => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle unauthorized errors (401)
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Mark request as retried to prevent infinite loops
      originalRequest._retry = true;

      // Clear auth data
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");

      // Dispatch logout event to notify the application
      window.dispatchEvent(new Event("auth_logout"));

      // Redirect to login page
      window.location.href = "/login";

      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
