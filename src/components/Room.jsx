import React from "react";
import styles from "./Room.module.css";

export default function Room() {
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
    { user: { username: "Sneha" }, initial: 28, final: 30, score: 2 },
    { user: { username: "Joel" }, initial: 75, final: 82, score: 7 },
    { user: { username: "Sarthak" }, initial: 9, final: 14, score: 5 },
    { user: { username: "Abdul" }, initial: 100, final: 112, score: 12 },
    { user: { username: "Ananya" }, initial: 68, final: 75, score: 7 },
    { user: { username: "Pooja" }, initial: 10, final: 11, score: 1 },
    { user: { username: "Vishnu" }, initial: 32, final: 37, score: 5 },
    { user: { username: "Rohan" }, initial: 90, final: 100, score: 10 },
    { user: { username: "Govind" }, initial: 45, final: 49, score: 4 },
    { user: { username: "Imran" }, initial: 80, final: 88, score: 8 },
    { user: { username: "Kabir" }, initial: 13, final: 18, score: 5 },
    { user: { username: "Nihar" }, initial: 64, final: 67, score: 3 },
    { user: { username: "Manu" }, initial: 23, final: 23, score: 0 },
    { user: { username: "Sanjay" }, initial: 92, final: 95, score: 3 },
    { user: { username: "Tara" }, initial: 14, final: 21, score: 7 },
    { user: { username: "Gautham" }, initial: 71, final: 76, score: 5 },
    { user: { username: "Keerthi" }, initial: 8, final: 12, score: 4 },
    { user: { username: "Bhuvan" }, initial: 52, final: 55, score: 3 }
  ];

  const dummyStreaks = [
    { username: "Emir", streak: 5 },
    { username: "Arjun", streak: 2 },
    { username: "Maya", streak: 9 },
    { username: "Ravi", streak: 1 },
    { username: "Kumar", streak: 6 },
    { username: "Lakshmi", streak: 12 },
    { username: "Dev", streak: 4 },
    { username: "Sneha", streak: 3 },
    { username: "Joel", streak: 7 },
    { username: "Sarthak", streak: 2 },
    { username: "Abdul", streak: 15 },
    { username: "Ananya", streak: 8 },
    { username: "Pooja", streak: 3 },
    { username: "Vishnu", streak: 11 },
    { username: "Rohan", streak: 6 },
    { username: "Govind", streak: 0 },
    { username: "Imran", streak: 10 },
    { username: "Kabir", streak: 4 },
    { username: "Nihar", streak: 9 },
    { username: "Manu", streak: 1 }
  ];

  dummyLeaderboard.sort((a, b) => b.score - a.score);
  dummyStreaks.sort((a, b) => b.streak - a.streak);


  return (
    <div className={styles.roomDetails}>

      <div className={styles.top}>
        <span>PrizePool: ₹{dummyRoom.prizePool}</span>

        <div className={styles.time}>
          <span>Start: {new Date(dummyRoom.created_at).toLocaleString()}</span>
          <span>End: {new Date(dummyRoom.end_date).toLocaleString()}</span>
        </div>
      </div>

      <div className={styles.details}>
        <span>Room Name: {dummyRoom.name}</span>
        <span>Number of participants: {dummyRoom.participants.length}</span>
        <span>Room description: {dummyRoom.description}</span>
      </div>

      {/* LEADERBOARD + STREAKS SIDE BY SIDE */}
      <div className={styles.grid}>

        {/* LEFT: Leaderboard */}
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


        {/* RIGHT: Streak Section */}
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


      </div>


    </div>
  );
}
