const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middlewares/authMiddleware");
const adminController = require("../controllers/adminController");

router.get("/", isAdmin, adminController.renderAdminDashboard);

module.exports = router;
