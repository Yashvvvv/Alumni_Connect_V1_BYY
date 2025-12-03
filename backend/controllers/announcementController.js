const Announcement = require("../models/Announcement")

exports.createAnnouncement = async (req, res) => {
  try {
    const { title, message, attachment } = req.body
    const announcement = await Announcement.create({
      title,
      message,
      attachment,
      createdBy: req.user._id,
      creatorRole: req.user.role,
    })
    res.status(201).json(announcement)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

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
