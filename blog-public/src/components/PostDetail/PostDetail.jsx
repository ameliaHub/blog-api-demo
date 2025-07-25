import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

import styles from "./PostDetail.module.css";

export default function PostDetail() {
  const { id } = useParams();
  const user = useContext(AuthContext).user;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetch(`https://blog-api-demo-r8ot.onrender.com/posts/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setPost(data.post);
        setComments(data.comments);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://blog-api-demo-r8ot.onrender.com/posts/${id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // para que mande cookies
      body: JSON.stringify({ content: newComment }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al añadir comentario");
        return res.json();
      })
      .then(() => {
        const realComment = {
          content: newComment,
          author: user.username,
          created_at: new Date().toISOString(),
        };

        setComments((prev) => [...prev, realComment]);
        setNewComment("");
      });
  };

  if (!post) return <p className={styles.statusMessage}>Cargando...</p>;

  return (
    <article className={styles.container}>
      <header>
        <img src={post.image} alt={post.title} className={styles.postImage} />
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.meta}>
          <span className={styles.author}>
            Autor: {post.author ?? "Anónimo"}
          </span>
          <time dateTime={post.created_at}>
            {new Date(post.created_at).toLocaleDateString()}
          </time>
        </p>
      </header>

      <section className={styles.content}>
        {/* Si el contenido está en HTML, usar dangerouslySetInnerHTML */}
        {/* <div dangerouslySetInnerHTML={{ __html: post.content }} /> */}
        <p>{post.content}</p>
      </section>

      <section aria-label="Comentarios" className={styles.commentsSection}>
        <h2 className={styles.subtitle}>Comentarios</h2>
        {comments.length === 0 ? (
          <p className={styles.noComments}>Sé el primero en comentar.</p>
        ) : (
          <ul className={styles.commentList}>
            {comments.map((c) => (
              <li key={c.id ?? c.created_at} className={styles.commentItem}>
                <strong className={styles.commentAuthor}>{c.author}:</strong>{" "}
                <span>{c.content}</span>
                <time
                  dateTime={c.created_at}
                  className={styles.commentDate}
                  title={new Date(c.created_at).toLocaleString()}
                >
                  {" "}
                  · {new Date(c.created_at).toLocaleDateString()}
                </time>
              </li>
            ))}
          </ul>
        )}

        {user ? (
          <form
            onSubmit={handleSubmit}
            className={styles.form}
            aria-label="Formulario para añadir comentario"
          >
            <textarea
              className={styles.textarea}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe un comentario..."
              rows={3}
              required
            />
            <button type="submit" className={styles.button}>
              Añadir comentario
            </button>
          </form>
        ) : (
          <p className={styles.loginNotice}>
            Debes <a href="/login">iniciar sesión</a> para comentar.
          </p>
        )}
      </section>
    </article>
  );
}
