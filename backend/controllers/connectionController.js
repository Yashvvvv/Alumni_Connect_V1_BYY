<<<<<<< HEAD
const Connection = require('../models/Connection');
const user = require('../models/User');
const NotificationModel = require("../models/Notification");
const sendNotification = require("../utils/sendNotification");

=======
const Connection = require("../models/Connection")
>>>>>>> c746aaad342961d5329e96f60e7c803e67420e79

exports.sendRequest = async (req, res) => {
  try {
    const { recipientId } = req.body

    const existing = await Connection.findOne({
      $or: [
        { requester: req.user._id, recipient: recipientId },
        { requester: recipientId, recipient: req.user._id },
      ],
    })

<<<<<<< HEAD
    const recipient = await user.findById(recipientId);
    if (!recipient) {
      return res.status(404).send("Recipient user not found.");
    }
=======
    if (existing) return res.status(400).json({ message: "Connection already exists or pending" })
>>>>>>> c746aaad342961d5329e96f60e7c803e67420e79

    const connection = await Connection.create({
      requester: req.user._id,
      recipient: recipientId,
    })

<<<<<<< HEAD
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
=======
    res.status(201).json(connection)
  } catch (err) {
    res.status(500).json({ message: err.message })
>>>>>>> c746aaad342961d5329e96f60e7c803e67420e79
  }
}

exports.acceptRequest = async (req, res) => {
  try {
    const connection = await Connection.findById(req.params.id)
    if (!connection) return res.status(404).json({ message: "Request not found" })

<<<<<<< HEAD

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
=======
    if (connection.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" })
    }

    connection.status = "accepted"
    await connection.save()
    res.json(connection)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.rejectRequest = async (req, res) => {
  try {
    const connection = await Connection.findById(req.params.id)
    if (!connection) return res.status(404).json({ message: "Request not found" })

    if (connection.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" })
    }
>>>>>>> c746aaad342961d5329e96f60e7c803e67420e79

    connection.status = "rejected"
    await connection.save()
    res.json(connection)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

<<<<<<< HEAD
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
=======
exports.getMyConnections = async (req, res) => {
  try {
    const connections = await Connection.find({
      $or: [{ requester: req.user._id }, { recipient: req.user._id }],
      status: "accepted",
    })
      .populate("requester", "name email role")
      .populate("recipient", "name email role")

    res.json(connections)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
>>>>>>> c746aaad342961d5329e96f60e7c803e67420e79

exports.getPendingRequests = async (req, res) => {
  try {
    const requests = await Connection.find({
      recipient: req.user._id,
      status: "pending",
    }).populate("requester", "name email role")

    res.json(requests)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
