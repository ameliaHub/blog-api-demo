import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className="logo">Mi Blog</div>
      <div className={styles.navLinks}>
        <Link to="/login" className={styles.link}>
          Login
        </Link>
        <Link to="/signup" className={styles.link}>
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
