const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  resume: { type: String }, // URL or path to the uploaded resume
  coverLetter: { type: String },
  dateApplied: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["submitted", "in review", "rejected", "approved"],
    default: "submitted",
  },
});

module.exports = mongoose.model("Application", ApplicationSchema);
