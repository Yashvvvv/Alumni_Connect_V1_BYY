const User = require("../models/User")
const generateToken = require("../utils/generateToken")

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ message: "User already exists" })

    const userCount = await User.countDocuments()
    const assignedRole = userCount === 0 ? "admin" : role

    const user = await User.create({ name, email, password, role: assignedRole })

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      })
    } else {
      res.status(401).json({ message: "Invalid credentials" })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
