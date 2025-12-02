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

  // Fetch final qn count from LeetCode API
  async function getFinalCount(leetcodeId) {
    try {
      const res = await fetch(
        `https://leetcode-stats-api.herokuapp.com/${leetcodeId}`
      );
      const data = await res.json();
      return typeof data.totalSolved === "number" ? data.totalSolved : 0;
    } catch (err) {
      console.error("LeetCode API failed:", err);
      return 0;
    }
  }

  useEffect(() => {
    async function loadRoom() {
      try {
        setLoading(true);

        // Fetch room + members
        const res = await api.get(`/api/rooms/${id}`);
        const roomData = res.data.room;
        const membersData = res.data.members;

        // Compute leaderboard with real final counts
        const enrichedMembers = await Promise.all(
          membersData.map(async (m) => {
            let finalCount;
            if (roomData.status === "ONGOING") {
              finalCount = await getFinalCount(m.leetcode);
            } else if (roomData.status === "FINISHED") {
              finalCount = m.final_qn_count;
            }

            const score = finalCount - m.initial_qn_count;

            return {
              ...m,
              final_qn_count: finalCount,
              score,
            };
          })
        );

        enrichedMembers.sort((a, b) => b.score - a.score);

        setRoom(roomData);
        setMembers(enrichedMembers);
      } catch (err) {
        console.error(err);
        setError(err.message);
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