const express = require("express");
const multer = require("multer");
const TeacherApplication = require("../models/TeacherApplication");
const Job = require('../models/Job'); // assuming you have a Job model
const Notification = require('../models/Notification'); 

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique file name
  },
});
const upload = multer({ storage });

// Submit a teacher application
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const { firstName, lastName, email, phone, gender, subject, educationLevel, educationDetails, experience, certification, agree,jobId,status,userId } = req.body;

    const application = new TeacherApplication({
      userId,
      firstName,
      lastName,
      email,
      phone,
      gender,
      subject,
      educationLevel,
      educationDetails,
      experience,
      certification,
      resume: req.file ? req.file.path : null, // Save the file path
      agree,
      jobId : jobId,
      status
    });


    

    await application.save();

    try {
      // Step 1: Fetch job by ID
      const job = await Job.findById(jobId);
      if (!job) {
       
        return;
      }
  
      // Step 2: Create notification based on job details
      const notification = new Notification({
        title: 'Application Submitted',
        message: `You have successfully applied for the ${job.title} role.`,
        type: 'application-submitted',
        isRead: false,
        jobId: job._id,
        userId: userId, // This should come from the logged-in user
        institution: job.location, // You can also fetch this from job if it's stored there
      });
  
      // Step 3: Save the notification
      await notification.save();
      
    } catch (error) {
      console.error('Error creating notification:', error);
    }

    res.status(201).json({ message: "Application submitted successfully", application });
  } catch (err) {
    res.status(500).json({ message: "Error submitting application", error: err });
  }
});

// Get all teacher applications
router.get("/", async (req, res) => {
  try {
    const applications = await TeacherApplication.find();
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: "Error fetching applications", error: err });
  }
});

module.exports = router;