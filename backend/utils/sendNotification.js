// utils/sendNotification.js
const NotificationModel = require("../models/Notification");

module.exports = async function sendNotification({ user, fromUser, type, message }, io) {
  try {
    const newNotification = await NotificationModel.create({
      user,
      fromUser,
      type,
      message,
    });

    if (global.onlineUsers[user]) {
      io.to(global.onlineUsers[user]).emit("notification", newNotification);
      console.log("🔔 Real-time notification sent:", newNotification);
    } else {
      console.log("⚠ User offline → Saved only:", newNotification._id);
    }

    return newNotification;
  } catch (error) {
    console.error("Notification Error:", error.message);
  }
};
