const Announcement = require("../models/Announcement");

// Create Announcement (ADMIN + ALUMNI)
exports.createAnnouncement = async (req, res) => {
  try {
    const { title, message, attachment } = req.body;

    const newAnnouncement = await Announcement.create({
      title,
      message,
      attachment: attachment || null,
      createdBy: req.user.id,
      creatorRole: req.user.role,
    });

    res
      .status(201)
      .json({ message: "Announcement created successfully", announcement: newAnnouncement });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// Get all announcements (public for all logged-in users)
exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({})
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({ announcements });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// Get announcement by ID
exports.getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id).populate(
      "createdBy",
      "name email role"
    );

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.status(200).json({ announcement });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Delete announcement (admin + alumni only)
exports.deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    // Only creator OR admin can delete
    if (
      announcement.createdBy.toString() !== req.user.id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized to delete this announcement" });
    }

    await announcement.deleteOne();

    res.json({ message: "Announcement deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
