const passport = require('passport');
const userRouter = require('express').Router();
const UserController = require('../controller/user.controller');

/* function loggedIn(req, res, next) {

}

function rights(req, res, next) {
    if (req.user.rights) {
        next();
    } else {
        res.json({
            error: false,
        });
    }
} */

userRouter.get('/profile', UserController.profile);
userRouter.get('/listAll', UserController.listAll);
userRouter.get('/getOne/:id', UserController.getOne);
userRouter.delete('/remove/:id', UserController.remove);
userRouter.post('/register', UserController.register);
userRouter.put('/update/:id', UserController.update);
userRouter.post('/login', passport.authenticate('local'), UserController.login);
userRouter.get('/logout', UserController.logout);

module.exports = userRouter;
