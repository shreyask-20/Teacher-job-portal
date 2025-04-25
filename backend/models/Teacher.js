import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profession: { type: String },
  location: { type: String },
  website: { type: String },
  phone: { type: String },
  age: { type: Number },
  profilePicUrl: { type: String },
  resumeUrl: { type: String },
  education: [
    {
      degree: String,
      field: String,
      from: Date,
      to: Date,
      school: String,
      description: String,
    },
  ],
  experience: [
    {
      company: String,
      role: String,
      from: Date,
      to: Date,
      description: String,
    },
  ],
  skills: [
    {
      name: String,
      proficiency: String,
    },
  ],
}, { timestamps: true });

export default mongoose.model('Teacher', teacherSchema);
