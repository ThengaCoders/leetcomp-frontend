import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.myFooter}>
      <div className={styles.line}></div>

      {/* Content Row - Copyright and Legal Links */}
      <div className={styles.contentRow}>
        <p className={styles.text}>© Copyrighted by Thenga Coders</p>
        
        <div className={styles.linksWrapper}>
          <Link to="/privacy-policy" className={styles.link}>Privacy Policy</Link>
          <span className={styles.dot}>•</span>
          <Link to="/terms" className={styles.link}>Terms & Conditions</Link>
          <span className={styles.dot}>•</span>
          <Link to="/refund-policy" className={styles.link}>Refund Policy</Link>
          <span className={styles.dot}>•</span>
          <Link to="/contact" className={styles.link}>Contact Us</Link>
          <span className={styles.dot}>•</span>
          <Link to="/about" className={styles.link}>About Us</Link>
        </div>
      </div>
    </footer>
  );
}
