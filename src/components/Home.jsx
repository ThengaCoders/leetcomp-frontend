import React from 'react';
import styles from './Home.module.css';

const Home = () => {
  return (
    <>
      <header> [ Header Component ] </header>

      {}
      <main className={styles['home-container']}>
        
        <div className={styles['brand-wrapper']}>
          <i className={`fa-solid fa-code ${styles['logo-icon']}`}></i>
          <h1 className={styles['brand-title']}>LeeComp</h1>
        </div>
        
        <p className={styles['tagline']}>Where Lee's meet to compete</p>

        <input 
            type="text" 
            className={styles['search-input']} 
            placeholder="Search for a room..." 
        />

        <button className={styles['create-btn']}>Create Room</button>

      </main>

      
    </>
  );
};

export default Home;