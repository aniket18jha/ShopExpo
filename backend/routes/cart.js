const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { auth } = require('../middleware/auth');

const router = express.Router();

// get cart for user
router.get('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// add to cart
router.post('/add', auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId).populate('store vendor');
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }
    const idx = cart.items.findIndex(i => String(i.product) === String(productId));
    if (idx > -1) {
      cart.items[idx].quantity += parseInt(quantity || 1);
    } else {
      cart.items.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: parseInt(quantity || 1),
        store: product.store?._id,
        vendor: product.vendor?._id
      });
    }
    cart.updatedAt = new Date();
    await cart.save();
    res.json(cart);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// update quantity
router.put('/update', auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(400).json({ msg: 'Cart not found' });
    const idx = cart.items.findIndex(i => String(i.product) === String(productId));
    if (idx === -1) return res.status(404).json({ msg: 'Item not in cart' });
    cart.items[idx].quantity = parseInt(quantity);
    cart.updatedAt = new Date();
    await cart.save();
    res.json(cart);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// remove item
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    const productId = req.params.productId;
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(400).json({ msg: 'Cart not found' });
    cart.items = cart.items.filter(i => String(i.product) !== String(productId));
    cart.updatedAt = new Date();
    await cart.save();
    res.json(cart);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// checkout -> create order and clear cart
router.post('/checkout', auth, async (req, res) => {
  try {
    const { address } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart || cart.items.length === 0) return res.status(400).json({ msg: 'Cart empty' });
    const total = cart.items.reduce((s,i)=>s + i.price * i.quantity, 0);
    const order = new Order({
      user: req.user._id,
      items: cart.items.map(i => ({
        product: i.product,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        vendor: i.vendor,
        store: i.store
      })),
      address,
      total,
      status: 'Pending'
    });
    await order.save();
    // clear cart
    cart.items = [];
    await cart.save();
    res.json(order);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

module.exports = router;
