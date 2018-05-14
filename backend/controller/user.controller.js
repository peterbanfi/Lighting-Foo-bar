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
      username: req.body.username,
      email: req.body.email,
      rights: req.body.rights,
    }), req.body.password)
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
