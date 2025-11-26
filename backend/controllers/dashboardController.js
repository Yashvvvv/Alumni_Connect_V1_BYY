const User = require("../models/User");
const Event = require("../models/Event");
const Job = require("../models/Job");
const Connection = require("../models/Connection");
const Announcement = require("../models/Announcement");
const { registerForEvent } = require("./eventController");

// Student Dashboard Data
exports.getStudentDashboard = async (req, res) => {
    try {
        const userId = req.user._id;

        // total registered users
        const registeredEvents = await Event.countDocuments({ 'registeredUsers.user': userId });

        // total connections
        const totalConnections = await Connection.countDocuments({
            status: 'accepted',
            $or: [{ requester: userId }, { recipient: userId }]
        });

        // job applications
        const jobApplications = await Job.countDocuments({ 'applicants': userId });

        res.status(200).json({
            registeredEvents,
            totalConnections,
            jobApplications
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// alumni Dashboard Data
exports.getAlumniDashboard = async (req, res) => {
    try {
        const userId = req.user._id;

        const eventsCreated = await Event.countDocuments({ createdBy: userId });
        const jobsPosted = await Job.countDocuments({ postedBy: userId });

        const connections = await Connection.countDocuments({
            status: 'accepted',
            $or: [{ requester: userId }, { recipient: userId }],
        });

        const announcements = await Announcement.countDocuments({ createdBy: userId });

        res.status(200).json({
            eventsCreated,
            jobsPosted,
            connections,
            announcements
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


// Admin Dashboard Data
exports.getAdminDashboard = async (req, res) => {
    try {
        const totalStudents = await User.countDocuments({ role: "student" });
        const totalAlumni = await User.countDocuments({ role: "alumni" });

        const totalEvents = await Event.countDocuments();
        const totalJobs = await Job.countDocuments();
        const totalAnnouncements = await Announcement.countDocuments();

        const totalConnections = await Connection.countDocuments({
            status: "accepted"
        });

        res.status(200).json({
            totalStudents,
            totalAlumni,
            totalEvents,
            totalJobs,
            totalAnnouncements,
            totalConnections
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};