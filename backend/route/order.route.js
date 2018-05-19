const express = require('express');

const orderRouter = express.Router();
const orderController = require('../controller/order.controller');

/*
function loggedIn(req, res, next) {
  if (req.user) {
    isAdmin(req, res, next);
    // next();
  } else {
    res.json({
      error: 'Be kell jelentkezned.',
    });
  }
}

function isAdmin(req, res, next) {
  if (req.user.rights) {
    next();
  } else {
    res.json({
      error: 'A kéréshez nem rendelkezel a kellő jogosultsággal.',
    });
  }
} */

orderRouter.route('/')
  .get(orderController.list)
  .post(orderController.create);

orderRouter.route('/:id')
  .get(orderController.find)
  .put(orderController.update)
  .delete(orderController.remove);

module.exports = orderRouter;