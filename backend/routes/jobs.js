const express = require("express");
const Job = require("../models/Job");
const User = require("../models/User");
const Notification = require("../models/Notification")

const router = express.Router();

// Create a new job
router.post("/", async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();


   // Step 2: Get all users (assuming you have a User model)
   const users = await User.find(); // You can adjust the query based on how you store users

   // Step 3: Create a notification for each user
   const notifications = users.map((user) => {
     return new Notification({
       title: 'New Job Posted',
       message: `A new job has been posted: ${job.title}`,
       type: 'job-posted',
       isRead: false,
       jobId: job._id,
       userId: user._id,
       institution: job.location,
     });
   });


      
       
        
   // Step 4: Save notifications to the database
   await Notification.insertMany(notifications);

    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: "Error creating job", error: err });
  }
});

// Get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching jobs", error: err });
  }
});

// Filter jobs
router.get("/filter", async (req, res) => {
  const { title, location, category, grade, type } = req.query;
  const filter = {};

  if (title) filter.title = new RegExp(title, "i");
  if (location) filter.location = new RegExp(location, "i");
  if (category) filter.category = category;
  if (grade) filter.grade = grade;
  if (type) filter.type = type;

  console.log("Filter criteria:", filter); // Log the filter criteria

  try {
    const jobs = await Job.find(filter);
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Error filtering jobs", error: err });
  }
});

// Get jobs with search and filter
router.get("/search", async (req, res) => {
  const { title, location } = req.query;
  const filter = {};

  if (title) filter.title = new RegExp(title, "i");
  if (location) filter.location = new RegExp(location, "i");

  try {
    const jobs = await Job.find(filter).sort({ datePosted: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching jobs", error: err });
  }
});

module.exports = router;