const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.split(' ')[1] : null;
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ msg: 'Invalid token user' });
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};

const requireRole = (role) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ msg: 'Not authenticated' });
  if (req.user.role !== role) return res.status(403).json({ msg: 'Access denied' });
  next();
};

module.exports = { auth, requireRole };


