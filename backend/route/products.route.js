const express = require('express');
const multer = require('multer');

const productsRouter = express.Router();
const productsController = require('../controller/products.controller');

// ***** file upload parsing *****
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads');
  },
  filename(req, file, cb) {
    const fullFileName = new Date().toISOString().replace(/:/g, '-').concat(file.originalname.substr(file.originalname.indexOf('.')));
    cb(null, fullFileName);
  },
});

// ***** IMG file extension validation *****
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// ***** IMG max upload limit 2Mb *****
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

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

productsRouter.route('/')
  .get(productsController.list)
  .post(loggedIn, upload.single('productImg'), productsController.create);

productsRouter.route('/:id')
  .get(productsController.find)
  .put(loggedIn, upload.single('productImg'), productsController.update)
  .delete(loggedIn, productsController.remove);

module.exports = productsRouter;
