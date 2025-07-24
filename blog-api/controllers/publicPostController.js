const pool = require("../db/pool");
const db = require("../db/queries");

exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const result = await pool.query(
      `SELECT posts.*, users.username AS author
       FROM posts
       LEFT JOIN users ON posts.author_id = users.id
       WHERE posts.id = $1`,
      [postId]
    );
    const post = result.rows[0];

    if (!post) {
      return res.status(404).json("Post not found");
    }

    const comments = await db.getCommentsByPostId(postId);
    res.json({ post, comments });
    //res.render("post", { post, comments, user: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
};
