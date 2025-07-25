import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./PostList.module.css";

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://blog-api-demo-r8ot.onrender.com/preview/posts", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={styles.container}>
      {posts.length === 0 && <p>No hay posts aún.</p>}
      <ul>
        {posts.map((post) => (
          <li key={post.id} className={styles.postItem}>
            <Link to={`/posts/${post.id}`} className={styles.link}>
              <img
                src={post.image}
                alt={post.title}
                className={styles.postImage}
              />
              <h3 className={styles.postTitle}>{post.title}</h3>
              <p className={styles.postAuthor}> {post.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
