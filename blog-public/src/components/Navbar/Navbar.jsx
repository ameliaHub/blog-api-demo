import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        BLOG
      </Link>
      <div className={styles.navLinks}>
        {user ? (
          <>
            <span className={styles.userGreeting}>Hola, {user.username}</span>
            {user.role == "admin" ? (
              <Link to="/admin" className={styles.link}>
                Centro de control
              </Link>
            ) : null}
            <button onClick={logout} className={styles.logoutButton}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.link}>
              Iniciar Sesión
            </Link>
            <Link to="/signup" className={styles.link}>
              Registrase
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
