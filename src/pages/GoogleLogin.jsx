import { useEffect } from "react";
import styles from "./GoogleLogin.module.css";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function GoogleLogin() {

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

  function handleCredentialResponse(response) {
    console.log("Google Credential:", response);
    const box = document.getElementById("cred-box");
    box.textContent = JSON.stringify(response, null, 2);
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Google Login</h1>

      <div id="googleBtn" className={styles.signinButton}></div>

      <h3 className={styles.label}>Credential Response:</h3>
      <pre id="cred-box" className={styles.output}></pre>
    </div>
  );
}
