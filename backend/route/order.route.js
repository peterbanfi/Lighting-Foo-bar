const express = require('express');

const orderRouter = express.Router();
const orderController = require('../controller/order.controller');


function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.json({
      error: 'Be kell jelentkezned.',
    });
  }
}

function isAdmin(req, res, next) {
  if (req.user && req.user.rights) {
    next();
  } else {
    res.json({
      error: 'A kéréshez nem rendelkezel a kellő jogosultsággal.',
    });
  }
}

orderRouter.route('/')
  .get(loggedIn, orderController.list)
  .post(loggedIn, orderController.create);

orderRouter.route('/:id')
  .get(loggedIn, orderController.find)
  .put(isAdmin, orderController.update)
  .delete(isAdmin, orderController.remove);

module.exports = orderRouter;
