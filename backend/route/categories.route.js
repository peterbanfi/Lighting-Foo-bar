const express = require('express');

const categoriesRouter = express.Router();
const categoriesController = require('../controller/categories.controller');


function loggedIn(req, res, next) {
  /*
        Checks if there's anyone logged in
        */
  if (req.user) {
    let user = JSON.stringify(req.user);
    user = JSON.parse(user);
    /*
                Checks if the user logged in is an Admin
                */
    if (user.rights) {
      next();
    } else {
      res.status(500).json({
        error: 'Be kell jelentkezned Adminként!',
      });
    }
  } else {
    res.status(500).json({
      error: 'Be kell jelentkezned!',
    });
  }
}

categoriesRouter.route('/')
  .get(categoriesController.list)
  .post(loggedIn, categoriesController.create);

categoriesRouter.route('/:id')
  .get(categoriesController.find)
  .put(loggedIn, categoriesController.update)
  .delete(loggedIn, categoriesController.remove);

module.exports = categoriesRouter;
