const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    message: {
      type: String,
      required: true,     // ✅ Actual text of the chat message
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // Stores createdAt + updatedAt
);

module.exports = mongoose.model("Message", messageSchema);
