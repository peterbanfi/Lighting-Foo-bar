const User = require('../models/user');

module.exports = {
  profile: (req, res) => {
    res.json({
      user: req.user,
    });
  },

/**
 * felhasználói jogosultság beállítása
 */
  register: (req, res) => {
    User.register(new User({
<<<<<<< HEAD
      username: req.body.username,
      email: req.body.email,
      rights: req.body.rights,
    }), req.body.password)
=======
        username: req.body.username,
        email: req.body.email,
      }), req.body.password)
>>>>>>> 7fe39763f4e8e75f28f3a34b56cc870dbb892627
      .then(() => res.json({
        success: 'Sikeres regisztráció',
      }))
      .catch(err => res.send(err));
  },

  login: (req, res) => res.json({
    success: 'Sikeres belépés',
  }),

  logout: (req, res) => {
    req.logout();
    res.json({
      success: 'Sikeres kilépés',
    });
  },
};