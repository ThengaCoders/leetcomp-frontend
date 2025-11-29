import api from "../api/axios";
import { clearToken } from "./tokenStore";

export async function logout(navigate) {
  try {
    // Send logout request to backend
    await api.post("/auth/logout");

    // Clear token locally
    clearToken();

    // Redirect to login
    navigate("/login", { replace: true });
  } catch (err) {
    console.error("Logout failed:", err);
    // Even if logout request fails, clear token to avoid stuck state
    clearToken();
    navigate("/login", { replace: true });
  }
}