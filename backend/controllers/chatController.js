const Message = require("../models/Message");
const User = require("../models/User");


//  send message
exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;

    if (!receiverId || !message) {
      return res.status(400).json({ message: "Receiver and message are required" });
    }

    // Save message in DB
    const newMessage = await Message.create({
      sender: req.user._id,
      receiver: receiverId,
      message,
    });

    // Real-time socket push
    // Real-time: send to receiver if online
    const io = req.app.get("io");
    const receiverSocket = global.onlineUsers[receiverId];

    if (receiverSocket) {
      io.to(receiverSocket).emit("new_message", newMessage);
      console.log("Real-time message delivered:", newMessage);
    } else {
      console.log("⚠ Receiver offline. Message stored only.");
    }

    return res.status(201).json(newMessage);

  } catch (error) {
    console.error("Chat Error:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};


//  get messages between two users
exports.getMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch messages where logged-in user is either sender or receiver with the specified userId
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id }
      ]
    }).sort({ createdAt: 1 });

    return res.json(messages);

  } catch (error) {
    console.error("Chat Fetch Error:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};


//  mark messages as read
exports.markAsRead = async (req, res) => {
  try {
    const { userId } = req.params;

    await Message.updateMany(
      { sender: userId, receiver: req.user._id, isRead: false },
      { $set: { isRead: true } }
    );

    return res.json({ message: "Messages marked as read." });

  } catch (error) {
    console.error("Mark Read Error:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get conversation list for sidebar
exports.getChatUsers = async (req, res) => {
  try {
    const userId = req.user._id;

    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    });

    const userSet = new Set();

    messages.forEach((msg) => {
      userSet.add(msg.sender.toString());
      userSet.add(msg.receiver.toString());
    });

    userSet.delete(userId.toString());

    const users = await User.find({ _id: { $in: Array.from(userSet) } })
      .select("name email role");

    res.json({ users });
  } catch (error) {
    console.error("Get Chat Users Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};