const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const { isAuthenticated } = require("../middlewares/authMiddleware");

router.post(
  "/posts/:id/comments",
  isAuthenticated,
  commentController.addComment
);

module.exports = router;
