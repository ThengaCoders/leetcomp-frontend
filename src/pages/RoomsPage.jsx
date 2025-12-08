import React, { useState, useEffect } from "react";
import RoomsSlider from "../components/RoomsSlider/RoomsSlider";
import api from "../api/axios";
import styles from "./RoomsPage.module.css";

export default function MyRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("Active");

  useEffect(() => {
    async function fetchRooms() {
      try {
        setLoading(true);
        const res = await api.get("/api/rooms/");

        const transformed = res.data.map((room) => {
          const now = Date.now();
          const endTime = new Date(room.end_date).getTime();
          const diff = Math.max(endTime - now, 0);

          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const mins = Math.floor((diff / (1000 * 60)) % 60);

          return {
            id: room.id,
            name: room.roomName,
            participants: room.participant_count,
            cost: room.cost,
            prize: room.participant_count * room.cost,
            img: room.img_url,
            status: room.status.toLowerCase(),
            isMember: room.isMember,
            days,
            hrs,
            mins,
            isEnded:
              room.status.toLowerCase() === "ended" ||
              room.status.toUpperCase() === "FINISHED",
          };
        });

        setRooms(transformed);
      } catch (err) {
        console.error(err);
        setError("Failed to load rooms");
      } finally {
        setLoading(false);
      }
    }

    fetchRooms();
  }, []);

  if (loading)
    return (
      <div className={styles.statusBox}>
        <p className={styles.statusTitle}>Loading rooms...</p>
      </div>
    );

  if (error)
    return (
      <div className={styles.statusBox}>
        <p className={styles.statusTitle}>{error}</p>
      </div>
    );

  const activeRooms = rooms.filter((r) => !r.isEnded);
  const endedRooms = rooms.filter((r) => r.isEnded);
  const displayedRooms = activeTab === "Active" ? activeRooms : endedRooms;

  return (
    <div className={styles.roomDetails}>
      {/* Tabs */}
      <div className={styles.tabs}>
        {["Active", "Closed"].map((tab) => (
          <div
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <div className={styles.cardGrid}>
        {displayedRooms.length > 0 ? (
          <RoomsSlider rooms={displayedRooms} />
        ) : (
          <p className={styles.noResultsMessage}>
          No room found.
          </p>
        )}
      </div>
    </div>
  );
}

