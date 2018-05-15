const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    productid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  updatedBy: {
    type: String
  }
}, {
  timestamps: true,
});


module.exports = mongoose.model('Order', orderSchema);