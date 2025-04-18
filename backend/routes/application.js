const express = require("express");
const Application = require("../models/Application");

const router = express.Router();

// Submit a job application
router.post("/", async (req, res) => {
  const { jobId, userId, resume, coverLetter } = req.body;

  try {
    const application = new Application({ jobId, userId, resume, coverLetter, status:"submitted" });
    await application.save();
    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ message: "Error submitting application", error: err });
  }
});

// Get all applications for a specific job
router.get("/:jobId", async (req, res) => {
  const { jobId } = req.params;

  try {
    const applications = await Application.find({ jobId }).populate("userId", "username email");
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: "Error fetching applications", error: err });
  }
});

module.exports = router;