import api from "./axios";
import { getToken, isTokenExpired, clearToken } from "../auth/tokenStore";

/**
 * Call once on app start. Pass navigate from react-router and an optional onLogout callback.
 *
 * @param {function} navigate - useNavigate() from react-router
 * @param {function} onLogout - called after token cleared (optional)
 */
export default function setupInterceptors(navigate, onLogout) {
  // REQUEST: attach token header if exists & not expired
  api.interceptors.request.use(cfg => {
    const token = getToken();
    if (token && !isTokenExpired()) {
      cfg.headers = cfg.headers || {};
      cfg.headers.Authorization = `Bearer ${token}`;
    }
    return cfg;
  }, err => Promise.reject(err));

  // RESPONSE: check onboardingRequired in successful responses
  api.interceptors.response.use(
    res => {
      try {
        // If server signals onboarding required, navigate there
        // only if not already on onboarding to avoid loops
        if (res?.data?.onboardingRequired) {
          // optional: save session info if provided
          // e.g. if backend sends token/user here, handle as needed before navigation
          if (typeof navigate === "function") navigate("/onboard");
        }
      } catch (e) {
        // ignore
      }
      return res;
    },
    err => {
      const status = err?.response?.status;

      // Check onboardingRequired in error responses
      if (err?.response?.data?.onboardingRequired) {
        if (typeof navigate === "function") navigate("/onboard");
        return Promise.reject(err);
      }

      // If unauthorized — clear token and route to login
      if (status === 401) {
        clearToken();
        if (typeof onLogout === "function") onLogout();
        if (typeof navigate === "function") navigate("/login", { replace: true });
      }

      return Promise.reject(err);
    }
  );

  return api;
}