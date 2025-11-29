import React, { useEffect, useState } from "react";
import RoomsSlider from "../components/RoomsSlider/RoomsSlider";
import api from "../api/axios";
import styles from "./RoomsPage.module.css";

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRooms() {
      try {
        const res = await api.get("/api/rooms/");

        const transformed = res.data.map((room) => {
          const end = new Date(room.end_date);
          const now = new Date();
          const diffMs = end - now;

          let days = 0,
            hrs = 0,
            mins = 0;

          if (diffMs > 0) {
            days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            hrs = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
            mins = Math.floor((diffMs / (1000 * 60)) % 60);
          }

          return {
            name: room.name,
            participants: room.participant_count,
            cost: room.cost,
            prize: room.cost * room.participant_count,
            days,
            hrs,
            mins,
          };
        });

        setRooms(transformed);
      } catch (err) {
        console.log(err);
        setError("Failed to load rooms");
      } finally {
        setLoading(false);
      }
    }

    fetchRooms();
  }, []);

  if (loading) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.statusBox}>
            <h2 className={styles.statusTitle}>Loading Rooms...</h2>
            <p className={styles.statusText}>Please wait while we fetch your rooms.</p>
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
            <h2 className={styles.statusTitle}>Error</h2>
            <p className={styles.statusText}>{error}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      {rooms.length > 0 ? (
        <div>
          <main>
            <RoomsSlider rooms={rooms} />
          </main>
        </div>
        ) : (
        <div className={styles.page}>
          <main className={styles.main}>
            <div className={styles.statusBox}>
              <h2 className={styles.statusTitle}>No Rooms Found</h2>
              <p className={styles.statusText}>You have no rooms to display</p>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default RoomsPage;