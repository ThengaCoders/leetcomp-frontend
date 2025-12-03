import React from "react";
import { Navigate } from "react-router-dom";
import { ADMIN_EMAILS } from "../config/admins";

function getUserEmail() {
  try {
    const profile = JSON.parse(localStorage.getItem("user_profile"));
    return profile?.email || null;
  } catch {
    return null;
  }
}

export default function AdminRoute({ children }) {
  const email = getUserEmail();

  if (!email) return <Navigate to="*" replace />;

  // check membership (case-insensitive)
  const isAdmin = ADMIN_EMAILS.some(
    (ae) => ae.toLowerCase() === email.toLowerCase()
  );

  if (!isAdmin) return <Navigate to="*" replace />;

  return children;
}
