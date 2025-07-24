const express = require("express");
const router = express.Router();
const { getAllPostPreviews } = require("../db/queries");

router.get("/posts", async (req, res) => {
  try {
    const posts = await getAllPostPreviews();

    res.json(posts);
    //res.render("index", { posts });
  } catch (err) {
    console.error("Error obteniendo los posts:", err);
    res.status(500).json("Error interno del servidor");
  }
});

module.exports = router;
