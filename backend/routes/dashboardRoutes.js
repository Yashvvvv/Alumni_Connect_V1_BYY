const express = require("express");
const router = express.Router();

const {
  getStudentDashboard,
  getAlumniDashboard,
  getAdminDashboard,
} = require("../controllers/dashboardController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Student Dashboard
router.get("/student", protect, authorizeRoles("student"), getStudentDashboard);

// Alumni Dashboard
router.get("/alumni", protect, authorizeRoles("alumni"), getAlumniDashboard);

// Admin Dashboard
router.get("/admin", protect, authorizeRoles("admin"), getAdminDashboard);

module.exports = router;
