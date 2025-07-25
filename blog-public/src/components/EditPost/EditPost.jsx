// src/components/AdminDashboard/EditPost.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./EditPost.module.css";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  // Cargar los datos del post al montar
  useEffect(() => {
    fetch(`https://blog-api-demo-r8ot.onrender.com/posts/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.post.title);
        setContent(data.post.content);
        setImage(data.post.image);
      })
      .catch((err) => console.error("Error al cargar el post:", err));
  }, [id]);

  // Enviar cambios
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://blog-api-demo-r8ot.onrender.com/admin/posts/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ title, content, image }),
    })
      .then((res) => {
        if (res.ok) {
          //alert("Post actualizado correctamente");
          navigate("/admin/manage");
        } else {
          throw new Error("Error al actualizar");
        }
      })
      .catch((err) => console.error("Error al editar el post:", err));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Editar Post</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Imagen:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className={styles.inputField}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={styles.inputField}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Contenido:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className={styles.textareaField}
            rows={8}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
