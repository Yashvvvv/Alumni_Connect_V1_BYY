const User = require('../models/User');
const Job = require('../models/Job');
const Event = require('../models/Event');
const Announcement = require('../models/Announcement');
const profile = require('../models/Profile');


// Search across Users, Jobs, Events, Announcements, and Profiles
exports.globalSearch = async (req, res) => {
    try{
        const {query} = req.query;

        if(!query || query.trim() === ''){
            return res.status(400).json({message: 'Search query is required'});
        }
        // searchRegex for case insensitive matching
        const searchRegex = new RegExp(query, 'i');


        const users = await User.find({
            $or:[{name: searchRegex}, {email: searchRegex}],
        }).select('name email role');

        const profiles = await profile.find({
            $or:[
                {headline: searchRegex},
                {skills : searchRegex},
                {interests: searchRegex},
                {branch: searchRegex},
            ],
        }).populate('user', 'name email role');


        const jobs = await Job.find({
            $or:[
                {title: searchRegex},
                {company: searchRegex},
                {description: searchRegex},
                {skillsRequired: searchRegex},
            ],
        }).populate('postedBy', 'name email role');

        const events = await Event.find({
            $or:[
                {title: searchRegex},
                {description: searchRegex},
                {venue: searchRegex},
            ],
        }).populate('createdBy', 'name email role');

        const announcements = await Announcement.find({
            $or:[
                {title: searchRegex},
                {content: searchRegex},
            ],
        }).populate('createdBy', 'name email role');

        res.status(200).json({
            query,
            result:{users, profiles, jobs, events, announcements},
        });
    }catch(error){
        console.error("Search Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
    }
};