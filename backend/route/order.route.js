const express = require('express');

const orderRouter = express.Router();
const orderController = require('../controller/order.controller');

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.json({
            error: 'Be kell jelentkezned'
        });
    }
}

orderRouter.route('/')
    .get(orderController.list)
    .post(loggedIn, orderController.create);

orderRouter.route('/:id')
    .get(orderController.find)
    .put(loggedIn, orderController.update)
    .delete(loggedIn, orderController.remove);

module.exports = orderRouter;