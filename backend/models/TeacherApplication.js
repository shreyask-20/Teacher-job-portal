const mongoose = require("mongoose");

const TeacherApplicationSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  subject: { type: String, required: true },
  educationLevel: { type: String, required: true },
  educationDetails: { type: String },
  experience: { type: String },
  certification: { type: String },
  resume: { type: String }, // URL or path to the uploaded resume
  agree: { type: Boolean, required: true },
  dateSubmitted: { type: Date, default: Date.now },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job", // Make sure you have a Job model
    required: true,
  },
  status: {
    type: String,
    enum: ["submitted", "in review", "rejected", "approved"],
    default: "submitted",
  },
});

module.exports = mongoose.model("TeacherApplication", TeacherApplicationSchema);
