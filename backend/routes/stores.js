const express = require('express');
const multer = require('multer');
const Store = require('../models/Store');
const Product = require('../models/Product');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

// multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, 'uploads/'); },
  filename: function (req, file, cb) { cb(null, Date.now() + '-' + file.originalname); }
});
const upload = multer({ storage });

// create store (vendor only)
router.post('/', auth, requireRole('vendor'), upload.single('photo'), async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ msg: 'Store name required' });
    const existing = await Store.findOne({ vendor: req.user._id });
    if (existing) return res.status(400).json({ msg: 'Vendor already has a store' });
    const store = new Store({
      vendor: req.user._id,
      name,
      photo: req.file ? `/uploads/${req.file.filename}` : undefined
    });
    await store.save();
    res.json(store);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// get all stores
router.get('/', async (req, res) => {
  try {
    const stores = await Store.find().populate('vendor','name email');
    res.json(stores);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// get store by id
router.get('/:id', async (req, res) => {
  try {
    const store = await Store.findById(req.params.id).populate('vendor','name email');
    if (!store) return res.status(404).json({ msg: 'Store not found' });
    res.json(store);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// get products by store id
router.get('/:id/products', async (req, res) => {
  try {
    const products = await Product.find({ store: req.params.id });
    res.json(products);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

module.exports = router;
