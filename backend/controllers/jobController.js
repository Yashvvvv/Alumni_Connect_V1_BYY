const Job = require('../models/Job');

exports.createJob = async(req, res) =>{
    try{
        const {title, company, description, skillsRequired, location, type} = req.body;
        
    // Create a new job posting, associating it with the logged-in user(alumni who is posting the job)
        const newJob = await Job.create({
            title,
            company, 
            description,
            skillsRequired,
            location,
            type,
            postedBy: req.user._id, // Assuming req.user contains the authenticated user's info
        });

        res.status(201).json({message: 'Job created successfully', job: newJob});
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error', error: error.message});
    }
};

// Get all jobs(filtering and pagination can be added later)
exports.getAllJobs= async (req, res)=>{
    try{
        // Get all jobs from the database based on query parameters i.e. skills, location, type
        const {skills, location, company ,type}= req.query;

        let filter = {approved: true}; // Only fetch approved jobs by default

        if(skills){
            // If skills are provided, filter jobs by required skills
            filter.skillsRequired = {$in: skills.split(',')};
        }

        if(location){
            // If location is provided, filter jobs by location
            filter.location = new RegExp(location, "i");
        }

        if(company){
            // If company is provided, filter jobs by company
            filter.company = new RegExp(company, "i");
        }

        if(type){
            // If type is provided, filter jobs by type
            filter.type = type;
        }

// Fetch jobs from the database with applied filters and populate postedBy field and sort by creation date
        const jobs = await Job.find(filter)
      .populate("postedBy", "name email role")
      .sort({ createdAt: -1 });

        res.status(200).json({jobs});
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error', error: error.message});
    }
};

// get job by ID
exports.getJobById = async (req, res) =>{

    try{
        const job = await Job.findById(req.params.id).populate('postedBy', 'name email role');

        // If job not found, return 404
        if(!job){
            return res.status(404).json({message: 'Job not found'});
        }

        res.status(200).json({job});
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error', error: error.message});
    }
};

// Student Apply to a job
exports.applyJob = async (req, res) =>{
    try{
        const jobId = req.params.id;

        const job = await Job.findById(jobId);

        if(!job){
            return res.status(404).json({message: 'Job not found'});
        }

        // Check if the user has already applied
        if(job.applicants.some(app => app.user.toString() === req.user._id.toString())){
            return res.status(400).json({message: 'You have already applied to this job'});
        }

        // Add applicant to the job's applicants array
        job.applicants.push({user: req.user._id});
        // Save the job with the new applicant
        await job.save();

        res.status(200).json({message: 'Application submitted successfully'});
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error', error: error.message});
    }
};

// get jobs posted by the logged-in alumni
exports.myPostedJobs = async(req, res) =>{
    try{
        // Fetch jobs posted by the logged-in user(alumni)
        const jobs = await Job.find({postedBy: req.user._id}).sort({createdAt: -1});
        
        // Return the jobs, including job details, applicants, etc.
        res.status(200).json({jobs});
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error', error: error.message});
    }
};

// Alumni can post the jobs
// Students can apply for jobs
// Get all jobs with filters
// Get job by ID
// Get jobs posted by logged-in alumni
// Search with filters
// Prevent duplicate applications i.e. a student cannot apply to the same job more than once