const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  photo: { type: String }, // URL / path to /uploads/...
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Store', StoreSchema);
