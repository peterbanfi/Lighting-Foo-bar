const User = require('../models/user');

module.exports = {
    profile: (req, res) => {
        res.json({
            user: req.user,
        })
    },

    register: (req, res) => {
        User.register(new User({
                username: req.body.username,
                email: req.body.email,
            }), req.body.password)
            .then(() => res.json({
                success: 'Sikeres regisztráció',
            }))
            .catch(err => res.send(err));
    },

    login: (req, res) => res.json({
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
    }),

    logout: (req, res) => {
        req.logout();
        res.json({
            success: 'Kilépve',
        });
    },

    updateProfile: (req, res) => {

    },

    updatePassword: (req, res) => {

    },

    deleteProfile: () => {

    }
};