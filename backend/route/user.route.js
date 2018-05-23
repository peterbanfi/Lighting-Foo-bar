const passport = require('passport');
const userRouter = require('express').Router();
const UserController = require('../controller/user.controller');

function loggedIn(req, res, next) {
    if (req.user) {
        if (req.user.rights === true) {
            console.log(req.user);
            next();
        } else {
            res.status(500).json({
                error: 'Wrong Rights!',
            });
        }
    } else {
        res.status(500).json({
            error: 'Access Denied!',
        });
    }
};

function loggedInUser(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.status(500).json({
            error: 'Access Denied!',
        });
    }
};

userRouter.get('/profile', loggedInUser, UserController.profile);
userRouter.get('/listAll', UserController.listAll);
userRouter.get('/getOne/:id', loggedIn, UserController.getOne);
userRouter.delete('/remove/:id', loggedIn, UserController.remove);
userRouter.post('/register', loggedIn, UserController.register);
userRouter.put('/update/:id', loggedInUser, UserController.update);
/* userRouter.put('/updatePassword/:id', UserController.update); */

userRouter.post('/login', passport.authenticate('local'), UserController.login);
userRouter.get('/logout', UserController.logout);

module.exports = userRouter;