import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./RegisterForm.module.css";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Usuario creado con éxito");
        navigate("/login"); // Redirigir a login después del registro
        // aquí puedes redirigir o limpiar formulario
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
      <h2 className={styles.formTitle}>Create Account</h2>

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
        Sign Up
      </button>
    </form>
  );
}
