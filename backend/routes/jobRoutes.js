const express = require("express")
const router = express.Router()
const { protect, authorizeRoles } = require("../middleware/authMiddleware")
const { createJob, getAllJobs, getJobById, applyToJob, getMyPostedJobs } = require("../controllers/jobController")

router.post("/", protect, authorizeRoles("alumni", "admin"), createJob)
router.get("/", protect, getAllJobs)
router.get("/me/posted", protect, authorizeRoles("alumni", "admin"), getMyPostedJobs)
router.get("/:id", protect, getJobById)
router.post("/:id/apply", protect, authorizeRoles("student"), applyToJob)

module.exports = router
