const { query } = require('../db');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken } = require('../middleware/auth'); // import

const register = async (req, res) => {
  const { first_name, last_name, email, password, role } = req.body;
  try {
    console.log("Incoming user data:", req.body);
    const hashed = await hashPassword(password);
    const result = await query(
      `INSERT INTO users (first_name, last_name, email, password_hash, role)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, email, role`,
      [first_name, last_name, email, hashed, role]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Registration error:", err);
    console.error(error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("TRIGGER0", process.env.JWT_SECRET);
  try {
    const result = await query(
      `SELECT id, first_name, last_name, email, password_hash, role FROM users WHERE email = $1`,
      [email]
    );
    if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const user = result.rows[0];
    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
    
    const token = generateToken(user.id, user.role);
    res.status(200).json({ message: "Success", token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = { register, login };
