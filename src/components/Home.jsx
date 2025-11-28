import React, { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';

const Home = () => {
  const hackerTextRef = useRef(null);
  const [showUI, setShowUI] = useState(false); 

  useEffect(() => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const element = hackerTextRef.current;
    
    if (!element) return;

    const targetText = element.getAttribute("data-value");
    let iteration = -2; 

    // 1. Start Decipher Effect
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

    // 2. Reveal UI after 1 second
    const timer = setTimeout(() => {
        setShowUI(true);
    }, 1000); 

    return () => {
        clearInterval(interval);
        clearTimeout(timer);
    };
  }, []);

  return (
    <main className={styles.homeContainer}>
      
      <div className={styles.brandWrapper}>
        <i className={`fa-solid fa-code ${styles.logoIcon}`}></i>
        <h1 
          className={styles.brandTitle} 
          ref={hackerTextRef} 
          data-value="LeeComp"
        >
          {/* Empty initially */}
        </h1>
      </div>
      
      {/* We use string interpolation to add the 'visible' class conditionally */}
      <div className={`${styles.uiContainer} ${showUI ? styles.visible : ''}`}>
          
          <p className={styles.tagline}>Where Lee's meet to compete</p>

          <input 
              type="text" 
              className={styles.searchInput} 
              placeholder="Search for a room..." 
          />

          <button className={styles.createBtn}>Create Room</button>
      </div>

    </main>
  );
};

export default Home;