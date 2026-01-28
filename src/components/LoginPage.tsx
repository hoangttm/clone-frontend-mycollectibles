import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { SocialProvider } from "../services";
import Toast from "./Toast";
import { EyeIcon, EyeOffIcon, GoogleIcon, AppleIcon } from "./Icons";
import sideBg from "../assets/side-bg.png";
import { authClient } from "../lib/auth-client";

// Helper to get initial toast state from location
const getInitialToastState = (locationState: unknown) => {
  const state = locationState as {
    showToast?: boolean;
    toastMessage?: string;
  } | null;
  if (state?.showToast && state?.toastMessage) {
    return { show: true, message: state.toastMessage };
  }
  return { show: false, message: "" };
};

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, refreshSession, isLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Initialize toast state from location state
  const initialToastState = getInitialToastState(location.state);
  const [showToast, setShowToast] = useState(initialToastState.show);
  const [toastMessage] = useState(initialToastState.message);

  // Check for OAuth callback and refresh session
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("oauth")) {
      // Clean up URL
      window.history.replaceState({}, "", window.location.pathname);
      // Refresh session to get user data from /api/auth/me
      refreshSession();
    }
  }, [refreshSession]);

  // Redirect to home if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  // Clear the navigation state to prevent toast showing again on refresh
  useEffect(() => {
    if (initialToastState.show) {
      window.history.replaceState({}, document.title);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleToastClose = useCallback(() => {
    setShowToast(false);
  }, []);

  const [isSocialLoading, setIsSocialLoading] = useState(false);

  const handleSocialLogin = async (provider: SocialProvider) => {
    setError("");
    setIsSocialLoading(true);

    try {
      await authClient.signIn.social({
        provider,
        callbackURL: `${window.location.origin}/`,
      });
    } catch {
      setError("Social login failed. Please try again.");
      setIsSocialLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password);
      navigate("/", { state: { showLoginToast: true } });
    } catch (err) {
      // Handle API error
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as {
          response?: { data?: { message?: string } };
        };
        setError(
          axiosError.response?.data?.message ||
            "Login failed. Please try again.",
        );
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        show={showToast}
        onClose={handleToastClose}
        duration={3000}
      />

      <div className="min-h-screen flex bg-white">
        {/* Left Side - Image */}
        <div className="hidden lg:flex lg:w-[65%] relative bg-[#d1e7f4]">
          <img
            src={sideBg}
            alt="App preview"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Gradient overlays for fade effect */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(209, 231, 244, 0) 70%, rgb(209, 231, 244) 90%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to left, rgba(209, 231, 244, 0) 70%, rgb(209, 231, 244) 90%)",
            }}
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex flex-col min-h-screen bg-white  lg:-ml-6 relative z-10">
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:px-12">
            <div className="w-full max-w-sm">
              {/* Logo/Brand */}
              <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">
                My collectibles
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-800 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Please enter"
                    className="w-full h-10 px-4 border border-gray-200 rounded-full text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
                    autoComplete="email"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-800 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Please enter"
                      className="w-full h-10 px-4 pr-12 border border-gray-200 rounded-full text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOffIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot Password Link */}
                <div className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-brand hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-10 bg-brand text-white font-normal text-base rounded-full hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
                    </span>
                  ) : (
                    "Login"
                  )}
                </button>

                {/* Divider */}
                <div className="text-center">
                  <span className="text-sm font-medium text-gray-900">or</span>
                </div>

                {/* Social Login Options */}
                <div className="flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin("google")}
                    disabled={isSocialLoading || isLoading}
                    className="w-10 h-10 flex items-center justify-center border border-black/10 rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSocialLoading ? (
                      <svg
                        className="animate-spin h-5 w-5 text-gray-400"
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
                    ) : (
                      <GoogleIcon />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialLogin("apple")}
                    disabled={isSocialLoading || isLoading}
                    className="w-10 h-10 flex items-center justify-center border border-black/10 rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <AppleIcon />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sign Up Link - Fixed at bottom */}
          <div className="border-t border-gray-100 p-6">
            <p className="text-center text-base text-gray-900">
              New to My Collectibles?{" "}
              <Link
                to="/signup"
                className="font-bold text-brand hover:underline"
              >
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
