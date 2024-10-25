
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    store: new FileStore({}),
    secret: 'your-secret-key', // Replace with a strong secret in production
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 3600000 } // 1-hour session expiration
  })
);

// Sample users database (in a real app, use a real database)
const users = {
  user1: {
    username: 'user1',
    passwordHash: bcrypt.hashSync('password123', 10), // Store hashed passwords
  },
};

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

// Routes
app.get('/', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome ${req.session.user.username}! <a href="/logout">Logout</a>`);
  } else {
    res.redirect('/login');
  }
});

// Login form
app.get('/login', (req, res) => {
  res.send(`
    <form action="/login" method="POST">
      <label>Username:</label><input type="text" name="username" required><br>
      <label>Password:</label><input type="password" name="password" required><br>
      <button type="submit">Login</button>
    </form>
  `);
});

// Handle login form submission
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users[username];

  if (user && (await bcrypt.compare(password, user.passwordHash))) {
    req.session.user = { username: user.username };
    res.redirect('/');
  } else {
    res.send('Invalid username or password. <a href="/login">Try again</a>');
  }
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send('Error logging out.');
    }
    res.redirect('/login');
  });
});

// Protected route
app.get('/dashboard', isAuthenticated, (req, res) => {
  res.send(`Hello, ${req.session.user.username}. Welcome to your dashboard!`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
