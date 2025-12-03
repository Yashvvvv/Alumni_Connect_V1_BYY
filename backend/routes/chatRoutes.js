const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  sendMessage,
  getMessages,
  markAsRead,
  getChatUsers
} = require("../controllers/chatController");

// Send message
router.post("/", protect, sendMessage);

// Get conversation between logged-in user & another user
router.get("/:userId", protect, getMessages);

// Mark messages as read
router.put("/:userId/read", protect, markAsRead);

// Get chat users for sidebar
router.get("/list/all", protect, getChatUsers);

module.exports = router;
