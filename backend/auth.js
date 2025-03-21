const jwt = require('jsonwebtoken');
const pool = require('./db');

const login = async (req, res) => {
    const { username, password } = req.body;

    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) return res.status(400).json({ message: 'User not found' });

    const user = result.rows[0];

    if (password !== user.password) return res.status(400).json({ message: 'Incorrect password' });

    const token = jwt.sign(
        { userId: user.user_id, role: user.role },
        'secret_key',
        { expiresIn: '1h' }
    );

    res.json({ token });
};

module.exports = { login };
