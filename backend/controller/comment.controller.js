const Comment = require('../models/comment');
const productController = require('../controller/products.controller');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
/**
 * @module Comment
 */
module.exports = {
  /**
   * Az összes hozzászólás megjelenítése
   * @param {String} req - A távoli kérés.
   * @param {Object} res - A lekérdezett adatok, vagy hiba visszaküldése egy objektumban.
   */
  list: (req, res) => {
    Comment.find()
      .populate('user', 'username')
      .exec()
      .then(comments => res.status(200).json(comments))
      .catch(err => res.status(500).send(err));
  },

  /**
   * Egy bizonyos, id-vel azonosított rendelés megjelenítése.
   * @param {String} req - A távoli kérés.
   * @param {Object} res - A lekérdezett adatok, vagy hiba visszaküldése egy objektumban.
   */
  find: (req, res) => {
    Comment.findById(req.params.id)
      .populate('user', 'username')
      .exec()
      .then(comment => res.status(200).json(comment))
      .catch(err => res.status(500).send(err));
  },

  /**
   * Egy Hozzászólás rögzítése az adatbázisban.
   * @param {String} req - A távoli kérés, mely tartalmazza a felvinni kívánt adatot.
   * @param {Object} res - A felvitt adat, vagy hiba visszaküldése egy objektumban.
   */
  create: (req, res) => {
    Comment.create(req.body)
      .then(comment => productController.addComment(req.params.prodid, comment._id))
      .then((comment) => {
        if (comment) {
          res.status(200).json(comment);
        } else {
          res.status(500).json({
            error: comment,
          });
        }
      })
      .catch(err => res.status(500).json({
        error: err,
      }));
  },

  /**
   * Egy bizonyos, id-vel azonosított hozzászólás módosítása az adatbázisban.
   * @param {String} req - A távoli kérés, mely tartalmazza a módisítani kívánt adatot.
   * @param {Object} res - A felülírt adat, vagy hiba visszaküldése egy objektumban.
   */
  update: (req, res) => {
    Comment.findByIdAndUpdate(req.params.id, req.body)
      .then(comment => res.status(200).json(comment))
      .catch(err => res.status(500).send(err));
  },


  /**
   * Egy bizonyos, id-vel azonosított hozzászólás törlése az adatbázisból.
   * @param {String} req - A távoli kérés, mely tartalmazza a módisítani kívánt adatot.
   * @param {Object} res - A törölt adat, vagy hiba visszaküldése egy objektumban.
   * @returns {Object} - A törölt adat, vagy hiba visszaküldése egy objektumban.
   */
  remove: (req, res) => {
    Comment.findByIdAndRemove(req.params.commid)
      .then(comment => productController.removeComment(req.params.prodid, comment._id))
      .then(comment => res.status(200).json(comment))
      .catch(err => res.status(500).send(err));
  },
};
