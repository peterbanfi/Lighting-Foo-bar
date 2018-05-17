const Order = require('../models/order');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = {
    list: (req, res) => {
        Order.find()
            .populate('user', 'username')
            .populate('products.product', 'productName productPrice')
            .exec()
            .then(orders => res.json(orders))
            .catch(err => res.send(err));
    },

    find: (req, res) => {
        Order.findById(req.params.id)
            .populate('user', 'username')
            .populate('products.product', 'productName productPrice')
            .exec()
            .then(order => res.json(order))
            .catch(err => res.send(err));
    },

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

    update: (req, res) => {
        Order.findByIdAndUpdate(req.params.id, req.body)
            .then(order => res.json(order))
            .catch(err => res.send(err));
    },

    remove: (req, res) => {
        Order.findByIdAndRemove(req.params.id)
            .then(order => res.json(order))
            .catch(err => res.send(err));
    },
};