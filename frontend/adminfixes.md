# Admin Fixes — "Something went wrong" Error

## Issue

The app was showing **"Something went wrong"** on every page, regardless of what was fixed. This was caused by a runtime error in the root route configuration.

## Root Cause

`frontend/src/App.jsx` used `<AdminRoute>` as a route guard for the `/admin-portal` route, but **`AdminRoute` was never imported or defined** anywhere in the codebase.

Because `AdminRoute` is an undefined identifier, React threw a `ReferenceError: AdminRoute is not defined` during **every render** of the `App` component. The `AppErrorBoundary` caught this error and displayed the generic "Something went wrong" message.

> **Why it kept happening:** The build (`vite build`) succeeds because Vite doesn't resolve identifier references at build time for JSX components — the error only occurs at **runtime** when the component tree is rendered. This is why no other fixes appeared to help.

## Changes Made

### 1. Created `frontend/src/components/AdminRoute.jsx`

A new admin-only route guard component that:

- Redirects **unauthenticated** users to `/login` (preserving the intended destination via `state.from`)
- Shows a clear **"Access Denied"** page for **non-admin** users
- Shows a `Loader` while auth state is still initializing
- Checks the user's admin status using multiple possible backend field names:
  - `is_superuser`
  - `isSuperuser`
  - `role === 'admin'`
  - `role === 'superuser'`

```jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Loader from './common/Loader.jsx';

export const isAdmin = (user) => {
  if (!user) return false;
  return Boolean(user.is_superuser || user.isSuperuser || user.role === 'admin' || user.role === 'superuser');
};

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader />;

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!isAdmin(user)) {
    return (
      <main className="page-panel" role="alert">
        <h1>Access Denied</h1>
        <p>You do not have administrator privileges to view this page.</p>
        <p><a href="/" style={{ color: '#D4AF37' }}>Return to Home</a></p>
      </main>
    );
  }

  return children;
};

export default AdminRoute;
```

### 2. Updated `frontend/src/App.jsx`

Added the missing import so the `AdminRoute` component is properly referenced:

```jsx
import AdminRoute from "./components/AdminRoute";
```

## Files Modified

| File | Change |
|------|--------|
| `frontend/src/components/AdminRoute.jsx` | **Created** — new admin route guard component |
| `frontend/src/App.jsx` | **Modified** — added `AdminRoute` import |

## Verification

| Check | Result |
|-------|--------|
| `npm run build` | ✅ Builds successfully |
| `npm run lint` | ✅ 0 errors (3 pre-existing harmless warnings) |
| `npm test` | ✅ All 19 tests pass |
| `npm run dev` | ✅ Dev server starts cleanly |

## Related Files

- `frontend/src/components/AppErrorBoundary.jsx` — the error boundary that was displaying the "Something went wrong" message
- `frontend/src/pages/AdminPortal/aportal.jsx` — the admin portal page protected by `AdminRoute`
- `frontend/src/components/ProtectedRoute.jsx` — the existing protected route pattern that `AdminRoute` follows

---

# Second Issue — Admin Page "Refreshing" / Redirect Loop

## Issue

After fixing the "Something went wrong" crash, clicking the **Admin** link in the sidebar appeared to just **refresh the page** instead of loading the admin portal.

## Root Cause

`AdminRoute` was silently redirecting **non-admin** users back to `/` using `<Navigate to="/" replace />`. When a non-admin user clicked the "Admin" link:

1. They navigated to `/admin-portal`
2. `AdminRoute` detected they weren't an admin
3. It silently redirected them back to `/`
4. This happened so fast it looked like a page refresh

## Fixes Applied

### 1. `frontend/src/components/AdminRoute.jsx`

- **Exported** the `isAdmin` helper so it can be shared with the Navbar
- **Replaced the silent redirect** with a clear **"Access Denied"** message page for non-admin users

```jsx
export const isAdmin = (user) => {
  if (!user) return false;
  return Boolean(user.is_superuser || user.isSuperuser || user.role === 'admin' || user.role === 'superuser');
};

// Non-admin users now see:
// <main className="page-panel" role="alert">
//   <h1>Access Denied</h1>
//   <p>You do not have administrator privileges to view this page.</p>
// </main>
```

### 2. `frontend/src/components/Navbar.jsx`

- **Hid the Admin link** from the sidebar for non-admin users — it now only appears for users with admin privileges

```jsx
import { isAdmin } from "./AdminRoute.jsx";

const links = [
  { to: '/', label: 'Home', icon: '⌂' },
  { to: '/feed', label: 'Feed', icon: '+' },
  { to: '/discover', label: 'Discover', icon: '⌕' },
  { to: '/clubs', label: 'Clubs', icon: '♟' },
  { to: '/watched', label: 'Watched', icon: '▣' },
  // Admin link only shown for admin users
  ...(isAdmin(user) ? [{ to: '/admin-portal', label: 'Admin', icon: '⚙' }] : []),
];
```

## Admin User Detection

The `isAdmin` helper checks the following user object fields:

| Field | Description |
|-------|-------------|
| `user.is_superuser` | Python/Django-style boolean |
| `user.isSuperuser` | camelCase boolean |
| `user.role === 'admin'` | Role-based admin |
| `user.role === 'superuser'` | Role-based superuser |

## Result

- **Admin users**: see the "Admin" link and can access `/admin-portal`
- **Non-admin users**: don't see the "Admin" link in the sidebar. If they manually navigate to `/admin-portal`, they see a clear **"Access Denied"** page instead of a confusing silent redirect

---

# Third Change — Always-Visible Admin Link with Inline Admin Login

## Overview

The Admin link is now **always visible** in the sidebar for everyone. Clicking it takes you to `/admin-portal`, where the behavior depends on your auth state:

| State | What you see |
|-------|-------------|
| **Not logged in** | An **Admin Login Form** right on the page (username + password + "Login as Admin" button) |
| **Logged in as admin** | The admin portal loads |
| **Logged in as regular user** | An **"Access Denied"** page with a "Sign out & login as admin" button |

## Files Changed

### 1. `frontend/src/components/Navbar.jsx`

Removed the `isAdmin(user)` conditional — the Admin link is now always shown:

```jsx
const links = [
  { to: '/', label: 'Home', icon: '⌂' },
  { to: '/feed', label: 'Feed', icon: '+' },
  { to: '/discover', label: 'Discover', icon: '⌕' },
  { to: '/clubs', label: 'Clubs', icon: '♟' },
  { to: '/watched', label: 'Watched', icon: '▣' },
  { to: '/admin-portal', label: 'Admin', icon: '⚙' },  // always visible
];
```

### 2. `frontend/src/components/AdminLoginForm.jsx` (NEW)

A dedicated admin login form that:

- Uses the **existing** `useAuth().login()` — no new backend endpoint needed
- Shows "Invalid admin username or password" on 400/401 errors
- Shows a network error if the server is unreachable
- Includes a "Not an admin? Log in as a member" link to `/login`

### 3. `frontend/src/components/AdminRoute.jsx`

Three-state logic:

```jsx
// Not logged in → show the admin login form right here
if (!user) {
  return <AdminLoginForm />;
}

// Logged in but not an admin → Access Denied
if (!isAdmin(user)) {
  return (
    <main className="page-panel" role="alert">
      <h1>Access Denied</h1>
      <p>You are signed in as @{user.username}, but this account does not have administrator privileges.</p>
      <button onClick={logout}>Sign out & login as admin</button>
    </main>
  );
}

// Logged in as admin → show the portal
return children;
```

## Why this is better

- **No backend changes** — admin status is still determined by the user object's `is_superuser` / `role` fields returned by the existing `/api/auth/login` endpoint
- **No redirect loop** — the login form is rendered inline on the admin page,, not via navigation
- **Clear UX** — regular users see exactly why they're denied and how to switch accounts
- **One login endpoint** — the same `/api/auth/login` is used for both member and admin logins

---

# Fourth Change — Hardcoded Developer Admin Credentials

## Overview

Added **hardcoded admin credentials** so any developer can access the admin portal without needing a backend-seeded admin account.

## Credentials

| Field | Value |
|-------|-------|
| **Username** | `Admin` |
| **Password** | `0000` |

## How it works

In `frontend/src/components/AdminLoginForm.jsx`:

1. When the form is submitted, it first checks the hardcoded credentials:
   ```js
   if (username.trim() === 'Admin' && password === '0000') {
     localStorage.setItem(TOKEN_KEY, `dev-admin-token-${Date.now()}`);
     updateStoredUser(ADMIN_USER);
   }
   ```
2. If they match, a **local admin session** is created directly — **no backend call needed**
3. If they don't match, it **falls back to the real backend login** (`/api/auth/login`) so real admin accounts still work
4. The `ADMIN_USER` object has `is_superuser: true` and `role: 'superuser'`, so `isAdmin()` grants access immediately

## Security Note

> ⚠️ **This is NOT production-secure.** The credentials are visible in the frontend source code. This is intended as a **developer convenience** so the team can access the admin portal during development. For production, remove these hardcoded credentials and rely on backend-seeded admin accounts only.

## Files Changed

| File | Change |
|------|--------|
| `frontend/src/components/AdminLoginForm.jsx` | Added hardcoded `Admin` / `0000` credentials check with local admin session creation |
