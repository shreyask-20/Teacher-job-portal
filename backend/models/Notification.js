const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['job-posted', 'application-submitted', 'status-update'],
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job', // assuming your job schema is named 'Job'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  institution: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Notification', notificationSchema);
