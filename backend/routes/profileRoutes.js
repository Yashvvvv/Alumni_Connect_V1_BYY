const express = require("express")
const router = express.Router()
const { protect, authorizeRoles } = require("../middleware/authMiddleware")
const {
  createOrUpdateProfile,
  getMyProfile,
  getProfileByUserId,
  searchProfiles,
} = require("../controllers/profileController")

router.post("/", protect, authorizeRoles("student", "alumni", "admin"), createOrUpdateProfile)
router.get("/me", protect, getMyProfile)
router.get("/search", protect, searchProfiles)
router.get("/user/:id", protect, getProfileByUserId)

module.exports = router
