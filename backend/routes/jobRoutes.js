const express = require('express');
const router = express.Router();

const {createJob, getAllJobs, getJobById, applyJob, myPostedJobs} = require('../controllers/jobController');

const {protect, authorizeRoles} = require('../middleware/authMiddleware');

// Create job (Alumni only)
router.post("/", protect, authorizeRoles("alumni", "admin"), createJob);

// Get all jobs, with optional filters
router.get("/", protect, getAllJobs);

// Get job by ID
router.get("/:id", protect, getJobById);

// Apply to job (Students only)
router.post("/:id/apply", protect, authorizeRoles("student"), applyJob);

// Get jobs posted by logged-in alumni
router.get("/me/posted", protect, authorizeRoles("alumni", "admin"), myPostedJobs);

module.exports = router;

// Alumni: post jobs
// Students: apply for jobs
// Everyone logged in: view jobs