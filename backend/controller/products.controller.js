const Products = require('../models/products');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = {
  list: (req, res) => {
    Products.find({})
      .then(products => res.json(products))
      .catch(err => res.send(err));
  },

  find: (req, res) => {
    Products.findById(req.params.id)
      .then(products => res.json(products))
      .catch(err => res.send(err));
  },

  create: (req, res) => {
    Products.create(req.body)
      .then(products => res.send(products))
      .catch(err => res.send(err));
  },

  update: (req, res) => {
    Products.findByIdAndUpdate(req.params.id, req.body)
      .then(products => res.json(products))
      .catch(err => res.send(err));
  },

  remove: (req, res) => {
    Products.findByIdAndRemove(req.params.id)
      .then(products => res.json(products))
      .catch(err => res.send(err));
  },
};
