const Connection = require("../models/Connection");
const User = require("../models/User");
const sendNotification = require("../utils/sendNotification");

// ============================
// 1. Send Connection Request
// ============================
exports.sendRequest = async (req, res) => {
  try {
    const { recipientId } = req.body;

    // Check if recipient exists
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: "Recipient user not found." });
    }

    // Check if a connection or request already exists
    const existing = await Connection.findOne({
      $or: [
        { requester: req.user._id, recipient: recipientId },
        { requester: recipientId, recipient: req.user._id },
      ],
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "Connection request already exists." });
    }

    // Create new connection request
    const request = await Connection.create({
      requester: req.user._id,
      recipient: recipientId,
      status: "pending",
    });

    // 🔔 Send notification to recipient
    const io = req.app.get("io");
    await sendNotification(
      {
        user: recipientId,
        fromUser: req.user._id,
        type: "connection_request",
        message: `${req.user.name} sent you a connection request.`,
      },
      io
    );

    res
      .status(201)
      .json({ message: "Connection request sent.", request });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};

// ============================
// 2. Accept Connection Request
// ============================
exports.acceptRequest = async (req, res) => {
  try {
    const request = await Connection.findById(req.params.id);

    if (!request)
      return res
        .status(404)
        .json({ message: "Connection request not found." });

    if (request.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized." });
    }

    request.status = "accepted";
    await request.save();

    // 🔔 Notify requester
    const io = req.app.get("io");
    await sendNotification(
      {
        user: request.requester,
        fromUser: req.user._id,
        type: "connection_accepted",
        message: `${req.user.name} accepted your connection request.`,
      },
      io
    );

    res.json({ message: "Connection request accepted.", request });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};

// ============================
// 3. Reject Connection Request
// ============================
exports.rejectRequest = async (req, res) => {
  try {
    const request = await Connection.findById(req.params.id);

    if (!request)
      return res
        .status(404)
        .json({ message: "Connection request not found." });

    if (request.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized." });
    }

    request.status = "rejected";
    await request.save();

    res.json({ message: "Connection request rejected.", request });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};

// ============================
// 4. Get All Accepted Connections
// ============================
exports.getMyConnections = async (req, res) => {
  try {
    const connections = await Connection.find({
      $or: [
        { requester: req.user._id, status: "accepted" },
        { recipient: req.user._id, status: "accepted" },
      ],
    })
      .populate("requester", "name email role")
      .populate("recipient", "name email role");

    res.json({ connections });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};

// ============================
// 5. Get Pending Requests (for logged-in user)
// ============================
exports.getPendingRequests = async (req, res) => {
  try {
    const requests = await Connection.find({
      recipient: req.user._id,
      status: "pending",
    }).populate("requester", "name email role");

    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
