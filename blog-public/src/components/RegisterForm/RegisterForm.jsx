import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./RegisterForm.module.css";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
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
      const res = await fetch(
        "https://blog-api-demo-r8ot.onrender.com/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          credentials: "include", // para enviar cookies
        }
      );

      const data = await res.json();

      if (res.ok) {
        //alert("Usuario creado con éxito");
        navigate("/login");
      } else {
        setErrorMsg(data.message || "Error en el registro");
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
        <p>
          Al continuar, estás creando una cuenta en BLOG y aceptas nuestro{" "}
          <a
            href=""
            onClick={(e) => e.preventDefault()}
            rel="noopener noreferrer"
          >
            Acuerdo de Usuario
          </a>{" "}
          y la{" "}
          <a
            href=""
            onClick={(e) => e.preventDefault()}
            rel="noopener noreferrer"
          >
            Política de Privacidad
          </a>
          .
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.formContainer} noValidate>
        <h2 className={styles.formTitle}>Crear cuenta</h2>

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
            autoComplete="new-password"
            required
          />
        </div>

        {errorMsg && <p className={styles.errorMessage}>{errorMsg}</p>}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={!formData.username || !formData.password}
        >
          Registrarse
        </button>
      </form>
    </>
  );
}
