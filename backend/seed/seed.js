require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');
const Store = require('../models/Store');
const Product = require('../models/Product');

const run = async () => {
  await connectDB();

  // cleanup
  await User.deleteMany({});
  await Store.deleteMany({});
  await Product.deleteMany({});

  // create vendor
  const vendorPwd = await bcrypt.hash('vendor123', 10);
  const vendor = new User({ name: 'Demo Vendor', email: 'vendor@example.com', password: vendorPwd, role: 'vendor' });
  await vendor.save();

  // create buyer
  const buyerPwd = await bcrypt.hash('buyer123', 10);
  const buyer = new User({ name: 'Demo Buyer', email: 'buyer@example.com', password: buyerPwd, role: 'buyer' });
  await buyer.save();

  // store
  const store = new Store({ vendor: vendor._id, name: 'Vendor Shop', photo: '' });
  await store.save();

  // product
  const p1 = new Product({
    store: store._id,
    vendor: vendor._id,
    name: 'Sample T-Shirt',
    description: 'Comfortable cotton t-shirt',
    price: 499,
    category: 'Clothing',
    images: [],
    stock: 100
  });
  await p1.save();

  console.log('Seed complete. Vendor login: vendor@example.com / vendor123, Buyer login: buyer@example.com / buyer123');
  process.exit(0);
};

run().catch(err => { console.error(err); process.exit(1); });
