import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // axios instance with token + onboarding handling
import styles from "./Onboard.module.css";

export default function Onboard() {
  const [username, setUsername] = useState("");
  const [leetcode, setLeetcode] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await api.post("/auth/onboard", {
        username,
        leetcode,
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
        <h1 className={styles.heading}>Complete Your Profile</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>Username</label>
          <input
            type="text"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter a unique username"
          />

          <label className={styles.label}>LeetCode ID</label>
          <input
            type="text"
            className={styles.input}
            value={leetcode}
            onChange={(e) => setLeetcode(e.target.value)}
            placeholder="Your LeetCode handle"
          />

          <button type="submit" className={styles.submit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}