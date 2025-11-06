const Profile = require("../models/Profile");
const User = require("../models/User");

exports.createOrUpdateProfile = async (req, res) =>{
    try{

        const data = req.body; // Profile data from request body
        const userId= req.user._id; // Authenticated user's ID

        // Check if profile exists, or create a new one
        let profile = await Profile.findOne({user: userId});

    // If profile exists, update it
        if(profile){
            profile = await Profile.findOneAndUpdate(
                {user: userId},
                {$set: data}, 
                {new: true}
            );
            return res.status(200).json({message: "Profile updated successfully", profile});
        }

    // If profile does not exist, create a new one
        data.user = userId;

        const newProfile = await Profile.create(data);

        return res.status(201).json({message: "Profile created successfully", profile: newProfile});

    } catch(error){
        console.error(error);
        return res.status(500).json({message: "Server error"});
    }
};


// Get my profile
exports.getMyProfile= async (req, res) =>{
    try{
        const profile = await Profile.findOne({user: req.user._id}).populate("user", "name email role");

        if(!profile){
            return res.status(404).json({message: "Profile not found"});
        }

        return res.status(200).json({profile});
    } catch(error){
        console.error(error);
        return res.status(500).json({message: "Server error"}); 
    }
};


//Get profile by user ID
exports.getProfileById = async (req, res) =>{
    try{
        // Find profile by user ID, populate user details like name, email, role
        const profile = await Profile.findOne({user:req.params.id}).populate("user", "name email role");
        
        if(!profile){
            return res.status(404).json({message: "Profile not found"});
        }

        return res.status(200).json({profile});
    } catch(error){
        console.error(error);
        return res.status(500).json({message: "Server error"});
    }
};



// Search / Directory of profiles
exports.searchProfiles= async (req, res)=>{
    try{
        const {skills, branch, location, industry} = req.query;

        let filter = {};

    // Add filters based on query parameters

        if(skills){ // Comma-separated skills
            filter.skills = {$in: skills.split(',')};
        }
    
    // Add more filters based on branch, location, industry if provided
        if(branch){
            filter.branch = new RegExp(branch, 'i'); // Case-insensitive regex match
        }

        if(location){
            filter.location = new RegExp(location, 'i'); // Case-insensitive regex match
        }
        if(industry){
            filter.industry = new RegExp(industry, 'i'); // Case-insensitive regex match
        }


        const profiles = await Profile.find(filter).populate("user", "name email role");

        return res.status(200).json({profiles});
    }
    catch(error){
        console.error(error);
        return res.status(500).json({message: "Server error"});
    }
};


// Full create/update
// Fetch own profile
// Get others’ profile
// Directory searching with multiple filters