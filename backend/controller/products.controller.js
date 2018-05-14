const Products = require('../models/products');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = {
  list: (req, res) => {
    Products.find({})
      .then((products) => {
        if (products) {
          res.status(200).json(products);
        } else {
          res.status(500).json({ error: products });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },

  find: (req, res) => {
    Products.findById(req.params.id)
      .then((products) => {
        if (products) {
          res.status(200).json(products);
        } else {
          res.status(404).json({ message: 'Not a valid Id!' });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },

  create: (req, res) => {
    let body = JSON.stringify(req.body);
    body = JSON.parse(body);

    if (req.file) {
      body.productImg = `http://localhost:8080/${req.file.path.replace(/\\/, '/')}`;
    }

    Products.create(body)
      .then((products) => {
        if (products) {
          res.status(200).json(products);
        } else {
          res.status(500).json({ error: products });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },

  update: (req, res) => {
    Products.findByIdAndUpdate(req.params.id, req.body)
      .then((products) => {
        if (products) {
          res.status(200).json(products);
        } else {
          res.status(404).json({ message: 'Not a valid Id!' });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },

  remove: (req, res) => {
    Products.findByIdAndRemove(req.params.id)
      .then((products) => {
        if (products) {
          res.status(200).json(products);
        } else {
          res.status(404).json({ message: 'Not a valid Id!' });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
};
