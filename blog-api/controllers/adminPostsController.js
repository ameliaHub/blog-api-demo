const pool = require("../db/pool");

exports.renderNewPostForm = (req, res) => {
  // res.render("postForm", { post: null });
};

exports.createPost = async (req, res) => {
  const { title, content, image } = req.body;
  const authorId = req.user.id;
  try {
    await pool.query(
      "INSERT INTO posts (title, content, author_id, image, created_at) VALUES ($1, $2, $3, $4, NOW())",
      [title, content, authorId, image]
    );
    res.redirect("/admin");
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.renderAdminPosts = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM posts ORDER BY created_at DESC"
    );
    // res.render("adminPosts", { posts: result.rows });
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.renderEditPostForm = async (req, res) => {
  const postId = req.params.id;

  try {
    const result = await pool.query("SELECT * FROM posts WHERE id = $1", [
      postId,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).send("Post not found");
    }
    res.render("postForm", { post: result.rows[0] });
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content, image } = req.body;
    await pool.query(
      "UPDATE posts SET title = $1, content = $2, image = $3 WHERE id = $4",
      [title, content, image, postId]
    );
    res.redirect("/admin");
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    await pool.query("DELETE FROM posts WHERE id = $1", [postId]);
    res.redirect("/admin");
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ message: "Server error" });
  }
};
