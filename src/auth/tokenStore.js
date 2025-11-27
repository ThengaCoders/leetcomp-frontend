const TOKEN_KEY = "app_token";
const EXPIRES_KEY = "app_token_expiresAt"; // ms since epoch

export function saveToken(token, expiresAt = null) {
  const exp = expiresAt || Date.now() + 1000 * 60 * 60 * 24 * 7; // default 7 days
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EXPIRES_KEY, String(exp));
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getExpiry() {
  const v = localStorage.getItem(EXPIRES_KEY);
  return v ? parseInt(v, 10) : null;
}

export function isTokenExpired() {
  const exp = getExpiry();
  return !exp || Date.now() >= exp;
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXPIRES_KEY);
}