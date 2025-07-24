import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
import { AuthContext } from "../../context/AuthContext";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setErrorMsg("Por favor rellena todos los campos");
      return;
    }
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
        alert("Inicio de sesión exitoso");
        setUser(data.user);
        navigate("/");
      } else {
        setErrorMsg(data.message || "Error en el inicio de sesión");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Error de conexión");
    }
  }

  return (
    <>
      <div className={styles.welcomeMessage}>
        <h2>Bienvenido a BLOG!</h2>
        <p>Para continuar, por favor inicia sesión con tu cuenta.</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.formContainer} noValidate>
        <h2 className={styles.formTitle}>Iniciar sesión</h2>

        <div className={styles.inputGroup}>
          <label htmlFor="username" className={styles.inputLabel}>
            Usuario
          </label>
          <input
            id="username"
            name="username"
            placeholder="Usuario"
            value={formData.username}
            onChange={handleChange}
            className={styles.inputField}
            autoComplete="username"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.inputLabel}>
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className={styles.inputField}
            autoComplete="current-password"
            required
          />
        </div>

        {errorMsg && <p className={styles.errorMessage}>{errorMsg}</p>}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={!formData.username || !formData.password}
        >
          Acceder
        </button>
      </form>
    </>
  );
}
