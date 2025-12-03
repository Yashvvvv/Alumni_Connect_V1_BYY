const Connection = require("../models/Connection")

exports.sendRequest = async (req, res) => {
  try {
    const { recipientId } = req.body

    const existing = await Connection.findOne({
      $or: [
        { requester: req.user._id, recipient: recipientId },
        { requester: recipientId, recipient: req.user._id },
      ],
    })

    if (existing) return res.status(400).json({ message: "Connection already exists or pending" })

    const connection = await Connection.create({
      requester: req.user._id,
      recipient: recipientId,
    })

    res.status(201).json(connection)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.acceptRequest = async (req, res) => {
  try {
    const connection = await Connection.findById(req.params.id)
    if (!connection) return res.status(404).json({ message: "Request not found" })

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

    connection.status = "rejected"
    await connection.save()
    res.json(connection)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

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
