const Announcement = require("../models/Announcement");
const User = require("../models/User");
const sendNotification = require("../utils/sendNotification");

// ====================================
// 1. Create Announcement
// ====================================
exports.createAnnouncement = async (req, res) => {
  try {
    const { title, message, attachment } = req.body;

    const announcement = await Announcement.create({
      title,
      message,
      attachment: attachment || null,
      createdBy: req.user._id,
      creatorRole: req.user.role,
    });

    // 🔔 Notify all users
    const allUsers = await User.find({});
    const io = req.app.get("io");

    for (const u of allUsers) {
      await sendNotification(
        {
          user: u._id,
          fromUser: req.user._id,
          type: "announcement",
          message: `New announcement: ${title}`,
        },
        io
      );
    }

    res.status(201).json({
      message: "Announcement created successfully",
      announcement,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// ====================================
// 2. Get All Announcements
// ====================================
exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json(announcements);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// ====================================
// 3. Get Announcement By ID
// ====================================
exports.getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id).populate(
      "createdBy",
      "name email role"
    );

    if (!announcement)
      return res.status(404).json({ message: "Announcement not found" });

    res.status(200).json(announcement);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// ====================================
// 4. Delete Announcement
// ====================================
exports.deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement)
      return res.status(404).json({ message: "Announcement not found" });

    // Only admin or creator can delete
    if (
      announcement.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await announcement.deleteOne();

    res.status(200).json({ message: "Announcement removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
