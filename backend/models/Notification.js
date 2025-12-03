const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    message:{
        type: String,
        required: true
    },

    type: {
      type: String,
      enum: [
        "connection_request",
        "connection_accepted",
        "event_registration",
        "new_job_posted",
        "announcement",
      ],
      required: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);