
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.redirect('/auth/login');

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.redirect('/auth/login');
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
