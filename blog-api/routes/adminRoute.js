const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middlewares/authMiddleware");
const adminController = require("../controllers/adminController");
const adminPostsController = require("../controllers/adminPostsController");

router.get("/", isAdmin, adminController.renderAdminDashboard);
router.get("/posts/new", isAdmin, adminPostsController.renderNewPostForm);
router.post("/posts", isAdmin, adminPostsController.createPost);

router.get("/posts", isAdmin, adminPostsController.renderAdminPosts);

router.get("/posts/:id/edit", isAdmin, adminPostsController.renderEditPostForm);
router.post("/posts/:id", isAdmin, adminPostsController.updatePost);

router.post("/posts/:id/delete", isAdmin, adminPostsController.deletePost);

module.exports = router;
