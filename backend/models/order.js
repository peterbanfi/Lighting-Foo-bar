const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  address: {
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
    },
    zip: {
      type: Number,
      required: true,
    },
  },
  invoiceAddress: {
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
    },
    zip: {
      type: Number,
      required: true,
    },
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  }],
}, {
  timestamps: true,
});


module.exports = mongoose.model('Order', orderSchema);
