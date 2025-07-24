const pool = require("./pool");

async function getAllPostPreviews() {
  const result = await pool.query(`
    SELECT id, title, content, image, created_at
    FROM posts
    ORDER BY created_at DESC
  `);

  // Devuelve resumen (primeras 30 palabras)
  return result.rows.map((post) => ({
    ...post,
    summary: post.content.split(" ").slice(0, 30).join(" ") + "...",
  }));
}

// Obtener comentarios de un post
async function getCommentsByPostId(postId) {
  const result = await pool.query(
    `SELECT comments.id, comments.content, comments.created_at, users.username AS author
     FROM comments
     JOIN users ON comments.user_id = users.id
     WHERE comments.post_id = $1
     ORDER BY comments.created_at ASC`,
    [postId]
  );
  return result.rows;
}

// Añadir comentario
async function addComment(postId, authorId, content) {
  await pool.query(
    `INSERT INTO comments (post_id, user_id, content) VALUES ($1, $2, $3)`,
    [postId, authorId, content]
  );
}

module.exports = {
  getAllPostPreviews,
  getCommentsByPostId,
  addComment,
};
