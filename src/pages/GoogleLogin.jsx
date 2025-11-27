import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { saveToken } from "../auth/tokenStore";
import styles from "./GoogleLogin.module.css";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function GoogleLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("googleBtn"),
          {
            theme: "outline",
            size: "large",
            width: 250,
          }
        );
      }
    };
  }, []);

  async function handleCredentialResponse(response) {
    try {
      const googleToken = response.credential; // JWT from Google

      // Send to your backend
      const resp = await api.post("/auth/google", {
        credential: googleToken,
      });

      // Backend response should include token + optional fields
      const { token, onboardingRequired } = resp.data;

      if (token) {
        saveToken(token);
      }

      if (onboardingRequired) {
        navigate("/onboarding", { replace: true });
        return;
      }

      navigate("/", { replace: true });
    } catch (err) {
      console.error("Google login failed:", err);
      alert("Google login failed. Please try again.");
    }
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Google Login</h1>
      <div id="googleBtn" className={styles.signinButton}></div>
    </div>
  );
}

