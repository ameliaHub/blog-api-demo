const pool = require("./pool");

async function getAllPostPreviews() {
  const result = await pool.query(`
    SELECT id, title, content, created_at
    FROM posts
    ORDER BY created_at DESC
  `);

  // Devuelve resumen (primeras 30 palabras)
  return result.rows.map((post) => ({
    ...post,
    summary: post.content.split(" ").slice(0, 30).join(" ") + "...",
  }));
}

module.exports = {
  getAllPostPreviews,
};
