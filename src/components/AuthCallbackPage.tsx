import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { handleSocialLoginCallback } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processCallback = async () => {
      const errorParam = searchParams.get("error");

      if (errorParam) {
        setError(errorParam);
        setTimeout(() => navigate("/login?error=" + errorParam), 3000);
        return;
      }

      // Check if we have a token in URL (legacy flow)
      const token = searchParams.get("token");
      if (token) {
        try {
          await handleSocialLoginCallback(token);
          navigate("/", { state: { showLoginToast: true } });
          return;
        } catch {
          setError("Failed to complete login");
          setTimeout(() => navigate("/login"), 3000);
          return;
        }
      }

      // Cookie-based flow: session cookie is set by backend
      // Fetch user info to verify authentication and update context
      try {
        const response = await authService.me();
        if (response?.user) {
          // Update auth context with user data
          await handleSocialLoginCallback(""); // Empty token, will fetch from /me
          navigate("/", { state: { showLoginToast: true } });
        } else {
          setError("Authentication failed");
          setTimeout(() => navigate("/login"), 3000);
        }
      } catch {
        setError("Failed to verify authentication");
        setTimeout(() => navigate("/login"), 3000);
      }
    };

    processCallback();
  }, [searchParams, handleSocialLoginCallback, navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-red-600 mb-2">{error}</p>
          <p className="text-gray-500">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <svg
          className="animate-spin h-8 w-8 mx-auto mb-4 text-brand"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <p className="text-gray-600">Completing login...</p>
      </div>
    </div>
  );
};

export default AuthCallbackPage;
