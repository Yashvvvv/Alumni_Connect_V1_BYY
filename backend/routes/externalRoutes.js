const express = require("express")
const router = express.Router()
const {
  fetchRemoteJobs,
  fetchIndiaJobs,
  fetchTechEvents,
  fetchDevToEvents,
} = require("../services/externalAPIs")

// @route   GET /api/external/jobs
// @desc    Get India-specific jobs from external APIs
// @access  Public
router.get("/jobs", async (req, res) => {
  try {
    const { limit = 30, source = "all", category = "" } = req.query

    let jobs = []

    // Fetch India-specific jobs first
    if (source === "all" || source === "india") {
      const indiaJobs = await fetchIndiaJobs(parseInt(limit))
      jobs = [...jobs, ...indiaJobs]
    }

    // Also fetch remote jobs available in India
    if (source === "all" || source === "remote") {
      const remotiveJobs = await fetchRemoteJobs(parseInt(limit), category)
      jobs = [...jobs, ...remotiveJobs]
    }

    // Shuffle and limit results
    jobs = jobs.sort(() => Math.random() - 0.5).slice(0, parseInt(limit))

    res.json({
      success: true,
      count: jobs.length,
      data: jobs,
      sources: ["India Jobs", "Remote (India-eligible)"],
    })
  } catch (err) {
    console.error("External Jobs API Error:", err.message)
    res.status(500).json({
      success: false,
      message: "Failed to fetch external jobs",
      error: err.message,
    })
  }
})

// @route   GET /api/external/events
// @desc    Get India-specific tech events
// @access  Public
router.get("/events", async (req, res) => {
  try {
    const { limit = 20, source = "all" } = req.query

    let events = []

    // Fetch India tech events
    if (source === "all" || source === "india") {
      const techEvents = await fetchTechEvents(parseInt(limit))
      events = [...events, ...techEvents]
    }

    // Also fetch Dev.to India articles
    if (source === "all" || source === "devto") {
      const devtoEvents = await fetchDevToEvents(parseInt(limit))
      events = [...events, ...devtoEvents]
    }

    // Sort by date
    events = events.sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, parseInt(limit))

    res.json({
      success: true,
      count: events.length,
      data: events,
      sources: ["India Events", "Dev.to India"],
    })
  } catch (err) {
    console.error("External Events API Error:", err.message)
    res.status(500).json({
      success: false,
      message: "Failed to fetch external events",
      error: err.message,
    })
  }
})

module.exports = router
