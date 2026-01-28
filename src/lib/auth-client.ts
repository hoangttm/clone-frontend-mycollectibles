import { createAuthClient } from "better-auth/react";

// Always use full API URL - required for OAuth flow to work correctly
// (state cookie must be set on same domain as OAuth callback)
const baseURL = import.meta.env.VITE_API_BASE_URL;

console.log("[auth-client] baseURL:", baseURL);

export const authClient = createAuthClient({
  baseURL,
  fetchOptions: {
    credentials: "include", // Required for cross-origin cookies
  },
});

// Export hooks and methods for convenience
export const { signIn, signOut, signUp, useSession } = authClient;
