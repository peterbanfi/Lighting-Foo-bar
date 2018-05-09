const express = require('express');

const blogpostRouter = express.Router();
const blogpostController = require('../controller/blogpost.controller');

blogpostRouter.route('/')
  .get(blogpostController.list)
  .post(blogpostController.create);

blogpostRouter.route('/:id')
  .get(blogpostController.find)
  .put(blogpostController.update)
  .delete(blogpostController.remove);

module.exports = blogpostRouter;
