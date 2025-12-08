const express = require("express")
const router = express.Router()
const { protect } = require("../middleware/authMiddleware")
const {
  sendRequest,
  acceptRequest,
  rejectRequest,
  getMyConnections,
  getPendingRequests,
  checkConnectionStatus,
} = require("../controllers/connectionController")

router.post("/send", protect, sendRequest)
router.put("/:id/accept", protect, acceptRequest)
router.put("/:id/reject", protect, rejectRequest)
router.get("/", protect, getMyConnections)
router.get("/pending", protect, getPendingRequests)
router.get("/status/:userId", protect, checkConnectionStatus)

module.exports = router
