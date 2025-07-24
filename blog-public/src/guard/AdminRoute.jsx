import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    // No logueado → redirigir a login
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    // No es admin → redirigir a página pública o mostrar error
    return <Navigate to="/" />;
  }

  // Es admin → mostrar contenido
  return children;
}
