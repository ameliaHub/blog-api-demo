const pool = require("../db/pool");
const db = require("../db/queries");

exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const result = await pool.query("SELECT * FROM posts WHERE id = $1", [
      postId,
    ]);
    const post = result.rows[0];

    if (!post) {
      return res.status(404).send("Post not found");
    }

    const comments = await db.getCommentsByPostId(postId);
    res.json({ post, comments });
    //res.render("post", { post, comments, user: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
