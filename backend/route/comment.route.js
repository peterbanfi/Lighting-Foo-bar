const express = require('express');

const commentRouter = express.Router();
const commentController = require('../controller/comment.controller');


/* function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.json({
      error: 'Be kell jelentkezned.',
    });
  }
} */

commentRouter.route('/')
  .get(commentController.list);

commentRouter.route('/:prodid')
  .post(commentController.create);

commentRouter.route('/:id')
  .get(commentController.find)
  .put(commentController.update);

commentRouter.route('/:prodid/:commid')
  .delete(commentController.remove);

module.exports = commentRouter;
