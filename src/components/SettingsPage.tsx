import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services";
import { BellIcon, ChevronRightIcon } from "./Icons";
import Toast from "./Toast";

// Eye Icons
const EyeIcon = ({ className = "" }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="12"
      r="3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EyeOffIcon = ({ className = "" }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06M9.9 4.24C10.5883 4.0789 11.2931 3.99836 12 4C19 4 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.572 9.14351 13.1984C8.99262 12.8249 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2219 9.18488 10.8539C9.34884 10.4859 9.58525 10.1547 9.88 9.88"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1 1L23 23"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Check Circle Icon for password validation
const CheckCircleIcon = ({ checked }: { checked: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={checked ? "text-green-500" : "text-gray-300"}
  >
    <circle
      cx="8"
      cy="8"
      r="7"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    {checked && (
      <path
        d="M5 8L7 10L11 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )}
  </svg>
);

// Password Check Item Component
const PasswordCheckItem = ({
  checked,
  text,
}: {
  checked: boolean;
  text: string;
}) => (
  <div className="flex items-center gap-2">
    <CheckCircleIcon checked={checked} />
    <span className={`text-xs ${checked ? "text-gray-700" : "text-gray-400"}`}>
      {text}
    </span>
  </div>
);

type SettingsSection = "notifications" | "reset-password";
type ResetPasswordStep = "email" | "otp" | "password";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

interface NotificationCategory {
  id: string;
  title: string;
  settings: NotificationSetting[];
}

const initialNotificationSettings: NotificationCategory[] = [
  {
    id: "price-market",
    title: "Price & Market Alerts",
    settings: [
      {
        id: "pod-watchlist",
        title: "Pod & Watchlist",
        description: "Get notified when cards in your watchlist are updated.",
        enabled: true,
      },
      {
        id: "price-changes",
        title: "Price changes",
        description: "Get alerts when a card's price goes up or down.",
        enabled: true,
      },
    ],
  },
  {
    id: "marketplace",
    title: "Marketplace & Trading",
    settings: [
      {
        id: "offers-bids",
        title: "Offers & bids",
        description:
          "Get notified when you receive an offer or bid on your cards.",
        enabled: true,
      },
      {
        id: "card-sold",
        title: "Card sold",
        description: "Receive a notification when your card is sold.",
        enabled: true,
      },
      {
        id: "listing-status",
        title: "Listing status",
        description: "Get updates when your listings are approved or rejected.",
        enabled: true,
      },
    ],
  },
  {
    id: "account-security",
    title: "Account & Security",
    settings: [
      {
        id: "login-alerts",
        title: "Login alerts",
        description:
          "Get notified when your account is accessed from a new device.",
        enabled: true,
      },
      {
        id: "verification-updates",
        title: "Verification updates",
        description: "Receive alerts when your eKYC status is updated.",
        enabled: true,
      },
      {
        id: "security-changes",
        title: "Security changes",
        description: "Be notified of important account-related changes.",
        enabled: true,
      },
    ],
  },
];

// Toggle Switch Component
const Toggle = ({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: () => void;
}) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative inline-flex h-6 w-10 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${
      enabled ? "bg-brand" : "bg-gray-300"
    }`}
  >
    <span
      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out ${
        enabled ? "translate-x-[18px]" : "translate-x-0.5"
      } mt-0.5`}
    />
  </button>
);

// Settings Menu Item Component
const SettingsMenuItem = ({
  title,
  isActive,
  onClick,
  isBold = false,
}: {
  title: string;
  isActive: boolean;
  onClick: () => void;
  isBold?: boolean;
}) => (
  <button
    onClick={onClick}
    className="flex items-center justify-between w-full py-4 border-b border-gray-100"
  >
    <span
      className={`text-sm text-gray-900 ${isBold ? "font-bold" : "font-medium"}`}
    >
      {title}
    </span>
    <ChevronRightIcon
      size={24}
      className={isActive ? "text-brand" : "text-gray-400"}
    />
  </button>
);

// Notification Setting Item Component
const NotificationSettingItem = ({
  setting,
  onToggle,
  showDivider = true,
}: {
  setting: NotificationSetting;
  onToggle: () => void;
  showDivider?: boolean;
}) => (
  <div
    className={`flex items-center gap-2 py-2 ${showDivider ? "border-b border-gray-100" : ""}`}
  >
    <div className="shrink-0">
      <BellIcon size={24} className="text-gray-400" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-900">{setting.title}</p>
      <p className="text-xs text-gray-500">{setting.description}</p>
    </div>
    <div className="shrink-0">
      <Toggle enabled={setting.enabled} onChange={onToggle} />
    </div>
  </div>
);

// Notification Category Card Component
const NotificationCard = ({
  category,
  onToggle,
}: {
  category: NotificationCategory;
  onToggle: (settingId: string) => void;
}) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-6">
    <h3 className="text-base font-bold text-gray-800 mb-4">{category.title}</h3>
    <div className="flex flex-col">
      {category.settings.map((setting, index) => (
        <NotificationSettingItem
          key={setting.id}
          setting={setting}
          onToggle={() => onToggle(setting.id)}
          showDivider={index < category.settings.length - 1}
        />
      ))}
    </div>
  </div>
);

const SettingsPage = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("notifications");
  const [notificationSettings, setNotificationSettings] = useState(
    initialNotificationSettings
  );
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Reset password state
  const [resetPasswordStep, setResetPasswordStep] =
    useState<ResetPasswordStep>("email");
  const [resetEmail, setResetEmail] = useState(user?.email || "");
  const [isResetting, setIsResetting] = useState(false);
  const [resetError, setResetError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage] = useState("");

  // OTP state
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(0);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Password step state
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleToggleNotification = (
    categoryId: string,
    settingId: string
  ) => {
    setNotificationSettings((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              settings: category.settings.map((setting) =>
                setting.id === settingId
                  ? { ...setting, enabled: !setting.enabled }
                  : setting
              ),
            }
          : category
      )
    );
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate("/login");
    } catch {
      // Error handled silently
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError("");

    if (!resetEmail.trim()) {
      setResetError("Please enter your email address");
      return;
    }

    setIsResetting(true);
    try {
      const response = await authService.passwordResetStart({ email: resetEmail });
      setResetPasswordStep("otp");
      setCountdown(response.expiresIn || 180);
      setResetError("");
    } catch (err) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as {
          response?: { data?: { message?: string } };
        };
        setResetError(
          axiosError.response?.data?.message ||
            "Failed to send reset link. Please try again."
        );
      } else {
        setResetError("Failed to send reset link. Please try again.");
      }
    } finally {
      setIsResetting(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take last character
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    // Focus on the last filled input or the next empty one
    const focusIndex = Math.min(pastedData.length, 5);
    otpInputRefs.current[focusIndex]?.focus();
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;

    setResetError("");
    setIsResetting(true);

    try {
      const response = await authService.passwordResetStart({ email: resetEmail });
      setCountdown(response.expiresIn || 180);
      setOtp(["", "", "", "", "", ""]);
    } catch (err) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as {
          response?: { data?: { message?: string } };
        };
        setResetError(
          axiosError.response?.data?.message ||
            "Failed to resend OTP. Please try again."
        );
      } else {
        setResetError("Failed to resend OTP. Please try again.");
      }
    } finally {
      setIsResetting(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setResetError("Please enter the complete 6-digit code");
      return;
    }

    setResetError("");
    setIsResetting(true);

    try {
      const response = await authService.passwordResetVerify({
        email: resetEmail,
        otp: otpCode,
      });
      // Store reset token and move to password step
      setResetToken(response.resetToken);
      setResetPasswordStep("password");
      setOtp(["", "", "", "", "", ""]);
      setResetError("");
    } catch (err) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as {
          response?: { data?: { message?: string } };
        };
        setResetError(
          axiosError.response?.data?.message || "Invalid OTP. Please try again."
        );
      } else {
        setResetError("Invalid OTP. Please try again.");
      }
    } finally {
      setIsResetting(false);
    }
  };

  // Password validation checks
  const passwordChecks = {
    minLength: newPassword.length >= 8,
    hasUppercase: /[A-Z]/.test(newPassword),
    hasLowercase: /[a-z]/.test(newPassword),
    hasNumber: /[0-9]/.test(newPassword),
    hasSpecial: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`]/.test(newPassword),
  };

  const isPasswordValid = Object.values(passwordChecks).every(Boolean);
  const passwordsMatch = newPassword === confirmPassword && confirmPassword !== "";

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPasswordValid) {
      setResetError("Please ensure your password meets all requirements");
      return;
    }

    if (!passwordsMatch) {
      setResetError("Passwords do not match");
      return;
    }

    setResetError("");
    setIsResetting(true);

    try {
      await authService.passwordResetComplete({
        resetToken,
        password: newPassword,
      });
      // Clear all auth state and redirect to login
      localStorage.removeItem("accessToken");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
      navigate("/login", {
        state: {
          showToast: true,
          toastMessage: "All set! Log in to start collecting.",
        },
      });
    } catch (err) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as {
          response?: { data?: { message?: string } };
        };
        setResetError(
          axiosError.response?.data?.message || "Failed to reset password. Please try again."
        );
      } else {
        setResetError("Failed to reset password. Please try again.");
      }
    } finally {
      setIsResetting(false);
    }
  };

  const handleBackToOtp = () => {
    setResetPasswordStep("otp");
    setNewPassword("");
    setConfirmPassword("");
    setResetError("");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
        duration={3000}
      />

      <div className="flex gap-6 p-6">
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex bg-white rounded-2xl overflow-hidden">
          {/* Left Section - Settings Menu */}
          <div className="w-80 border-r border-gray-100 flex flex-col h-[calc(100vh-120px)]">
            <div className="flex-1 px-6 pt-6">
              <SettingsMenuItem
                title="Notification settings"
                isActive={activeSection === "notifications"}
                onClick={() => setActiveSection("notifications")}
                isBold={activeSection === "notifications"}
              />
              <SettingsMenuItem
                title="Reset password"
                isActive={activeSection === "reset-password"}
                onClick={() => setActiveSection("reset-password")}
                isBold={activeSection === "reset-password"}
              />
            </div>

            {/* Bottom Section */}
            <div className="px-6 pb-10">
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full py-2 px-6 border border-black/10 rounded-full text-gray-800 text-base font-normal hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {isLoggingOut ? "Logging out..." : "Log out"}
              </button>
              <p className="text-sm font-medium text-gray-900 text-center mt-4">
                Version 1.0.0
              </p>
            </div>
          </div>

          {/* Right Section - Notification Settings Panel */}
          {activeSection === "notifications" && (
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="max-w-3xl flex flex-col gap-4">
                {notificationSettings.map((category) => (
                  <NotificationCard
                    key={category.id}
                    category={category}
                    onToggle={(settingId) =>
                      handleToggleNotification(category.id, settingId)
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {/* Right Section - Reset Password Panel */}
          {activeSection === "reset-password" && (
            <div className="flex-1 flex items-center justify-center p-6">
              {resetPasswordStep === "password" ? (
                /* Password Step */
                <div className="w-[400px] border border-gray-200 rounded-2xl p-6">
                  <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    {/* Error Message */}
                    {resetError && (
                      <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                        {resetError}
                      </div>
                    )}

                    {/* Password Field */}
                    <div>
                      <label
                        htmlFor="new-password"
                        className="block text-sm font-medium text-gray-800 mb-1"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          id="new-password"
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Please enter"
                          className="w-full h-10 px-4 pr-12 border border-gray-200 rounded-full text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showNewPassword ? (
                            <EyeOffIcon className="w-5 h-5" />
                          ) : (
                            <EyeIcon className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                      <label
                        htmlFor="confirm-password"
                        className="block text-sm font-medium text-gray-800 mb-1"
                      >
                        Confirm password
                      </label>
                      <div className="relative">
                        <input
                          id="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Please enter"
                          className="w-full h-10 px-4 pr-12 border border-gray-200 rounded-full text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? (
                            <EyeOffIcon className="w-5 h-5" />
                          ) : (
                            <EyeIcon className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Password Checklist */}
                    <div className="flex flex-col gap-2">
                      <PasswordCheckItem
                        checked={passwordChecks.minLength}
                        text="At least 8 characters"
                      />
                      <PasswordCheckItem
                        checked={passwordChecks.hasUppercase}
                        text="At least 1 uppercase letter (A-Z)"
                      />
                      <PasswordCheckItem
                        checked={passwordChecks.hasLowercase}
                        text="At least 1 lowercase letter (a-z)"
                      />
                      <PasswordCheckItem
                        checked={passwordChecks.hasNumber}
                        text="At least 1 number (0-9)"
                      />
                      <PasswordCheckItem
                        checked={passwordChecks.hasSpecial}
                        text="At least 1 special character: !@#$%^&*()_+-=[]{};\:'&quot;|,.<>/?~`"
                      />
                    </div>

                    {/* Button Bar */}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleBackToOtp}
                        className="flex-1 h-10 border border-brand text-brand font-normal text-base rounded-full hover:bg-brand/5 focus:outline-none focus:ring-2 focus:ring-brand/30 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isResetting || !isPasswordValid || !passwordsMatch}
                        className="flex-1 h-10 bg-brand text-white font-normal text-base rounded-full hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {isResetting ? (
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
                          "Submit"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              ) : resetPasswordStep === "email" ? (
                /* Email Step */
                <div className="w-[400px] border border-gray-200 rounded-2xl p-6">
                  <p className="text-base font-medium text-gray-900 text-center mb-6">
                    Please enter your email to reset access to your collection
                  </p>

                  <form onSubmit={handleResetPasswordSubmit} className="space-y-6">
                    {/* Error Message */}
                    {resetError && (
                      <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                        {resetError}
                      </div>
                    )}

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="reset-email"
                        className="block text-sm font-medium text-gray-800 mb-1"
                      >
                        Email
                      </label>
                      <input
                        id="reset-email"
                        type="email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder="Please enter"
                        className="w-full h-10 px-4 border border-gray-200 rounded-full text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
                        autoComplete="email"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isResetting}
                      className="w-full h-10 bg-brand text-white font-normal text-base rounded-full hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isResetting ? (
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
                        "Continue"
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                /* OTP Step */
                <div className="w-[400px] border border-gray-200 rounded-2xl p-6">
                  <p className="text-base font-medium text-gray-900 text-center mb-6">
                    Please enter the code sent to {resetEmail}
                  </p>

                  <form onSubmit={handleVerifyOtp} className="space-y-6">
                    {/* Error Message */}
                    {resetError && (
                      <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                        {resetError}
                      </div>
                    )}

                    {/* OTP Input Fields */}
                    <div className="flex justify-center gap-2">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => {
                            otpInputRefs.current[index] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          onPaste={handleOtpPaste}
                          className="w-10 h-10 text-center text-sm font-bold text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
                        />
                      ))}
                    </div>

                    {/* Resend OTP */}
                    <div className="text-center">
                      <p className="text-xs font-medium text-gray-300">Resend OTP</p>
                      {countdown > 0 ? (
                        <p className="text-xs font-normal text-red-500">
                          {formatTime(countdown)}
                        </p>
                      ) : (
                        <button
                          type="button"
                          onClick={handleResendOtp}
                          disabled={isResetting}
                          className="text-xs font-medium text-brand hover:underline disabled:opacity-50"
                        >
                          Send again
                        </button>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isResetting || otp.join("").length !== 6}
                      className="w-full h-10 bg-brand text-white font-normal text-base rounded-full hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isResetting ? (
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
                        "Continue"
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
