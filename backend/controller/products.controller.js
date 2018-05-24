const Products = require('../models/products');
const mongoose = require('mongoose');
const fs = require('fs');
mongoose.Promise = require('bluebird');

/**
 * @module Product
 */

module.exports = {

  /**
   * összes termék listázása
   * @param {String} req - A kérés.
   * @param {Object} res - Ha nem történt hiba, a kért adatokat visszakapjuk egy objektumban.
   * @return {Array} - Visszatér a product-ok tömbjével.
   */

  list: (req, res) => {
    Products.find({})
      .populate('productCategory', 'categoryName')
      .exec()
      .then((products) => {
        res.status(200).json(products);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },

  /**
   * Egy termék megjelenítése
   * @param {String} req - A kérés.
   * @param {Object} res - Ha nem történt hiba, a kért adatot visszakapjuk egy objektumban.
   * @return {Array} - visszatér egy product-tal.
   */

  find: (req, res) => {
    Products.findById(req.params.id)
      .populate('productCategory', 'categoryName')
      .populate({
        path: 'productComments',
        select: 'text user createdAt',
        populate: {
          path: 'user',
          select: 'username',
          model: 'User',
        },
      })
      .exec()
      .then((products) => {
        if (products) {
          res.status(200).json(products);
        } else {
          res.status(404).json({
            message: 'Not a valid Id!',
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },

  /**
   * termék létrehozása
   * @param {String} req - Ha van file feltölti és az útvonalát beállítja a db-ben
   * @param {Object} res - Ha nem történt hiba, a kért adatokat visszakapjuk egy objektumban.
   * @return létrehozott product object-jét küldi vissza.
   */

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
        res.status(500).json({
          error: err,
        });
      });
  },

  /**
   * termék adatainak frissítése
   * @param {String} req - Ha van file feltölti és ha van korábbi kép amit felülírunk, azt törli
   * @param {Object} res - Ha nem történt hiba, a frissítés előtti visszakapjuk egy objektumban.
   * @return - az update-elt product értékével tér vissza
   */

  update: (req, res) => {
    let body = JSON.stringify(req.body);
    body = JSON.parse(body);
    if (req.file) {
      body.productImg = `http://localhost:8080/${req.file.path.replace(/\\/, '/')}`;
    }

    if (!body.productImg) {
      Products.findById(req.params.id)
        .then((products) => {
          body.productImg = products.productImg;
        })
        .then(Products.findByIdAndUpdate(req.params.id, body)
          .then((products) => {
            if (products) {
              res.status(200).json(products);
            } else {
              res.status(404).json({
                message: 'Nem létező Id!',
              });
            }
          })
          .catch((err) => {
            res.status(500).json({
              error: err,
            });
          }));
    } else {
      Products.findByIdAndUpdate(req.params.id, body)
        .then((products) => {
          let imgRoute = products.productImg;
          imgRoute = imgRoute.substring(22);

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
            res.status(404).json({
              message: 'Not a valid Id!',
            });
          }
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    }
  },


  /**
   * termék törlése
   * @param {String} req - Törli a terméket, és ha van akkor a képet is.
   * @param {Object} res - Ha nem történt hiba, a kért adatokat visszakapjuk egy objektumban.
   * @return - megkeresi id alapján és a törölt terméket kapjuk vissz aegy objektumban.
   */

  remove: (req, res) => {
    Products.findByIdAndRemove(req.params.id)
      .then((products) => {
        if (products) {
          res.status(200).json(products);
        } else {
          res.status(404).json({
            message: 'Nem létező Id!',
          });
        }
        let imgRoute = '';
        if (products.productImg) {
          imgRoute = products.productImg;
          imgRoute = imgRoute.substring(22);
        }

        fs.exists(imgRoute, (exists) => {
          if (exists) {
            fs.unlink(imgRoute, (err) => {
              if (err) throw err;
            });
          }
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },

  /**
   * Komment hozzáadása a termékhez
   * @param {String} productId - A kiválasztott termék ID-je.
   * @param {String} commentId - A hozzáfúzött komment ID-je,
   *  amit az adott termék productComments tömbjébe helyez.
   */
  addComment: (productId, commentId) => Products.findByIdAndUpdate(productId, {
    $push: {
      productComments: commentId,
    },
  }),

  /**
   * Komment eltávolítása a termékhez
   * @param {String} productId - A kiválasztott termék ID-je.
   * @param {String} commentId - A hozzáfúzött komment ID-je,
   *  amit kiveszünk az adott termék productComments tömbjéből.
   */
  removeComment: (productId, commentId) => Products.findByIdAndUpdate(productId, {
    $pull: {
      productComments: commentId,
    },
  }),
};
