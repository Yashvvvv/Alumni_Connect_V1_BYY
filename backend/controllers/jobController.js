const Job = require("../models/Job")

exports.createJob = async (req, res) => {
  try {
    const { title, company, description, skillsRequired, location, type } = req.body
    const job = await Job.create({
      title,
      company,
      description,
      skillsRequired,
      location,
      type,
      postedBy: req.user._id,
    })
    res.status(201).json(job)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ approved: true }).populate("postedBy", "name email").sort({ createdAt: -1 })
    res.json(jobs)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("postedBy", "name email")
    if (!job) return res.status(404).json({ message: "Job not found" })
    res.json(job)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.applyToJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
    if (!job) return res.status(404).json({ message: "Job not found" })

    if (job.applicants.includes(req.user._id)) {
      return res.status(400).json({ message: "Already applied" })
    }

    job.applicants.push(req.user._id)
    await job.save()
    res.json({ message: "Applied successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getMyPostedJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id }).sort({ createdAt: -1 })
    res.json(jobs)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
