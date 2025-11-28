import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  const navigate = useNavigate();
  const [isRoutesOpen, setIsRoutesOpen] = useState(false);
  const dropdownRef = useRef(null);

  const routeOptions = [
    { label: "Home", path: "/" },
    { label: "Login", path: "/login" },
    { label: "Onboard", path: "/onboard" },
    { label: "Rooms Search", path: "/rooms/search" },
    { label: "Create Room", path: "/rooms/create" },
    { label: "My Rooms", path: "/rooms" },
    { label: "Room Details", path: "/rooms/demo-room" },
    // { label: "Payout Dashboard", path: "/payout-dashboard" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
          end
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          My Rooms
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Sign In
        </NavLink>

        <div className={styles.routesWrapper} ref={dropdownRef}>
          <button
            className={styles.routesToggle}
            onClick={() => setIsRoutesOpen((prev) => !prev)}
            aria-expanded={isRoutesOpen}
          >
            Routes
            <span aria-hidden="true">▾</span>
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
