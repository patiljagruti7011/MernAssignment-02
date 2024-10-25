const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/file-upload', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a schema and model for user registration
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    files: [String],
});

const User = mongoose.model('User', userSchema);

// Set up view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// File upload settings
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
    },
});

const upload = multer({ storage: storage });

// Step 3: Create User Registration Form Route
app.get('/', (req, res) => {
    res.render('register');
});

// Step 4: Handle Form Submission
app.post('/register', upload.array('files', 10), async (req, res) => {
    const { username, email } = req.body;
    const files = req.files.map(file => file.filename);
    
    const user = new User({ username, email, files });
    await user.save();

    res.redirect('/files');
});

// Step 5: List Uploaded Files
app.get('/files', async (req, res) => {
    const users = await User.find({});
    res.render('files', { users });
});

// Step 6: File Download Route
app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const fileLocation = path.join(__dirname, 'uploads', filename);
    res.download(fileLocation);
});

// Start server
app.listen(3500, () => {
    console.log('Server is running on http://localhost:3500');
});
