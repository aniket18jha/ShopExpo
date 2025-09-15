const express = require('express');
const Order = require('../models/Order');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

// user orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// vendor orders (orders that include items from this vendor)
router.get('/vendor', auth, requireRole('vendor'), async (req, res) => {
  try {
    const orders = await Order.find({ 'items.vendor': req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

module.exports = router;
