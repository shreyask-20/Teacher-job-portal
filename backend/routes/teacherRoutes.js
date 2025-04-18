import express from 'express';
import Teacher from '../models/Teacher.js';

const router = express.Router();

// Create or Update profile
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;

    let teacher = await Teacher.findOne({ email });

    if (teacher) {
      teacher = await Teacher.findOneAndUpdate({ email }, req.body, { new: true });
      return res.status(200).json(teacher);
    } else {
      const newTeacher = new Teacher(req.body);
      await newTeacher.save();
      return res.status(201).json(newTeacher);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get profile by email
router.get('/:email', async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ email: req.params.email });
    if (!teacher) return res.status(404).json({ message: 'Profile not found' });
    res.status(200).json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
