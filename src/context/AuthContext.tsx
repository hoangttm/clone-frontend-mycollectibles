import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { authService, type MeResponse } from "../services/authService";
import { authClient } from "../lib/auth-client";

interface User {
  id: string;
  email: string;
  name: string | null;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = !!user;

  // Check session on mount using /api/auth/me
  const checkSession = async () => {
    try {
      const response: MeResponse = await authService.me();
      console.log("[AuthContext] Session found:", response.user);
      setUser(response.user);
    } catch {
      console.log("[AuthContext] No valid session");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  // Login with email/password using /api/auth/login
  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    setUser(response.user);
    if (response.token) {
      localStorage.setItem("accessToken", response.token);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await authClient.signOut();
    } catch {
      // Ignore better-auth errors
    }
    try {
      await authService.logout();
    } catch {
      // Ignore custom logout errors
    }
    setUser(null);
    localStorage.removeItem("accessToken");
  };

  // Refresh session (call after OAuth redirect)
  const refreshSession = async () => {
    setIsLoading(true);
    await checkSession();
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, isLoading, login, logout, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
