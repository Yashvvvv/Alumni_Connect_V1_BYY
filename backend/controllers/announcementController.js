<<<<<<< HEAD
const Announcement = require("../models/Announcement");
const sendNotification = require("../utils/sendNotification");
const user = require("../models/User");
=======
const Announcement = require("../models/Announcement")
>>>>>>> c746aaad342961d5329e96f60e7c803e67420e79

exports.createAnnouncement = async (req, res) => {
  try {
    const { title, message, attachment } = req.body
    const announcement = await Announcement.create({
      title,
      message,
      attachment,
      createdBy: req.user._id,
      creatorRole: req.user.role,
<<<<<<< HEAD
    });

    // 🔔 Notify all users
    const allUsers = await user.find({});

    // const notifications = allUsers.map((u) => ({
    //   user: u._id,
    //   fromUser: req.user._id,
    //   type: "announcement",
    //   message: `New announcement: ${newAnnouncement.title}`,
    // }));

    // await Notification.insertMany(notifications);
    for (const user of allUsers) {
      await sendNotification(req, user._id, {
        message: `New announcement: ${title}`,
        type: "announcement",
        fromUser: req.user._id
      });
    }

    res.status(201).json({
      message: "Announcement created successfully",
      announcement: newAnnouncement,
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
=======
    })
    res.status(201).json(announcement)
  } catch (err) {
    res.status(500).json({ message: err.message })
>>>>>>> c746aaad342961d5329e96f60e7c803e67420e79
  }
}

<<<<<<< HEAD


// Get all announcements (public for all logged-in users)
=======
>>>>>>> c746aaad342961d5329e96f60e7c803e67420e79
exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().populate("createdBy", "name email").sort({ createdAt: -1 })
    res.json(announcements)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id).populate("createdBy", "name email")
    if (!announcement) return res.status(404).json({ message: "Announcement not found" })
    res.json(announcement)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id)
    if (!announcement) return res.status(404).json({ message: "Announcement not found" })

    if (announcement.createdBy.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" })
    }

    await announcement.deleteOne()
    res.json({ message: "Announcement removed" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
