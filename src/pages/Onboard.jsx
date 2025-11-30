import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // axios instance with token + onboarding handling
import styles from "./Onboard.module.css";

export default function Onboard() {
  const [username, setUsername] = useState("");
  const [leetcode, setLeetcode] = useState("");
  const [phone, setPhone] = useState("");
  const [upi, setUpi] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await api.post("/auth/onboard", {
        username,
        leetcode,
        phone,
      });

      console.log("Onboard:", res.data);

      if (res.data?.message === "Profile completed") {
        navigate("/"); // go home
      }
    } catch (err) {
      const error = err?.response?.data?.error;

      if (!error) return alert("Something went wrong");

      switch (error) {
        case "Profile already completed. Cannot edit username or leetcode.":
          alert("Profile already completed");
          navigate("/");
          break;

        case "Username and LeetCode required":
          alert("Username and LeetCode required");
          break;

        case "Username already exists":
          alert("Username already exists");
          break;

        default:
          alert(error);
      }
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Username</label>
            <div className={styles.inputShell}>
              <span>@</span>
              <input
                type="text"
                className={styles.input}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="enter-unique-handle"
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>LeetCode ID</label>
            <div className={styles.inputShell}>
              <span>LC</span>
              <input
                type="text"
                className={styles.input}
                value={leetcode}
                onChange={(e) => setLeetcode(e.target.value)}
                placeholder="your-leetcode-username"
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Phone Number</label>
            <div className={styles.inputShell}>
              <span>+91</span>
              <input
                type="tel"
                className={styles.input}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))}
                placeholder="9876543210"
              />
            </div>
          </div>

          <button type="submit" className={styles.submit}>
            Save & Continue
          </button>
        </form>
      </div>
    </div>
  );
}