const mongoose = require("mongoose");
const Job = require("../models/Job");

// New job data
const jobs = [
  {
    title: "Physics Teacher",
    location: "Boston",
    category: "Science",
    grade: "High School",
    type: "Full-Time",
    salary: "55000",
    description: "Looking for a Physics teacher with 4 years of experience.",
    experience: 4,
  },
  {
    title: "Chemistry Teacher",
    location: "Chicago",
    category: "Science",
    grade: "Middle School",
    type: "Part-Time",
    salary: "35000",
    description: "Looking for a part-time Chemistry teacher.",
    experience: 2,
  },
  {
    title: "Biology Teacher",
    location: "Seattle",
    category: "Science",
    grade: "High School",
    type: "Full-Time",
    salary: "60000",
    description: "Looking for an experienced Biology teacher.",
    experience: 5,
  },
  {
    title: "Art Teacher",
    location: "San Francisco",
    category: "Arts",
    grade: "Elementary School",
    type: "Full-Time",
    salary: "40000",
    description: "Looking for an Art teacher for elementary school.",
    experience: 3,
  },
  {
    title: "Physical Education Teacher",
    location: "Los Angeles",
    category: "Sports",
    grade: "High School",
    type: "Full-Time",
    salary: "45000",
    description: "Looking for a PE teacher with a passion for sports.",
    experience: 2,
  },
];

const addJobs = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      "mongodb+srv://mohitpatil8024:mohit123@cluster0.nwrqrcy.mongodb.net/teacher-job-portal?retryWrites=true&w=majority"
    );
    console.log("MongoDB connected");

    // Insert new jobs
    await Job.insertMany(jobs);
    console.log("New jobs added successfully");

    // Disconnect from MongoDB
    mongoose.disconnect();
  } catch (err) {
    console.error("Error adding jobs:", err);
  }
};

addJobs();