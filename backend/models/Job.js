const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String },
  grade: { type: String },
  type: { type: String },
  salary: { type: String },
  description: { type: String },
  experience: { type: Number },
  datePosted: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Job", JobSchema);