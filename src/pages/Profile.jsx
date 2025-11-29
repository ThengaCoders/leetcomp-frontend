import { useEffect, useState } from "react";
import axios from "../api/axios";
import styles from "./Profile.module.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.statusBox}>
            <h2 className={styles.statusTitle}>Loading...</h2>
          </div>
        </main>
      </div>
    );
  }
  if (!user) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.statusBox}>
            <h2 className={styles.statusTitle}>Failed to load profile</h2>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={user.picture} alt="Profile" className={styles.avatar} />

        <p className={styles.username}>
          @{user.username || "unknown_user"}
        </p>

        <div className={styles.info}>
          <p><strong>User ID: </strong>{user.id || "N/A"}</p>
          <p><strong>Email: </strong>{user.email || "N/A"}</p>

          {user.leetcode && (
            <p>
              <strong>LeetCode: </strong>
              <a
                href={`https://leetcode.com/${user.leetcode}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                {user.leetcode}
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
