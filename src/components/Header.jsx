import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
 

  return (
    <header className={styles.siteHeader}>
      <div className={styles.logo}>
      	<NavLink to="/" className={styles.logoLink}>
      		<span className={styles.logoSymbol}>
    <i className="fa-solid fa-code"></i>
</span>
      		<span className={styles.logoText}>LeeComp</span>
      	</NavLink>
      </div>
      <nav className={styles.mainNav}>
        
        {/* Use className function to conditionally add the 'active' class */}
        <NavLink 
          to="/rooms/" 
          end
          className={({ isActive }) => 
            isActive 
              ? `${styles.navLink} ${styles.active}` 
              : styles.navLink
          }
        >
          MyRooms
        </NavLink>
        
        <NavLink 
          to="/signin" 
          className={({ isActive }) => 
            isActive 
              ? `${styles.navLink} ${styles.active}`
              : styles.navLink
          }
        >
          Sign In
        </NavLink>
      </nav>
    </header>
  );
}
