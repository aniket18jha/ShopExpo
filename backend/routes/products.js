const express = require('express');
const multer = require('multer');
const Product = require('../models/Product');
const Store = require('../models/Store');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, 'uploads/'); },
  filename: function (req, file, cb) { cb(null, Date.now() + '-' + file.originalname); }
});
const upload = multer({ storage });

// create product (vendor only)
router.post('/', auth, requireRole('vendor'), upload.array('images', 5), async (req, res) => {
  try {
    const { storeId, name, description, price, category, stock } = req.body;
    if (!storeId || !name || !price) return res.status(400).json({ msg: 'Missing fields' });
    const store = await Store.findById(storeId);
    if (!store) return res.status(404).json({ msg: 'Store not found' });
    if (String(store.vendor) !== String(req.user._id)) return res.status(403).json({ msg: 'Not your store' });

    const images = (req.files || []).map(f => `/uploads/${f.filename}`);
    const product = new Product({
      store: storeId,
      vendor: req.user._id,
      name,
      description,
      price: parseFloat(price),
      category,
      stock: parseInt(stock || 0),
      images
    });
    await product.save();
    res.json(product);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// get all products (with optional query ?store=)
router.get('/', async (req, res) => {
  try {
    const { store, search, category } = req.query;
    const filter = {};
    if (store) filter.store = store;
    if (category) filter.category = category;
    if (search) filter.name = { $regex: search, $options: 'i' };
    const products = await Product.find(filter).populate('store','name photo');
    res.json(products);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('store','name photo vendor');
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    res.json(product);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// update product (vendor only)
router.put('/:id', auth, requireRole('vendor'), upload.array('images',5), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    if (String(product.vendor) !== String(req.user._id)) return res.status(403).json({ msg: 'Not your product' });
    const updates = ['name','description','price','category','stock'].reduce((acc, k) => {
      if (req.body[k] !== undefined) acc[k] = req.body[k];
      return acc;
    }, {});
    if (req.files && req.files.length) updates.images = (req.files||[]).map(f=>`/uploads/${f.filename}`);
    const updated = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(updated);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// delete product (vendor only)
router.delete('/:id', auth, requireRole('vendor'), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    if (String(product.vendor) !== String(req.user._id)) return res.status(403).json({ msg: 'Not your product' });
    await product.remove();
    res.json({ msg: 'Product removed' });
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

module.exports = router;
