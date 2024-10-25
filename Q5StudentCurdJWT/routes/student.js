
const express = require('express');
const Student = require('../models/student');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Create a new student
router.post('/', authenticateToken, async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.json(student);
});

// Read all students
router.get('/', authenticateToken, async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

// Update a student
router.put('/:id', authenticateToken, async (req, res) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(student);
});

// Delete a student
router.delete('/:id', authenticateToken, async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted' });
});

module.exports = router;
