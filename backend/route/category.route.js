const express = require('express');

const categoryRouter = express.Router();
const categoryController = require('../controller/category.controller');


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

categoryRouter.route('/')
  .get(loggedIn, categoryController.list)
  .post(isAdmin, categoryController.create);

categoryRouter.route('/:id')
  .get(loggedIn, categoryController.find)
  .put(isAdmin, categoryController.update)
  .delete(isAdmin, categoryController.remove);

module.exports = categoryRouter;
