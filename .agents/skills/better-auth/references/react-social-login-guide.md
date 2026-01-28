# React Social Login Integration Guide

## Overview

Integrate Google/Apple social login with the MyCollectibles backend.

**Important:** Do NOT use Better Auth client library - backend uses custom endpoints.

## Endpoint

```
POST /api/auth/login/social/:provider
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `provider` | path | `google` or `apple` |
| `callbackURL` | body | Redirect after success |
| `errorCallbackURL` | body | Redirect on error |

## Implementation

### 1. Social Login API

```typescript
// src/lib/auth-api.ts
const API_URL = import.meta.env.VITE_API_URL;

export async function socialLogin(
  provider: "google" | "apple",
  options?: {
    callbackURL?: string;
    errorCallbackURL?: string;
  }
): Promise<void> {
  const response = await fetch(`${API_URL}/api/auth/login/social/${provider}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      callbackURL: options?.callbackURL || `${window.location.origin}/auth/callback`,
      errorCallbackURL: options?.errorCallbackURL || `${window.location.origin}/login?error=true`,
    }),
  });

  const data = await response.json();

  if (data.redirect && data.url) {
    window.location.href = data.url;
  }
}

export async function getMe() {
  const response = await fetch(`${API_URL}/api/auth/me`, {
    credentials: "include",
  });
  if (!response.ok) return null;
  return response.json();
}
```

### 2. Social Login Buttons

```tsx
// src/components/social-login.tsx
import { socialLogin } from "@/lib/auth-api";

export function SocialLogin({ callbackURL = "/dashboard" }) {
  return (
    <div className="flex flex-col gap-3">
      <button onClick={() => socialLogin("google", { callbackURL })}>
        Continue with Google
      </button>
      <button onClick={() => socialLogin("apple", { callbackURL })}>
        Continue with Apple
      </button>
    </div>
  );
}
```

### 3. OAuth Callback Page

```tsx
// src/pages/auth-callback.tsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      navigate(`/login?error=${error}`);
      return;
    }
    // Cookie is set by backend, redirect to app
    navigate("/dashboard");
  }, [navigate, searchParams]);

  return <div>Completing login...</div>;
}
```

### 4. Route Setup

```tsx
// In your router
<Route path="/auth/callback" element={<AuthCallback />} />
```

## Flow Diagram

```
User clicks "Continue with Google"
    │
    ▼
POST /api/auth/login/social/google
    │
    ▼
Backend returns { redirect: true, url: "https://accounts.google.com/..." }
    │
    ▼
Frontend redirects to Google
    │
    ▼
User authenticates with Google
    │
    ▼
Google redirects to /api/auth/callback/google
    │
    ▼
Backend sets session cookie, redirects to callbackURL
    │
    ▼
/auth/callback page loads, cookie present
    │
    ▼
Navigate to /dashboard (authenticated)
```

## Google Cloud Console Setup

Add these redirect URIs to your OAuth 2.0 Client ID:

**Production:**
```
https://api.yourapp.com/api/auth/callback/google
```

**Development:**
```
http://localhost:8787/api/auth/callback/google
```

## CORS

Add frontend URL to backend `TRUSTED_ORIGINS`:

```env
TRUSTED_ORIGINS=http://localhost:5173,https://yourapp.com
```

## Error Handling

```tsx
// In login page, check for error param
const [searchParams] = useSearchParams();
const error = searchParams.get("error");

{error && (
  <div className="text-red-500">
    Login failed: {error}
  </div>
)}
```
