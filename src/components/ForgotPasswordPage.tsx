import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services";
import sideBg from "../assets/side-bg.png";

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
  hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password),
});

const isPasswordValid = (validation: PasswordValidation): boolean =>
  Object.values(validation).every(Boolean);

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [resetToken, setResetToken] = useState("");
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
      const response = await authService.passwordResetStart({ email });
      setStep("otp");
      // Use expiresIn from API or default to 180 seconds
      setCountdown(response.expiresIn || 180);
    } catch (err) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as { response?: { data?: { message?: string } } };
        setError(axiosError.response?.data?.message || "Failed to send OTP. Please try again.");
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
      const response = await authService.passwordResetStart({ email });
      setCountdown(response.expiresIn || 180);
      setOtp(["", "", "", "", "", ""]);
    } catch (err) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as { response?: { data?: { message?: string } } };
        setError(axiosError.response?.data?.message || "Failed to resend OTP. Please try again.");
      } else {
        setError("Failed to resend OTP. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

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
      const response = await authService.passwordResetVerify({ email, otp: otpCode });
      // Store the reset token for the complete step
      setResetToken(response.resetToken);
      setStep("password");
      setError("");
    } catch (err) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as { response?: { data?: { message?: string } } };
        setError(axiosError.response?.data?.message || "Invalid OTP. Please try again.");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

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
      await authService.passwordResetComplete({
        resetToken,
        password,
      });
      // Redirect to login with success message
      navigate("/login", {
        state: { showToast: true, toastMessage: "All set! Log in to start collecting." },
      });
    } catch (err) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as { response?: { data?: { message?: string } } };
        setError(axiosError.response?.data?.message || "Failed to reset password. Please try again.");
      } else {
        setError("Failed to reset password. Please try again.");
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

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-[65%] relative bg-[#d1e7f4]">
        <img
          src={sideBg}
          alt="App preview"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
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

      {/* Right Side - Form */}
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

                {/* Instructions */}
                <p className="text-center text-[#111] text-base font-medium">
                  Please enter your email to reset access to your collection
                </p>

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
                    "Continue"
                  )}
                </button>
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
              <form onSubmit={handleResetPassword} className="space-y-6">
                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-[#27272a] mb-1"
                  >
                    New password
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
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                    <CheckCircleIcon checked={passwordValidation.hasUppercase} />
                    <span
                      className={`text-[10px] ${passwordValidation.hasUppercase ? "text-[#00AB56]" : "text-[#999]"}`}
                    >
                      At least 1 uppercase letter (A-Z)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon checked={passwordValidation.hasLowercase} />
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
                    <CheckCircleIcon checked={passwordValidation.hasSpecialChar} />
                    <span
                      className={`text-[10px] ${passwordValidation.hasSpecialChar ? "text-[#00AB56]" : "text-[#999]"}`}
                    >
                      {`At least 1 special character: !@#$%^&*()_+-=[]{};\:'"|,.<>/?~\``}
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

export default ForgotPasswordPage;
