const express = require("express")
const router = express.Router()
const { protect, authorizeRoles } = require("../middleware/authMiddleware")
const { getStudentDashboard, getAlumniDashboard, getAdminDashboard } = require("../controllers/dashboardController")

router.get("/student", protect, authorizeRoles("student"), getStudentDashboard)
router.get("/alumni", protect, authorizeRoles("alumni"), getAlumniDashboard)
router.get("/admin", protect, authorizeRoles("admin"), getAdminDashboard)

module.exports = router
