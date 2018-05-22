const Category = require('../models/category');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
/**
 * @module Category
 */
module.exports = {
  /**
     * Az összes kategória megjelenítése
     * @param {String} req - A távoli kérés.
     * @param {Object} res - A lekérdezett adatok, vagy hiba visszaküldése egy objektumban.
     */
  list: (req, res) => {
    Category.find()
      .exec()
      .then(categories => res.status(200).json(categories))
      .catch(err => res.status(500).send(err));
  },

  /**
     * Egy bizonyos, id-vel azonosított kategória megjelenítése.
     * @param {String} req - A távoli kérés.
     * @param {Object} res - A lekérdezett adatok, vagy hiba visszaküldése egy objektumban.
     */
  find: (req, res) => {
    Category.findById(req.params.id)
      .exec()
      .then(category => res.status(200).json(category))
      .catch(err => res.status(500).send(err));
  },

  /**
     * Egy új kategória rögzítése az adatbázisban.
     * @param {String} req - A távoli kérés, mely tartalmazza a felvinni kívánt adatot.
     * @param {Object} res - A felvitt adat, vagy hiba visszaküldése egy objektumban.
     */
  create: (req, res) => {
    Category.create(req.body)
      .then((category) => {
        if (category) {
          res.status(200).json(category);
        } else {
          res.status(500).json({
            error: category,
          });
        }
      })
      .catch(err => res.status(500).json({
        error: err,
      }));
  },

  /**
     * Egy bizonyos, id-vel azonosított kategória módosítása az adatbázisban.
     * @param {String} req - A távoli kérés, mely tartalmazza a módisítani kívánt adatot.
     * @param {Object} res - A felülírt adat, vagy hiba visszaküldése egy objektumban.
     */
  update: (req, res) => {
    Category.findByIdAndUpdate(req.params.id, req.body)
      .then(category => res.status(200).json(category))
      .catch(err => res.status(500).send(err));
  },


  /**
     * Egy bizonyos, id-vel azonosított kategória törlése az adatbázisból.
     * @param {String} req - A távoli kérés, mely tartalmazza a módisítani kívánt adatot.
     * @param {Object} res - A törölt adat, vagy hiba visszaküldése egy objektumban.
     */
  remove: (req, res) => {
    Category.findByIdAndRemove(req.params.id)
      .then(category => res.status(200).json(category))
      .catch(err => res.status(500).send(err));
  },
};
