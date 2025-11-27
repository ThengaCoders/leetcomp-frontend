// components/Search.jsx

import React, { useState } from "react";
import styles from "./Search.module.css";
import RoomCard from './RoomsSlider/RoomCard'; 

export default function Search() {
  const [query, setQuery] = useState("");

  
  const mockRooms = [
    {
      id: 1,
      name: "JavaScript Interview Prep",
      participants: 12,
      cost: 50,
      prize: 500,
      days: 1,
      hrs: 4,
      mins: 22,
    },
  ];

  return (
    <div className={styles.searchPageContainer}> 
      
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search for a room"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.searchInput}
        />
        <button className={styles.searchBtn}>🔍</button>
      </div>
              {/*ithrem searchbox sanangal*/}


    
      {/* 3. Card Grid: Map over the mockRooms array 
      from roomssslider */}
     <div className={styles.cardGrid}>
        {/* * 2. Conditional Rendering: Uses the map function only if a room is found (length > 0).
        * This ensures the component handles both the 0 and 1 result states gracefully.
        */}
        {mockRooms.length > 0 && mockRooms.map((room) => (
          <RoomCard 
            key={room.id} // Essential for lists in React
            room={room}    // Passes room data to the card component
          />
        ))}

        {mockRooms.length === 0 && (
            <p className={styles.noResultsMessage}>Try searching for a different room.</p>
        )}
      </div>
    </div>
  );
}
