const jwt = require('jsonwebtoken');
const db = require('../db');

// Generate JWT token
const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );
};

// Verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Authentication middleware
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Check if user exists and is active
    const userQuery = await db.query(
      'SELECT id, email, role, is_active FROM users WHERE id = $1',
      [decoded.userId]
    );

    if (userQuery.rows.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const user = userQuery.rows[0];

    if (!user.is_active) {
      return res.status(401).json({ error: 'Account deactivated' });
    }

    // Add user info to request object
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

// Role-based authorization middleware
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
};

// Rate limiting middleware (simple implementation)
const rateLimit = (windowMs = 15 * 60 * 1000, max = 100) => {
  const requests = new Map();

  return (req, res, next) => {
    const key = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    
    if (!requests.has(key)) {
      requests.set(key, { count: 1, resetTime: now + windowMs });
      return next();
    }

    const requestData = requests.get(key);
    
    if (now > requestData.resetTime) {
      requests.set(key, { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (requestData.count >= max) {
      return res.status(429).json({
        error: 'Too many requests',
        resetTime: requestData.resetTime
      });
    }

    requestData.count++;
    next();
  };
};

// Session tracking middleware
const trackSession = async (req, res, next) => {
  try {
    if (req.user) {
      // Track user session
      await db.query(
        `INSERT INTO user_sessions (user_id, session_token, ip_address, user_agent, expires_at)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (session_token) DO UPDATE SET
         ip_address = EXCLUDED.ip_address,
         user_agent = EXCLUDED.user_agent`,
        [
          req.user.id,
          req.headers.authorization?.substring(7) || 'unknown',
          req.ip,
          req.headers['user-agent'],
          new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
        ]
      );
    }

    // Track page view
    await db.query(
      `INSERT INTO page_views (user_id, page_url, ip_address, user_agent, referrer, session_id)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        req.user?.id || null,
        req.originalUrl,
        req.ip,
        req.headers['user-agent'],
        req.headers.referer || null,
        req.headers.authorization?.substring(7) || 'anonymous'
      ]
    );

    next();
  } catch (error) {
    console.error('Session tracking error:', error);
    next(); // Continue even if tracking fails
  }
};

module.exports = {
  generateToken,
  verifyToken,
  authenticate,
  authorize,
  rateLimit,
  trackSession
};