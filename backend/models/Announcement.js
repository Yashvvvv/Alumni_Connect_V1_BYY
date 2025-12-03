const mongoose = require("mongoose")

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    creatorRole: { type: String, enum: ["admin", "alumni"], required: true },
    attachment: { type: String },
  },
  { timestamps: true },
)

module.exports = mongoose.model("Announcement", announcementSchema)
