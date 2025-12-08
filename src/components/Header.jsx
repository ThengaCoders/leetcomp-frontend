import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getToken } from "../auth/tokenStore";
import { logout } from "../auth/logout";
import styles from "./Header.module.css";
import { useDarkMode } from "../context/DarkModeProvider";
import api from "../api/axios";

export default function Header() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(!!getToken());
  const [user, setUser] = useState(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const mobileMenuRef = useRef(null);
  const profileMenuRef = useRef(null);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // Fetch user profile only when logged in
  useEffect(() => {
    if (!loggedIn) return;

    async function fetchUser() {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    }

    fetchUser();
  }, [loggedIn]);

  // Track login status
  useEffect(() => {
    const interval = setInterval(() => {
      setLoggedIn(!!getToken());
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // Logout
  const handleLogout = async () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );
    if (!confirmLogout) return;

    await logout(navigate);
    setIsProfileMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(e.target)
      ) {
        setIsProfileMenuOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target)
      ) {
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

      {/* RIGHT SIDE */}
      <div className={styles.rightGroup}>
        {/* GitHub */}
        <a
          href="https://github.com/ThengaCoders"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.githubButton}
        >
          <i
            className="fab fa-github"
            style={{ fontSize: "35px", color: "var(--text-primary1)" }}
          ></i>
        </a>

        {/* Dark Mode */}
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
            end
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            My Rooms
          </NavLink>

          <NavLink
            to="/rooms/search"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Search
          </NavLink>

          <NavLink
            to="/rooms/create"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Create
          </NavLink>

          {/* Desktop Profile Icon */}
          {loggedIn && user ? (
            <div className={styles.profileWrapper} ref={profileMenuRef}>
              <img
                src={user.picture || "/default-avatar.png"}
                className={styles.profileAvatar}
                onClick={() =>
                  setIsProfileMenuOpen((prev) => !prev)
                }
                alt="Profile"
              />

              {isProfileMenuOpen && (
                <div className={styles.profileDropdown}>
                  <button
                    className={styles.dropdownItem}
                    onClick={() => {
                      navigate("/settings");
                      setIsProfileMenuOpen(false);
                    }}
                  >
                    <i className="fa-solid fa-gear"></i> Settings
                  </button>

                  <button
                    className={styles.dropdownItem}
                    onClick={handleLogout}
                  >
                    <i className="fa-solid fa-sign-out-alt"></i> Logout
                  </button>
                </div>
              )}
            </div>
          ) : !loggedIn ? (
            <NavLink to="/login" className={styles.navLink}>
              Sign In
            </NavLink>
          ) : null}
        </nav>

        {/* MOBILE MENU */}
        <div className={styles.mobileMenuWrapper} ref={mobileMenuRef}>
          <button
            className={`${styles.hamburgerBtn} ${
              isMobileMenuOpen ? styles.active : ""
            }`}
            onClick={() =>
              setIsMobileMenuOpen((prev) => !prev)
            }
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>

          {isMobileMenuOpen && (
            <div className={styles.mobileMenu}>
              <NavLink
                to="/rooms"
                onClick={() => setIsMobileMenuOpen(false)}
                className={styles.mobileMenuItem}
              >
                <i className="fa-solid fa-door-open"></i> My Rooms
              </NavLink>

              <NavLink
                to="/rooms/search"
                onClick={() => setIsMobileMenuOpen(false)}
                className={styles.mobileMenuItem}
              >
                <i className="fa-solid fa-magnifying-glass"></i> Search
              </NavLink>

              <NavLink
                to="/rooms/create"
                onClick={() => setIsMobileMenuOpen(false)}
                className={styles.mobileMenuItem}
              >
                <i className="fa-solid fa-plus"></i> Create
              </NavLink>

              {/* Settings inside hamburger */}
              {loggedIn && (
                <button
                  onClick={() => {
                    navigate("/settings");
                    setIsMobileMenuOpen(false);
                  }}
                  className={styles.mobileMenuItem}
                >
                  <i className="fa-solid fa-gear"></i> Settings
                </button>
              )}

              {/* Logout */}
              {loggedIn ? (
                <button
                  onClick={handleLogout}
                  className={styles.mobileMenuItem}
                >
                  <i className="fa-solid fa-sign-out-alt"></i> Logout
                </button>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={styles.mobileMenuItem}
                >
                  <i className="fa-solid fa-sign-in-alt"></i> Sign In
                </NavLink>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
