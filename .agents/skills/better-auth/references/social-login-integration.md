# Social Login Integration Guide

## Overview

Backend supports Google and Apple OAuth via a **unified endpoint** for both mobile and web.

**Endpoint**: `POST /auth/login/social/:provider`

**Account Linking**: If OAuth email matches existing user, accounts are auto-linked.

---

## Unified Endpoint

```
POST /auth/login/social/:provider
```

**Path Parameter:**
- `provider`: `"google"` or `"apple"`

**Body Fields:**

| Field | Mobile | Web | Description |
|-------|--------|-----|-------------|
| `idToken` | Required | Omit | ID token from native SDK |
| `nonce` | Apple only | - | Nonce for Apple Sign In |
| `accessToken` | Optional | - | Access token (optional) |
| `callbackURL` | - | Optional | Redirect URL after success |
| `errorCallbackURL` | - | Optional | Redirect URL on error |

---

## Mobile Integration (Flutter)

### Request (with idToken)

```
POST /auth/login/social/google
```

```json
{
  "idToken": "eyJhbGciOiJSUzI1NiIs..."
}
```

### Response

```json
{
  "user": {
    "id": "user-uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "image": "https://...",
    "isNewUser": false
  },
  "token": "session-token-for-bearer-auth",
  "expiresAt": "2024-01-20T10:00:00.000Z"
}
```

### Flutter Example

```dart
// Google Sign In
final googleUser = await GoogleSignIn().signIn();
final googleAuth = await googleUser?.authentication;

final response = await http.post(
  Uri.parse('$baseUrl/auth/login/social/google'),
  headers: {'Content-Type': 'application/json'},
  body: jsonEncode({
    'idToken': googleAuth?.idToken,
  }),
);

// Apple Sign In
final credential = await SignInWithApple.getAppleIDCredential(
  scopes: [AppleIDAuthorizationScopes.email, AppleIDAuthorizationScopes.fullName],
  nonce: nonce,
);

final response = await http.post(
  Uri.parse('$baseUrl/auth/login/social/apple'),
  headers: {'Content-Type': 'application/json'},
  body: jsonEncode({
    'idToken': credential.identityToken,
    'nonce': nonce,
  }),
);
```

### Recommended Packages

- Google: `google_sign_in`
- Apple: `sign_in_with_apple`

---

## Web Integration (React)

### Web Request (OAuth Redirect)

For web applications, request without idToken to get OAuth redirect URL:

```
POST /auth/login/social/google
```

```json
{
  "callbackURL": "https://app.example.com/dashboard",
  "errorCallbackURL": "https://app.example.com/login?error=oauth_failed"
}
```

### Response

```json
{
  "redirect": true,
  "url": "https://accounts.google.com/o/oauth2/v2/auth?..."
}
```

### React Example

```typescript
const handleGoogleSignIn = async () => {
  const response = await fetch('/auth/login/social/google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      callbackURL: `${window.location.origin}/dashboard`,
      errorCallbackURL: `${window.location.origin}/login?error=oauth_failed`,
    }),
  });

  const data = await response.json();

  if (data.redirect) {
    window.location.href = data.url; // Redirect to OAuth provider
  }
};
```

### Flow

1. User clicks "Sign in with Google/Apple"
2. Call `POST /auth/login/social/:provider` without `idToken`
3. Get redirect URL in response
4. Redirect user to OAuth provider
5. User authenticates
6. Provider redirects to `/api/auth/callback/{provider}`
7. Backend creates session, sets cookie
8. User redirected to `callbackURL`

---

## Environment Variables (Backend)

```env
# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Apple OAuth
APPLE_CLIENT_ID=your-apple-service-id
APPLE_CLIENT_SECRET=your-apple-private-key
```

---

## Rate Limiting

All auth endpoints are rate-limited per IP:

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/auth/login` | 10 | 1 minute |
| `/auth/login/social/:provider` | 10 | 1 minute |
| `/auth/register/start` | 3 | 1 hour |
| `/auth/register/verify` | 5 | 15 minutes |
| `/auth/password-reset/start` | 3 | 1 hour |
| `/auth/password-reset/verify` | 5 | 15 minutes |
| `/auth/password-reset/complete` | 10 | 1 minute |

---

## Notes

- **New Users**: Check `isNewUser` flag to show onboarding flow
- **Apple Email**: May return private relay email (`@privaterelay.appleid.com`)
- **Token Storage**: Store `token` for Bearer auth in subsequent requests

```
Authorization: Bearer <token>
```
