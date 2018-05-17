const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  productName: {
    type: String,
    required: true,
    unique: true,
  },
  productUrl: {
    type: String,
    required: true,
  },
  productImg: {
    type: String,
  },
  productManufacturer: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', ProductSchema);
