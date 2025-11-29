import React, { useEffect, useState } from "react";
import styles from "./Room.module.css";
import api from "../api/axios";

export default function Room({ roomId }) {
  const [room, setRoom] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState("");

  // fetch room + leaderboard separately (backend already exposes these)
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const [roomRes, lbRes] = await Promise.all([
          api.get(`/api/rooms/${roomId}`),               // room data
          api.get(`/api/rooms/${roomId}/leaderboard`)   // leaderboard
        ]);

        if (!mounted) return;
        setRoom(roomRes.data);
        setLeaderboard(lbRes.data);
        // determine joined: find if user exists in leaderboard or check separate endpoint later
        // we'll keep joined=false unless backend provides join info
        setJoined(lbRes.data.some(r => r.user && r.user.id === localStorage.getItem("userId")));
      } catch (err) {
        console.error(err);
        setError("Failed to load room");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => { mounted = false; };
  }, [roomId]);

  // guard so we don't try to read room.cost when room is null
  if (loading) return <div className={styles.loading}>Loading room...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!room) return <div className={styles.error}>Room not found</div>;

  // ... rest of your render (unchanged) ...


  // --- Join Room Logic ---
  async function handleJoin() {
    try {
      setJoining(true);
      await api.post(`/api/rooms/${roomId}/join`);   // must send auth token via interceptor
      const [roomRes, lbRes] = await Promise.all([
        api.get(`/api/rooms/${roomId}`),
        api.get(`/api/rooms/${roomId}/leaderboard`)
      ]);
      setRoom(roomRes.data);
      setLeaderboard(lbRes.data);
      setJoined(true);
    } catch (err) {
      alert("Failed to join room");
    } finally {
      setJoining(false);
    }
  }


  // LOADING + ERROR UI
  if (loading) return <div className={styles.loading}>Loading room...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.roomDetails}>

      {/* TOP SECTION */}
      <div className={styles.top}>
        <span>PrizePool: ₹{room.cost * room.participants_count}</span>

        <div className={styles.time}>
          <span>Start: {new Date(room.created_at).toLocaleString()}</span>
          <span>End: {new Date(room.end_date).toLocaleString()}</span>
        </div>
      </div>

      {/* DETAILS */}
      <div className={styles.details}>
        <span>Room Name: {room.name}</span>
        <span>Participants: {room.participants_count}</span>
        <span>Description: {room.description}</span>

        {!joined && (
          <button
            className={styles.joinBtn}
            onClick={handleJoin}
            disabled={joining}
          >
            {joining ? "Joining..." : "Join Room"}
          </button>
        )}
      </div>

      {/* LEADERBOARD ONLY */}
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
              {leaderboard.map((row, i) => (
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

    </div>
  );
}
