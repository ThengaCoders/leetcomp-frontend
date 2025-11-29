// components/Search.jsx

import React, { useState } from "react";
import styles from "./Search.module.css";
import RoomCard from './RoomsSlider/RoomCard'; 
import api from "../api/axios"; 

export default function Search() {
  const [query, setQuery] = useState("");
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchedOnce, setSearchedOnce] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearchedOnce(true);

    try {
      // Use api wrapper (token automatically added via interceptor)....thats why not axios
      const res = await api.get(`/api/rooms/search?code=${query}`);

      if (res.data.error) {
        setRooms([]);
        return;
      }

      const room = res.data;

      // Countdown calculation    
      const now = Date.now();
      const endTime = new Date(room.end_date).getTime();
      const diff = Math.max(endTime - now, 0);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);

      const transformed = {
        id: room.id,
        name: room.name,
        participants: room.participant_count,
        cost: room.cost,
        prize: room.participant_count * room.cost,
        days,
        hrs,
        mins,
        img: room.img_url
      };

      setRooms([transformed]);
    } catch (err) {
      console.error(err);
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.searchPageContainer}> 

      {/* Search Bar */}
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search for a room"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.searchInput}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}    //enter avumbo search trigger aavan
        />
        <button className={styles.searchBtn} onClick={handleSearch}>
          🔍
        </button>
      </div>

      {/* Search Results */}
      <div className={styles.cardGrid}>
        {loading && <p className={styles.noResultsMessage}>Searching...</p>}

        {!loading && rooms.length > 0 &&
          rooms.map((room) => <RoomCard key={room.id} room={room} />)}

        {!loading && rooms.length === 0 && searchedOnce && (
          <p className={styles.noResultsMessage}>
            No room found.
          </p>
        )}
      </div>

    </div>
  );
}

