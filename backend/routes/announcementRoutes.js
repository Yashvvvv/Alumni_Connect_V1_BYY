const express = require("express");
const router = express.Router();

const {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  deleteAnnouncement,
} = require("../controllers/announcementController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Create announcement (ADMIN + ALUMNI)
router.post("/", protect, authorizeRoles("admin", "alumni"), createAnnouncement);

// Get all announcements (all logged-in users)
router.get("/", protect, getAllAnnouncements);

// Get announcement by ID
router.get("/:id", protect, getAnnouncementById);

// Delete announcement (only creator or admin)
router.delete("/:id", protect, authorizeRoles("admin", "alumni"), deleteAnnouncement);

module.exports = router;
