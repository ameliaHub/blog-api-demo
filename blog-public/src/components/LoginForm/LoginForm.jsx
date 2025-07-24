import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = { message: "Respuesta no JSON del servidor" };
      }

      if (res.ok) {
        alert("Login exitoso");
        setUser(data.user);
        navigate("/");
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.formTitle}>Login</h2>

      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>Username</label>
        <input
          name="username"
          placeholder="Usuario"
          value={formData.username}
          onChange={handleChange}
          className={styles.inputField}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          className={styles.inputField}
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Log In
      </button>
    </form>
  );
}
