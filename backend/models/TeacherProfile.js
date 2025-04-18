const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  degree: String,
  field: String,
  from: Date,
  to: Date,
  school: String,
  description: String,
}, { _id: false });

const experienceSchema = new mongoose.Schema({
  company: String,
  role: String,
  from: Date,
  to: Date,
  description: String,
}, { _id: false });

const skillSchema = new mongoose.Schema({
  name: String,
  proficiency: String,
}, { _id: false });

const teacherProfileSchema = new mongoose.Schema({
  name: String,
  email: String,
  profession: String,
  location: String,
  website: String,
  phone: String,
  age: Number,

  profilePicUrl: String, // If stored as a file path or URL
  resumeUrl: String,

  education: [educationSchema],
  experience: [experienceSchema],
  skills: [skillSchema],
}, { timestamps: true });

module.exports = mongoose.model('TeacherProfile', teacherProfileSchema);
