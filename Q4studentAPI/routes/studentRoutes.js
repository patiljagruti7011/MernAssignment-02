
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authenticateToken = require('../middleware/authmiddleware');

router.get('/', authenticateToken, studentController.getAllStudents);
router.post('/create', authenticateToken, studentController.createStudent);
router.post('/update/:id', authenticateToken, studentController.updateStudent);
router.post('/delete/:id', authenticateToken, studentController.deleteStudent);

module.exports = router;
