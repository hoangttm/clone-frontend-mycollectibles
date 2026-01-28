import api from "./api";

// Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string | null;
  };
  token: string;
}

export interface RegisterStartRequest {
  email: string;
}

export interface RegisterStartResponse {
  message: string;
  expiresIn: number;
}

export interface RegisterVerifyRequest {
  email: string;
  otp: string;
}

export interface RegisterVerifyResponse {
  verificationToken: string;
  expiresIn: number;
}

export interface RegisterCompleteRequest {
  verificationToken: string;
  password: string;
  name: string;
}

export interface RegisterCompleteResponse {
  message: string;
}

export interface PasswordResetStartRequest {
  email: string;
}

export interface PasswordResetStartResponse {
  message: string;
  expiresIn: number;
}

export interface PasswordResetVerifyRequest {
  email: string;
  otp: string;
}

export interface PasswordResetVerifyResponse {
  resetToken: string;
  expiresIn: number;
}

export interface PasswordResetCompleteRequest {
  resetToken: string;
  password: string;
}

export interface PasswordResetCompleteResponse {
  message: string;
}

export interface MeResponse {
  user: {
    id: string;
    email: string;
    name: string | null;
  };
  session: {
    expiresAt: string;
  };
}

export interface ApiError {
  status: number;
  message: string;
  code?: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

// Social login providers
export type SocialProvider = "google" | "apple";

// Social login request/response types (for mobile - with idToken)
export interface SocialLoginWithTokenRequest {
  idToken: string;
  nonce?: string; // Required for Apple Sign In
}

// Social login request for web (OAuth redirect flow)
export interface SocialLoginWebRequest {
  callbackURL: string;
  errorCallbackURL?: string;
}

// Response when redirect is needed (web flow)
export interface SocialLoginRedirectResponse {
  redirect: true;
  url: string;
}

// Response with user data (mobile flow or after callback)
export interface SocialLoginUserResponse {
  user: {
    id: string;
    email: string;
    name: string | null;
    image?: string | null;
    isNewUser: boolean;
  };
  token: string;
  expiresAt: string;
}

export type SocialLoginResponse =
  | SocialLoginRedirectResponse
  | SocialLoginUserResponse;

// Auth API functions
export const authService = {
  // Login with email/password (custom endpoint)
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    console.log("data :>> ", data);
    const response = await api.post<LoginResponse>("/api/auth/login", data);
    return response.data;
  },

  // Social Login for Web - returns redirect URL
  // NOTE: This request goes directly to backend (not through proxy) so the
  // OAuth state cookie is set on the correct domain for the callback.
  socialLogin: async (
    provider: SocialProvider,
    callbackURL: string,
    errorCallbackURL?: string,
  ): Promise<void> => {
    const backendURL = import.meta.env.VITE_API_BASE_URL;
    const response = await api.post<SocialLoginRedirectResponse>(
      `${backendURL}/api/auth/login/social/${provider}`,
      {
        // provider,
        callbackURL,
        errorCallbackURL,
      },
      {
        withCredentials: true, // Ensure cookies are sent/received
      },
    );

    if (response.data.redirect && response.data.url) {
      window.location.href = response.data.url;
    }
  },

  // Social Login with ID Token (for mobile apps)
  socialLoginWithIdToken: async (
    provider: SocialProvider,
    data: SocialLoginWithTokenRequest,
  ): Promise<SocialLoginUserResponse> => {
    const response = await api.post<SocialLoginUserResponse>(
      `/api/auth/login/social/${provider}`,
      data,
    );
    return response.data;
  },

  // Logout (custom endpoint)
  logout: async (): Promise<void> => {
    await api.post("/api/auth/logout");
  },

  // Get current user (custom endpoint)
  me: async (): Promise<MeResponse> => {
    const response = await api.get<MeResponse>("/api/auth/me");
    return response.data;
  },

  // Register - Start (sends OTP to email)
  registerStart: async (
    data: RegisterStartRequest,
  ): Promise<RegisterStartResponse> => {
    const response = await api.post<RegisterStartResponse>(
      "/api/auth/register/start",
      data,
    );
    return response.data;
  },

  // Register - Verify OTP
  registerVerify: async (
    data: RegisterVerifyRequest,
  ): Promise<RegisterVerifyResponse> => {
    const response = await api.post<RegisterVerifyResponse>(
      "/api/auth/register/verify",
      data,
    );
    return response.data;
  },

  // Register - Complete
  registerComplete: async (
    data: RegisterCompleteRequest,
  ): Promise<RegisterCompleteResponse> => {
    const response = await api.post<RegisterCompleteResponse>(
      "/api/auth/register/complete",
      data,
    );
    return response.data;
  },

  // Password Reset - Start (sends OTP to email)
  passwordResetStart: async (
    data: PasswordResetStartRequest,
  ): Promise<PasswordResetStartResponse> => {
    const response = await api.post<PasswordResetStartResponse>(
      "/api/auth/password-reset/start",
      data,
    );
    return response.data;
  },

  // Password Reset - Verify OTP
  passwordResetVerify: async (
    data: PasswordResetVerifyRequest,
  ): Promise<PasswordResetVerifyResponse> => {
    const response = await api.post<PasswordResetVerifyResponse>(
      "/api/auth/password-reset/verify",
      data,
    );
    return response.data;
  },

  // Password Reset - Complete
  passwordResetComplete: async (
    data: PasswordResetCompleteRequest,
  ): Promise<PasswordResetCompleteResponse> => {
    const response = await api.post<PasswordResetCompleteResponse>(
      "/api/auth/password-reset/complete",
      data,
    );
    return response.data;
  },
};

export default authService;
