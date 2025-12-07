import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getToken } from "../auth/tokenStore";
import { logout } from "../auth/logout";
import styles from "./Header.module.css";
import { useDarkMode } from "../context/DarkModeProvider";


export default function Header() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(!!getToken());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const interval = setInterval(() => {
      setLoggedIn(!!getToken());
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    await logout(navigate);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={styles.siteHeader}>
      {/* LOGO */}
      <div className={styles.logo}>
        <NavLink to="/" className={styles.logoLink}>
          <span className={styles.logoSymbol}>
            <i className="fa-solid fa-code"></i>
          </span>
          <span className={styles.logoText}>LeetComp</span>
        </NavLink>
      </div>

      {/* 🔥 RIGHT SIDE GROUP (GitHub + Desktop Nav + Hamburger) */}
      <div className={styles.rightGroup}>
        {/* GitHub Button */}
        <a
          href="https://github.com/ThengaCoders"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.githubButton}
        >
          
         <i className="fab fa-github" style={{fontSize: '35px', color: 'var(--text-primary1)'}}></i>
          
        </a>

         {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className={styles.darkModeToggle}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <i className="fa-solid fa-sun"></i>
          ) : (
            <i className="fa-solid fa-moon"></i>
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className={styles.mainNav}>
          <NavLink
            to="/rooms"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            My Rooms
          </NavLink>

          {loggedIn ? (
            <button
              onClick={handleLogout}
              className={`${styles.navLink} ${styles.logoutBtn}`}
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Sign In
            </NavLink>
          )}
        </nav>

        {/* Mobile Menu */}
        <div className={styles.mobileMenuWrapper} ref={mobileMenuRef}>
          <button
            className={`${styles.hamburgerBtn} ${isMobileMenuOpen ? styles.active : ""}`}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>

          {isMobileMenuOpen && (
            <div className={styles.mobileMenu}>
              <NavLink
                to="/rooms"
                className={({ isActive }) =>
                  isActive ? `${styles.mobileMenuItem} ${styles.active}` : styles.mobileMenuItem
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className="fa-solid fa-door-open"></i>
                My Rooms
              </NavLink>

              {loggedIn ? (
                <button
                  onClick={handleLogout}
                  className={`${styles.mobileMenuItem} ${styles.logoutBtn}`}
                >
                  <i className="fa-solid fa-sign-out-alt"></i>
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? `${styles.mobileMenuItem} ${styles.active}` : styles.mobileMenuItem
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <i className="fa-solid fa-sign-in-alt"></i>
                  Sign In
                </NavLink>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
