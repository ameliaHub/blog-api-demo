const express = require("express");
const router = express.Router();
const postController = require("../controllers/publicPostController");

router.get("/:id", postController.getPostById);

module.exports = router;
