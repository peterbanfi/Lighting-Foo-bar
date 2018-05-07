const User = require('../models/user');

module.exports = {
  getUser: (req, res) => res.json({
    user: req.user,
  }),

  register: (req, res, next) => {
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
    user: req.user,
  }),

  logout: (req, res) => {
    req.logout();
    res.json({
      success: 'Kilépve',
    });
  },

  updateProfile: () => {

  },

  deleteProfile: () => {

  },

  addPost: (userid, blogpostid) => User.findByIdAndUpdate(userid, {
    $push: {
      blogposts: blogpostid,
    },
  }),

  removePost: (userid, blogpostid) => User.findByIdAndUpdate(userid, {
    $pop: {
      blogposts: blogpostid,
    },
  }),
};
