const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: String,
  price: Number,
  quantity: Number,
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' }
});

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [OrderItemSchema],
  address: {
    name: String,
    line1: String,
    line2: String,
    city: String,
    state: String,
    postalCode: String,
    phone: String
  },
  total: Number,
  status: { type: String, default: 'Pending' }, // Pending, Confirmed, Shipped, Delivered
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
