const express = require('express');

const productsRouter = express.Router();
const productsController = require('../controller/products.controller');

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.json({ error: 'Be kell jelentkezned' });
  }
}

productsRouter.route('/')
  .get(productsController.list)
  .post(loggedIn, productsController.create);

productsRouter.route('/:id')
  .get(productsController.find)
  .put(loggedIn, productsController.update)
  .delete(loggedIn, productsController.remove);

module.exports = productsRouter;
