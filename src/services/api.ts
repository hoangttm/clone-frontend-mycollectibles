import axios from "axios";

// In development, use empty baseURL to go through Vite proxy
// In production, use the full API URL
const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Required for cookies with cross-origin requests
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear tokens on 401
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // Don't redirect if:
      // 1. Already on login/signup pages
      // 2. The request was to /api/auth/me (session check - expected to fail when not logged in)
      const isAuthPage = ["/login", "/signup", "/forgot-password"].some((path) =>
        window.location.pathname.startsWith(path)
      );
      const isSessionCheck = error.config?.url?.includes("/api/auth/me");

      if (!isAuthPage && !isSessionCheck) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

// Health check
export const healthCheck = async () => {
  const response = await api.get("/api/health");
  return response.data;
};

export default api;
