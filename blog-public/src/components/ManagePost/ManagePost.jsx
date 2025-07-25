import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./ManagePost.module.css";

const ManagePost = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          "https://blog-api-demo-r8ot.onrender.com/preview/posts",
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Error al obtener posts:", err);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este post?")) return;

    try {
      const res = await fetch(
        `https://blog-api-demo-r8ot.onrender.com/admin/posts/${id}/delete`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (res.ok) {
        setPosts(posts.filter((post) => post.id !== id));
      } else {
        console.error("Error al eliminar post");
      }
    } catch (err) {
      console.error("Error al eliminar post:", err);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Gestionar Posts</h2>
      {posts.length === 0 ? (
        <p className={styles.noPosts}>No hay posts.</p>
      ) : (
        <ul className={styles.postList}>
          {posts.map((post) => (
            <li key={post.id} className={styles.postItem}>
              <h3 className={styles.postTitle}>{post.title}</h3>
              <p className={styles.postSummary}>{post.summary}</p>
              <div className={styles.buttons}>
                <button
                  className={styles.editButton}
                  onClick={() => navigate(`/admin/edit/${post.id}`)}
                >
                  Editar
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(post.id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManagePost;
