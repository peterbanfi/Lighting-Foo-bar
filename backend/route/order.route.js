const express = require('express');

const orderRouter = express.Router();
const orderController = require('../controller/order.controller');

function loggedIn(req, res, next) {
    if (req.user.rights) {
        next();
    } else {
        res.json({
            error: 'Be kell jelentkezned'
        });
    }
}

orderRouter.route('/')
    .get(loggedIn, orderController.list)
    .post(loggedIn, orderController.create);

orderRouter.route('/:id')
    .get(loggedIn, orderController.find)
    .put(loggedIn, orderController.update)
    .delete(loggedIn, orderController.remove);

module.exports = orderRouter;