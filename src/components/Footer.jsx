import React from 'react'

export default function Footer() {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} LeeComp. All rights reserved.</p>
    </footer>
  );
}