const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,  // Reference to User model
        ref: 'User', // Reference to User model
        required: true,
        unique: true,
    },

    // common profile fields for both roles i.e. student and alumni

    headline: {type: String},
    bio: {type: String},
    location: {type: String},
    skills: [{type: String}],
    profileImage: {type: String},

    links: {
        linkedin: {type: String},
        github: {type: String},
        twitter: {type: String},
        portfolio: {type: String},
    },

// Alumni specific fields
    currentRole: {type: String}, // Current job title
    company: {type: String},  // Current employer
    yearsOfExperience: {type: Number},  // Total years of professional experience
    industry: {type: String},  // Industry sector
    batch: {type: Number}, // Graduation year
    mentorShipInterest: {type: Boolean, default: false}, // Interest in mentoring students
    

 // Student specific fields
    currentCourse: {type: String}, // Current course of study
    yearOfStudy: {type: Number}, // Current year of study
    interest: [{type: String}], // Areas of interest for projects or internships
}, {timestamps: true});

module.exports = mongoose.model('Profile', profileSchema);
