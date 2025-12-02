const Profile = require("../models/Profile")

exports.createOrUpdateProfile = async (req, res) => {
  try {
    const profileData = { ...req.body, user: req.user._id }
    let profile = await Profile.findOne({ user: req.user._id })

    if (profile) {
      profile = await Profile.findOneAndUpdate({ user: req.user._id }, profileData, { new: true })
    } else {
      profile = await Profile.create(profileData)
    }

    res.json(profile)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id }).populate("user", "name email role")
    if (!profile) return res.status(404).json({ message: "Profile not found" })
    res.json(profile)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getProfileByUserId = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.id }).populate("user", "name email role")
    if (!profile) return res.status(404).json({ message: "Profile not found" })
    res.json(profile)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.searchProfiles = async (req, res) => {
  try {
    const { role, skill, industry, batch } = req.query
    const query = {}

    if (skill) query.skills = { $in: [skill] }
    if (industry) query.industry = industry
    if (batch) query.batch = batch

    let profiles = await Profile.find(query).populate("user", "name email role")

    if (role) {
      profiles = profiles.filter((p) => p.user.role === role)
    }

    res.json(profiles)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
