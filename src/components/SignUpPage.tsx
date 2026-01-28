import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services";
import type { SocialProvider } from "../services";
import sideBg from "../assets/side-bg.png";

// Icons
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M19.8055 10.0415C19.8055 9.40083 19.7499 8.80083 19.6499 8.21667H10.2V11.585H15.6011C15.3766 12.7263 14.7055 13.689 13.7266 14.3473V16.5723H16.8888C18.7499 14.8306 19.8055 12.3806 19.8055 10.0415Z"
      fill="#4285F4"
    />
    <path
      d="M10.2 19.5C12.8866 19.5 15.1722 18.5723 16.8888 16.9806L13.7266 14.7556C12.8977 15.2973 11.8355 15.6306 10.2 15.6306C7.61333 15.6306 5.38889 13.8723 4.63889 11.4556H1.38889V13.7556C3.09445 17.1223 6.35556 19.5 10.2 19.5Z"
      fill="#34A853"
    />
    <path
      d="M4.63889 11.4556C4.44445 10.914 4.33333 10.3306 4.33333 9.73894C4.33333 9.1473 4.44445 8.56396 4.63889 8.0223V5.72229H1.38889C0.733333 6.89563 0.355556 8.26396 0.355556 9.73894C0.355556 11.2139 0.733333 12.5823 1.38889 13.7556L4.63889 11.4556Z"
      fill="#FBBC05"
    />
    <path
      d="M10.2 3.84728C11.9755 3.84728 13.5744 4.44728 14.8377 5.62728L16.9611 3.50395C15.1666 1.83895 12.8811 0.977951 10.2 0.977951C6.35556 0.977951 3.09445 3.35562 1.38889 6.72228L4.63889 9.02228C5.38889 6.60562 7.61333 3.84728 10.2 3.84728Z"
      fill="#EA4335"
    />
  </svg>
);

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M17.0469 15.5C16.6406 16.4531 16.1562 17.3281 15.5938 18.1406C14.8125 19.2656 14.1719 20.0625 13.6719 20.5312C12.8906 21.2812 12.0469 21.6562 11.1406 21.6875C10.4844 21.6875 9.6875 21.5 8.75 21.125C7.8125 20.75 6.95312 20.5625 6.17188 20.5625C5.35938 20.5625 4.46875 20.75 3.5 21.125C2.53125 21.5 1.75 21.6875 1.15625 21.6875C0.28125 21.7188 -0.59375 21.3438 -1.46875 20.5625C-2.0625 20.0625 -2.75 19.2188 -3.53125 18.0312C-4.34375 16.8125 -5.01562 15.375 -5.54688 13.7188C-6.10938 11.9375 -6.39062 10.2188 -6.39062 8.5625C-6.39062 6.65625 -5.98438 5.01562 -5.17188 3.64062C-4.54688 2.51562 -3.71875 1.64062 -2.6875 1.01562C-1.65625 0.390625 -0.546875 0.0625 0.640625 0.03125C1.32812 0.03125 2.23438 0.25 3.35938 0.6875C4.48438 1.125 5.21875 1.34375 5.5625 1.34375C5.8125 1.34375 6.625 1.09375 7.96875 0.59375C9.25 0.125 10.3281 -0.0625 11.2031 0.03125C13.6094 0.21875 15.3906 1.15625 16.5469 2.84375C14.3906 4.125 13.3125 5.96875 13.3438 8.375C13.375 10.2812 14.0312 11.8594 15.3125 13.1094C15.8906 13.6562 16.5312 14.0781 17.2344 14.3594C17.0312 14.7656 16.8281 15.1406 17.0469 15.5ZM11.3281 -4.5C11.3281 -3.03125 10.7969 -1.65625 9.73438 -0.375C8.45312 0.96875 6.92188 1.75 5.26562 1.625C5.23438 1.46875 5.21875 1.28125 5.21875 1.0625C5.21875 -0.34375 5.82812 -1.84375 6.92188 -3.09375C7.46875 -3.71875 8.15625 -4.25 8.98438 -4.6875C9.8125 -5.125 10.5938 -5.34375 11.3281 -5.4375C11.3594 -5.125 11.3281 -4.8125 11.3281 -4.5Z"
      transform="translate(6.39062 5.4375)"
      fill="black"
    />
  </svg>
);

// Icons
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

const CheckCircleIcon = ({
  checked,
  className = "",
}: {
  checked: boolean;
  className?: string;
}) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={className}
  >
    <circle
      cx="8"
      cy="8"
      r="7"
      stroke={checked ? "#00AB56" : "#999"}
      strokeWidth="1.5"
    />
    {checked && (
      <path
        d="M5 8L7 10L11 6"
        stroke="#00AB56"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )}
  </svg>
);

type Step = "email" | "otp" | "password";

interface PasswordValidation {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

const validatePassword = (password: string): PasswordValidation => ({
  minLength: password.length >= 8,
  hasUppercase: /[A-Z]/.test(password),
  hasLowercase: /[a-z]/.test(password),
  hasNumber: /[0-9]/.test(password),
  hasSpecialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`]/.test(password),
});

const isPasswordValid = (validation: PasswordValidation): boolean =>
  Object.values(validation).every(Boolean);

const SignUpPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [verificationToken, setVerificationToken] = useState("");
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const passwordValidation = validatePassword(password);

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

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await authService.registerStart({ email });
      setStep("otp");
      // Use expiresIn from API or default to 180 seconds
      setCountdown(response.expiresIn || 180);
    } catch (err) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as {
          response?: { data?: { message?: string } };
        };
        setError(
          axiosError.response?.data?.message ||
            "Failed to send OTP. Please try again.",
        );
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;

    setError("");
    setIsLoading(true);

    try {
      const response = await authService.registerStart({ email });
      setCountdown(response.expiresIn || 180);
      setOtp(["", "", "", "", "", ""]);
    } catch (err) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as {
          response?: { data?: { message?: string } };
        };
        setError(
          axiosError.response?.data?.message ||
            "Failed to resend OTP. Please try again.",
        );
      } else {
        setError("Failed to resend OTP. Please try again.");
      }
    } finally {
      setIsLoading(false);
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
    e: React.KeyboardEvent<HTMLInputElement>,
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

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await authService.registerVerify({
        email,
        otp: otpCode,
      });
      // Store the verification token for the complete step
      setVerificationToken(response.verificationToken);
      setStep("password");
      setError("");
    } catch (err) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as {
          response?: { data?: { message?: string } };
        };
        setError(
          axiosError.response?.data?.message ||
            "Invalid OTP. Please try again.",
        );
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }

    if (!isPasswordValid(passwordValidation)) {
      setError("Please meet all password requirements");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await authService.registerComplete({
        verificationToken,
        password,
        name: username.trim(),
      });
      // Redirect to login with success message
      navigate("/login", {
        state: {
          showToast: true,
          toastMessage: "You're signed up. Your adventure begins!",
        },
      });
    } catch (err) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as {
          response?: { data?: { message?: string } };
        };
        setError(
          axiosError.response?.data?.message ||
            "Failed to complete registration. Please try again.",
        );
      } else {
        setError("Failed to complete registration. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (step === "password") {
      setStep("otp");
      setError("");
    } else if (step === "otp") {
      setStep("email");
      setOtp(["", "", "", "", "", ""]);
      setError("");
    } else {
      navigate("/login");
    }
  };

  const [isSocialLoading, setIsSocialLoading] = useState(false);

  const handleSocialLogin = async (provider: SocialProvider) => {
    setError("");
    setIsSocialLoading(true);

    try {
      // callbackURL is where better-auth redirects the user AFTER successful OAuth
      // This should be your frontend URL that handles the post-login state
      const callbackURL = `${window.location.origin}/api/auth/callback/${provider}`;
      const errorCallbackURL = `${window.location.origin}/signup?error=oauth_failed`;
      authService.socialLogin(provider, callbackURL, errorCallbackURL);
    } catch (err) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as {
          response?: { data?: { message?: string } };
        };
        setError(
          axiosError.response?.data?.message ||
            "Social login failed. Please try again.",
        );
      } else {
        setError("Social login failed. Please try again.");
      }
      setIsSocialLoading(false);
    }
  };

  return (
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

      {/* Right Side - Sign Up Form */}
      <div className="flex-1 flex flex-col min-h-screen bg-white lg:-ml-6 relative z-10 rounded-l-3xl">
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:px-12">
          <div className="w-full max-w-sm">
            {/* Logo/Brand */}
            <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">
              My collectibles
            </h1>

            {step === "email" ? (
              /* Email Step */
              <form onSubmit={handleSendOtp} className="space-y-6">
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
                    required
                  />
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
                    "Sign up"
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
                    className="w-12 h-12 flex items-center justify-center border border-black/10 rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                    className="w-12 h-12 flex items-center justify-center border border-black/10 rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <AppleIcon />
                  </button>
                </div>
              </form>
            ) : step === "otp" ? (
              /* OTP Step */
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {/* OTP Instructions */}
                <p className="text-center text-[#111] text-base font-medium">
                  Please enter the code sent to {email}
                </p>

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
                      className="w-10 h-10 text-center text-sm font-bold text-[#27272a] border border-[#dddde3] rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
                    />
                  ))}
                </div>

                {/* Resend OTP */}
                <div className="text-center">
                  <p className="text-sm text-gray-500">Resend OTP</p>
                  {countdown > 0 ? (
                    <p className="text-sm text-brand font-medium">
                      {formatTime(countdown)}
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={isLoading}
                      className="text-sm text-brand font-medium hover:underline disabled:opacity-50"
                    >
                      Send again
                    </button>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 h-10 bg-white text-brand font-normal text-base rounded-full border border-brand hover:bg-brand/5 focus:outline-none focus:ring-2 focus:ring-brand/30 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || otp.join("").length !== 6}
                    className="flex-1 h-10 bg-brand text-white font-normal text-base rounded-full hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
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
                      </span>
                    ) : (
                      "Continue"
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Password Step */
              <form onSubmit={handleCreatePassword} className="space-y-6">
                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {/* Username Field */}
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-[#27272a] mb-1"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Please enter"
                    className="w-full h-10 px-4 border border-[#dddde3] rounded-full text-sm text-gray-900 placeholder:text-[#808089] focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
                    autoComplete="username"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-[#27272a] mb-1"
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
                      className="w-full h-10 px-4 pr-12 border border-[#dddde3] rounded-full text-sm text-gray-900 placeholder:text-[#808089] focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#808089] hover:text-gray-600"
                    >
                      {showPassword ? (
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
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-[#27272a] mb-1"
                  >
                    Confirm password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Please enter"
                      className="w-full h-10 px-4 pr-12 border border-[#dddde3] rounded-full text-sm text-gray-900 placeholder:text-[#808089] focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#808089] hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOffIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Password Validation Checklist */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon checked={passwordValidation.minLength} />
                    <span
                      className={`text-[10px] ${passwordValidation.minLength ? "text-[#00AB56]" : "text-[#999]"}`}
                    >
                      At least 8 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon
                      checked={passwordValidation.hasUppercase}
                    />
                    <span
                      className={`text-[10px] ${passwordValidation.hasUppercase ? "text-[#00AB56]" : "text-[#999]"}`}
                    >
                      At least 1 uppercase letter (A-Z)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon
                      checked={passwordValidation.hasLowercase}
                    />
                    <span
                      className={`text-[10px] ${passwordValidation.hasLowercase ? "text-[#00AB56]" : "text-[#999]"}`}
                    >
                      At least 1 lowercase letter (a-z)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon checked={passwordValidation.hasNumber} />
                    <span
                      className={`text-[10px] ${passwordValidation.hasNumber ? "text-[#00AB56]" : "text-[#999]"}`}
                    >
                      At least 1 number (0-9)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon
                      checked={passwordValidation.hasSpecialChar}
                    />
                    <span
                      className={`text-[10px] ${passwordValidation.hasSpecialChar ? "text-[#00AB56]" : "text-[#999]"}`}
                    >
                      {`At least 1 special character: !@#$%^&*()_+-=[]{};:'"|,.<>/?~\``}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 h-10 bg-white text-brand font-normal text-base rounded-full border border-brand hover:bg-brand/5 focus:outline-none focus:ring-2 focus:ring-brand/30 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 h-10 bg-brand text-white font-normal text-base rounded-full hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
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
                      </span>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Back to Login Link - Fixed at bottom */}
        <div className="border-t border-gray-100 p-6">
          <button
            onClick={() => navigate("/login")}
            className="w-full text-center text-base font-bold text-brand hover:underline"
          >
            Back to login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
