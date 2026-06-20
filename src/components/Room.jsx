import React, { useState, useEffect } from "react";
import styles from "./Room.module.css";
import api from "../api/axios"; // interceptor-attached axios
import { useParams } from "react-router-dom";

export default function Room() {
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("Leaderboard");

  const [room, setRoom] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRoom() {
      try {
        setLoading(true);

        // Fetch room + members (Backend now handles LeetCode API and scoring!)
        const res = await api.get(`/api/rooms/${id}`);
        
        setRoom(res.data.room);
        setMembers(res.data.members); // Expected to be enriched and sorted by your backend

      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load room");
      } finally {
        setLoading(false);
      }
    }

    loadRoom();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.statusBox}>
            <h2 className={styles.statusTitle}>Loading room...</h2>
          </div>
        </main>
      </div>
    );
  }
  if (error) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.statusBox}>
            <h2 className={styles.statusTitle}>{error}</h2>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.roomDetails}>
      {/* TOP SECTION */}
      <div className={styles.top}>
        <span className={styles.pool}>
          PrizePool: ₹{room.cost * room.participant_count}
        </span>

        <div className={styles.time}>
          <span>Start: {new Date(room.created_at).toLocaleString()}</span>
          <span>End: {new Date(room.end_date).toLocaleString()}</span>
        </div>
      </div>

      {/* TABS */}
      <div className={styles.tabs}>
        {["Description", "Leaderboard", "Streaks"].map((tab) => (
          <div
            key={tab}
            className={`${styles.tab} ${
              activeTab === tab ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className={styles.tabContent}>

        {/* DESCRIPTION TAB */}
        {activeTab === "Description" && (
          <div className={styles.descriptionBox}>
            <h2>Room Details</h2>

            <div className={styles.descItem}>
              <span className={styles.descLabel}>Room Name:</span>
              <p className={styles.descValue}>{room.roomName}</p>
            </div>

            <div className={styles.descItem}>
              <span className={styles.descLabel}>Participants:</span>
              <p className={styles.descValue}>{room.participant_count}</p>
            </div>

            <div className={styles.descItem}>
              <span className={styles.descLabel}>Description:</span>
              <p className={styles.descValue}>{room.description}</p>
            </div>
          </div>
        )}

        {/* LEADERBOARD TAB */}
        {activeTab === "Leaderboard" && (
          <div className={styles.board}>
            <h2>Leaderboard</h2>

            <div className={styles.scrollArea}>
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Initial</th>
                    <th>Final</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((m, i) => (
                    <tr key={i}>
                      <td>{m.username}</td>
                      <td>{m.initial_qn_count}</td>
                      <td>{m.final_qn_count}</td>
                      <td>{m.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* STREAK TAB */}
        {activeTab === "Streaks" && (
          <div className={styles.streakCard}>
            <h2>Participant Streaks</h2>
            <div className={styles.streakScroll}>
              <p style={{ textAlign: "center", padding: "20px", opacity: 0.6 }}>
                🚧 We are working on it!
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}