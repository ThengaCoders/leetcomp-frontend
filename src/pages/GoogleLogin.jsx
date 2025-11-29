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
      }
    };
  }, []);

  const handleGoogleSignIn = () => {
    if (window.google?.accounts?.id) {
      // Create a temporary hidden div to render the Google button
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.opacity = '0';
      tempDiv.style.pointerEvents = 'none';
      document.body.appendChild(tempDiv);

      // Render the Google button in the hidden div
      window.google.accounts.id.renderButton(tempDiv, {
        theme: "outline",
        size: "large",
        type: "standard",
      });

      // Wait a bit for the button to render, then click it
      setTimeout(() => {
        const googleButton = tempDiv.querySelector('div[role="button"]');
        if (googleButton) {
          googleButton.click();
        } else {
          // Fallback: try One Tap
          window.google.accounts.id.prompt();
        }
        // Clean up after a delay
        setTimeout(() => {
          document.body.removeChild(tempDiv);
        }, 1000);
      }, 100);
    } else {
      alert("Google Sign-In is loading. Please wait a moment and try again.");
    }
  };

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
        navigate("/onboard", { replace: true });
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
      <div className={styles.loginCard}>
        <div className={styles.logoSection}>
          <div className={styles.logoIcon}>
            <i className="fa-solid fa-code"></i>
          </div>
          <h1 className={styles.heading}>Welcome to LeeComp</h1>
          <p className={styles.subtitle}>Sign in to continue your coding journey</p>
        </div>

        <button 
          onClick={handleGoogleSignIn}
          className={styles.googleButton}
          type="button"
        >
          <svg className={styles.googleIcon} viewBox="0 0 24 24" width="20" height="20">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className={styles.googleText}>Google</span>
        </button>

        <div className={styles.footerNote}>
          <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}

