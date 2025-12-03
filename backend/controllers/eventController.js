const Event = require("../models/Event")

exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, time, venue, bannerImage } = req.body
    const event = await Event.create({
      title,
      description,
      date,
      time,
      venue,
      bannerImage,
      createdBy: req.user._id,
      creatorRole: req.user.role,
    })
    res.status(201).json(event)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "name email").sort({ date: 1 })
    res.json(events)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("createdBy", "name email")
    if (!event) return res.status(404).json({ message: "Event not found" })
    res.json(event)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) return res.status(404).json({ message: "Event not found" })

    if (event.createdBy.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" })
    }

    Object.assign(event, req.body)
    await event.save()
    res.json(event)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) return res.status(404).json({ message: "Event not found" })

    if (event.createdBy.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" })
    }

    await event.deleteOne()
    res.json({ message: "Event removed" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) return res.status(404).json({ message: "Event not found" })

    if (event.registeredUsers.includes(req.user._id)) {
      return res.status(400).json({ message: "Already registered" })
    }

    event.registeredUsers.push(req.user._id)
    await event.save()
    res.json({ message: "Registered successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getEventParticipants = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("registeredUsers", "name email role")
    if (!event) return res.status(404).json({ message: "Event not found" })
    res.json(event.registeredUsers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
