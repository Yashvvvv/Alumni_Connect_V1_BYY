const Connection = require('../models/Connection');
const user = require('../models/User');
const NotificationModel = require("../models/Notification");
const sendNotification = require("../utils/sendNotification");


// Send a connection request
exports.sendRequest = async (req, res) => {
  try {
    const { recipientId } = req.body;

    if (recipientId === req.user.id) {
      return res.status(400).send("You cannot send a connection request to yourself.");
    }

    const recipient = await user.findById(recipientId);
    if (!recipient) {
      return res.status(404).send("Recipient user not found.");
    }

    const existingConnection = await Connection.findOne({
      requester: req.user.id,
      recipient: recipientId,
    });

    if (existingConnection) {
      return res.status(400).send("Connection request already exists.");
    }

    // Create and save connection request
    const request = await Connection.create({
      requester: req.user.id,
      recipient: recipientId,
      status: "pending",
    });

    // 🔔 NOTIFICATION — Send to recipient
    const io = req.app.get("io");
    await sendNotification({
      user: recipientId,
      fromUser: req.user._id,
      type: "connection_request",
      message: `${req.user.name} sent you a connection request.`,
    }, io);


    res.status(201).json({ message: "Connection request sent.", request });

  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};



// Accept a connection request
exports.acceptRequest = async (req, res) => {
  try {
    const request = await Connection.findById(req.params.id);

    if (!request)
      return res.status(404).json({ message: "Connection request not found." });

    if (request.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized." });
    }

    request.status = "accepted";
    await request.save();

    const io = req.app.get("io");

    await sendNotification({
      user: request.requester,
      fromUser: req.user._id,
      type: "connection_accepted",
      message: `${req.user.name} accepted your connection request.`,
    }, io);

    res.json({ message: "Connection request accepted.", request });

  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};



// Reject a connection request
exports.rejectRequest = async (req, res) => {
  try {
    const request = await Connection.findById(req.params.id);

    if (!request) return res.status(404).json({ message: "Connection request not found." });

    if (request.recipient.toString() != req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to reject this request." });
    }

    request.status = 'rejected';
    await request.save();

    res.json({ message: "Connection request rejected.", request });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};


// Get all connection requests for the logged-in user and get all my connections
exports.getConnections = async (req, res) => {
  try {
    const connections = await Connection.find({
      $or: [
        { requester: req.user._id, status: 'accepted' },
        { recipient: req.user._id, status: 'accepted' },
      ],
    })
      .populate('requester', 'name email role')
      .populate('recipient', 'name email role');

    res.json({ connections });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// Get all pending connection requests for the logged-in user
exports.getPendingRequests = async (req, res) => {
  try {
    const pending = await Connection.find({
      recipient: req.user._id,
      status: "pending",
    })
      .populate("requester", "name email role");

    res.json({ pending });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};