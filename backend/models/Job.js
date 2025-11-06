const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    
    title: {type: String, required: true},
    company: {type: String, required: true},
    description: {type: String, required: true},

    skillsRequired: [{type: String}],

    location: {type: String, required: true},
    type: {type: String, enum:['Full-time', 'Part-time', 'Internship', 'Remote'], default: 'Full-time'},

// Reference to the User who posted the job
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true,},

// Track applicants, including reference to User and application date
    applicants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        appliedAt: { type: Date, default: Date.now },
      }
    ],

// Admin approval field
    approved: { type: Boolean, default: true },   // Set to false if you want admin approval logic
  },
  { timestamps: true }
);


module.exports = mongoose.model('Job', jobSchema);


// Includes job details
// Tracks applicants
// Supports admin approval later