import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./CreatePost.module.css";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://blog-api-demo-r8ot.onrender.com/admin/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ title, content, image }),
        }
      );

      if (!res.ok) {
        const contentType = res.headers.get("content-type");
        let errorMessage = "Error al crear el post";

        if (contentType && contentType.includes("application/json")) {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          errorMessage = await res.text(); // captura texto plano (como "No tienes permisos...")
        }

        throw new Error(errorMessage);
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
        <label className={styles.inputLabel} htmlFor="image">
          Imagen:
        </label>
        <input
          id="image"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className={styles.inputField}
          required
        />
      </div>
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
