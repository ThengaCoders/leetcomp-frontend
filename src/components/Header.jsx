import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getToken } from "../auth/tokenStore";
import { logout } from "../auth/logout";
import styles from "./Header.module.css";

export default function Header() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(!!getToken());
  const [isRoutesOpen, setIsRoutesOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoggedIn(!!getToken()); // sync token changes
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    await logout(navigate);
  };

  const routeOptions = [
    { label: "Home", path: "/" },
    { label: "Login", path: "/login" },
    { label: "Onboard", path: "/onboard" },
    { label: "Rooms Search", path: "/rooms/search" },
    { label: "Create Room", path: "/rooms/create" },
    { label: "My Rooms", path: "/rooms" },
    { label: "Room Details", path: "/rooms/demo-room" },
    { label: "Payout Dashboard", path: "/payout-dashboard" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsRoutesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRouteNavigate = (path) => {
    setIsRoutesOpen(false);
    navigate(path);
  };

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
        <NavLink
          to="/rooms"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          My Rooms
        </NavLink>

        {loggedIn ? (
          <button onClick={handleLogout} className={styles.navLinkBtn}>
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

        <div className={styles.routesWrapper} ref={dropdownRef}>
          <button
            className={styles.routesToggle}
            onClick={() => setIsRoutesOpen((prev) => !prev)}
          >
            Routes ▾
          </button>

          {isRoutesOpen && (
            <div className={styles.routesDropdown}>
              {routeOptions.map((route) => (
                <button
                  key={route.path}
                  className={styles.routeItem}
                  onClick={() => handleRouteNavigate(route.path)}
                >
                  <span className={styles.routeLabel}>{route.label}</span>
                  <span className={styles.routePath}>{route.path}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}