const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    venue: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    creatorRole: { type: String, enum: ["admin", "alumni"], required: true },
    registeredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    status: { type: String, enum: ["upcoming", "ongoing", "completed"], default: "upcoming" },
    bannerImage: { type: String },
  },
  { timestamps: true },
)

module.exports = mongoose.model("Event", eventSchema)
