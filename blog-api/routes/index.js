const express = require("express");
const router = express.Router();
const { getAllPostPreviews } = require("../db/queries");

router.get("/", async (req, res) => {
  try {
    const posts = await getAllPostPreviews();
    res.render("index", { posts });
  } catch (err) {
    console.error("Error obteniendo los posts:", err);
    res.status(500).send("Error interno del servidor");
  }
});

module.exports = router;
