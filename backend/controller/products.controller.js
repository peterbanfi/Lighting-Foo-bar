const Products = require('../models/products');
const mongoose = require('mongoose');
const fs = require('fs');
mongoose.Promise = require('bluebird');

module.exports = {
  list: (req, res) => {
    Products.find({})
      .then((products) => {
        res.status(200).json(products);
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
        res.status(200).json(products);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },

  update: (req, res) => {
    let body = JSON.stringify(req.body);
    body = JSON.parse(body);
    console.log(body);
    if (req.file) {
      body.productImg = `http://localhost:8080/${req.file.path.replace(/\\/, '/')}`;
    }

    if (!body.productImg) {
      Products.findById(req.params.id)
        .then((products) => {
          console.log(products);
          console.log(products.productImg);
          body.productImg = products.productImg;
        })
        .then(Products.findByIdAndUpdate(req.params.id, body)
          .then((products) => {
            if (products) {
              res.status(200).json(products);
            } else {
              res.status(404).json({ message: 'Not a valid Id!' });
            }
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          }));
    } else {
      Products.findByIdAndUpdate(req.params.id, body)
        .then((products) => {
          let imgRoute = products.productImg;
          imgRoute = imgRoute.substring(22);
          console.log(imgRoute);

          fs.exists(imgRoute, (exists) => {
            if (exists) {
              fs.unlink(imgRoute, (err) => {
                if (err) throw err;
              });
            }
          });

          if (products) {
            res.status(200).json(products);
          } else {
            res.status(404).json({ message: 'Not a valid Id!' });
          }
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    }
  },

  remove: (req, res) => {
    Products.findByIdAndRemove(req.params.id)
      .then((products) => {
        let imgRoute = products.productImg;
        imgRoute = imgRoute.substring(22);
        console.log(imgRoute);

        fs.exists(imgRoute, (exists) => {
          if (exists) {
            fs.unlink(imgRoute, (err) => {
              if (err) throw err;
            });
          }
        });

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
