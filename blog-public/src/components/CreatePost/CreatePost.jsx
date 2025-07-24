import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./CreatePost.module.css";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/admin/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al crear el post");
      }

      alert("Post creado correctamente");
      navigate("/admin/manage"); // Redirige después de crear
    } catch (error) {
      console.error("Error al crear el post:", error);
      alert("Error al crear el post");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.formTitle}>Crear nuevo post</h2>

      <div className={styles.inputGroup}>
        <label className={styles.inputLabel} htmlFor="title">
          Título:
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.inputField}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.inputLabel} htmlFor="content">
          Contenido:
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.textareaField}
          rows={6}
          required
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Crear
      </button>
    </form>
  );
}
