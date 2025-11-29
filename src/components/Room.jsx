import React, { useState } from "react";
import styles from "./Room.module.css";

export default function Room() {
  const [activeTab, setActiveTab] = useState("Leaderboard"); // default tab

  const dummyRoom = {
    name: "Mandi Rice",
    description:
      "Mandi mixed with slow cooked honey chilli chicken and seekh kebabs as side dish. Add some tahini too. Mwah.",
    participants: Array(232).fill(null),
    created_at: "2024-12-23T23:34:00Z",
    end_date: "2024-12-31T23:34:00Z",
    prizePool: 34344,
  };

  const dummyLeaderboard = [
    { user: { username: "Emir" }, initial: 120, final: 130, score: 10 },
    { user: { username: "Arjun" }, initial: 80, final: 85, score: 5 },
    { user: { username: "Maya" }, initial: 90, final: 92, score: 2 },
    { user: { username: "Ravi" }, initial: 40, final: 44, score: 4 },
    { user: { username: "Kumar" }, initial: 12, final: 16, score: 4 },
    { user: { username: "Lakshmi" }, initial: 55, final: 60, score: 5 },
    { user: { username: "Dev" }, initial: 33, final: 40, score: 7 },
    { user: { username: "Joel" }, initial: 75, final: 82, score: 7 }
  ];

  dummyLeaderboard.sort((a, b) => b.score - a.score);

  const dummyStreaks = [
    { username: "Emir", streak: 5 },
    { username: "Arjun", streak: 2 },
    { username: "Maya", streak: 9 },
    { username: "Lakshmi", streak: 12 },
    { username: "Abdul", streak: 15 },
    { username: "Vishnu", streak: 11 },
    { username: "Rohan", streak: 6 }
  ];

  dummyStreaks.sort((a, b) => b.streak - a.streak);

  return (
    <div className={styles.roomDetails}>

      {/* TOP SECTION */}
      <div className={styles.top}>
        <span className={styles.pool}>PrizePool: ₹{dummyRoom.prizePool}</span>
        <div className={styles.time}>
          <span>Start: {new Date(dummyRoom.created_at).toLocaleString()}</span>
          <span>End: {new Date(dummyRoom.end_date).toLocaleString()}</span>
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
              <p className={styles.descValue}>{dummyRoom.name}</p>
            </div>

            <div className={styles.descItem}>
              <span className={styles.descLabel}>Participants:</span>
              <p className={styles.descValue}>
                {dummyRoom.participants.length}
              </p>
            </div>

            <div className={styles.descItem}>
              <span className={styles.descLabel}>Description:</span>
              <p className={styles.descValue}>{dummyRoom.description}</p>
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
                  {dummyLeaderboard.map((row, i) => (
                    <tr key={i}>
                      <td>{row.user.username}</td>
                      <td>{row.initial}</td>
                      <td>{row.final}</td>
                      <td>{row.score}</td>
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
              <div className={styles.streakList}>
                {dummyStreaks.map((u, i) => (
                  <div key={i} className={styles.streakItem}>
                    <span className={styles.streakUser}>{u.username}</span>
                    <span className={styles.streakValue}>{u.streak} 🔥</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
