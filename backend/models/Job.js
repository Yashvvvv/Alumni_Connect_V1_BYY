const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    description: { type: String, required: true },
    skillsRequired: [{ type: String }],
    location: { type: String },
    type: { type: String, enum: ["Full-time", "Part-time", "Internship", "Remote"], required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    approved: { type: Boolean, default: true },
  },
  { timestamps: true },
)

module.exports = mongoose.model("Job", jobSchema)
