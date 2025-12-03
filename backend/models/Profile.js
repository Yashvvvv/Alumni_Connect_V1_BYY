const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    headline: { type: String },
    bio: { type: String },
    location: { type: String },
    skills: [{ type: String }],
    profileImage: { type: String },
    links: {
      linkedin: String,
      github: String,
      portfolio: String,
    },
    // Alumni-specific
    currentRole: { type: String },
    company: { type: String },
    yearsOfExperience: { type: Number },
    industry: { type: String },
    batch: { type: String },
    mentorShipInterest: { type: Boolean, default: false },
    // Student-specific
    currentCourse: { type: String },
    yearOfStudy: { type: Number },
    interest: [{ type: String }],
  },
  { timestamps: true },
)

module.exports = mongoose.model("Profile", profileSchema)
