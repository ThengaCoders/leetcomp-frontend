import React, { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';
import { NavLink, useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  
  const hackerTextRef = useRef(null);
  const [showUI, setShowUI] = useState(false); // Controls the fade-in

  useEffect(() => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const element = hackerTextRef.current;
    
    if (!element) return;

    const targetText = element.getAttribute("data-value");
    let iteration = -2; 

    // Start Hacker Text Effect
    const interval = setInterval(() => {
      element.innerText = targetText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return targetText[index];
          }
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration >= targetText.length) { 
        clearInterval(interval);
      }
      
      iteration += 1 / 3; 
    }, 30);

    // Trigger UI Fade-in after 1 second
    const timer = setTimeout(() => {
        setShowUI(true);
    }, 1000); 

    // Cleanup
    return () => {
        clearInterval(interval);
        clearTimeout(timer);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && search.trim() !== "") {
      navigate(`/rooms/search?code=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <main className={styles['home-container']}>
      
      <div className={styles['brand-wrapper']}>
        <i className={`fa-solid fa-code ${styles['logo-icon']}`}></i>
        
        {/* The Text Ref is here for the animation */}
        <h1 
          className={styles['brand-title']} 
          ref={hackerTextRef} 
          data-value="LeetComp"
        >
          {/* Text is empty initially, filled by JS */}
        </h1>
      </div>
      <div className={`${styles['ui-container']} ${showUI ? styles['visible'] : ''}`}>
          
          <p className={styles['tagline']}>Where Lee's meet to compete</p>
          <input
            type="text"
            className={styles['search-input']}
            placeholder="Search for a room..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <NavLink to="/rooms/create">
            <button className={styles['create-btn']}>Create Room</button>
          </NavLink>

      </div>

    </main>
  );
};

export default Home;