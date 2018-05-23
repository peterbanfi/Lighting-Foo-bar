const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
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
  productCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  productComments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', ProductSchema);
