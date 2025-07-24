const db = require("../db/queries");

exports.getComments = async (req, res) => {
  const postId = req.params.id;
  try {
    const comments = await db.getCommentsByPostId(postId);
    res.json(comments);
  } catch (error) {
    res.status(500).send("Error al obtener comentarios");
  }
};

exports.addComment = async (req, res) => {
  const postId = req.params.id;
  const authorId = req.user.id; // Usuario logueado
  const { content } = req.body;

  try {
    await db.addComment(postId, authorId, content);
    res.status(201).json({ message: "Comment added successfully" });
  } catch (error) {
    res.status(500).send("Error al añadir comentario");
  }
};
