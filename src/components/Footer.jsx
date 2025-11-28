import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.myFooter}>
      <div className={styles.line}></div>
      <p className={styles.text}>© Copyrighted by Thenga Coders</p>
    </footer>
  );
}
