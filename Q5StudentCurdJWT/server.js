
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const studentRoutes = require('./routes/students');
app.use('/students', studentRoutes);


const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/studentdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const authRoutes = require('./routes/auth');


app.use('/auth', authRoutes);
app.use('/students', studentRoutes);
