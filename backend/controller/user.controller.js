const User = require('../models/user');

module.exports = {
  profile: (req, res) => {
    res.json({
      user: req.user,
    });
  },

  /**
   * összes regisztrált felhasználó listázása
   */
  listAll: (req, res) => {
    User.find({}, (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
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

  /** Remove user  */
  remove: (req, res) => {
    User.findByIdAndRemove(req.params.id)
      .then(() => {

        res.status(204).end();
      })
      .catch((err) => {
        return res.status(200).send(err);
      });
  },
};