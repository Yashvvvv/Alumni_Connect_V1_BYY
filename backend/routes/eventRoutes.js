const express = require("express")
const router = express.Router()
const { protect, authorizeRoles } = require("../middleware/authMiddleware")
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent,
  getEventParticipants,
} = require("../controllers/eventController")

router.post("/", protect, authorizeRoles("admin", "alumni"), createEvent)
router.get("/", protect, getAllEvents)
router.get("/:id", protect, getEventById)
router.put("/:id", protect, authorizeRoles("admin", "alumni"), updateEvent)
router.delete("/:id", protect, authorizeRoles("admin", "alumni"), deleteEvent)
router.post("/:id/register", protect, authorizeRoles("student", "alumni"), registerForEvent)
router.get("/:id/participants", protect, authorizeRoles("admin", "alumni"), getEventParticipants)

module.exports = router
