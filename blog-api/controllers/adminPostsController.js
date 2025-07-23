const pool = require("../db/pool");

exports.renderNewPostForm = (req, res) => {
  res.render("postForm", { post: null });
};

exports.createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    await pool.query(
      "INSERT INTO posts (title, content, created_at) VALUES ($1, $2, NOW())",
      [title, content]
    );
    res.redirect("/admin");
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).send("Server error");
  }
};
