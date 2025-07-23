const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middlewares/authMiddleware");
const adminController = require("../controllers/adminController");
const adminPostsController = require("../controllers/adminPostsController");

router.get("/", isAdmin, adminController.renderAdminDashboard);
router.get("/posts/new", isAdmin, adminPostsController.renderNewPostForm);
router.post("/posts", isAdmin, adminPostsController.createPost);

module.exports = router;
