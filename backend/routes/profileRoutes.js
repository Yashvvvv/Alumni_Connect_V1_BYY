const express = require('express');
const router = express.Router();

const {
    createOrUpdateProfile,
    getMyProfile,
    getProfileById,
    searchProfiles,
} = require('../controllers/profileController');


const {protect, authorizeRoles} =  require('../middleware/authMiddleware');


// Create or Update Profile(student + Alumni)
router.post("/", protect, authorizeRoles("student", "alumni"), createOrUpdateProfile);

// Get My Profile
router.get("/me", protect, getMyProfile);

// Get Profile by User ID
router.get("/user/:id", protect, getProfileById);

// Search Profiles
router.get("/search", protect, searchProfiles);

module.exports = router;
