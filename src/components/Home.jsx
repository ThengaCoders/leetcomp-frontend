import React from 'react';
import styles from './Home.module.css';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && search.trim() !== "") {
      navigate(`/rooms/search?code=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <>
      <main className={styles['home-container']}>
        
        <div className={styles['brand-wrapper']}>
          <i className={`fa-solid fa-code ${styles['logo-icon']}`}></i>
          <h1 className={styles['brand-title']}>LeeComp</h1>
        </div>
        
        <p className={styles['tagline']}>Where Lee's meet to compete</p>

        <input
          type="text"
          className={styles["search-input"]}
          placeholder="Search for a room..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <NavLink to="/rooms/create">
          <button className={styles['create-btn']}>Create Room</button>
        </NavLink>

      </main>

      
    </>
  );
};

export default Home;