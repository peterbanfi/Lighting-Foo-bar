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
<<<<<<< HEAD
      .then(() => res.json({
        success: 'Sikeres regisztráció',
      }))
      .catch(err => res.send(err));
=======
      .then(user => res.json(user))
      .catch((err) => {
        res.status(500).json({ error: err });
      });
>>>>>>> Products2
  },
  /**
   * Egyszerű login
   */
  login: (req, res) => res.json({
    success: 'Sikeres belépés',
  }),
  /**
   * És logout
   */
  logout: (req, res) => {
    req.logout();
    res.status(200).json({
      success: 'Sikeres kilépés',
    });
  },
  /**
   * felhasználó törlése
   * */
  remove: (req, res) => {
    User.findByIdAndRemove(req.params.id)
      .then(() => {
<<<<<<< HEAD
        res.status(204).end();
      })
      .catch(err => res.status(200).send(err));
=======
        res.status(200).json({
          success: 'Sikeres törlés',
        });
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
>>>>>>> Products2
  },

  /**
   * Update felhasznló
   */
  update: (req, res) => {
    req.body.updatedAt = new Date().toLocaleDateString();
    User.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
      if (err) {
        res.send(err);
        console.log(err);
      }
      res.json(post);
    });
  },

  /**
   * Egy bizonyos felhasználó keresése
   */
  getOne: (req, res, next) => {
    User.findById(req.params.id)
      .then((userFound) => {
        if (!userFound) {
          return res.status(404).end();
        }
        return res.status(200).json(userFound);
      })
      .catch(err => next(err));
  },
};
