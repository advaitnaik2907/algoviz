// =========================================================
// AUTH HELPERS
// All token / login-state logic lives here, in ONE place.
// =========================================================

const TOKEN_KEY = "token";
const NAME_KEY = "userName";
const EMAIL_KEY = "userEmail";

// Save everything after a successful login
export function saveSession(data) {
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(NAME_KEY, data.name || "");
  localStorage.setItem(EMAIL_KEY, data.email || "");
}

// Remove everything (used by Logout and by expired sessions)
export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(NAME_KEY);
  localStorage.removeItem(EMAIL_KEY);

  // Old key names that earlier versions of the app may have used
  localStorage.removeItem("jwt");
  localStorage.removeItem("accessToken");
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUserName() {
  return localStorage.getItem(NAME_KEY) || "";
}

export function getUserEmail() {
  return localStorage.getItem(EMAIL_KEY) || "";
}

// A JWT has 3 parts separated by dots. The middle part holds
// the expiry time ("exp", in seconds). We read it so we can
// treat an expired token as "logged out".
function isTokenExpired(token) {
  try {
    const payload = JSON.parse(
      atob(
        token
          .split(".")[1]
          .replace(/-/g, "+")
          .replace(/_/g, "/")
      )
    );

    if (!payload.exp) {
      return false;
    }

    return payload.exp * 1000 < Date.now();
  } catch (error) {
    // Token is not a readable JWT -> treat as invalid
    return true;
  }
}

// True only if a token exists AND it has not expired
export function isLoggedIn() {
  const token = getToken();

  if (!token) {
    return false;
  }

  if (isTokenExpired(token)) {
    clearSession();
    return false;
  }

  return true;
}
