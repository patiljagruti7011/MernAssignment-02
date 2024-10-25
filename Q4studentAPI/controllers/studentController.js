
const Student = require('../models/student');

const getAllStudents = async (req, res) => {
    const students = await Student.find();
    res.render('students', { students });
};

const createStudent = async (req, res) => {
    const { name, age, course } = req.body;
    const student = new Student({ name, age, course });
    await student.save();
    res.redirect('/students');
};

const updateStudent = async (req, res) => {
    const { id } = req.params;
    await Student.findByIdAndUpdate(id, req.body);
    res.redirect('/students');
};

const deleteStudent = async (req, res) => {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    res.redirect('/students');
};

module.exports = { getAllStudents, createStudent, updateStudent, deleteStudent };
