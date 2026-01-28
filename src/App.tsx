import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./App.css";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import AuthCallbackPage from "./components/AuthCallbackPage";
import PortfolioPage from "./components/PortfolioPage";
import SearchPage from "./components/SearchPage";
import SettingsPage from "./components/SettingsPage";
import ExplorePage from "./components/ExplorePage";
import ExploreListPage from "./components/ExploreListPage";
import ProtectedRoute from "./components/ProtectedRoute";

function RedirectIfLoggedIn({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <RedirectIfLoggedIn>
            <LoginPage />
          </RedirectIfLoggedIn>
        }
      />
      <Route
        path="/signup"
        element={
          <RedirectIfLoggedIn>
            <SignUpPage />
          </RedirectIfLoggedIn>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <RedirectIfLoggedIn>
            <ForgotPasswordPage />
          </RedirectIfLoggedIn>
        }
      />
      <Route path="/api/auth/callback/google" element={<AuthCallbackPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/portfolio"
        element={
          <ProtectedRoute>
            <PortfolioPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/explore"
        element={
          <ProtectedRoute>
            <ExplorePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/explore/:type"
        element={
          <ProtectedRoute>
            <ExploreListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
