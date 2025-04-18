const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Get notifications for a user
router.get('/:userId', async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

//to get all unread notifications
router.get('/unread/:userId', async (req, res) => {
  try {
    const unreadNotifications = await Notification.find({
      userId: req.params.userId,
      isRead: false
    })
      .sort({ createdAt: -1 }); // Most recent first

    res.status(200).json(unreadNotifications);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to fetch unread notifications' });
  }
});

  

// Mark as read
router.put('/read/:id', async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ message: 'Marked as read' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to mark as read' });
  }
});

// Create new notification
router.post('/', async (req, res) => {
  try {
    const newNotification = new Notification(req.body);
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (err) {
    console.error(err);
    
    
    res.status(500).json({ error: 'Failed to create notification' });
  }
});

module.exports = router;
