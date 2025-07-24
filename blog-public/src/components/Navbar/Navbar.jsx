import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className={styles.navbar}>
      <Link to="/" className="logo">
        Mi Blog
      </Link>
      <div className={styles.navLinks}>
        {user ? (
          <>
            <span className={styles.userGreeting}>Hola, {user.username}</span>
            <button onClick={logout} className={styles.logoutButton}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.link}>
              Login
            </Link>
            <Link to="/signup" className={styles.link}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
