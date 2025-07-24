import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import styles from "./PostDetail.module.css";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const user = useContext(AuthContext).user;

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data.post);
        setComments(data.comments);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/posts/${id}/comments`, {
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
        const fakeComment = {
          content: newComment,

          author: user.username, // o como se llame tu user
          created_at: new Date().toISOString(), // o null
        };

        setComments((prev) => [...prev, fakeComment]);
        setNewComment("");
      });
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{post.title}</h2>
      <p className={styles.content}>{post.content}</p>

      <h3 className={styles.subtitle}>Comments</h3>
      <ul className={styles.commentList}>
        {comments.map((c) => (
          <li key={c.id} className={styles.commentItem}>
            <strong className={styles.commentAuthor}>{c.author}:</strong>{" "}
            {c.content}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className={styles.form}>
        <textarea
          className={styles.textarea}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          rows={3}
        />
        <button type="submit" className={styles.button}>
          Add Comment
        </button>
      </form>
    </div>
  );
}
