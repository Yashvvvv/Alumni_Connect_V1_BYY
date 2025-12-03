const User = require("../models/User")
const Job = require("../models/Job")
const Event = require("../models/Event")
const Connection = require("../models/Connection")

exports.getStudentDashboard = async (req, res) => {
  try {
    const appliedJobs = await Job.countDocuments({ applicants: req.user._id })
    const connections = await Connection.countDocuments({
      $or: [{ requester: req.user._id }, { recipient: req.user._id }],
      status: "accepted",
    })
    const upcomingEvents = await Event.countDocuments({
      registeredUsers: req.user._id,
      status: "upcoming",
    })

    res.json({ appliedJobs, connections, upcomingEvents })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getAlumniDashboard = async (req, res) => {
  try {
    const jobsPosted = await Job.countDocuments({ postedBy: req.user._id })
    const eventsCreated = await Event.countDocuments({ createdBy: req.user._id })
    const connections = await Connection.countDocuments({
      $or: [{ requester: req.user._id }, { recipient: req.user._id }],
      status: "accepted",
    })

    res.json({ jobsPosted, eventsCreated, connections })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments()
    const totalJobs = await Job.countDocuments()
    const totalEvents = await Event.countDocuments()
    const students = await User.countDocuments({ role: "student" })
    const alumni = await User.countDocuments({ role: "alumni" })

    res.json({ totalUsers, totalJobs, totalEvents, students, alumni })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
