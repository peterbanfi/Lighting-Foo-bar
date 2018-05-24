const Order = require('../models/order');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
/**
 * @module Order
 */
module.exports = {
  /**
     * Az összes rendelés megjelenítése
     * @param {String} req - A távoli kérés.
     * @param {Object} res - A lekérdezett adatok, vagy hiba visszaküldése egy objektumban.
     * @return {Object} - a rendelések objektumát küldi vissza.
     */
  list: (req, res) => {
    Order.find()
      .populate('user', 'username')
      .populate('products.product', 'productName productPrice')
      .exec()
      .then(orders => res.status(200).json(orders))
      .catch(err => res.status(500).send(err));
  },

  /**
     * Egy bizonyos, id-vel azonosított rendelés megjelenítése.
     * @param {String} req - A távoli kérés.
     * @param {Object} res - A lekérdezett adatok, vagy hiba visszaküldése egy objektumban.
     * @return {Object} - egy bizonyos rendelés objektumát küldi vissza
     */
  find: (req, res) => {
    Order.findById(req.params.id)
      .populate('user', 'username')
      .populate('products.product', 'productName productPrice')
      .exec()
      .then(order => res.status(200).json(order))
      .catch(err => res.status(500).send(err));
  },

  /**
     * Egy rendelés rögzítése az adatbázisban.
     * @param {String} req - A távoli kérés, mely tartalmazza a felvinni kívánt adatot.
     * @param {Object} res - A felvitt adat, vagy hiba visszaküldése egy objektumban.
     * @return {Object} - a felvitt új rendelés objektumát küldi vissza.
     */
  create: (req, res) => {
    Order.create(req.body)
      .then((order) => {
        if (order) {
          res.status(200).json(order);
        } else {
          res.status(500).json({
            error: order,
          });
        }
      })
      .catch(err => res.status(500).json({
        error: err,
      }));
  },

  /**
     * Egy bizonyos, id-vel azonosított rendelés módosítása az adatbázisban.
     * @param {String} req - A távoli kérés, mely tartalmazza a módisítani kívánt adatot.
     * @param {Object} res - A felülírt adat, vagy hiba visszaküldése egy objektumban.
     * @return {Object} - a módosított rendelés objektumát küldi vissza.
     */
  update: (req, res) => {
    Order.findByIdAndUpdate(req.params.id, req.body)
      .then(order => res.status(200).json(order))
      .catch(err => res.status(500).send(err));
  },


  /**
     * Egy bizonyos, id-vel azonosított rendelés törlése az adatbázisból.
     * @param {String} req - A távoli kérés, mely tartalmazza a módisítani kívánt adatot.
     * @param {Object} res - A törölt adat, vagy hiba visszaküldése egy objektumban.
     * @return {object} a törölt objektum adatait küldi vissza.
     */
  remove: (req, res) => {
    Order.findByIdAndRemove(req.params.id)
      .then(order => res.status(200).json(order))
      .catch(err => res.status(500).send(err));
  },
};
