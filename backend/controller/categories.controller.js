const Categories = require('../models/categories');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

function lowerCaser(body) {
  const newBody = body;
  Object.keys(newBody).forEach((key) => {
    newBody[key] = newBody[key].toLowerCase();
  });
  return newBody;
}

/**
 * @module Categories
 */

module.exports = {

  /**
    * összes kategória listázása
    * @param {String} req - A kérés.
    * @param {Object} res - Ha nem történt hiba, a kért adatokat visszakapjuk egy objektumban.
    */

  list: (req, res) => {
    Categories.find({})
      .then((categories) => {
        res.status(200).json(categories);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },

  /**
   * Egy kategória megjelenítése
   * @param {String} req - A kérés.
   * @param {Object} res - Ha nem történt hiba, a kért adatot visszakapjuk egy objektumban.
   */

  find: (req, res) => {
    Categories.findById(req.params.id)
      .then((categories) => {
        if (categories) {
          res.status(200).json(categories);
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
 * kategória létrehozása
 * @param {String} req - Létrehoz egy új kategóriát, lowerCase
 * @param {Object} res - Ha nem történt hiba, a kért adatokat visszakapjuk egy objektumban.
 */

  create: (req, res) => {
    let body = JSON.stringify(req.body);
    body = JSON.parse(body);

    lowerCaser(body);

    Categories.create(body)
      .then((categories) => {
        res.status(200).json(categories);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },

  /**
   * kategória nevének frissítése
   * @param {String} req - Frissíti a kategória nevét, lowerCase
   * @param {Object} res - Ha nem történt hiba, a frissítés előtti visszakapjuk egy objektumban.
   */

  update: (req, res) => {
    let body = JSON.stringify(req.body);
    body = JSON.parse(body);

    lowerCaser(body);

    Categories.findById(req.params.id)
      .then(Categories.findByIdAndUpdate(req.params.id, body)
        .then((categories) => {
          if (categories) {
            res.status(200).json(categories);
          } else {
            res.status(404).json({ message: 'Not a valid Id!' });
          }
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        }));
  },


  /**
   * Kategória törlése
   * @param {String} req - Törli a kategóriát
   * @param {Object} res - Ha nem történt hiba, a kért adatokat visszakapjuk egy objektumban.
   */

  remove: (req, res) => {
    Categories.findByIdAndRemove(req.params.id)
      .then((categories) => {
        if (categories) {
          res.status(200).json(categories);
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
};
