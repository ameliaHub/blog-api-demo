import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ManagePost = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:3000/preview/posts", {
          credentials: "include",
        });
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
        `http://localhost:3000/admin/posts/${id}/delete`,
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
    <div>
      <h2>Gestionar Posts</h2>
      {posts.length === 0 ? (
        <p>No hay posts.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id} style={{ marginBottom: "1rem" }}>
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
              <button onClick={() => navigate(`/admin/edit/${post.id}`)}>
                Editar
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                style={{ marginLeft: "0.5rem" }}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManagePost;
