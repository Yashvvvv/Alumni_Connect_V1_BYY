const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");
const router = express.Router();

// get logged-in user
router.get("/me", protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
