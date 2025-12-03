const express = require("express")
const router = express.Router()
const { protect, authorizeRoles } = require("../middleware/authMiddleware")
const {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  deleteAnnouncement,
} = require("../controllers/announcementController")

router.post("/", protect, authorizeRoles("admin", "alumni"), createAnnouncement)
router.get("/", protect, getAllAnnouncements)
router.get("/:id", protect, getAnnouncementById)
router.delete("/:id", protect, authorizeRoles("admin", "alumni"), deleteAnnouncement)

module.exports = router
