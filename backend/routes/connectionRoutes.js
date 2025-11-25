const express = require('express');
const router = express.Router();

const {sendRequest, acceptRequest, rejectRequest, getPendingRequests, getConnections, removeConnection} = require('../controllers/connectionController');
const {protect} = require('../middleware/authMiddleware');

// Send a connection request
router.post("/send", protect, sendRequest);

// Accept request
router.put("/:id/accept", protect, acceptRequest);

// Reject request
router.put("/:id/reject", protect, rejectRequest);

// Get all accepted connections
router.get("/", protect, getConnections);

// Get pending requests
router.get("/pending", protect, getPendingRequests);

module.exports = router;