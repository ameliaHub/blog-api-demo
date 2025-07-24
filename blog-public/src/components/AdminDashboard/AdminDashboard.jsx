import { Link } from "react-router-dom";
import styles from "./AdminDashboard.module.css";

export default function AdminDashboard() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Panel de Administración</h2>
      <Link to="/admin/create" className={styles.linkButton}>
        Crear nuevo post
      </Link>
      <Link to="/admin/manage" className={styles.linkButton}>
        Gestionar posts
      </Link>
    </div>
  );
}
