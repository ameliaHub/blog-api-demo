import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div>
      <h2>Panel de Administración</h2>
      <Link to="/admin/create">Crear nuevo post</Link>
      <br />
      <Link to="/admin/manage">Gestionar posts</Link>
    </div>
  );
}
