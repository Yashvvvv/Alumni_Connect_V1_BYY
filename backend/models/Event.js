const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    // ALUMNI or ADMIN
    creatorRole: {            // ✅ FIXED: This is the correct field name
        type: String,
        enum: ['alumni', 'admin'],
        required: true,
        // ⚠️ You MUST ensure your MongoDB documents ALSO use this exact name
    },

    // registered users for events
    registeredUsers: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            registeredAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],

    // Event status based on Date
    status: {
        type: String,
        enum: ["upcoming", "ongoing", "completed"],
        default: "upcoming",
    },

    // Optional banner
    bannerImage: {
        type: String,
    },
},
{
    timestamps: true,
});

// Auto update status
eventSchema.pre("save", function (next) {
    const now = new Date();
    const eventDate = new Date(this.date);

    if (now < eventDate) {
        this.status = "upcoming";
    } 
    else if (now.toDateString() === eventDate.toDateString()) {
        this.status = "ongoing";
    } 
    else {
        this.status = "completed";
    }
    next();
});

module.exports = mongoose.model("Event", eventSchema);
