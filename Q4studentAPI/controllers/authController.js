
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const users = [{ username: 'admin', password: bcrypt.hashSync('password', 10) }]; // Simulated users, replace with database in production

const login = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/students');
};

const logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/auth/login');
};

module.exports = { login, logout };
