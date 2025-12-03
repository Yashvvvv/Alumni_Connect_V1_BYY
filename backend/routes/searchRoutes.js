const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { globalSearch } = require("../controllers/searchController");

// 🔍 Global Search (any logged-in user)
router.get("/", protect, globalSearch);

module.exports = router;
